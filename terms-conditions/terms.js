// Page-local navigation accessibility; shared theme/navigation logic stays intact.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  if (!toggle || !nav) return;
  const syncExpanded = () => toggle.setAttribute('aria-expanded', String(nav.classList.contains('active')));
  new MutationObserver(syncExpanded).observe(nav, { attributes: true, attributeFilter: ['class'] });
  const closeMenu = () => {
    nav.classList.remove('active');
    toggle.classList.remove('active');
    syncExpanded();
  };
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
      toggle.focus();
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  syncExpanded();
});
