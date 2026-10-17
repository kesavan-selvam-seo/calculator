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

// Keep native form submission and browser validation; do not store form data.
document.addEventListener('DOMContentLoaded', () => {
  const topic = document.getElementById('contact-topic');
  const help = document.getElementById('message-help');
  const hints = {
    'Calculator support': 'Include the calculator URL, input values and units, the result shown, and the result you expected.',
    'Article correction or feedback': 'Include the article URL, the detail that needs attention, and a reliable source if you have one.',
    'New calculator or article suggestion': 'Describe your idea, the question it should answer, and who would find it useful.',
    'Website or technical issue': 'Include the page URL, your browser and device, and what happened when you tried to use the page.',
    'Advertising or collaboration': 'Tell us about your organisation, your proposal, and how it relates to CalcuPortal readers.',
    'General enquiry': 'Tell us what you would like to know. Include a page URL if it helps explain your question.'
  };
  if (topic && help) topic.addEventListener('change', () => {
    help.textContent = hints[topic.value] || "If your message relates to a page, include its URL and the details you'd like us to check.";
  });
});
