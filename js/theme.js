/* FILE: /js/theme.js */
/* Last updated: 2026-10-25 */
/* Description: Theme switching logic and Power Apps formula bar interaction. */
(() => {
  const key = 'portfolio-theme';
  const root = document.documentElement;
  const value = () => document.getElementById('fx-value');
  const current = () => root.dataset.theme === 'dark' ? 'dark' : 'light';
  // persist=false on load, so visitors without a saved choice keep following their OS theme
  function setTheme(theme, persist = true) {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    if (persist) { try { localStorage.setItem(key, next); } catch (e) {} }
    const val = value();
    if (val) {
      val.classList.add('is-fading');
      window.setTimeout(() => {
        val.textContent = next === 'dark' ? '"Dark"' : '"Light"';
        val.classList.remove('is-fading');
      }, 150);
    }
  }
  function toggleTheme() { setTheme(current() === 'dark' ? 'light' : 'dark'); }
  window.setPortfolioTheme = setTheme;
  document.addEventListener('DOMContentLoaded', () => {
    setTheme(current(), false);
    const toggle = document.getElementById('formula-toggle');
    toggle?.addEventListener('click', toggleTheme);
    toggle?.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleTheme(); }
    });
  });
})();