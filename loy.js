// ===== โหมดลอยกระทง 🪷 =====
setTimeout(() => {
  try {
    const hE = s => esc(String(s == null ? '' : s));
    const isCoach = () => { try { return !!(typeof COACH !== 'undefined' && COACH.isOwner); } catch (e) { return false; } };
    const myName = () => { try { return ((S.profiles || []).find(p => p.id === S.pid) || {}).name || 'ฉัน'; } catch (e) { return 'ฉัน'; } };
    const BASES = { leaf: ['ใบตอง', '#2f9e44', '#69db7c'], bread: ['ขนมปัง (รักษ์น้ำ)', '#d9a066', '#f4c98a'], coco: ['กาบมะพร้าว', '#8d5a3b', '#c08457'] };
    const PET = { pink: ['ชมพู', '#f783ac', '#ffdeeb'], white: ['ขาว', '#f1f3f5', '#ffffff'], yellow: ['ดาวเรือง', '#fab005', '#ffe066'], purple: ['ม่วง', '#b197fc', '#e5dbff'] };
    const WISH = ['ลดให้ได้ 5 กก. ก่อนปีใหม่', 'เดินวันละ 8,000 ก้าวทุกวัน', 'เลิกน้ำหวาน ลดของทอด', 'นอนให้พอคืนละ 7 ชม.', 'สุขภาพแข็งแรงทั้งครอบครัว'];
    const st = document.createElement('style');
    st.textContent = `
#pyLoy{position:fixed;inset:0;z-index:9500;overflow:hidden;background:linear-gradient(180deg,#050a24 0%,#0b1640 45%,#13265e 62%,#0a1a45 63%,#06102e 100%);color:#fff;font-family:inherit;animation:pyLoyIn .5s ease both}
@keyframes pyLoyIn{from{opacity:0}to{opacity:1}}
#pyLoy .stars{position:absolute;inset:0 0 40% 0;background-image:radial-gradient(1.4px 1.4px at 12% 18%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 28% 8%,#fff 50%,transparent 51%),radial-gradient(1.2px 1.2px at 45% 26%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 63% 12%,#fff 50%,transparent 51%),radial-gradient(1.6px 1.6px at 82% 22%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 92% 6%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 6% 40%,#fff 50%,transparent 51%),radial-gradient(1.2px 1.2px at 37% 44%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 72% 38%,#fff 50%,transparent 51%);animation:pyTw 3s ease-in-out infinite alternate}
@keyframes pyTw{from{opacity:.55}to{opacity:1}}
#pyLoy .moon{position:absolute;right:12%;top:7%;width:min(22vw,120px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 38% 35%,#fffdf0 0%,#fff3bf 55%,#ffe8a3 100%);box-shadow:0 0 40px 12px rgba(255,236,170,.45),0 0 120px 40px rgba(255,236,170,.18)}
#pyLoy .moon::after{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 62% 60%,rgba(214,190,120,.35) 0 8%,transparent 9%),radial-gradient(circle at 35% 64%,rgba(214,190,120,.25) 0 6%,transparent 7%),radial-gradient(circle at 55% 30%,rgba(214,190,120,.22) 0 5%,transparent 6%)}
#pyLoy .city{position:absolute;left:0;right:0;top:calc(62% - 46px);height:46px;background:linear-gradient(180deg,transparent,rgba(5,10,36,.9));-webkit-mask:linear-gradient(#000,#000);clip-path:polygon(0 100%,0 60%,4% 60%,4% 30%,7% 30%,7% 55%,11% 55%,11% 20%,13% 20%,13% 10%,15% 10%,15% 45%,20% 45%,20% 35%,26% 35%,26% 60%,31% 60%,31% 25%,34% 25%,34% 50%,40% 50%,40% 15%,43% 15%,43% 40%,49% 40%,49% 55%,55% 55%,55% 30%,58% 30%,58% 5%,60% 5%,60% 35%,66% 35%,66% 50%,72% 50%,72% 22%,76% 22%,76% 45%,82% 45%,82% 30%,87% 30%,87% 58%,93% 58%,93% 38%,97% 38%,97% 60%,100% 60%,100% 100%);background-color:#081236}
#pyLoy .lantern{position:absolute;width:10px;height:13px;border-radius:40% 40% 30% 30%;background:radial-gradient(circle at 50% 70%,#ffd43b,#f76707);box-shadow:0 0 10px 3px rgba(255,146,43,.6);animation:pyUp linear infinite;opacity:.9}
@keyframes pyUp{from{transform:translateY(0) translateX(0)}50%{transform:translateY(-22vh) translateX(10px)}to{transform:translateY(-46vh) translateX(-6px);opacity:0}}
#pyLoy .refl{position:absolute;right:calc(12% + min(11vw,60px) - 30px);top:63%;width:60px;height:34%;background:repeating-linear-gradient(180deg,rgba(255,236,170,.55) 0 3px,transparent 3px 9px);filter:blur(1.5px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent);animation:pyShim 2.4s ease-in-out infinite alternate}
@keyframes pyShim{from{transform:scaleX(.8)}to{transform:scaleX(1.25)}}
#pyLoy .waves{position:absolute;left:0;right:0;top:63%;bottom:0;background:repeating-linear-gradient(180deg,rgba(116,192,252,.10) 0 2px,transparent 2px 16px);animation:pyWave 6s linear infinite}
@keyframes pyWave{to{background-position:0 64px}}
#pyLoy .river{position:absolute;left:0;right:0;top:63%;bottom:0}
#pyLoy .kt{position:absolute;left:0;will-change:transform;cursor:pointer;animation:pyDrift linear infinite}
#pyLoy .kt .bob{animation:pyBob 2.6s ease-in-out infinite;transform-origin:50% 90%}
#pyLoy .kt .tag{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);white-space:nowrap;font-size:11px;background:rgba(5,10,36,.6);border:1px solid rgba(255,236,170,.35);padding:2px 8px;border-radius:99px;color:#fff3bf;opacity:.85;pointer-events:none}
@keyframes pyDrift{from{transform:translateX(-140px)}to{transform:translateX(calc(100vw + 40px))}}
@keyframes pyBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-4px) rotate(2deg)}}
#pyLoy .flame{animation:pyFl .18s ease-in-out infinite alternate;transform-origin:50% 100%}
@keyframes pyFl{from{transform:scale(1,1)}to{transform:scale(.88,1.12) translateX(.4px)}}
#pyLoy .top{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;gap:10px;padding:12px 14px;z-index:3}
#pyLoy .top h2{margin:0;font-size:clamp(15px,4.6vw,20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;color:#fff3bf;text-shadow:0 0 12px rgba(255,212,59,.5)}
#pyLoy .x{flex:none;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:999px;width:38px;height:38px;font-size:20px;cursor:pointer}
#pyLoy .cnt{position:absolute;left:14px;top:56px;font-size:13px;color:#d0ebff;z-index:3}
#pyLoy .make{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);width:min(560px,calc(100% - 24px));z-index:4;background:rgba(10,20,60,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,236,170,.25);border-radius:22px;padding:12px 14px;box-shadow:0 20px 50px -20px #000}
#pyLoy .make.min .body{display:none}
#pyLoy .row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:6px 0}
#pyLoy .lbl{font-size:12px;color:#a5d8ff;min-width:58px}
#pyLoy .opt{border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:#fff;border-radius:999px;padding:5px 11px;font:inherit;font-size:13px;cursor:pointer}
#pyLoy .opt.on{background:linear-gradient(135deg,#fcc419,#f76707);border-color:transparent;color:#1a1a1a;font-weight:700}
#pyLoy textarea{width:100%;min-height:52px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#fff;border-radius:12px;padding:8px 10px;font:inherit;resize:none}
#pyLoy textarea::placeholder{color:#a5b4d4}
#pyLoy .go{width:100%;margin-top:8px;border:0;border-radius:14px;padding:12px;font:inherit;font-size:16px;font-weight:800;color:#1a1a1a;background:linear-gradient(135deg,#ffe066,#fab005 50%,#f76707);box-shadow:0 8px 24px -8px rgba(250,176,5,.8);cursor:pointer}
#pyLoy .go:active{transform:scale(.97)}
#pyLoy .prev{display:flex;align-items:center;justify-content:center;gap:12px}
#pyLoy .tip{position:absolute;z-index:5;left:50%;top:22%;transform:translateX(-50%);max-width:min(420px,88vw);background:rgba(10,20,60,.9);border:1px solid rgba(255,236,170,.4);border-radius:16px;padding:12px 16px;text-align:center;box-shadow:0 10px 40px -10px #000;animation:pyLoyIn .3s ease both}
#pyLoy .launch{position:absolute;z-index:4;left:50%;bottom:30%;animation:pyLaunch 2.4s cubic-bezier(.3,.7,.3,1) forwards}
@keyframes pyLaunch{0%{transform:translate(-50%,220px) scale(1.5);opacity:0}25%{opacity:1}100%{transform:translate(-50%,0) scale(1);opacity:0}}
#pyLoyBanner{display:flex;align-items:center;gap:12px;cursor:pointer;background:linear-gradient(120deg,#0b1640,#1c3a8a 60%,#2b4fb8);color:#fff;border:0!important;overflow:hidden;position:relative}
#pyLoyBanner b{color:#ffe066;font-size:16px}
#pyLoyBanner::after{content:"";position:absolute;right:-20px;top:-30px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,#fff6d5 0 40%,rgba(255,236,170,.0) 70%);opacity:.6}
#pyLoy .lbtn{white-space:nowrap;flex:none;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,212,59,.5);background:linear-gradient(135deg,rgba(247,103,7,.35),rgba(250,176,5,.25));color:#fff3bf;border-radius:999px;padding:7px 14px;font:inherit;font-weight:700;cursor:pointer;box-shadow:0 0 18px -4px rgba(255,146,43,.7)}
#pyLoy .lbtn:active{transform:scale(.95)}
#pyLoy .khom{position:absolute;z-index:4;left:50%;bottom:8%;pointer-events:none;animation:pyKhom 11s cubic-bezier(.35,.1,.4,1) forwards}
#pyLoy .khom .sw{animation:pySw 3.2s ease-in-out infinite;transform-origin:50% 0}
#pyLoy .khom .glow{animation:pyFlk .25s ease-in-out infinite alternate}
#pyLoy .khom .wtag{position:absolute;top:100%;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:12px;color:#fff3bf;text-shadow:0 0 6px #f76707;margin-top:4px}
@keyframes pyKhom{0%{transform:translate(-50%,40px) scale(1.5);opacity:0}8%{opacity:1}60%{opacity:1}100%{transform:translate(calc(-50% + var(--dx,40px)),-78vh) scale(.28);opacity:0}}
@keyframes pySw{0%,100%{transform:rotate(-4deg) translateX(-6px)}50%{transform:rotate(4deg) translateX(6px)}}
@keyframes pyFlk{from{opacity:.85}to{opacity:1}}
#pyLoy .lantern.mine{width:13px;height:17px;box-shadow:0 0 14px 5px rgba(255,146,43,.75)}
@media (prefers-reduced-motion:reduce){#pyLoy *{animation-duration:0s!important}}`;
    document.head.appendChild(st);

    function ktSvg(k, size = 70) {
      const b = BASES[k.base] || BASES.leaf, p = PET[k.color] || PET.pink, w = size, id = 'g' + Math.random().toString(36).slice(2, 7);
      const petal = (x, y, r, rot) => `<path d="M0 0 C-7 -6 -7 -16 0 -22 C7 -16 7 -6 0 0Z" transform="translate(${x} ${y}) rotate(${rot}) scale(${r})" fill="url(#${id}p)" stroke="${p[1]}" stroke-width=".8"/>`;
      return `<svg width="${w}" height="${w * .9}" viewBox="0 0 100 90" style="overflow:visible;display:block">
<defs><radialGradient id="${id}p" cx="50%" cy="80%" r="80%"><stop offset="0" stop-color="${p[2]}"/><stop offset="1" stop-color="${p[1]}"/></radialGradient><radialGradient id="${id}g"><stop offset="0" stop-color="#ffe066" stop-opacity=".9"/><stop offset="1" stop-color="#ffe066" stop-opacity="0"/></radialGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b[2]}"/><stop offset="1" stop-color="${b[1]}"/></linearGradient></defs>
<ellipse cx="50" cy="84" rx="44" ry="5" fill="rgba(255,236,170,.25)"/>
<circle cx="50" cy="22" r="26" fill="url(#${id}g)"/>
<path d="M8 66 Q50 92 92 66 L86 78 Q50 96 14 78Z" fill="url(#${id}b)" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
${k.base === 'leaf' ? [14, 26, 38, 50, 62, 74, 86].map(x => `<path d="M${x} 70 l-5 -10 l10 0z" fill="${b[1]}" stroke="${b[2]}" stroke-width=".8"/>`).join('') : k.base === 'bread' ? '<path d="M20 74 q6 -3 12 0 M42 78 q6 -3 12 0 M64 74 q6 -3 12 0" stroke="#a0662f" stroke-width="1.3" fill="none"/>' : '<path d="M14 70 q36 14 72 0" stroke="#5c3a24" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>'}
${petal(28, 70, 1.15, -55)}${petal(72, 70, 1.15, 55)}${petal(36, 68, 1.25, -28)}${petal(64, 68, 1.25, 28)}${petal(50, 67, 1.35, 0)}${petal(42, 64, .9, -12)}${petal(58, 64, .9, 12)}
<rect x="47" y="36" width="6" height="22" rx="2" fill="#fff8e1" stroke="#e9d8a6" stroke-width=".8"/>
<path class="flame" d="M50 22 C46 29 46 33 50 36 C54 33 54 29 50 22Z" fill="#ffd43b"/><path class="flame" d="M50 27 C48 31 48 33 50 35 C52 33 52 31 50 27Z" fill="#fff"/>
<path d="M60 58 L66 30 M63 58 L70 32 M57 58 L61 31" stroke="#c2410c" stroke-width="1.2"/><circle cx="66" cy="30" r="1.2" fill="#ff6b6b"/><circle cx="70" cy="32" r="1.2" fill="#ff6b6b"/><circle cx="61" cy="31" r="1.2" fill="#ff6b6b"/>
${k.pig ? '<image href="poong-head.webp" x="18" y="34" width="28" height="28"/>' : ''}
</svg>`;
    }

    const KHOM_ICO = '<svg width="18" height="22" viewBox="0 0 18 22"><defs><radialGradient id="khI" cx="50%" cy="75%" r="70%"><stop offset="0" stop-color="#fff3bf"/><stop offset=".45" stop-color="#ffa94d"/><stop offset="1" stop-color="#e8590c"/></radialGradient></defs><path d="M3 1h12l2 15H1z" fill="url(#khI)" stroke="#c2410c" stroke-width=".8"/><path d="M1 16h16l-2 3H3z" fill="#862e0f"/><ellipse cx="9" cy="17.5" rx="2.2" ry="1.4" fill="#ffe066"/></svg>';
    const khomSvg = w => `<svg width="${w}" height="${w * 1.3}" viewBox="0 0 60 78" style="overflow:visible;display:block"><defs><radialGradient id="khB" cx="50%" cy="78%" r="75%"><stop offset="0" stop-color="#fffbe6"/><stop offset=".35" stop-color="#ffd8a8"/><stop offset=".75" stop-color="#ff922b"/><stop offset="1" stop-color="#d9480f"/></radialGradient><radialGradient id="khG"><stop offset="0" stop-color="#ffd43b" stop-opacity=".7"/><stop offset="1" stop-color="#ff922b" stop-opacity="0"/></radialGradient></defs><circle class="glow" cx="30" cy="44" r="40" fill="url(#khG)"/><path d="M10 4 Q30 -2 50 4 L57 56 Q30 62 3 56Z" fill="url(#khB)" stroke="#e8590c" stroke-width="1"/><path d="M20 3 L17 57 M30 1.5 L30 59 M40 3 L43 57" stroke="rgba(201,42,42,.25)" stroke-width="1"/><path d="M3 56 Q30 62 57 56 L54 61 Q30 66 6 61Z" fill="#a33b0c"/><path d="M14 61 L30 70 L46 61" stroke="#5c2b0e" stroke-width="1" fill="none"/><ellipse class="glow" cx="30" cy="70" rx="5" ry="3.4" fill="#ffe066"/><path class="flame" d="M30 62 C27 66 27 68 30 70 C33 68 33 66 30 62Z" fill="#fff3bf"/></svg>`;
    let khomLive = 0;
    function releaseKhom() {
      const o = document.getElementById('pyLoy'); if (!o || khomLive >= 3) return; khomLive++;
      const wish = (draft.wish || '').trim() || WISH[Math.floor(Math.random() * WISH.length)];
      const el = document.createElement('div'); el.className = 'khom'; el.style.setProperty('--dx', (Math.random() * 160 - 80).toFixed(0) + 'px');
      el.innerHTML = `<div class="sw">${khomSvg(70)}<div class="wtag">${hE(wish)}</div></div>`; o.appendChild(el);
      setTimeout(() => { el.remove(); khomLive--; const l = document.createElement('span'); l.className = 'lantern mine'; l.style.cssText = `left:${10 + Math.random() * 80}%;top:${40 + Math.random() * 14}%;animation-duration:${16 + Math.random() * 8}s`; o.insertBefore(l, o.querySelector('.city')); }, 11000);
      S.profile.lanterns = (+S.profile.lanterns || 0) + 1; markProfile();
      showTip(`<div style="font-size:26px">🏮✨</div><b style="color:#ffe066;font-size:17px">ปล่อยโคมแล้ว!</b><p style="margin:6px 0 0">ขอให้ทุกข์โศกลอยไป สุขภาพดีลอยมา · “${hE(wish)}”</p><div style="font-size:12px;color:#a5d8ff;margin-top:4px">ปล่อยไปแล้ว ${S.profile.lanterns} ดวง</div>`);
    }
    let draft = { base: 'leaf', color: 'pink', pig: true, wish: '', anon: false };
    const mine = () => (S.profile.krathongs || []);
    const YEAR = new Date().getFullYear();
    let RIVER = [];
    const slim = (k, who) => ({ id: k.id, base: k.base, color: k.color, pig: !!k.pig, wish: k.anon ? '' : (k.wish || ''), who: k.anon ? 'ผู้ร่วมลอยกระทง' : (who || k.who || 'ผู้ร่วมลอย'), t: k.t || 0, y: k.y || YEAR });
    function riverItems() {
      const seen = new Set(), out = [];
      mine().filter(k => (k.y || YEAR) === YEAR).forEach(k => { seen.add(k.id); out.push({ ...slim(k, myName()), me: true }); });
      RIVER.filter(k => (k.y || YEAR) === YEAR && !seen.has(k.id)).forEach(k => { seen.add(k.id); out.push(k); });
      return out.sort((a, b) => a.t - b.t).slice(-40);
    }
    const db = () => (S.rawDb && S.uid ? S.rawDb : null);
    async function refreshRiver() {
      const D = db(); if (!D) return;
      if (window.PY_WEB) { try { const snap = await D.collection('river').get(); const all = []; snap.docs.forEach(d => { const v = d.data() || {}; (v.krathongs || []).filter(k => (k.y || YEAR) === YEAR).forEach(k => all.push(slim(k, k.who || v.name))); }); RIVER = all.sort((a, b) => a.t - b.t).slice(-60); } catch (e) { console.warn('river', e); } return; }
      try {
        if (isCoach()) {
          const snap = await D.collection('clients').get();
          const docs = snap.docs.map(d => ({ id: d.id, data: d.data() || {} }));
          const all = mine().filter(k => (k.y || YEAR) === YEAR).map(k => slim(k, myName()));
          docs.forEach(d => (d.data.krathongs || []).filter(k => (k.y || YEAR) === YEAR).forEach(k => all.push(slim(k, k.who || d.data.name))));
          RIVER = all.sort((a, b) => a.t - b.t).slice(-40);
          const sig = JSON.stringify(RIVER.map(k => k.id + k.who + k.wish));
          for (const d of docs) { const cur = JSON.stringify((d.data.river || []).map(k => k.id + k.who + k.wish)); if (cur !== sig) { try { await D.doc('clients/' + d.id).set({ ...d.data, river: RIVER }); } catch (e) { console.warn('river relay', e); } } }
        } else {
          const m = await D.doc('clients/' + S.uid).get(); const v = m.exists ? m.data() : null; RIVER = (v && v.river) || [];
          try { if (typeof COACH !== 'undefined' && v) COACH.meta = v; } catch (e) {}
        }
      } catch (e) { console.warn('river', e); }
    }
    async function shareMine() {
      const D = db(); if (!D) return;
      if (window.PY_WEB) { try { const ks = mine().filter(k => (k.y || YEAR) === YEAR).map(k => slim(k, myName())); await D.doc('river/' + S.uid).set({ name: myName(), krathongs: ks, t: Date.now() }); } catch (e) { console.warn('river share', e); } return; }
      if (isCoach()) return;
      try {
        const m = await D.doc('clients/' + S.uid).get(); const v = m.exists ? (m.data() || {}) : { loyOnly: true };
        const ks = mine().filter(k => (k.y || YEAR) === YEAR).map(k => slim(k, myName()));
        await D.doc('clients/' + S.uid).set({ ...v, name: v.name || myName(), krathongs: ks });
        try { if (typeof COACH !== 'undefined' && COACH.meta) COACH.meta.krathongs = ks; } catch (e) {}
      } catch (e) { console.warn('loy share', e); }
    }
    function lanes(items) {
      const deco = [{ base: 'leaf', color: 'yellow', pig: false, deco: 1 }, { base: 'bread', color: 'white', pig: false, deco: 1 }, { base: 'coco', color: 'purple', pig: false, deco: 1 }];
      const all = items.length < 4 ? [...items, ...deco.slice(0, 4 - items.length)] : items;
      const newest = Math.max(0, ...all.map(k => k.t || 0)), justNow = Date.now() - newest < 60000;
      return all.map((k, i) => { const lane = i % 5, dur = 38 + ((i * 7) % 5) * 9, delay = (justNow && k.t === newest) ? -4 : -((i * 13) % dur), size = 48 + lane * 9 + (k.me ? 6 : 0); return `<div class="kt" data-i="${i}" style="top:${8 + lane * 16}%;animation-duration:${dur}s;animation-delay:${delay}s;z-index:${lane + 1}">${k.deco ? '' : `<span class="tag">${hE(k.who)}</span>`}<div class="bob" style="animation-delay:${-(i % 3) * .7}s">${ktSvg(k, size)}</div></div>`; }).join('');
    }
    let ITEMS = [];
    function paintRiver() { const r = document.querySelector('#pyLoy .river'); if (!r) return; ITEMS = riverItems(); r.innerHTML = lanes(ITEMS); const c = document.querySelector('#pyLoy .cnt'); if (c) c.textContent = `🪷 กระทงในแม่น้ำรวม ${ITEMS.length} ใบ · ${new Set(ITEMS.map(k => k.who)).size} คน`; }
    function paintMaker() {
      const m = document.querySelector('#pyLoy .make .body'); if (!m) return;
      m.innerHTML = `<div class="prev">${ktSvg(draft, 96)}<div style="font-size:13px;color:#d0ebff">กระทงของ<br><b style="color:#ffe066;font-size:16px">${hE(myName())}</b></div></div>
      <div class="row"><span class="lbl">ตัวกระทง</span>${Object.entries(BASES).map(([k, v]) => `<button class="opt${draft.base === k ? ' on' : ''}" data-b="${k}">${v[0]}</button>`).join('')}</div>
      <div class="row"><span class="lbl">ดอกไม้</span>${Object.entries(PET).map(([k, v]) => `<button class="opt${draft.color === k ? ' on' : ''}" data-c="${k}"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${v[1]};margin-right:4px;vertical-align:middle"></span>${v[0]}</button>`).join('')}</div>
      <div class="row"><span class="lbl">หมูนั่งด้วย</span><button class="opt${draft.pig ? ' on' : ''}" data-pig="1">🐷 ให้หมูนั่ง</button><button class="opt${!draft.pig ? ' on' : ''}" data-pig="0">ไม่ใส่</button></div>
      <div class="row" style="display:block"><span class="lbl">คำอธิษฐาน (เป้าหมายสุขภาพ)</span><textarea id="pyLoyWish" maxlength="80" placeholder="เช่น ลดให้ได้ 5 กก. ก่อนปีใหม่">${hE(draft.wish)}</textarea><div class="row">${WISH.map(w => `<button class="opt" data-w="${hE(w)}" style="font-size:12px">${hE(w)}</button>`).join('')}</div></div>
      <div class="row"><span class="lbl">แสดงชื่อ</span><button class="opt${!draft.anon ? ' on' : ''}" data-anon="0">ชื่อฉัน + คำอธิษฐาน</button><button class="opt${draft.anon ? ' on' : ''}" data-anon="1">ไม่ระบุชื่อ</button></div>
      <div style="font-size:11.5px;color:#a5d8ff;margin-top:2px">🌏 แม่น้ำรวม: ทุกคนในแอปจะเห็นกระทงนี้ ${draft.anon ? '(ไม่แสดงชื่อและคำอธิษฐาน)' : 'พร้อมชื่อและคำอธิษฐาน'} · ข้อมูลสุขภาพอื่นไม่ถูกแชร์</div>
      <button class="go" data-go="1">🪷 ลอยกระทง</button>`;
    }
    function open() {
      if (document.getElementById('pyLoy')) return;
      const o = document.createElement('div'); o.id = 'pyLoy';
      const lant = Array.from({ length: 7 }, (_, i) => `<span class="lantern" style="left:${8 + i * 13}%;top:${48 + (i % 3) * 5}%;animation-duration:${14 + (i % 4) * 4}s;animation-delay:${-i * 2.3}s"></span>`).join('');
      o.innerHTML = `<div class="stars"></div><div class="moon"></div>${lant}<div class="city"></div><div class="refl"></div><div class="waves"></div><div class="river"></div>
        <div class="top"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M3 15 Q12 22 21 15 L19 18 Q12 23 5 18Z" fill="#69db7c"/><path d="M12 15 C9 12 9 8 12 5 C15 8 15 12 12 15Z" fill="#f783ac"/><path d="M12 15 C8 14 6 11 6 8 C9 9 11 11 12 15Z M12 15 C16 14 18 11 18 8 C15 9 13 11 12 15Z" fill="#faa2c1"/><path d="M12 5 C11 3.5 11 2.8 12 1.5 C13 2.8 13 3.5 12 5Z" fill="#ffd43b"/></svg><h2>ลอยกระทงกับพุงยุบ</h2><button class="lbtn" data-khom="1" style="margin-left:auto">${KHOM_ICO}ปล่อยโคม</button><button class="x" aria-label="ปิด" style="margin-left:8px">×</button></div>
        <div class="cnt"></div>
        <div class="make"><div style="display:flex;align-items:center;gap:8px;cursor:pointer" data-min="1"><b style="color:#ffe066">✨ ทำกระทงของคุณ</b><span style="margin-left:auto;font-size:12px;color:#a5d8ff">ย่อ/ขยาย</span></div><div class="body"></div></div>`;
      document.body.appendChild(o);
      paintRiver(); paintMaker();
      refreshRiver().then(paintRiver); const iv = setInterval(() => { if (!document.getElementById('pyLoy')) { clearInterval(iv); return; } refreshRiver().then(paintRiver); }, window.PY_WEB ? 8000 : 20000);
      o.addEventListener('click', ev => {
        const t = ev.target;
        if (t.closest('.x')) { o.remove(); return; }
        if (t.closest('[data-min]')) { o.querySelector('.make').classList.toggle('min'); return; }
        const kt = t.closest('.kt'); if (kt) { const k = ITEMS[+kt.dataset.i]; showTip(k ? `<div style="font-size:13px;color:#a5d8ff">กระทงของ</div><b style="font-size:18px;color:#ffe066">${hE(k.who)}</b><p style="margin:8px 0 0">${k.wish ? '“' + hE(k.wish) + '”' : 'ขอให้สุขภาพแข็งแรง'}</p>` : `<b style="color:#ffe066">กระทงประดับแม่น้ำ</b><p style="margin:6px 0 0">ทำกระทงของคุณแล้วลอยมาร่วมกันนะ</p>`); return; }
        const b = t.closest('[data-b]'); if (b) { draft.base = b.dataset.b; paintMaker(); return; }
        const c = t.closest('[data-c]'); if (c) { draft.color = c.dataset.c; paintMaker(); return; }
        const an = t.closest('[data-anon]'); if (an) { draft.anon = an.dataset.anon === '1'; paintMaker(); return; }
        const pg = t.closest('[data-pig]'); if (pg) { draft.pig = pg.dataset.pig === '1'; paintMaker(); return; }
        const w = t.closest('[data-w]'); if (w) { draft.wish = w.dataset.w; paintMaker(); return; }
        if (t.closest('[data-khom]')) { releaseKhom(); return; }
        if (t.closest('[data-go]')) launch();
      });
      o.addEventListener('input', ev => { if (ev.target.id === 'pyLoyWish') draft.wish = ev.target.value; });
      document.addEventListener('keydown', escClose);
    }
    function escClose(e) { if (e.key === 'Escape') { const o = document.getElementById('pyLoy'); if (o) o.remove(); document.removeEventListener('keydown', escClose); } }
    function showTip(html) { const o = document.getElementById('pyLoy'); if (!o) return; const old = o.querySelector('.tip'); if (old) old.remove(); const d = document.createElement('div'); d.className = 'tip'; d.innerHTML = html; o.appendChild(d); setTimeout(() => d.remove(), 3500); }
    async function launch() {
      const k = { id: Date.now().toString(36), base: draft.base, color: draft.color, pig: draft.pig, wish: (draft.wish || '').trim().slice(0, 80), anon: !!draft.anon, t: Date.now(), y: new Date().getFullYear() };
      S.profile.krathongs = [...mine(), k].slice(-12); markProfile();
      const o = document.getElementById('pyLoy');
      if (o) { const l = document.createElement('div'); l.className = 'launch'; l.innerHTML = ktSvg(k, 120); o.appendChild(l); setTimeout(() => l.remove(), 2500); o.querySelector('.make').classList.add('min'); }
      setTimeout(() => { paintRiver(); showTip(`<div style="font-size:26px">🪷✨</div><b style="color:#ffe066;font-size:17px">ลอยกระทงแล้ว!</b><p style="margin:6px 0 0">${k.wish ? 'ขอให้ “' + hE(k.wish) + '” เป็นจริง' : 'ขอให้สุขภาพแข็งแรงตลอดปี'} 🐷💪</p>`); }, 1900);
      draft.wish = '';
      await shareMine(); await refreshRiver(); paintRiver();
    }
    window.pyLoyOpen = open;

    // แบนเนอร์หน้าวันนี้ (ช่วงเทศกาล 15 พ.ย. – 5 ธ.ค.) + ปุ่มลัดในหน้าโปรไฟล์ตลอดปี
    function banner() {
      const v = document.getElementById('v-today'); if (!v) return;
      const now = new Date(), m = now.getMonth(), d = now.getDate(), season = (m === 10 && d >= 15) || (m === 11 && d <= 5);
      let b = document.getElementById('pyLoyBanner');
      if (!season) { if (b) b.remove(); return; }
      if (!b) { b = document.createElement('div'); b.id = 'pyLoyBanner'; b.className = 'card'; b.style.marginBottom = '14px'; const ref = v.querySelector('.card,.grid'); ref ? ref.parentNode.insertBefore(b, ref) : v.prepend(b); b.onclick = open; }
      const isDay = m === 10 && d === 24 && now.getFullYear() === 2026;
      b.innerHTML = `<div style="flex:none">${ktSvg({ base: 'leaf', color: 'pink', pig: true }, 64)}</div><div style="position:relative;z-index:1"><b>${isDay ? 'คืนนี้วันลอยกระทง! 🌕' : 'เทศกาลลอยกระทง 🌕'}</b><div style="font-size:13px;opacity:.9">ทำกระทง เขียนเป้าหมายสุขภาพ แล้วลอยไปด้วยกัน${(S.profile.krathongs || []).length ? ` · ลอยแล้ว ${(S.profile.krathongs || []).length} ใบ` : ''}</div></div><span style="margin-left:auto;position:relative;z-index:1;background:linear-gradient(135deg,#ffe066,#f76707);color:#1a1a1a;font-weight:800;border-radius:999px;padding:8px 14px;white-space:nowrap">ลอยเลย ›</span>`;
    }
    const _ra = renderAll; renderAll = function () { const r = _ra.apply(this, arguments); try { banner(); } catch (e) {} return r; };
    window.addEventListener('hashchange', () => setTimeout(banner, 40));
    banner(); setTimeout(banner, 1500);
    const inSeason = () => { const n = new Date(), m = n.getMonth(), d = n.getDate(); return (m === 10 && d >= 15) || (m === 11 && d <= 5); };
    setTimeout(function relay() { if (!window.PY_WEB && inSeason() && isCoach() && !document.getElementById('pyLoy')) refreshRiver(); setTimeout(relay, 60000); }, 6000);
  } catch (e) { console.warn('loy init', e); }
}, 0);
