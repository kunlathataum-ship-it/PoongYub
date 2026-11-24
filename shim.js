/* PoongYub web — แทนที่ความสามารถของ claude.ai (db / user / mcp Google Drive / sample AI)
   ด้วย Firebase Auth + Firestore, Google Drive API และ Cloudflare Worker
   แอปเดิมเรียกผ่าน window.claude.use(name) เหมือนเดิม จึงไม่ต้องแก้โค้ดหลัก */
(function () {
  'use strict';
  const C = window.PY_CONFIG || {};
  window.PY_WEB = true;
  const mkErr = (code, msg) => { const e = new Error(msg || code); e.code = code; return e; };
  const configured = !!(C.firebase && C.firebase.apiKey && !/YOUR_|ใส่/.test(C.firebase.apiKey));

  // ---------- Firebase ----------
  let fb = null;
  const ready = (async () => {
    if (!configured || !window.firebase) return { user: null };
    firebase.initializeApp(C.firebase);
    const auth = firebase.auth(), fs = firebase.firestore();
    try { fs.settings({ ignoreUndefinedProperties: true, merge: true }); } catch (e) {}
    try { await fs.enablePersistence({ synchronizeTabs: true }); } catch (e) {}
    try { await auth.getRedirectResult(); } catch (e) { console.warn('redirect', e); }
    const user = await new Promise(res => { const u = auth.onAuthStateChanged(x => { u(); res(x); }); });
    fb = { auth, fs, user };
    return fb;
  })();
  window.PY_AUTH = {
    ready,
    async signIn() {
      await ready; if (!fb) { alert('ยังไม่ได้ตั้งค่า Firebase ในไฟล์ config.js'); return; }
      const p = new firebase.auth.GoogleAuthProvider(); p.setCustomParameters({ prompt: 'select_account' });
      try { await fb.auth.signInWithPopup(p); location.reload(); }
      catch (e) { if (/popup|operation-not-supported/i.test(e.code || '')) await fb.auth.signInWithRedirect(p); else alert('เข้าสู่ระบบไม่สำเร็จ: ' + (e.message || e)); }
    },
    async signOut() { await ready; if (fb) { await fb.auth.signOut(); try { localStorage.removeItem('pyGdTok'); } catch (e) {} location.reload(); } },
    user: () => fb && fb.user,
  };
  const isCoachEmail = u => !!(u && u.emailVerified && (C.coachEmails || []).map(x => String(x).toLowerCase()).includes(String(u.email || '').toLowerCase()));

  // ---------- Firestore: แปลงข้อมูลให้เก็บได้ (Firestore ห้ามอาร์เรย์ซ้อนอาร์เรย์) ----------
  const enc = v => {
    if (v === undefined) return undefined;
    if (typeof v === 'number') return isFinite(v) ? v : null;
    if (Array.isArray(v)) return v.map(x => Array.isArray(x) ? { __a: enc(x) } : (enc(x) === undefined ? null : enc(x)));
    if (v && typeof v === 'object' && !(v instanceof Date)) { const o = {}; for (const k in v) { const e = enc(v[k]); if (e !== undefined) o[k] = e; } return o; }
    return v;
  };
  const dec = v => {
    if (Array.isArray(v)) return v.map(dec);
    if (v && typeof v === 'object') { const ks = Object.keys(v); if (ks.length === 1 && ks[0] === '__a') return dec(v.__a); if (typeof v.toDate === 'function') return v.toMillis(); const o = {}; for (const k of ks) o[k] = dec(v[k]); return o; }
    return v;
  };
  const codeMap = { 'permission-denied': 'not_granted', 'unauthenticated': 'not_granted', 'resource-exhausted': 'quota_exceeded', 'invalid-argument': 'invalid_argument', 'unavailable': 'server_unavailable' };
  const re = p => p.catch(e => { const x = mkErr(codeMap[e && e.code] || (e && e.code) || 'upstream_error', e && e.message); throw x; });
  const dSnap = s => ({ id: s.id, exists: s.exists, data: () => (s.exists ? dec(s.data()) : undefined), metadata: s.metadata });
  const qSnap = s => ({ docs: s.docs.map(dSnap), empty: s.empty, size: s.size, metadata: s.metadata });
  const docRef = r => ({ id: r.id, get: () => re(r.get()).then(dSnap), set: (d, o) => re(r.set(enc(d), o || {})), update: d => re(r.update(enc(d))), delete: () => re(r.delete()), onSnapshot: (cb, err) => r.onSnapshot(s => cb(dSnap(s)), e => err && err(e)) });
  const colRef = r => ({ get: () => re(r.get()).then(qSnap), doc: id => docRef(r.doc(id)), add: d => re(r.add(enc(d))), onSnapshot: (cb, err) => r.onSnapshot(s => cb(qSnap(s)), e => err && err(e)) });
  const dbApi = () => ({ collection: p => colRef(fb.fs.collection(p)), doc: p => docRef(fb.fs.doc(p)) });

  // ---------- Google Drive (แทน MCP) ----------
  let gTok = null, gExp = 0;
  try { const s = JSON.parse(localStorage.getItem('pyGdTok') || 'null'); if (s && Date.now() < s.e) { gTok = s.t; gExp = s.e; } } catch (e) {}
  const gesture = () => { try { return !!(navigator.userActivation && navigator.userActivation.isActive); } catch (e) { return false; } };
  function token(forcePrompt) {
    if (gTok && Date.now() < gExp && !forcePrompt) return Promise.resolve(gTok);
    if (!C.googleClientId || /YOUR_|ใส่/.test(C.googleClientId)) return Promise.reject(mkErr('server_not_connected'));
    if (!(window.google && google.accounts && google.accounts.oauth2)) return Promise.reject(mkErr('server_unavailable'));
    if (!gesture()) return Promise.reject(mkErr('approval_required'));
    return new Promise((res, rej) => {
      const tc = google.accounts.oauth2.initTokenClient({
        client_id: C.googleClientId, scope: 'https://www.googleapis.com/auth/drive.readonly', hint: fb && fb.user ? fb.user.email : undefined,
        callback: r => { if (r.error) return rej(mkErr('needs_reauth', r.error)); gTok = r.access_token; gExp = Date.now() + (Number(r.expires_in || 3600) - 120) * 1000; try { localStorage.setItem('pyGdTok', JSON.stringify({ t: gTok, e: gExp })); } catch (e) {} res(gTok); },
        error_callback: e => rej(mkErr(e && e.type === 'popup_closed' ? 'approval_required' : 'needs_reauth')),
      });
      tc.requestAccessToken({ prompt: forcePrompt ? 'consent' : '' });
    });
  }
  async function gfetch(url, asBuf) {
    let t = await token();
    let r = await fetch(url, { headers: { Authorization: 'Bearer ' + t } });
    if (r.status === 401) { gTok = null; try { localStorage.removeItem('pyGdTok'); } catch (e) {} t = await token(); r = await fetch(url, { headers: { Authorization: 'Bearer ' + t } }); }
    if (r.status === 401) throw mkErr('needs_reauth');
    if (r.status === 403) throw mkErr('approval_required');
    if (r.status === 404 || r.status === 400) throw mkErr('tool_error', 'HTTP ' + r.status);
    if (!r.ok) throw mkErr('server_unavailable', 'HTTP ' + r.status);
    return asBuf ? r.arrayBuffer() : r.json();
  }
  const b64 = buf => { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  const toQ = q => String(q || '').replace(/\btitle\b/g, 'name').replace(/'([^']+)'\s+in\s+ancestors/g, "'$1' in parents");
  const SCHEMAS = { search_files: { properties: { query: { type: 'string' }, pageSize: {}, orderBy: {} }, required: ['query'] }, download_file_content: { properties: { fileId: { type: 'string' } }, required: ['fileId'] }, read_file_content: { properties: { fileId: { type: 'string' } }, required: ['fileId'] } };
  const mcpApi = {
    describeTool: async (server, tool) => ({ inputSchema: SCHEMAS[tool] || { properties: {} } }),
    connect: () => token(true),
    async callTool(server, tool, args) {
      args = args || {};
      if (tool === 'search_files') {
        const p = new URLSearchParams({ q: toQ(args.query || args.q), pageSize: String(Math.min(+args.pageSize || 100, 1000)), fields: 'files(id,name,mimeType,modifiedTime,size,parents)', supportsAllDrives: 'true', includeItemsFromAllDrives: 'true' });
        if (args.orderBy) p.set('orderBy', String(args.orderBy).replace('modifiedTime desc', 'modifiedTime desc'));
        const j = await gfetch('https://www.googleapis.com/drive/v3/files?' + p);
        const files = (j.files || []).map(f => ({ id: f.id, title: f.name, name: f.name, mimeType: f.mimeType, modifiedTime: f.modifiedTime, fileSize: f.size ? +f.size : 0, parentId: (f.parents || [])[0] }));
        return { payload: { files } };
      }
      const id = args.fileId || args.file_id || args.id; if (!id) throw mkErr('bad_request');
      if (tool === 'download_file_content') { const buf = await gfetch('https://www.googleapis.com/drive/v3/files/' + encodeURIComponent(id) + '?alt=media&supportsAllDrives=true', true); return { payload: { content: b64(buf) } }; }
      if (tool === 'read_file_content') { const buf = await gfetch('https://www.googleapis.com/drive/v3/files/' + encodeURIComponent(id) + '?alt=media&supportsAllDrives=true', true); return { payload: { content: new TextDecoder().decode(buf) } }; }
      throw mkErr('tool_error', 'unknown tool ' + tool);
    },
  };

  // ---------- AI วิเคราะห์อาหาร (ผ่าน Cloudflare Worker) ----------
  async function imgPart(blob) {
    const bmp = await createImageBitmap(blob); const s = Math.min(1, 1568 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: c.toDataURL('image/jpeg', 0.85).split(',')[1] } };
  }
  const sampleApi = {
    limits: async () => ({ images: true, tools: true }),
    async json(prompt, opt) {
      opt = opt || {};
      const idt = await fb.user.getIdToken();
      const imgs = []; for (const b of (opt.images || [])) { try { imgs.push(await imgPart(b)); } catch (e) { throw mkErr('image_rejected'); } }
      const tools = (opt.tools || []).map(t => ({ name: t.name, description: t.description, input_schema: t.inputSchema }));
      const messages = [{ role: 'user', content: [...imgs, { type: 'text', text: prompt }] }];
      for (let turn = 0; turn < 10; turn++) {
        let r;
        try { r = await fetch(C.aiProxyUrl, { method: 'POST', signal: opt.signal, headers: { 'content-type': 'application/json', authorization: 'Bearer ' + idt }, body: JSON.stringify({ model: C.aiModel, max_tokens: 4000, messages, tools: tools.length ? tools : undefined }) }); }
        catch (e) { if (opt.signal && opt.signal.aborted) throw mkErr('cancelled'); throw mkErr('upstream_error'); }
        if (r.status === 401 || r.status === 403) throw mkErr('session_expired');
        if (r.status === 429) throw mkErr('rate_limited');
        if (!r.ok) throw mkErr('upstream_error');
        const d = await r.json();
        messages.push({ role: 'assistant', content: d.content });
        if (d.stop_reason === 'tool_use') {
          const results = [];
          for (const b of d.content.filter(x => x.type === 'tool_use')) {
            const t = (opt.tools || []).find(x => x.name === b.name); let out = 'ไม่พบเครื่องมือ';
            try { out = t ? await t.execute(b.input || {}) : out; } catch (e) { out = 'error: ' + (e.message || e); }
            results.push({ type: 'tool_result', tool_use_id: b.id, content: typeof out === 'string' ? out : JSON.stringify(out) });
          }
          messages.push({ role: 'user', content: results }); continue;
        }
        if (d.stop_reason === 'refusal') throw mkErr('refused');
        const text = (d.content || []).filter(x => x.type === 'text').map(x => x.text).join('\n').trim();
        if (!text) throw mkErr('empty_completion');
        const a = text.indexOf('{'), z = text.lastIndexOf('}');
        try { return JSON.parse(text.slice(a, z + 1)); } catch (e) { throw mkErr('invalid_json'); }
      }
      throw mkErr('upstream_error');
    },
  };

  // ---------- window.claude ----------
  window.claude = {
    async use(name) {
      const f = await ready; const u = f && f.user;
      if (name === 'db') return u ? dbApi() : null;
      if (name === 'user') return u ? { id: async () => u.uid, isOwner: async () => isCoachEmail(u), can: async () => true, name: async () => u.displayName || u.email } : null;
      if (name === 'mcp') return mcpApi;
      if (name === 'sample') return u && C.aiProxyUrl && !/YOUR_|ใส่/.test(C.aiProxyUrl) ? sampleApi : null;
      return null;
    },
  };

  // ---------- ปุ่มเข้าสู่ระบบ / บัญชี ----------
  const G_ICO = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  function paintAccount() {
    const badge = document.getElementById('storeBadge'); if (!badge) return;
    let el = document.getElementById('pyAcct');
    if (!el) { el = document.createElement('span'); el.id = 'pyAcct'; el.style.cssText = 'display:inline-flex;align-items:center;gap:6px;margin-left:6px'; badge.after(el); }
    const u = fb && fb.user;
    if (!configured) { el.innerHTML = '<span class="badge warn">ยังไม่ได้ตั้งค่า config.js</span>'; return; }
    if (!u) { el.innerHTML = `<button type="button" id="pySignIn" style="display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 12px;background:#fff;border:1px solid #dee2e6;font-weight:700;cursor:pointer">${G_ICO}เข้าสู่ระบบ</button>`; el.querySelector('#pySignIn').onclick = () => window.PY_AUTH.signIn(); return; }
    el.innerHTML = `<button type="button" id="pyMe" title="${(u.email || '').replace(/"/g, '')}" style="display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:3px 10px 3px 3px;background:#fff;border:1px solid #c3fae8;cursor:pointer">${u.photoURL ? `<img src="${u.photoURL}" alt="" width="24" height="24" style="border-radius:50%" referrerpolicy="no-referrer">` : G_ICO}<span style="font-size:12px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${(u.displayName || u.email || '').replace(/</g, '&lt;')}</span></button>`;
    el.querySelector('#pyMe').onclick = () => { if (confirm(`ออกจากระบบ ${u.email}?`)) window.PY_AUTH.signOut(); };
  }
  ready.then(() => { const go = () => { paintAccount(); if (!document.getElementById('pyAcct')) setTimeout(go, 400); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); });

  // ---------- PWA ----------
  if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
})();
