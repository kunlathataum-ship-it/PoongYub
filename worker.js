// PoongYub AI proxy — Cloudflare Worker
// ส่งคำขอวิเคราะห์อาหารไปยัง Claude API โดยเก็บ API key ไว้ฝั่งเซิร์ฟเวอร์
// ตัวแปรที่ต้องตั้งใน Cloudflare (Settings → Variables and Secrets):
//   ANTHROPIC_API_KEY   (Secret)  — คีย์จาก console.anthropic.com
//   FIREBASE_PROJECT_ID (Text)    — เช่น poongyub-12345
//   ALLOWED_ORIGIN      (Text)    — เช่น https://ชื่อคุณ.github.io
//   ALLOWED_MODELS      (Text, ไม่บังคับ) — คั่นด้วยจุลภาค
//   DAILY_LIMIT         (Text, ไม่บังคับ) — จำนวนครั้งต่อคนต่อวัน (ต้องผูก KV ชื่อ USAGE)

let JWKS = null, JWKS_AT = 0;
const b64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));

async function verifyFirebase(token, projectId) {
  const [h, p, s] = String(token || '').split('.');
  if (!s) throw new Error('bad token');
  const head = JSON.parse(new TextDecoder().decode(b64u(h))), body = JSON.parse(new TextDecoder().decode(b64u(p)));
  const now = Date.now() / 1000;
  if (head.alg !== 'RS256') throw new Error('alg');
  if (body.aud !== projectId || body.iss !== 'https://securetoken.google.com/' + projectId) throw new Error('aud');
  if (!(body.exp > now) || !(body.iat < now + 300) || !body.sub) throw new Error('exp');
  if (!JWKS || Date.now() - JWKS_AT > 3600e3) {
    const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
    JWKS = (await r.json()).keys; JWKS_AT = Date.now();
  }
  const jwk = JWKS.find(k => k.kid === head.kid); if (!jwk) throw new Error('kid');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(s), new TextEncoder().encode(h + '.' + p));
  if (!ok) throw new Error('sig');
  return body;
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(x => x.trim()).filter(Boolean);
    const okOrigin = allowed.includes(origin);
    const cors = { 'access-control-allow-origin': okOrigin ? origin : (allowed[0] || ''), 'access-control-allow-headers': 'content-type, authorization', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'origin' };
    const json = (o, st = 200) => new Response(JSON.stringify(o), { status: st, headers: { ...cors, 'content-type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST' || !okOrigin) return json({ error: 'forbidden' }, 403);

    let user;
    try { user = await verifyFirebase((req.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''), env.FIREBASE_PROJECT_ID); }
    catch (e) { return json({ error: 'unauthorized' }, 401); }

    if (env.USAGE && env.DAILY_LIMIT) {
      const k = user.sub + ':' + new Date().toISOString().slice(0, 10);
      const n = +(await env.USAGE.get(k) || 0);
      if (n >= +env.DAILY_LIMIT) return json({ error: 'rate_limited' }, 429);
      await env.USAGE.put(k, String(n + 1), { expirationTtl: 172800 });
    }

    let body; try { body = await req.json(); } catch (e) { return json({ error: 'bad json' }, 400); }
    const models = (env.ALLOWED_MODELS || 'claude-sonnet-5-5,claude-haiku-5-5,claude-opus-5-5').split(',').map(x => x.trim());
    const payload = {
      model: models.includes(body.model) ? body.model : models[0],
      max_tokens: Math.min(+body.max_tokens || 2000, 4096),
      messages: Array.isArray(body.messages) ? body.messages.slice(-24) : [],
      ...(Array.isArray(body.tools) && body.tools.length ? { tools: body.tools.slice(0, 4) } : {}),
    };
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(payload),
    });
    return new Response(await r.text(), { status: r.status, headers: { ...cors, 'content-type': 'application/json' } });
  },
};
