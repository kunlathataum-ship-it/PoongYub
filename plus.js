// ===== PoongYub PLUS: 1-3 ทุกคน · 5-10 โค้ช (เปิดให้ลูกค้าได้) =====
setTimeout(() => {
  try {
    const TODAY = () => localToday();
    const MEALS = [['เช้า', '🌅', 630], ['กลางวัน', '☀️', 870], ['เย็น', '🌙', 1260]];
    const mealOf = f => f.meal || (/เช้า/.test(f.n) ? 'เช้า' : /กลางวัน|เที่ยง/.test(f.n) ? 'กลางวัน' : /เย็น|ค่ำ/.test(f.n) ? 'เย็น' : /ว่าง/.test(f.n) ? 'ว่าง' : 'อื่น ๆ');
    const f0 = v => (v == null || isNaN(v)) ? '—' : fmt(Math.round(v));
    const hEsc = s => esc(String(s == null ? '' : s));
    const isCoach = () => { try { return !!(typeof COACH !== 'undefined' && COACH.isOwner); } catch (e) { return false; } };
    const proOn = () => { try { return isCoach() || !!(typeof COACH !== 'undefined' && COACH.meta && COACH.meta.pro); } catch (e) { return false; } };
    const ED = () => { try { return engineDays(); } catch (e) { return S.days || {}; } };
    const pig = (txt, mood) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:4px 0 10px"><img src="poong-head.webp" alt="" width="44" height="44" style="flex:none;border-radius:50%;background:#fff;box-shadow:0 4px 10px -4px rgba(0,0,0,.25)${mood === 'sad' ? ';filter:saturate(.7)' : ''}"><div style="background:#f3fffa;border:1px solid #c3fae8;border-radius:4px 14px 14px 14px;padding:8px 12px;font-size:14px;color:#0b7285">${txt}</div></div>`;
    const ico = {
      clock: '<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fff4e6" stroke="#fd7e14" stroke-width="1.8"/><path d="M12 7v5l3 2" stroke="#e8590c" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
      set: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3" fill="#e6fcf5" stroke="#12b886" stroke-width="1.6"/><path d="M8 6V4.5h8V6" stroke="#12b886" stroke-width="1.6" fill="none"/><path d="M8 12.5l2.5 2.5L16 10" stroke="#0ca678" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      moon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z" fill="#e7f5ff" stroke="#1c7ed6" stroke-width="1.6"/><circle cx="17" cy="5" r="1.2" fill="#fcc419"/><circle cx="20" cy="9" r=".9" fill="#fcc419"/></svg>',
      fire: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2.5c1 3.5 5.5 5.5 5.5 11a5.5 5.5 0 0 1-11 0c0-3 1.6-4.4 2.6-6 .3 2 1.4 3 2.4 3.4C10.6 8 11 5 12 2.5z" fill="#ffd8a8" stroke="#e8590c" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 13c1.2 1 2.2 2 2.2 3.4a2.2 2.2 0 0 1-4.4 0c0-1.2.9-2 2.2-3.4z" fill="#fa5252"/></svg>',
      flag: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 21V3.5" stroke="#495057" stroke-width="1.8" stroke-linecap="round"/><path d="M5 4h11l-2 3.5L16 11H5z" fill="#d3f9d8" stroke="#2f9e44" stroke-width="1.5" stroke-linejoin="round"/></svg>',
      cam: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="19" height="13" rx="3" fill="#f3f0ff" stroke="#7048e8" stroke-width="1.6"/><path d="M8 6.5l1.5-2.5h5L16 6.5" fill="none" stroke="#7048e8" stroke-width="1.6"/><circle cx="12" cy="13" r="3.6" fill="#fff" stroke="#7048e8" stroke-width="1.6"/></svg>',
      tape: '<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="9" cy="12" r="6.5" fill="#fff9db" stroke="#f08c00" stroke-width="1.6"/><circle cx="9" cy="12" r="2.2" fill="#fff" stroke="#f08c00" stroke-width="1.4"/><path d="M15 15.5h6.5v3H13" fill="#ffe066" stroke="#f08c00" stroke-width="1.4" stroke-linejoin="round"/><path d="M17 15.5v1.5M19 15.5v1.5" stroke="#f08c00" stroke-width="1.2"/></svg>',
      alert: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3l9.5 17h-19z" fill="#fff5f5" stroke="#e03131" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="#e03131" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.2" fill="#e03131"/></svg>',
      doc: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5" fill="#e7f5ff" stroke="#1971c2" stroke-width="1.6"/><path d="M12 7v6M9 10h6" stroke="#e03131" stroke-width="2" stroke-linecap="round"/><path d="M8 16.5h8M8 19h5" stroke="#1971c2" stroke-width="1.4" stroke-linecap="round"/></svg>',
      lock: '<svg width="18" height="18" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#fff3bf" stroke="#f08c00" stroke-width="1.6"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="#f08c00" stroke-width="1.6"/><circle cx="12" cy="15.5" r="1.5" fill="#f08c00"/></svg>',
    };
    const card = (id, icon, title, body, extra = '') => `<div class="card pyPlus" id="${id}" style="margin-top:14px;${extra}"><h3 style="display:flex;align-items:center;gap:8px">${icon}${title}</h3>${body}</div>`;
    const btn = (attrs, label, pri) => `<button type="button" ${attrs} class="${pri ? 'pri' : ''}" style="margin:3px 4px 3px 0;border-radius:999px">${label}</button>`;
    const host = (viewId, slotId, where) => { const v = document.getElementById(viewId); if (!v) return null; let s = document.getElementById(slotId); if (!s) { s = document.createElement('div'); s.id = slotId; s.style.cssText = 'grid-column:1/-1'; if (where === 'top') { const ref = v.querySelector('.grid,.card'); ref ? ref.parentNode.insertBefore(s, ref) : v.prepend(s); } else v.appendChild(s); } return s; };
    const foodsOf = d => ((S.days[d] || {}).foods || []);
    const freq = meal => { const m = new Map(); Object.keys(S.days).sort().reverse().slice(0, 60).forEach(d => foodsOf(d).forEach(f => { if (mealOf(f) !== meal) return; const k = f.n.trim(); const o = m.get(k) || { f, c: 0 }; o.c++; m.set(k, o); })); return [...m.values()].sort((a, b) => b.c - a.c).slice(0, 3).map(x => x.f); };
    const addTo = (meal, list) => { const d = day(VIEW_DATE); d.foods = [...(d.foods || []), ...list.map(f => { const { meal: _m, ...rest } = f; return { ...rest, meal }; })]; markDay(VIEW_DATE); renderAll(); };

    // ---------- 1: เตือนมื้อที่ยังไม่บันทึก ----------
    function missedHtml() {
      const T = TODAY(); if (VIEW_DATE !== T) return '';
      const now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
      const raw = S.days[T] || {}, logged = new Set(foodsOf(T).map(mealOf)), skip = raw.skipMeals || {};
      const y = E.addDays(T, -1), yFoods = foodsOf(y);
      const rows = MEALS.filter(([m, , after]) => mins >= after && !logged.has(m) && !skip[m]).map(([m, i]) => {
        const ym = yFoods.filter(f => mealOf(f) === m), fr = freq(m).filter(f => !ym.some(x => x.n === f.n));
        return `<div style="padding:10px 0;border-top:1px solid #f1f3f5"><b>${i} ยังไม่ได้บันทึกมื้อ${m}</b><div style="margin-top:6px">${ym.length ? btn(`data-pyx="y" data-m="${m}"`, `↺ เหมือนเมื่อวาน (${f0(ym.reduce((s, f) => s + (+f.k || 0), 0))} kcal)`, true) : ''}${fr.map((f, k) => btn(`data-pyx="fr" data-m="${m}" data-k="${k}"`, `${hEsc(f.n).slice(0, 26)} · ${f0(f.k)}`)).join('')}${btn(`data-pyx="skip" data-m="${m}"`, 'ไม่ได้กินมื้อนี้')}${btn(`data-pyx="go" data-m="${m}"`, '＋ บันทึกเอง')}</div></div>`;
      }).join('');
      return rows ? card('pyMissed', ico.clock, 'มื้อที่ยังไม่ได้บันทึก', pig('อย่าลืมบันทึกนะ กดปุ่มเดียวก็เสร็จ 🐷') + rows) : '';
    }

    // ---------- 2: ชุดอาหารประจำ ----------
    function setsHtml() {
      const sets = (S.profile.mealSets || []);
      const T = VIEW_DATE, todays = foodsOf(T);
      const byMeal = {}; todays.forEach(f => (byMeal[mealOf(f)] = byMeal[mealOf(f)] || []).push(f));
      const list = sets.length ? sets.map((s, i) => { const k = s.items.reduce((a, f) => a + (+f.k || 0), 0); return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-top:1px solid #f1f3f5"><div style="flex:1;min-width:0"><b>${hEsc(s.name)}</b><div class="note" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${hEsc(s.items.map(f => f.n).join(', '))}</div></div><span style="font-weight:700;color:#e8590c;white-space:nowrap">${f0(k)} kcal</span>${btn(`data-pyx="useset" data-i="${i}"`, '＋ ลงมื้อ' + hEsc(s.meal || ''), true)}<button type="button" data-pyx="delset" data-i="${i}" aria-label="ลบชุด" style="border-radius:999px;padding:6px 10px">×</button></div>`; }).join('') : '<p class="note" style="margin:4px 0">ยังไม่มีชุดอาหาร — บันทึกมื้อที่กินประจำไว้ แล้วครั้งหน้ากดปุ่มเดียว</p>';
      const save = Object.keys(byMeal).filter(m => byMeal[m].length).map(m => btn(`data-pyx="mkset" data-m="${hEsc(m)}"`, `★ บันทึกมื้อ${hEsc(m)}วันนี้เป็นชุด (${byMeal[m].length} รายการ)`)).join('');
      return card('pySets', ico.set, 'ชุดอาหารประจำ', list + (save ? `<div style="margin-top:8px">${save}</div>` : ''));
    }

    // ---------- 3: สรุปวันนี้ ----------
    function summaryHtml() {
      const T = VIEW_DATE, ed = ED(), x = ed[T] || {}, p = S.profile;
      let t = {}; try { t = E.targets(p, ed, T); } catch (e) {}
      let stepT = 0; try { stepT = E.stepPlan(p, ed, T).current || 0; } catch (e) {}
      const foods = foodsOf(T), kIn = foods.length ? foods.reduce((s, f) => s + (+f.k || 0), 0) : (x.intakeKcal || null), pIn = foods.reduce((s, f) => s + (+f.p || 0), 0);
      const steps = x.steps ?? null, tdee = t.tdee || null, def = kIn != null && tdee ? tdee - kIn : null;
      const row = (label, val, goal, ok, unit = '') => `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-top:1px solid #f1f3f5"><span>${label}</span><span style="font-weight:700;color:${ok == null ? '#495057' : ok ? '#2b8a3e' : '#e8590c'}">${val}${unit}${goal ? `<small class="note" style="font-weight:400"> / ${goal}${unit}</small>` : ''} ${ok == null ? '' : ok ? '✅' : '⚠️'}</span></div>`;
      const tips = [];
      if (kIn == null || !foods.length) tips.push('บันทึกอาหารให้ครบทุกมื้อ ระบบจะคำนวณได้แม่นขึ้น');
      else if (t.kcal && kIn > t.kcal + 150) tips.push(`พรุ่งนี้ลองลดของทอด/เครื่องดื่มหวานลงสัก ${f0(kIn - t.kcal)} kcal`);
      if (t.protein && foods.length && pIn < t.protein * 0.8) tips.push(`เพิ่มโปรตีนอีก ${f0(t.protein - pIn)} ก. เช่น อกไก่ ไข่ต้ม นมโปรตีน`);
      if (stepT && steps != null && steps < stepT * 0.8) tips.push(`พรุ่งนี้เดินเพิ่มอีกราว ${f0(stepT - steps)} ก้าว (เดินหลังอาหาร 10–15 นาที)`);
      if (x.sleepMin != null && x.sleepMin < (p.sleepGoalH || 7.5) * 60 - 45) tips.push('คืนนี้เข้านอนเร็วขึ้น 30 นาที การนอนพอช่วยคุมหิว');
      const tip = tips[0] || 'วันนี้ทำได้ดีมาก! รักษาจังหวะนี้ไว้ 💪';
      const good = def != null && def > 0 && (!t.protein || pIn >= t.protein * 0.8);
      const late = new Date().getHours() >= 17 || VIEW_DATE !== TODAY();
      return card('pySummary', ico.moon, late ? 'สรุปวันนี้' : 'สรุปวันนี้ (ถึงตอนนี้)',
        pig(good ? 'เยี่ยม! วันนี้ขาดดุลได้ตามแผน 🎉' : late ? 'มาดูกันว่าวันนี้เป็นยังไงบ้าง' : 'ระหว่างวัน อัปเดตตามที่บันทึกนะ') +
        (late ?
        row('กินไป', f0(kIn), t.kcal ? f0(t.kcal) : '', kIn == null || !t.kcal ? null : kIn <= t.kcal + 100, ' kcal') +
        row('ขาดดุล (ใช้ − กิน)', def == null ? '—' : f0(def), t.deficit ? f0(t.deficit) : '', def == null ? null : def > 0, ' kcal') +
        row('โปรตีน', f0(pIn), t.protein || '', !foods.length || !t.protein ? null : pIn >= t.protein * 0.8, ' ก.') +
        row('ก้าวเดิน', f0(steps), stepT ? f0(stepT) : '', steps == null || !stepT ? null : steps >= stepT * 0.9)
        :
        row('กินไปแล้ว', f0(kIn || 0), t.kcal ? f0(t.kcal) : '', null, ' kcal') +
        row('ยังกินได้อีก', t.kcal ? f0(Math.max(0, t.kcal - (kIn || 0))) : '—', '', t.kcal ? (kIn || 0) <= t.kcal : null, ' kcal') +
        row('โปรตีนที่ต้องเติม', t.protein ? f0(Math.max(0, t.protein - pIn)) : '—', '', null, ' ก.') +
        row('ก้าวเดิน', f0(steps), stepT ? f0(stepT) : '', null)) +
        `<div style="margin-top:10px;padding:10px 12px;border-radius:12px;background:linear-gradient(135deg,#e6fcf5,#e7f5ff);font-weight:600;color:#0b7285">👉 ${late ? 'พรุ่งนี้' : 'วันนี้'}: ${hEsc(late ? tip : (t.protein && pIn < t.protein * 0.5 ? `มื้อต่อไปเน้นโปรตีน เช่น อกไก่ ไข่ต้ม เต้าหู้ นมโปรตีน` : stepT && (steps || 0) < stepT * 0.5 ? 'หาเวลาเดินหลังอาหาร 10–15 นาที' : 'ไปได้สวย! บันทึกทุกมื้อต่อไป'))}</div>`);
    }

    // ---------- 5: streak & badges ----------
    function streakInfo() {
      const T = TODAY(); let d = foodsOf(T).length ? T : E.addDays(T, -1), n = 0;
      while (foodsOf(d).length && n < 999) { n++; d = E.addDays(d, -1); }
      let best = 0, run = 0; Object.keys(S.days).sort().forEach((k, i, arr) => { if (foodsOf(k).length && (i === 0 || E.addDays(arr[i - 1], 1) === k) && foodsOf(arr[i - 1] || '').length) run++; else run = foodsOf(k).length ? 1 : 0; best = Math.max(best, run); });
      return { n, best: Math.max(best, n) };
    }
    function trendNow() { const ed = ED(), T = TODAY(); try { const tr = E.weightTrend(ed, E.addDays(T, -180), T); const ks = Object.keys(tr).filter(k => tr[k] != null); return ks.length ? tr[ks[ks.length - 1]] : null; } catch (e) { return null; } }
    function streakHtml() {
      const { n, best } = streakInfo(), p = S.profile, now = trendNow(), lost = now != null && p.weight ? p.weight - now : 0;
      const ed = ED(); let hit = 0; try { Object.keys(ed).forEach(d => { const st = ed[d].steps; if (st != null) { const g = E.stepPlan(p, ed, d).current || 0; if (g && st >= g) hit++; } }); } catch (e) {}
      const B = [['🔥', 'บันทึก 3 วันติด', best >= 3], ['🔥', '7 วันติด', best >= 7], ['🏅', '14 วันติด', best >= 14], ['👑', '30 วันติด', best >= 30], ['⚖️', 'ลดได้ 1 กก.', lost >= 1], ['💪', 'ลด 5 กก.', lost >= 5], ['🥇', 'ลด 10 กก.', lost >= 10], ['🏆', 'ลด 20 กก.', lost >= 20], ['👟', 'เดินถึงเป้า 10 วัน', hit >= 10], ['🚀', 'เดินถึงเป้า 30 วัน', hit >= 30]];
      const lv = 1 + Math.floor(Math.max(0, lost) / 5) + Math.floor(best / 14);
      return card('pyStreak', ico.fire, `ไฟลุกต่อเนื่อง <span class="pill green" style="margin-left:auto">เลเวล ${lv}</span>`,
        `<div style="display:flex;gap:14px;align-items:center;margin:4px 0 10px"><div style="font-size:44px;font-weight:800;line-height:1;background:linear-gradient(135deg,#f76707,#e03131);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">${n}</div><div><b>วันติดต่อกันที่บันทึกอาหาร</b><div class="note">สถิติสูงสุด ${best} วัน · ลดไปแล้ว ${lost > 0 ? lost.toFixed(1) : 0} กก.</div></div></div>` +
        `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px">${B.map(([e, t, ok]) => `<div style="text-align:center;padding:8px 4px;border-radius:14px;border:1px solid ${ok ? '#ffd8a8' : '#e9ecef'};background:${ok ? 'linear-gradient(180deg,#fff9db,#fff4e6)' : '#f8f9fa'};${ok ? '' : 'filter:grayscale(1);opacity:.5'}"><div style="font-size:24px">${e}</div><div style="font-size:11.5px;font-weight:600;color:#495057">${t}</div></div>`).join('')}</div>`);
    }

    // ---------- 6: เส้นทางสู่เป้าหมาย ----------
    function journeyHtml() {
      const p = S.profile, now = trendNow(), start = +p.weight, goal = +p.goalWeight;
      if (!start || !goal || now == null) return card('pyJourney', ico.flag, 'เส้นทางสู่เป้าหมาย', '<p class="note">กรอกน้ำหนักตอนเริ่ม น้ำหนักที่อยากได้ และชั่งน้ำหนักอย่างน้อย 1 ครั้ง</p>');
      const ed = ED(), T = TODAY(); let rate = null; try { const tr = E.weightTrend(ed, E.addDays(T, -60), T); const a = tr[E.addDays(T, -28)], b = tr[T]; if (a != null && b != null) rate = (a - b) / 4; } catch (e) {}
      const pct = Math.max(0, Math.min(100, (start - now) / (start - goal) * 100)), left = now - goal;
      let eta = ''; if (rate && rate > 0.05 && left > 0) { const dt = new Date(); dt.setDate(dt.getDate() + Math.round(left / rate * 7)); eta = dt.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' }); }
      return card('pyJourney', ico.flag, 'เส้นทางสู่เป้าหมาย',
        `<div style="position:relative;height:56px;margin:18px 6px 6px"><div style="position:absolute;left:0;right:0;top:24px;height:12px;border-radius:99px;background:#e9ecef"></div><div style="position:absolute;left:0;width:${pct}%;top:24px;height:12px;border-radius:99px;background:linear-gradient(90deg,#20c997,#339af0)"></div><img src="poong-head.webp" alt="" width="40" height="40" style="position:absolute;left:calc(${pct}% - 20px);top:-2px;border-radius:50%;background:#fff;box-shadow:0 4px 10px -3px rgba(0,0,0,.3)"><span style="position:absolute;right:-4px;top:16px;font-size:24px">🏁</span></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:#868e96"><span>เริ่ม ${start} กก.</span><span>เป้า ${goal} กก.</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px;text-align:center">${[['ตอนนี้', now.toFixed(1) + ' กก.'], ['เหลืออีก', Math.max(0, left).toFixed(1) + ' กก.'], ['ความเร็วจริง', rate == null ? '—' : (rate > 0 ? '−' : '+') + Math.abs(rate).toFixed(2) + ' กก./สัปดาห์']].map(([a, b]) => `<div style="background:#f8f9fa;border-radius:12px;padding:8px"><div class="note">${a}</div><b>${b}</b></div>`).join('')}</div>
        <p style="margin:10px 0 0;font-weight:600;color:#0b7285">${eta ? `🗓️ ถ้ารักษาความเร็วนี้ จะถึงเป้าประมาณ <b>${eta}</b> (ผ่านไปแล้ว ${pct.toFixed(0)}%)` : left <= 0 ? '🎉 ถึงเป้าแล้ว!' : 'ชั่งน้ำหนักสม่ำเสมออีก 2–4 สัปดาห์ จะคาดวันถึงเป้าได้'}</p>`);
    }

    // ---------- 7: รูปก่อน/หลัง (เก็บในเครื่องเท่านั้น) ----------
    const IDB = () => new Promise((res, rej) => { const r = indexedDB.open('poongyub-photos', 1); r.onupgradeneeded = () => r.result.createObjectStore('p', { keyPath: 'id' }); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    const idbAll = async () => { const db = await IDB(); return new Promise(res => { const out = []; const c = db.transaction('p').objectStore('p').openCursor(); c.onsuccess = () => { const k = c.result; if (k) { out.push(k.value); k.continue(); } else res(out.filter(x => x.pid === S.pid).sort((a, b) => a.date < b.date ? -1 : 1)); }; c.onerror = () => res(out); }); };
    const idbPut = async v => { const db = await IDB(); return new Promise(res => { const t = db.transaction('p', 'readwrite'); t.objectStore('p').put(v); t.oncomplete = res; t.onerror = res; }); };
    const idbDel = async id => { const db = await IDB(); return new Promise(res => { const t = db.transaction('p', 'readwrite'); t.objectStore('p').delete(id); t.oncomplete = res; t.onerror = res; }); };
    const shrink = f => new Promise(res => { const img = new Image(); img.onload = () => { const s = Math.min(1, 900 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .8)); URL.revokeObjectURL(img.src); }; img.onerror = () => res(null); img.src = URL.createObjectURL(f); });
    let PH = [], PHsel = [0, -1];
    function photosHtml() {
      const a = PH[PHsel[0]], b = PH[PHsel[1] < 0 ? PH.length - 1 : PHsel[1]];
      const opt = sel => PH.map((x, i) => `<option value="${i}"${i === sel ? ' selected' : ''}>${new Date(E.parseYmd(x.date)).toLocaleDateString('th-TH', { timeZone: 'UTC', day: 'numeric', month: 'short', year: '2-digit' })}</option>`).join('');
      const pane = (x, i, lbl) => `<div style="flex:1;min-width:0;text-align:center"><div class="note" style="margin-bottom:4px">${lbl}</div>${x ? `<img src="${x.img}" alt="" style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:14px;box-shadow:0 6px 16px -8px rgba(0,0,0,.35)"><select data-pyx="phsel" data-w="${i}" style="margin-top:6px;width:100%">${opt(i === 0 ? PHsel[0] : (PHsel[1] < 0 ? PH.length - 1 : PHsel[1]))}</select>` : '<div style="aspect-ratio:3/4;border-radius:14px;border:2px dashed #d0bfff;display:flex;align-items:center;justify-content:center;color:#9775fa">ยังไม่มีรูป</div>'}</div>`;
      return card('pyPhotos', ico.cam, 'รูปก่อน / หลัง',
        `<p class="note" style="margin:0 0 8px">ถ่ายท่าเดิม มุมเดิม แสงเดิม ทุก 2 สัปดาห์ · รูปเก็บในเครื่องนี้เท่านั้น ไม่อัปโหลด</p><div style="display:flex;gap:10px">${pane(a, 0, 'ก่อน')}${pane(b, 1, 'ล่าสุด')}</div>
        <div style="margin-top:10px"><label class="pri" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;background:linear-gradient(135deg,#7048e8,#339af0);color:#fff;font-weight:600;cursor:pointer">📸 ถ่าย/เลือกรูปวันนี้<input type="file" accept="image/*" capture="user" data-pyx="phadd" hidden></label>${PH.length ? btn(`data-pyx="phdel"`, 'ลบรูปล่าสุด') : ''}<span class="note"> · ${PH.length} รูป</span></div>`);
    }
    async function loadPhotos() { try { PH = await idbAll(); } catch (e) { PH = []; } }

    // ---------- 8: รอบเอว ----------
    function waistHtml() {
      const ed = ED(), keys = Object.keys(S.days).filter(d => +(S.days[d] || {}).waist > 0).sort(), p = S.profile;
      const first = keys.length ? +S.days[keys[0]].waist : null, last = keys.length ? +S.days[keys[keys.length - 1]].waist : null;
      const ratio = last && p.height ? last / p.height : null;
      const zone = ratio == null ? null : ratio < 0.5 ? ['ดี', '#2b8a3e'] : ratio < 0.6 ? ['ควรลดลง', '#f08c00'] : ['เสี่ยงสูง', '#e03131'];
      const pts = keys.slice(-12).map(d => +S.days[d].waist), mn = Math.min(...pts), mx = Math.max(...pts);
      const spark = pts.length > 1 ? `<svg viewBox="0 0 200 40" style="width:100%;height:40px;margin-top:6px"><polyline fill="none" stroke="#f08c00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${pts.map((v, i) => `${(i / (pts.length - 1) * 196 + 2).toFixed(1)},${(38 - (mx === mn ? 18 : (v - mn) / (mx - mn) * 34)).toFixed(1)}`).join(' ')}"/></svg>` : '';
      return card('pyWaist', ico.tape, 'รอบเอว',
        `<p class="note" style="margin:0 0 8px">วัดตรงสะดือ ตอนเช้า หายใจออกปกติ สัปดาห์ละครั้ง — บอกไขมันหน้าท้องได้ดีกว่าน้ำหนัก</p>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><input type="number" step="0.5" inputmode="decimal" id="pyWaistIn" placeholder="ซม." value="${hEsc((S.days[VIEW_DATE] || {}).waist || '')}" style="width:110px">${btn('data-pyx="waist"', 'บันทึก', true)}</div>
        ${last ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px;text-align:center"><div style="background:#f8f9fa;border-radius:12px;padding:8px"><div class="note">ล่าสุด</div><b>${last} ซม.</b></div><div style="background:#f8f9fa;border-radius:12px;padding:8px"><div class="note">เปลี่ยนไป</div><b style="color:${last <= first ? '#2b8a3e' : '#e03131'}">${(last - first > 0 ? '+' : '') + (last - first).toFixed(1)} ซม.</b></div><div style="background:#f8f9fa;border-radius:12px;padding:8px"><div class="note">เอว ÷ ส่วนสูง</div><b style="color:${zone[1]}">${ratio.toFixed(2)} · ${zone[0]}</b></div></div>${spark}<p class="note" style="margin:6px 0 0">เป้าหมายสุขภาพ: เอวไม่เกินครึ่งหนึ่งของส่วนสูง (${p.height ? Math.round(p.height / 2) : '—'} ซม.)</p>` : ''}`);
    }

    // ---------- 9: เตือนค่าผิดปกติ ----------
    function alertsList() {
      const ed = ED(), T = TODAY(), p = S.profile, last = n => E.rangeDays(E.addDays(T, -(n - 1)), T).map(d => ed[d] || {});
      const out = [];
      const bp = last(14).filter(x => x.bpSys && x.bpDia);
      if (bp.some(x => x.bpSys >= 180 || x.bpDia >= 120)) out.push(['red', 'ความดันเคยสูงถึง 180/120 ขึ้นไป — ถ้ามีปวดหัวรุนแรง แน่นหน้าอก ตามัว หรือแขนขาอ่อนแรง ให้ไปโรงพยาบาลทันที ถ้าไม่มีอาการ ควรพบแพทย์โดยเร็ว']);
      else if (bp.length >= 3) { const s = bp.reduce((a, x) => a + x.bpSys, 0) / bp.length, d = bp.reduce((a, x) => a + x.bpDia, 0) / bp.length; if (s >= 140 || d >= 90) out.push(['orange', `ความดันเฉลี่ย 2 สัปดาห์ ${Math.round(s)}/${Math.round(d)} — สูงต่อเนื่อง ควรนัดพบแพทย์เพื่อตรวจ`]); else if (s >= 130 || d >= 80) out.push(['yellow', `ความดันเฉลี่ย ${Math.round(s)}/${Math.round(d)} — เริ่มสูง ลดเค็ม นอนพอ ออกกำลังสม่ำเสมอ และวัดต่อ`]); }
      const rh = last(7).map(x => x.rhr).filter(v => v > 0); if (rh.length >= 4) { const a = rh.reduce((s, v) => s + v, 0) / rh.length; if (a > 100) out.push(['orange', `ชีพจรขณะพักเฉลี่ย ${Math.round(a)} ครั้ง/นาที — สูงกว่าปกติ ควรปรึกษาแพทย์`]); }
      try { const tr = E.weightTrend(ed, E.addDays(T, -35), T); const w = [0, 7, 14, 21].map(k => tr[E.addDays(T, -k)]); if (w.every(v => v != null)) { const rates = [0, 1, 2].map(i => (w[i + 1] - w[i]) / w[i + 1] * 100); if (rates.every(r => r > 1.5)) out.push(['orange', 'น้ำหนักลดเร็วกว่า 1.5% ต่อสัปดาห์ 3 สัปดาห์ติด — เสี่ยงเสียกล้ามเนื้อ/นิ่วในถุงน้ำดี ควรกินเพิ่มขึ้นเล็กน้อย']); } } catch (e) {}
      const floor = p.sex === 'female' ? 1200 : 1500, lowDays = last(7).filter((x, i) => { const d = E.addDays(T, -(6 - i)); const fs = foodsOf(d); const k = fs.length ? fs.reduce((s, f) => s + (+f.k || 0), 0) : x.intakeKcal; return k != null && k > 0 && k < floor; }).length;
      if (lowDays >= 4) out.push(['orange', `กินต่ำกว่า ${floor} kcal ไป ${lowDays} วันใน 7 วัน — น้อยเกินไป ร่างกายจะเผาผลาญลดลงและหิวจัด`]);
      return out;
    }
    function alertsHtml() {
      const a = alertsList(), C = { red: ['#fff5f5', '#e03131'], orange: ['#fff4e6', '#e8590c'], yellow: ['#fff9db', '#f08c00'] };
      return card('pyAlerts', ico.alert, 'สัญญาณที่ควรระวัง', a.length ? a.map(([lv, t]) => `<div style="padding:10px 12px;border-radius:12px;margin:6px 0;background:${C[lv][0]};border-left:4px solid ${C[lv][1]};font-size:14px">${hEsc(t)}</div>`).join('') + '<p class="note" style="margin:6px 0 0">ข้อมูลนี้ใช้คัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย</p>' : pig('ตอนนี้ยังไม่พบค่าที่น่ากังวล 👍'));
    }

    // ---------- 10: สรุปพบแพทย์ ----------
    function doctorReport() {
      const ed = ED(), T = TODAY(), p = S.profile, from = E.addDays(T, -89), ds = E.rangeDays(from, T).map(d => [d, ed[d] || {}]);
      const avg = k => { const v = ds.map(x => +x[1][k]).filter(v => v > 0); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
      const w = ds.filter(x => +x[1].weight > 0), bp = ds.filter(x => x[1].bpSys && x[1].bpDia);
      const kin = ds.map(([d, x]) => { const fs = foodsOf(d); return fs.length ? fs.reduce((s, f) => s + (+f.k || 0), 0) : x.intakeKcal; }).filter(v => v > 0);
      const dt = d => new Date(E.parseYmd(d)).toLocaleDateString('th-TH', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
      const wl = keys => keys.length ? keys : [];
      const waist = Object.keys(S.days).filter(d => d >= from && +(S.days[d] || {}).waist > 0).sort();
      const rows = [
        ['ชื่อ / เพศ / อายุ', `${hEsc(p.name || (S.profiles.find(x => x.id === S.pid) || {}).name || '—')} · ${p.sex === 'female' ? 'หญิง' : 'ชาย'} · ${p.age || '—'} ปี · สูง ${p.height || '—'} ซม.`],
        ['น้ำหนัก', w.length ? `${(+w[0][1].weight).toFixed(1)} → ${(+w[w.length - 1][1].weight).toFixed(1)} กก. (${dt(w[0][0])} – ${dt(w[w.length - 1][0])}, ชั่ง ${w.length} ครั้ง)` : 'ไม่มีข้อมูล'],
        ['BMI ล่าสุด', w.length && p.height ? (w[w.length - 1][1].weight / ((p.height / 100) ** 2)).toFixed(1) : '—'],
        ['รอบเอว', waist.length ? `${S.days[waist[0]].waist} → ${S.days[waist[waist.length - 1]].waist} ซม.` : 'ไม่มีข้อมูล'],
        ['ความดัน (เฉลี่ย)', bp.length ? `${Math.round(bp.reduce((a, x) => a + x[1].bpSys, 0) / bp.length)}/${Math.round(bp.reduce((a, x) => a + x[1].bpDia, 0) / bp.length)} mmHg จาก ${bp.length} วัน · สูงสุด ${Math.max(...bp.map(x => x[1].bpSys))}/${Math.max(...bp.map(x => x[1].bpDia))}` : 'ไม่มีข้อมูล'],
        ['ชีพจรขณะพัก (เฉลี่ย)', avg('rhr') ? Math.round(avg('rhr')) + ' ครั้ง/นาที' : '—'],
        ['การนอน (เฉลี่ย)', avg('sleepMin') ? (avg('sleepMin') / 60).toFixed(1) + ' ชม./คืน' : '—'],
        ['ก้าวเดิน (เฉลี่ย)', avg('steps') ? fmt(Math.round(avg('steps'))) + ' ก้าว/วัน' : '—'],
        ['พลังงานที่กิน (เฉลี่ย)', kin.length ? fmt(Math.round(kin.reduce((a, b) => a + b, 0) / kin.length)) + ` kcal/วัน (บันทึก ${kin.length} วัน)` : '—'],
      ];
      const al = alertsList();
      const recent = bp.slice(-10).reverse().map(([d, x]) => `<tr><td>${dt(d)}</td><td>${x.bpSys}/${x.bpDia}</td><td>${x.bpPulse || x.rhr || '—'}</td></tr>`).join('');
      return `<div id="pyDocSheet" style="font-family:inherit;color:#212529"><div style="display:flex;align-items:center;gap:10px;border-bottom:3px solid #20c997;padding-bottom:8px;margin-bottom:10px"><img src="poong-head.webp" width="40" height="40" alt=""><div><b style="font-size:18px">สรุปสุขภาพสำหรับพบแพทย์</b><div class="note">ช่วง ${dt(from)} – ${dt(T)} · จากแอป PoongYub (ข้อมูลนาฬิกา + บันทึกเอง)</div></div></div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${rows.map(([a, b]) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #e9ecef;color:#495057;width:40%">${a}</td><td style="padding:6px 8px;border-bottom:1px solid #e9ecef;font-weight:600">${b}</td></tr>`).join('')}</table>
        ${recent ? `<h4 style="margin:14px 0 4px">ความดันล่าสุด</h4><table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="text-align:left">วันที่</th><th style="text-align:left">ความดัน</th><th style="text-align:left">ชีพจร</th></tr>${recent}</table>` : ''}
        ${al.length ? `<h4 style="margin:14px 0 4px">ข้อสังเกตจากแอป</h4><ul style="margin:0;padding-left:18px">${al.map(x => `<li>${hEsc(x[1])}</li>`).join('')}</ul>` : ''}
        <p class="note" style="margin-top:12px">ค่าจากนาฬิกาเป็นค่าประมาณ ใช้ประกอบการพูดคุยกับแพทย์เท่านั้น</p></div>`;
    }
    function doctorHtml() { return card('pyDoctor', ico.doc, 'สรุปสุขภาพพาไปหาหมอ', `<p class="note" style="margin:0 0 8px">รวมน้ำหนัก ความดัน ชีพจร การนอน ก้าวเดิน และการกิน 3 เดือนล่าสุดไว้หน้าเดียว ให้หมอดูหรือพิมพ์ได้</p>${btn('data-pyx="doc"', '📋 เปิดหน้าสรุป', true)}`); }
    function openDoctor() {
      let m = document.getElementById('pyDocModal'); if (m) m.remove();
      m = document.createElement('div'); m.id = 'pyDocModal'; m.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(10,20,30,.55);display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow:auto';
      m.innerHTML = `<div style="background:#fff;border-radius:18px;max-width:720px;width:100%;padding:18px;box-shadow:0 20px 60px -20px rgba(0,0,0,.5)">${doctorReport()}<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap" class="pyNoPrint">${btn('data-pyx="docprint"', '🖨️ พิมพ์ / บันทึกเป็น PDF', true)}${btn('data-pyx="doccopy"', '📄 คัดลอกเป็นข้อความ')}${btn('data-pyx="docclose"', 'ปิด')}</div></div>`;
      document.body.appendChild(m);
      m.addEventListener('click', ev => { if (ev.target === m) m.remove(); });
    }
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') { const md = document.getElementById('pyDocModal'); if (md) md.remove(); } });
    const ps = document.createElement('style'); ps.textContent = '@media print{body>*:not(#pyDocModal){display:none!important}#pyDocModal{position:static!important;background:none!important;padding:0!important}#pyDocModal .pyNoPrint{display:none!important}}'; document.head.appendChild(ps);

    // ---------- coach switch ----------
    function coachHtml() {
      if (!isCoach()) return '';
      const srcBtn = window.PY_WEB ? '' : `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed #dee2e6">${btn('data-pyx="copysrc"', '<svg width="16" height="16" viewBox="0 0 24 24" style="vertical-align:-3px;margin-right:4px"><rect x="8" y="7" width="12" height="14" rx="2.5" fill="#e7f5ff" stroke="#1c7ed6" stroke-width="1.6"/><path d="M16 7V5.5A2.5 2.5 0 0 0 13.5 3h-7A2.5 2.5 0 0 0 4 5.5v9A2.5 2.5 0 0 0 6.5 17H8" fill="none" stroke="#1c7ed6" stroke-width="1.6"/><path d="M11 12h6M11 15.5h4" stroke="#1c7ed6" stroke-width="1.6" stroke-linecap="round"/></svg>คัดลอกโค้ดแอป (ย้ายไป GitHub)')}<span class="note"> สำหรับโค้ชเท่านั้น</span><div id="pySrcBox"></div></div>`;
      const cl = (COACH.clients || []), on = cl.filter(c => c.pro).length;
      return card('pyProSwitch', ico.lock, 'ฟีเจอร์พิเศษสำหรับลูกค้า',
        `<p class="note" style="margin:0 0 8px">ไฟลุกต่อเนื่อง · เส้นทางสู่เป้าหมาย · รูปก่อน/หลัง · รอบเอว · สัญญาณที่ควรระวัง · สรุปพาไปหาหมอ — ตอนนี้โค้ชเห็นคนเดียว</p>` +
        (cl.length ? cl.map(c => `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #f1f3f5"><span style="flex:1"><b>${hEsc(c.name || 'ไม่ระบุชื่อ')}</b></span><label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer"><span class="note">${c.pro ? 'เปิดให้ใช้' : 'ปิดอยู่'}</span><input type="checkbox" data-pyx="pro" data-id="${hEsc(c.id)}"${c.pro ? ' checked' : ''} style="width:44px;height:24px;accent-color:#12b886"></label></div>`).join('') + `<div style="margin-top:8px">${btn('data-pyx="proall" data-v="1"', 'เปิดให้ทุกคน', true)}${btn('data-pyx="proall" data-v="0"', 'ปิดทุกคน')}<span class="note"> · เปิดอยู่ ${on}/${cl.length} คน</span></div>` : '<p class="note">ยังไม่มีลูกค้าที่แชร์ข้อมูล — เมื่อลูกค้ากด "แชร์ข้อมูลกับโค้ช" จะขึ้นที่นี่ให้เปิด/ปิดได้</p>') + srcBtn);
    }
    async function setPro(ids, val) {
      const db = S.rawDb; if (!db) { toast('ยังเชื่อมต่อที่เก็บข้อมูลไม่ได้'); return; }
      let ok = 0; for (const id of ids) { const c = (COACH.clients || []).find(x => x.id === id); if (!c) continue; const { id: _i, ...data } = c; try { await db.doc('clients/' + id).set({ ...data, pro: !!val }); c.pro = !!val; ok++; } catch (e) { console.warn('pro', e); } }
      toast(ok ? (val ? `เปิดฟีเจอร์พิเศษให้ ${ok} คนแล้ว` : `ปิดฟีเจอร์พิเศษ ${ok} คนแล้ว`) : 'บันทึกไม่สำเร็จ ลองใหม่'); renderPlus();
    }

    // ---------- 4: เหลือเท่านี้ กินอะไรดี ----------
    ico.eat = '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M3.5 9.5h17l-1.6 9.2a2.4 2.4 0 0 1-2.4 2H7.5a2.4 2.4 0 0 1-2.4-2z" fill="#e6fcf5" stroke="#0ca678" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 9.5l3-5.5M16 9.5l-3-5.5" stroke="#0ca678" stroke-width="1.6" stroke-linecap="round"/><circle cx="8.8" cy="14.6" r="1.8" fill="#b197fc"/><circle cx="12.6" cy="15.6" r="1.8" fill="#ff8787"/><circle cx="16.2" cy="14.4" r="1.8" fill="#fcc419"/></svg>';
    // [name, kcal, protein, carb, fat, source: '7' = 7-Eleven, 'h' = ร้านข้าว/ทำเอง]
    const EAT_DB = [
      ['อกไก่นุ่มพร้อมทาน 1 ซอง', 110, 23, 1, 2, '7'],
      ['ทูน่าในน้ำแร่ 1 กระป๋อง (เทน้ำออก)', 100, 22, 0, 1, '7'],
      ['ไข่ขาวต้ม 2 ฟอง (เอาไข่แดงออก)', 35, 7, 0.5, 0, '7h'],
      ['ไข่ต้ม 1 ฟอง', 75, 6.5, 0.5, 5, '7h'],
      ['เครื่องดื่มโปรตีนพร้อมดื่ม (~20 ก.)', 120, 20, 7, 1.5, '7'],
      ['กรีกโยเกิร์ตไขมัน 0% 1 ถ้วย', 80, 11, 7, 0.2, '7'],
      ['นมขาดมันเนย 225 มล.', 80, 8, 11, 0.3, '7h'],
      ['นมถั่วเหลืองสูตรไม่หวาน 1 กล่อง', 80, 7, 4, 4, '7'],
      ['ปูอัด 1 แพ็ก (~100 ก.)', 95, 8, 14, 0.5, '7'],
      ['ข้าวกล่องอกไก่ย่าง (เมนูคลีน)', 350, 28, 45, 6, '7'],
      ['ซาลาเปาหมูแดง 1 ลูก', 230, 8, 38, 5, '7'],
      ['มันหวานเผา 1 หัว (~150 ก.)', 135, 2, 31, 0.2, '7'],
      ['ข้าวโพดหวาน 1 ฝัก', 110, 3.5, 23, 1.5, '7'],
      ['กล้วยหอม 1 ลูก', 105, 1.3, 27, 0.4, '7h'],
      ['ขนมปังโฮลวีต 2 แผ่น', 140, 6, 24, 2, '7'],
      ['ผลไม้ตัดแต่ง 1 ถ้วย', 60, 0.5, 15, 0.2, '7h'],
      ['สลัดผัก (น้ำสลัดใส ใส่ครึ่งซอง)', 50, 2, 8, 1.5, '7h'],
      ['ข้าวสวย 1 ทัพพี', 130, 2.5, 28, 0.3, 'h'],
      ['ข้าวกล้อง 1 ทัพพี', 120, 2.6, 25, 1, 'h'],
      ['อกไก่ย่าง/ต้ม 100 ก.', 165, 31, 0, 3.6, 'h'],
      ['ปลานึ่ง/ปลาย่าง 100 ก.', 130, 26, 0, 2.7, 'h'],
      ['กุ้งลวก 100 ก.', 100, 24, 0, 0.3, 'h'],
      ['ต้มยำกุ้งน้ำใส 1 ถ้วย', 120, 15, 6, 4, 'h'],
      ['ยำอกไก่/ยำทะเล', 180, 20, 14, 4, 'h'],
      ['ส้มตำไทย 1 จาน', 120, 3, 25, 1, 'h'],
      ['สุกี้น้ำอกไก่/ทะเล', 300, 25, 35, 5, 'h'],
      ['ก๋วยเตี๋ยวเส้นเล็กน้ำใสอกไก่', 300, 20, 40, 6, 'h'],
      ['ต้มจืดเต้าหู้หมูสับ 1 ถ้วย', 130, 11, 5, 7, 'h'],
    ];
    const num = v => { v = +String(v == null ? '' : v).replace(/,/g, ''); return isFinite(v) ? v : null; };
    const pickK = (o, re, ex) => { for (const k of Object.keys(o || {})) if (re.test(k) && !(ex && ex.test(k)) && num(o[k]) > 0) return num(o[k]); return null; };
    const fC = f => num(f.c ?? f.carb ?? f.carbs ?? f.cg) || 0;
    const fF = f => num(f.f ?? f.fat ?? f.fg) || 0;
    const EAT_SCR = {};
    // อ่านตัวเลขจากการ์ด "ข้อมูลโภชนาการ" ตรง ๆ ให้ตรงกับที่เห็นบนจอ
    function scrapeMacros() {
      try {
        const c = [...document.querySelectorAll('.card')].find(x => !x.classList.contains('pyPlus') && /ข้อมูลโภชนาการ/.test(x.textContent));
        if (!c) return null;
        const tx = c.innerText || c.textContent, g = l => { const m = tx.match(new RegExp(l + '\\s*([\\d,.]+)\\s*g\\s*/\\s*([\\d,.]+)')); return m ? [num(m[1]), num(m[2])] : null; };
        const C = g('คาร์บ'), F = g('ไขมัน'), P = g('โปรตีน');
        return C && F && P ? { c: C, f: F, p: P } : null;
      } catch (e) { return null; }
    }
    function remaining() {
      const T = VIEW_DATE, ed = ED(), p = S.profile; let t = {}; try { t = E.targets(p, ed, T) || {}; } catch (e) {}
      const foods = foodsOf(T), kIn = foods.reduce((s, f) => s + (+f.k || 0), 0);
      let pIn = foods.reduce((s, f) => s + (+f.p || 0), 0), cIn = foods.reduce((s, f) => s + fC(f), 0), fIn = foods.reduce((s, f) => s + fF(f), 0);
      let pT = num(t.protein), fT = pickK(t, /^(fat|fatg|f)$/i) ?? pickK(t, /fat/i, /body|loss|burn|pct|ratio|share/i), cT = pickK(t, /^(carb|carbs|carbg|c)$/i) ?? pickK(t, /carb/i, /pct|ratio|share/i);
      const kT = num(t.kcal);
      if (kT && pT && !fT) fT = kT * 0.28 / 9;
      if (kT && pT && fT && !cT) cT = Math.max(0, (kT - pT * 4 - fT * 9) / 4);
      const sc = scrapeMacros(); if (sc) EAT_SCR[T] = sc; const s = EAT_SCR[T];
      if (s) { cIn = s.c[0]; cT = s.c[1]; fIn = s.f[0]; fT = s.f[1]; pIn = s.p[0]; pT = s.p[1]; }
      if (!pT || !cT || !fT) return null;
      return { p: pT - pIn, c: cT - cIn, f: fT - fIn, k: kT ? kT - kIn : null };
    }
    let EAT_SRC = '7', EAT_LAST = [], EAT_CACHE = { key: '', res: [] };
    const eatItems = () => EAT_DB.filter(x => x[5].includes(EAT_SRC));
    // หา 1–3 อย่าง (อย่างละ 1–2 ชิ้น รวมไม่เกิน 4) ที่ใกล้ที่เหลือที่สุด: โปรตีนขาด = แย่, ไขมันเกิน = แย่มาก, คาร์บเกิน = แย่
    function solve(R) {
      const key = [R.p, R.c, R.f, R.k, EAT_SRC].map(v => v == null ? '' : typeof v === 'number' ? Math.round(v) : v).join('|');
      if (EAT_CACHE.key === key) return EAT_CACHE.res;
      const items = eatItems(), n = items.length, Q = [1, 2];
      const P = Math.max(0, R.p), C = Math.max(0, R.c), Fb = Math.max(0, R.f), K = R.k == null ? null : Math.max(0, R.k);
      const score = t => (t.p < P ? (P - t.p) * 1.2 : (t.p - P) * 0.3) + (t.c < C ? (C - t.c) * 0.5 : (t.c - C) * 1.2) + (t.f > Fb ? (t.f - Fb) * 3 : 0) + (K != null && t.k > K ? (t.k - K) * 0.08 : 0) + t.n * 2;
      const out = [];
      const push = sel => { const t = { k: 0, p: 0, c: 0, f: 0, n: 0 }; let an = -1, ap = -1; sel.forEach(([i, q]) => { const x = items[i]; t.k += x[1] * q; t.p += x[2] * q; t.c += x[3] * q; t.f += x[4] * q; t.n += q; if (x[2] * q > ap) { ap = x[2] * q; an = i; } }); if (t.n <= 4) out.push({ sel, t, an, s: score(t) }); };
      for (let a = 0; a < n; a++) for (const qa of Q) { push([[a, qa]]); for (let b = a + 1; b < n; b++) for (const qb of Q) { push([[a, qa], [b, qb]]); for (let c = b + 1; c < n; c++) for (const qc of Q) push([[a, qa], [b, qb], [c, qc]]); } }
      out.sort((x, y) => x.s - y.s);
      const res = [], used = new Set(); // แต่ละทางเลือกใช้แหล่งโปรตีนหลักไม่ซ้ำกัน
      for (const o of out) { if (used.has(o.an)) continue; used.add(o.an); res.push(o); if (res.length >= 3) break; }
      EAT_CACHE = { key, res }; return res;
    }
    function foodKeys() { let ck = null, fk = null; for (const d of Object.keys(S.days)) for (const f of foodsOf(d)) { if (!ck) ck = ['c', 'carb', 'carbs', 'cg'].find(k => f[k] != null); if (!fk) fk = ['f', 'fat', 'fg'].find(k => f[k] != null); if (ck && fk) return [ck, fk]; } return [ck, fk]; }
    function mkFood(x, q) { const [ck, fk] = foodKeys(); const o = { n: x[0] + (q > 1 ? ' × ' + q : ''), k: Math.round(x[1] * q), p: +(x[2] * q).toFixed(1) }; const c = +(x[3] * q).toFixed(1), fa = +(x[4] * q).toFixed(1); if (ck) o[ck] = c; else { o.c = c; o.carb = c; } if (fk) o[fk] = fa; else { o.f = fa; o.fat = fa; } return o; }
    const eatMeal = () => { const d = new Date(), h = d.getHours() + d.getMinutes() / 60; return h < 10.5 ? 'เช้า' : h < 16 ? 'กลางวัน' : h < 20.5 ? 'เย็น' : 'ว่าง'; };
    function eatHtml() {
      const R = remaining(); if (!R) return '';
      const chip = (l, v, col) => `<div style="flex:1;min-width:0;text-align:center;padding:8px 4px;border-radius:14px;background:${v < 0 ? '#fff5f5' : '#f8f9fa'};border:1px solid ${v < 0 ? '#ffc9c9' : '#e9ecef'}"><div class="note" style="color:${col};font-weight:700">${l}</div><b style="font-size:19px;color:${v < 0 ? '#e03131' : '#212529'}">${v < 0 ? '+' + f0(-v) : f0(v)}</b><small class="note"> g</small><div class="note" style="font-size:11.5px">${v < 0 ? 'เกินแล้ว' : 'เหลือ'}</div></div>`;
      const head = `<div style="display:flex;gap:8px;margin:2px 0 8px">${chip('คาร์บ', R.c, '#9775fa')}${chip('ไขมัน', R.f, '#ff6b6b')}${chip('โปรตีน', R.p, '#f59f00')}</div>` + (R.k != null ? `<p class="note" style="margin:0 0 8px;text-align:center">พลังงานเหลือประมาณ <b>${f0(Math.max(0, R.k))}</b> kcal</p>` : '');
      if (R.p < 8 && R.c < 10) return card('pyEat', ico.eat, 'เหลือเท่านี้ กินอะไรดี?', head + pig('วันนี้ครบเป้าแล้ว 🎉 ถ้ายังหิว เลือกผักสลัด ผลไม้ หรือดื่มน้ำเปล่า'));
      const tabs = `<div style="display:flex;flex-wrap:wrap;margin:2px 0">${[['7', '🏪 ในเซเว่น'], ['h', '🍚 ร้านข้าว / ทำเอง']].map(([v, l]) => btn(`data-pyx="eatsrc" data-v="${v}"`, l, EAT_SRC === v)).join('')}</div>`;
      const res = solve(R), items = eatItems(); EAT_LAST = res;
      const list = res.map((o, i) => { const t = o.t; return `<div style="padding:10px 12px;border-radius:14px;margin-top:8px;background:${i === 0 ? 'linear-gradient(135deg,#e6fcf5,#e7f5ff)' : '#fff'};border:1px solid ${i === 0 ? '#96f2d7' : '#e9ecef'}"><div style="display:flex;align-items:center;gap:6px"><b style="color:#0b7285">${i === 0 ? '⭐ ชุดที่เข้าเป้าที่สุด' : 'ทางเลือก ' + (i + 1)}</b><span style="margin-left:auto;font-weight:700;color:#e8590c;white-space:nowrap">${f0(t.k)} kcal</span></div><ul style="margin:6px 0;padding-left:20px">${o.sel.map(([k, q]) => `<li>${hEsc(items[k][0])}${q > 1 ? ` <b>× ${q}</b>` : ''}</li>`).join('')}</ul><div class="note">ได้ คาร์บ ${f0(t.c)} · ไขมัน ${f0(t.f)} · โปรตีน ${f0(t.p)} ก.<br>หลังกินเหลือ คาร์บ ${f0(R.c - t.c)} · ไขมัน ${f0(R.f - t.f)} · โปรตีน ${f0(R.p - t.p)} ก.</div>${btn(`data-pyx="eatadd" data-i="${i}"`, '＋ กินชุดนี้ ลงบันทึก', i === 0)}</div>`; }).join('');
      const tip = R.f < 0 ? pig(`ไขมันเกินเป้าไป ${f0(-R.f)} ก. แล้ว มื้อต่อไปเลือกของไขมันแทบศูนย์นะ`, 'sad') : R.p > 40 ? pig(`โปรตีนยังขาดอีก ${f0(R.p)} ก. มื้อนี้เน้นโปรตีนก่อน 💪`) : pig('นี่คือชุดที่พอดีกับที่เหลือของวันนี้ 👇');
      return card('pyEat', ico.eat, 'เหลือเท่านี้ กินอะไรดี?', head + tip + tabs + list + '<p class="note" style="margin:8px 0 0">ตัวเลขเป็นค่าประมาณ แต่ละยี่ห้อต่างกัน ดูฉลากก่อนซื้อ: เลือกโปรตีนสูง ไขมันไม่เกิน 3 ก. ต่อชิ้น</p>');
    }

    // ---------- render ----------
    let photosLoaded = false;
    function renderPlus() {
      try {
        const v = (document.querySelector('.view.on') || {}).id;
        if (v === 'v-today') { const top = host('v-today', 'pyPlusTop', 'top'); if (top) top.innerHTML = missedHtml(); const bot = host('v-today', 'pyPlusToday'); if (bot) bot.innerHTML = summaryHtml() + (proOn() ? streakHtml() + journeyHtml() : ''); const nut = [...document.querySelectorAll('#v-today .card')].find(x => !x.classList.contains('pyPlus') && /ข้อมูลโภชนาการ/.test(x.textContent)); let es = document.getElementById('pyEatSlot'); if (!es) { es = document.createElement('div'); es.id = 'pyEatSlot'; es.style.cssText = 'grid-column:1/-1'; } if (nut) { if (nut.nextElementSibling !== es) nut.after(es); } else if (bot && es.parentNode !== bot.parentNode) bot.before(es); es.innerHTML = eatHtml(); }
        if (v === 'v-food') { const f = host('v-food', 'pyPlusFood', 'top'); if (f) f.innerHTML = missedHtml() + setsHtml(); const fe = host('v-food', 'pyPlusFoodEat'); if (fe) fe.innerHTML = eatHtml(); }
        if (v === 'v-insights' && proOn()) { const h = host('v-insights', 'pyPlusHealth'); if (h) { if (!photosLoaded) { photosLoaded = true; loadPhotos().then(renderPlus); } h.innerHTML = `<h2 style="margin:22px 0 0;font-size:18px;color:#0b7285;display:flex;align-items:center;gap:8px">${ico.lock}สุขภาพเชิงลึก${isCoach() && !(COACH.meta && COACH.meta.pro) ? ' <span class="pill yellow">โค้ชเห็นคนเดียว</span>' : ''}</h2>` + alertsHtml() + waistHtml() + photosHtml() + doctorHtml(); } }
        if (v === 'v-profile') { const c = host('v-profile', 'pyPlusCoach'); if (c) c.innerHTML = coachHtml(); }
      } catch (e) { console.warn('plus', e); }
    }
    const _ra = renderAll; renderAll = function () { const r = _ra.apply(this, arguments); renderPlus(); return r; };
    window.addEventListener('hashchange', () => setTimeout(renderPlus, 30));
    [400, 2500, 6000].forEach(ms => setTimeout(renderPlus, ms));

    document.addEventListener('click', async e => {
      const b = e.target.closest && e.target.closest('[data-pyx]'); if (!b || b.tagName === 'SELECT' || (b.tagName === 'INPUT' && b.type !== 'button')) return;
      const x = b.dataset.pyx, m = b.dataset.m, T = TODAY();
      if (x === 'y') { addTo(m, foodsOf(E.addDays(T, -1)).filter(f => mealOf(f) === m)); toast(`เพิ่มมื้อ${m}เหมือนเมื่อวานแล้ว`); }
      else if (x === 'fr') { const f = freq(m)[+b.dataset.k]; if (f) { addTo(m, [f]); toast('เพิ่ม ' + f.n); } }
      else if (x === 'skip') { const d = day(T); d.skipMeals = { ...(d.skipMeals || {}), [m]: true }; markDay(T); renderAll(); toast(`ข้ามมื้อ${m}`); }
      else if (x === 'go') { location.hash = '#food'; setTimeout(() => { const p = document.querySelector(`[data-pymeal="${m}"]`); if (p) p.click(); }, 120); }
      else if (x === 'useset') { const s = (S.profile.mealSets || [])[+b.dataset.i]; if (s) { const pick = document.querySelector('#pyMealPick [data-pymeal][style*="gradient"]'); const meal = pick ? pick.dataset.pymeal : s.meal; addTo(meal, s.items); toast(`เพิ่มชุด "${s.name}" ลงมื้อ${meal}แล้ว`); } }
      else if (x === 'delset') { const i = +b.dataset.i, s = (S.profile.mealSets || [])[i]; if (s && confirm(`ลบชุด "${s.name}"?`)) { S.profile.mealSets.splice(i, 1); markProfile(); renderPlus(); } }
      else if (x === 'mkset') { const items = foodsOf(VIEW_DATE).filter(f => mealOf(f) === m).map(f => { const { meal: _m, ...r } = f; return r; }); const name = prompt('ตั้งชื่อชุดอาหาร', `มื้อ${m}ประจำ`); if (name && items.length) { S.profile.mealSets = [...(S.profile.mealSets || []), { name: name.slice(0, 40), meal: m, items }]; markProfile(); renderPlus(); toast('บันทึกชุดแล้ว'); } }
      else if (x === 'waist') { const v = +($('#pyWaistIn') || {}).value; if (v > 40 && v < 250) { day(VIEW_DATE).waist = v; markDay(VIEW_DATE); renderAll(); toast('บันทึกรอบเอวแล้ว'); } else toast('ใส่รอบเอวเป็นเซนติเมตร เช่น 110'); }
      else if (x === 'phdel') { const l = PH[PH.length - 1]; if (l && confirm('ลบรูปล่าสุด?')) { await idbDel(l.id); await loadPhotos(); PHsel = [0, -1]; renderPlus(); } }
      else if (x === 'doc') openDoctor();
      else if (x === 'docclose') { const md = document.getElementById('pyDocModal'); if (md) md.remove(); }
      else if (x === 'docprint') { try { window.print(); } catch (er) { toast('พิมพ์จากหน้านี้ไม่ได้ ลองคัดลอกเป็นข้อความแทน'); } }
      else if (x === 'doccopy') { const t = (document.getElementById('pyDocSheet') || {}).innerText || ''; try { await navigator.clipboard.writeText(t); toast('คัดลอกแล้ว วางในแชทหรืออีเมลได้เลย'); } catch (er) { toast('คัดลอกไม่ได้ในหน้านี้'); } }
      else if (x === 'eatsrc') { EAT_SRC = b.dataset.v === 'h' ? 'h' : '7'; renderPlus(); }
      else if (x === 'eatadd') { const o = EAT_LAST[+b.dataset.i]; if (o) { const items = eatItems(), meal = eatMeal(); addTo(meal, o.sel.map(([k, q]) => mkFood(items[k], q))); toast(`บันทึกลงมื้อ${meal}แล้ว`); } }
      else if (x === 'copysrc') { const box = document.getElementById('pySrcBox'); try { const t = await (await fetch(location.href, { cache: 'no-store' })).text(); let ok = false; try { await navigator.clipboard.writeText(t); ok = true; } catch (er) {} if (box) box.innerHTML = `<p class="note" style="margin:8px 0 4px">${ok ? '✅ คัดลอกแล้ว ' : ''}ขนาด ${Math.round(t.length / 1024)} KB — ${ok ? 'เปิด Notepad แล้ววาง (Ctrl+V)' : 'คลิกในกล่องนี้ กด Ctrl+A แล้ว Ctrl+C จากนั้นวางใน Notepad'} · บันทึกเป็น poongyub-src.html (UTF-8) ในโฟลเดอร์ Downloads</p><textarea readonly style="width:100%;height:90px;font:11px monospace">${esc(t)}</textarea>`; toast(ok ? 'คัดลอกโค้ดแล้ว' : 'กด Ctrl+A, Ctrl+C ในกล่อง'); } catch (er) { toast('อ่านโค้ดไม่ได้: ' + er.message); } }
      else if (x === 'proall') { await setPro((COACH.clients || []).map(c => c.id), b.dataset.v === '1'); }
    });
    document.addEventListener('change', async e => {
      const t = e.target; if (!t.dataset || !t.dataset.pyx) return;
      if (t.dataset.pyx === 'phadd' && t.files && t.files[0]) { const img = await shrink(t.files[0]); t.value = ''; if (!img) { toast('เปิดรูปไม่ได้'); return; } await idbPut({ id: S.pid + '-' + Date.now(), pid: S.pid, date: TODAY(), img }); await loadPhotos(); PHsel = [0, -1]; renderPlus(); toast('เก็บรูปแล้ว (อยู่ในเครื่องนี้)'); }
      else if (t.dataset.pyx === 'phsel') { PHsel[+t.dataset.w] = +t.value; renderPlus(); }
      else if (t.dataset.pyx === 'pro') { await setPro([t.dataset.id], t.checked); }
    });
    renderPlus();
  } catch (e) { console.warn('plus init', e); }
}, 0);
