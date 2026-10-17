(() => {
  const root = document.getElementById('cp-home');
  if (!root) return;
  const amount = root.querySelector('#cp-loan');
  const money = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
  function updateLoan() {
    const principal = Number(amount.value), rate = .1 / 12, months = 60;
    const power = Math.pow(1 + rate, months);
    const emi = principal * rate * power / (power - 1);
    root.querySelector('#cp-loan-value').textContent = '₹' + money.format(principal);
    root.querySelector('#cp-emi').textContent = '₹' + money.format(emi);
    root.querySelector('#cp-total').textContent = '₹' + money.format(emi * months);
    root.querySelector('#cp-interest').textContent = '₹' + money.format(emi * months - principal);
    amount.setAttribute('aria-valuetext', money.format(principal) + ' rupees');
  }
  amount.addEventListener('input', updateLoan);
  updateLoan();
  root.querySelector('#cp-year').textContent = new Date().getFullYear();

  root.querySelectorAll('.cp-filters button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      root.querySelectorAll('.cp-filters button').forEach(peer => peer.setAttribute('aria-pressed', String(peer === button)));
      let visibleCount = 0;
      root.querySelectorAll('.cp-tool').forEach(tool => {
        tool.hidden = category !== 'all' && tool.dataset.category !== category;
        if (!tool.hidden) visibleCount++;
      });
      root.querySelector('#cp-no-tools').hidden = visibleCount > 0;
    });
  });

  const search = root.querySelector('#cp-search');
  const results = root.querySelector('#cp-results');
  const grid = root.querySelector('#cp-result-grid');
  const count = root.querySelector('#cp-search-count');
  const more = root.querySelector('#cp-more');
  const defaults = [root.querySelector('#cp-tools-section'), root.querySelector('#cp-read-section')];
  let catalogPromise, requestId = 0, timer, matches = [], shown = 0;
  const normalize = value => value.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  function getCatalog() {
    if (!catalogPromise) {
      catalogPromise = fetch('/homepage-search.json', { credentials: 'same-origin' }).then(response => {
        if (!response.ok) throw new Error('Search catalog unavailable');
        return response.json();
      }).catch(error => { catalogPromise = null; throw error; });
    }
    return catalogPromise;
  }
  function renderNext() {
    const batch = matches.slice(shown, shown + 12);
    for (const item of batch) {
      const link = document.createElement('a');
      link.className = 'cp-tool cp-search-result';
      link.href = item.url;
      link.style.gridTemplateColumns = '1fr 13px';
      const copy = document.createElement('div');
      const type = document.createElement('div');
      type.className = 'cp-search-result-type'; type.textContent = item.type;
      const title = document.createElement('h3'); title.textContent = item.title;
      const description = document.createElement('p'); description.textContent = item.description;
      const arrow = document.createElement('span'); arrow.className = 'cp-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      copy.append(type, title, description); link.append(copy, arrow); grid.append(link);
    }
    shown += batch.length;
    more.hidden = shown >= matches.length;
    more.textContent = 'Show more results (' + Math.max(0, matches.length - shown) + ' remaining)';
  }
  more.addEventListener('click', renderNext);
  async function runSearch() {
    const id = ++requestId;
    const query = normalize(search.value);
    if (!query) {
      results.hidden = true; count.hidden = true; more.hidden = true;
      defaults.forEach(section => section.hidden = false);
      return;
    }
    defaults.forEach(section => section.hidden = true);
    results.hidden = false; count.hidden = false; grid.replaceChildren(); more.hidden = true;
    count.textContent = 'Searching calculators and articles…';
    try {
      const catalog = await getCatalog();
      if (id !== requestId) return;
      const words = query.split(' ');
      matches = catalog.filter(item => words.every(word => normalize(item.title + ' ' + item.description + ' ' + item.url).includes(word)));
      matches.sort((a, b) => Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)));
      shown = 0;
      count.textContent = matches.length ? matches.length + ' results for “' + search.value.trim() + '”.' : 'No matches. Try a tool name or a broader topic, such as loan, age, or travel.';
      renderNext();
    } catch {
      if (id !== requestId) return;
      count.textContent = 'Search could not load. Browse the calculators and articles below, or try again.';
      results.hidden = true; defaults.forEach(section => section.hidden = false);
    }
  }
  search.addEventListener('input', () => { ++requestId; clearTimeout(timer); timer = setTimeout(runSearch, 160); });
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; clearTimeout(timer); runSearch(); }
    if (event.key === 'Enter') { event.preventDefault(); clearTimeout(timer); runSearch(); }
  });
  const menuToggle = root.querySelector('.cp-menu-toggle');
  const primaryNav = root.querySelector('#cp-primary-nav');
  if (menuToggle && primaryNav) {
    const closeMenu = () => {
      primaryNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    };
    const openMenu = () => {
      primaryNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation');
    };

    menuToggle.addEventListener('click', event => {
      event.stopPropagation();
      menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        menuToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }
})();
