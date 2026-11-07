/* FILE: /js/motion.js */
/* Last updated: 2026-11-07 */
/* Description: Hero "app builds itself" sequence (Power Apps studio), Power BI card count-ups and mini charts.
   Everything respects prefers-reduced-motion: the final state is shown instantly. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tr = s => (window.translate ? window.translate(s) : s);
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ── Power Fx syntax colouring for the studio formula bar ── */
  function highlight(src) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return src.replace(/("[^"]*"?|'[^']*'?)|([A-Za-z_][\w.]*)(?=\()|([(){},:])/g, (m, str, fn, p) => {
      if (str) return `<span class="s">${esc(str)}</span>`;
      if (fn) return `<span class="k">${esc(fn)}</span>`;
      return `<span class="p">${esc(p)}</span>`;
    });
  }

  /* ── Hero: the profile card builds itself like a Canvas App ── */
  const studio = document.getElementById('studio');
  if (studio) {
    const code = document.getElementById('studio-code');
    const prop = document.getElementById('studio-prop');
    const toast = document.getElementById('studio-toast');
    const sw = document.getElementById('studio-switch');
    const playBtn = document.getElementById('studio-play');
    const playTxt = document.getElementById('studio-play-txt');
    const ctl = name => studio.querySelector(`.ctl[data-name="${name}"]`);
    const node = name => studio.querySelector(`.t-i[data-for="${name}"]`);

    const steps = [
      { name: 'imgAvatar', prop: 'Image', fx: "'sagar.png'" },
      { name: 'lblName', prop: 'Text', fx: '"Sagar Deshpande"' },
      { name: 'tglOpen', prop: 'Default', fx: 'true', after: () => sw.classList.add('on') },
      { name: 'galStats', prop: 'Items', fx: 'Table({Exp:"6+"}, {German:"C1"}, {Projects:11})' },
      { name: 'btnGo', prop: 'OnSelect', fx: 'Navigate(Canvas, ScreenTransition.Fade)' }
    ];
    const finalProp = 'OnStart';
    const finalFx = 'Set(varSagar, {Role:"Power Platform + AI", Open:true})';

    let run = 0;
    async function type(text, id) {
      for (let i = 1; i <= text.length; i++) {
        if (id !== run) return false;
        code.innerHTML = highlight(text.slice(0, i)) + '<span class="caret"></span>';
        await wait(text.length > 30 ? 16 : 28);
      }
      return true;
    }
    function showFinal() {
      studio.querySelectorAll('.ctl').forEach(c => c.classList.add('in'));
      studio.querySelectorAll('.t-i').forEach(n => n.classList.add('on'));
      sw.classList.add('on');
      prop.textContent = finalProp;
      code.innerHTML = highlight(finalFx);
      studio.classList.add('is-playing');
      playTxt.textContent = tr('Live');
    }
    function reset() {
      studio.classList.remove('is-playing');
      studio.querySelectorAll('.ctl').forEach(c => c.classList.remove('in', 'sel'));
      studio.querySelectorAll('.t-i[data-for]').forEach(n => n.classList.remove('on', 'sel'));
      sw.classList.remove('on');
      toast.classList.remove('show');
      playTxt.textContent = tr('Preview');
      code.innerHTML = '<span class="caret"></span>';
    }
    async function build() {
      const id = ++run;
      reset();
      await wait(500);
      for (const s of steps) {
        if (id !== run) return;
        const c = ctl(s.name), n = node(s.name);
        studio.querySelectorAll('.ctl.sel, .t-i.sel').forEach(x => x.classList.remove('sel'));
        n?.classList.add('on', 'sel');
        c.classList.add('in', 'sel');
        prop.textContent = s.prop;
        if (!(await type(s.fx, id))) return;
        s.after?.();
        await wait(380);
      }
      if (id !== run) return;
      studio.querySelectorAll('.ctl.sel, .t-i.sel').forEach(x => x.classList.remove('sel'));
      prop.textContent = finalProp;
      if (!(await type(finalFx, id))) return;
      await wait(350);
      studio.classList.add('is-playing');
      playTxt.textContent = tr('Live');
      toast.querySelector('.msym').nextSibling.textContent = tr('App published');
      toast.classList.add('show');
      await wait(2200);
      if (id === run) toast.classList.remove('show');
    }

    if (reduce) showFinal();
    else {
      // start when the studio is on screen (it is, above the fold, on most viewports)
      const so = new IntersectionObserver(es => {
        if (es.some(e => e.isIntersecting)) { so.disconnect(); build(); }
      }, { threshold: .35 });
      so.observe(studio);
    }
    playBtn.addEventListener('click', () => { if (reduce) showFinal(); else build(); });
  }

  /* ── Power BI card visuals: count up + draw ── */
  document.querySelectorAll('.bi-dots').forEach(el => {
    // 60 dots = 60+ document families
    let svg = '<svg viewBox="0 0 200 34" preserveAspectRatio="none">';
    for (let i = 0; i < 60; i++) {
      const col = i % 30, row = Math.floor(i / 30);
      svg += `<circle class="bi-dot" cx="${3 + col * 6.6}" cy="${6 + row * 9}" r="2.4" style="transition-delay:${(i * 14)}ms"/>`;
    }
    svg += '<text x="0" y="33">60+ families</text></svg>';
    el.innerHTML = svg;
  });

  function countUp(el) {
    const end = Number(el.dataset.count);
    if (reduce || !end) { el.textContent = end; return; }
    const dur = 1400, t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  }

  const bo = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      bo.unobserve(e.target);
      e.target.classList.add('seen');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
    });
  }, { threshold: .4 });
  document.querySelectorAll('.bi-card').forEach(c => bo.observe(c));

  /* ── Flow: a Power Automate test run, one action per card as you scroll ── */
  const steps = [...document.querySelectorAll('#flow-run .step')];
  const status = document.getElementById('run-status');
  const statusTxt = document.getElementById('run-status-txt');
  const durLabel = d => ({ live: 'Running since 07/2026', open: 'Waiting for you' }[d] || d);
  let next = 0, busy = false;
  function finishStep(s) {
    s.classList.remove('is-running');
    // the current role keeps looping, like an Apply to each that is still running
    s.classList.add(s.dataset.dur === 'live' ? 'is-live' : 'is-done');
    const st = s.querySelector('.step-state');
    if (st) st.textContent = tr(durLabel(s.dataset.dur || ''));
    if (s === steps[steps.length - 1] && status) {
      status.dataset.state = 'done';
      statusTxt.textContent = tr('Succeeded');
    }
  }
  // run steps strictly in order, so the flow never "skips" an action
  function pump() {
    if (busy || next >= steps.length || !steps[next].dataset.ready) return;
    const s = steps[next++];
    busy = true;
    s.classList.add('is-running');
    setTimeout(() => { finishStep(s); busy = false; pump(); }, 750);
  }
  if (reduce) steps.forEach(finishStep);
  else {
    const fo = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.dataset.ready = '1'; fo.unobserve(e.target); } });
      // anything above the one that became visible is ready too (fast scrolling)
      const last = steps.map(s => !!s.dataset.ready).lastIndexOf(true);
      steps.slice(0, last + 1).forEach(s => s.dataset.ready = '1');
      pump();
    }, { threshold: .35, rootMargin: '0px 0px -10% 0px' });
    steps.forEach(s => fo.observe(s));
  }

  /* ── Canvas: cards tilt toward the pointer ── */
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.pcard').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
