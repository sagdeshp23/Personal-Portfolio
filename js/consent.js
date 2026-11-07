/* FILE: /js/consent.js */
/* Last updated: 2026-10-25 */
/* Description: Cookie consent banner. Google Analytics loads only after the visitor accepts (GDPR / TTDSG). */
(() => {
  const KEY = 'portfolio-consent';
  const GA_ID = 'G-GT702KWP1Z';
  const banner = document.getElementById('consent');
  let gaLoaded = false;

  function read(){ try { return localStorage.getItem(KEY); } catch(e) { return null; } }
  function write(value){ try { localStorage.setItem(KEY, value); } catch(e) {} }

  function loadGA(){
    if(gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Remove GA cookies (_ga, _ga_<id>) on this host and its parent domains.
  function clearGACookies(){
    const parts = location.hostname.split('.');
    const domains = [''];
    for(let i = 0; i < parts.length - 1; i++) domains.push('; domain=.' + parts.slice(i).join('.'));
    document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => /^_ga/.test(n)).forEach(name => {
      domains.forEach(d => { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d; });
    });
  }

  function choose(value){
    const wasLoaded = gaLoaded;
    write(value);
    if(banner) banner.hidden = true;
    if(value === 'accept'){ loadGA(); return; }
    clearGACookies();
    // gtag.js cannot be unloaded; reload so it stops running this session.
    if(wasLoaded) location.reload();
  }

  document.addEventListener('click', event => {
    const btn = event.target.closest('[data-consent]');
    if(!btn) return;
    const action = btn.dataset.consent;
    if(action === 'open'){ if(banner) banner.hidden = false; return; }
    choose(action === 'accept' ? 'accept' : 'deny');
  });

  const saved = read();
  if(saved === 'accept') loadGA();
  else if(saved !== 'deny' && banner) banner.hidden = false;
})();
