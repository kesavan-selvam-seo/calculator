(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('birth-form'), day = $('birth-day');
  const buttons = [...document.querySelectorAll('[data-day]')];
  let current = null;
  const text = (id, value) => { $(id).textContent = value; };
  function working(r) {
    return r.chain.length === 1 ? r.day + ' is already a single digit.' : r.chain.slice(0, -1).map((n, i) => String(n).split('').join(' + ') + ' = ' + r.chain[i + 1]).join(' → ');
  }
  function clear() {
    current = null;
    $('result').hidden = true;
    $('result-empty').hidden = false;
    $('form-error').hidden = true;
    text('announcement', '');
    text('export-status', '');
    buttons.forEach(b => { b.setAttribute('aria-pressed', 'false'); b.classList.remove('bn-same-day'); });
  }
  function render(r) {
    const p = profiles[r.value];
    $('result-empty').hidden = true;
    $('result').hidden = false;
    text('result-number', r.value);
    text('result-title', p.title);
    text('result-themes', p.themes);
    text('original-day', r.day);
    text('same-days', r.sameDays.join(' · '));
    text('result-working', working(r));
    text('reflection-prompt', p.prompt);
    text('convention-note', r.masterAlternative ? 'Under a master-number convention, this day can be read as ' + r.masterAlternative + '. Your single-digit Mulank remains ' + r.value + '.' : 'Original birthday: ' + r.day + '. Reduced birth number (Mulank): ' + r.value + '. The month and year are not used.');
    $('meaning-link').href = '#meaning-' + r.value;
    buttons.forEach(b => {
      b.setAttribute('aria-pressed', String(Number(b.dataset.day) === r.day));
      b.classList.toggle('bn-same-day', r.sameDays.includes(Number(b.dataset.day)));
    });
    text('announcement', 'Birth day ' + r.day + ' gives birth number ' + r.value + '. ' + working(r));
    $('result').focus({preventScroll:true});
    if (matchMedia('(max-width:760px)').matches) $('result').scrollIntoView({block:'start', behavior:'auto'});
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    clear();
    try {
      if (!day.value) throw new Error('Please choose the day of the month you were born.');
      current = window.BirthNumberCore.calculate(Number(day.value));
      render(current);
    } catch (error) {
      current = null;
      text('form-error', error.message);
      $('form-error').hidden = false;
      day.focus();
    }
  });
  day.addEventListener('change', clear);
  form.addEventListener('reset', clear);
  function choose(value) { day.value = String(value); form.requestSubmit(); }
  buttons.forEach(b => b.addEventListener('click', () => choose(b.dataset.day)));
  $('example-btn').addEventListener('click', () => choose(29));
  document.querySelectorAll('[data-example]').forEach(b => b.addEventListener('click', () => {
    choose(b.dataset.example);
    $('calculator').scrollIntoView({block:'start', behavior:'auto'});
  }));
  function report() {
    if (!current) return '';
    const r = current;
    return ['CalcuPortal — Birth Number (Mulank)', 'Original birth day: ' + r.day,
      'Birth number: ' + r.value, 'Method: day only, reduced to 1–9; no master numbers retained.',
      'Working: ' + working(r), 'Same-number birthdays: ' + r.sameDays.join(', '),
      $('convention-note').textContent, 'Traditional themes: ' + profiles[r.value].themes,
      'Reflection: ' + profiles[r.value].prompt,
      'For cultural interest and reflection, not a scientific prediction.',
      'https://www.calcuportal.com/calculators/birth-number-calculator/'].join('\n');
  }
  $('copy-result').addEventListener('click', async () => {
    if (!current) return;
    try { await navigator.clipboard.writeText(report()); text('export-status', 'Copied. The selected birth day and calculation are included.'); }
    catch { text('export-status', 'Clipboard access is unavailable. Use Download instead.'); }
  });
  $('download-result').addEventListener('click', () => {
    if (!current) return;
    const url = URL.createObjectURL(new Blob([report()], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'calcuportal-birth-number-result.txt';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    text('export-status', 'Downloaded. The selected birth day and calculation are included.');
  });
  $('print-result').addEventListener('click', () => { if (current) window.print(); });
  const menu = $('menu-toggle');
  if (menu) new MutationObserver(() => menu.setAttribute('aria-expanded', String(menu.classList.contains('active')))).observe(menu, {attributes:true, attributeFilter:['class']});
  const profiles = {"1": {"title": "The initiator", "themes": "Independence · initiative · direction", "meaning": "Taking the first step and developing a voice of your own.", "balance": "Make space for collaboration as well as independence.", "prompt": "Where could you take one small step without having every answer?"}, "2": {"title": "The collaborator", "themes": "Cooperation · patience · sensitivity", "meaning": "Building connections and noticing different perspectives.", "balance": "Keep your own needs visible while supporting others.", "prompt": "What would a fair balance of giving and receiving look like?"}, "3": {"title": "The communicator", "themes": "Expression · creativity · connection", "meaning": "Exploring ideas through words, art or conversation.", "balance": "Give a promising idea enough structure to finish it.", "prompt": "Which idea would you enjoy expressing more clearly?"}, "4": {"title": "The organiser", "themes": "Structure · reliability · persistence", "meaning": "Developing routines and turning plans into practical work.", "balance": "Leave room for flexibility when circumstances change.", "prompt": "Which small routine would make your week easier?"}, "5": {"title": "The explorer", "themes": "Variety · adaptability · curiosity", "meaning": "Learning through new experiences and changing perspectives.", "balance": "Balance the freedom to explore with commitments you value.", "prompt": "What new experience could you try thoughtfully?"}, "6": {"title": "The supporter", "themes": "Care · responsibility · harmony", "meaning": "Creating a supportive environment and looking after shared needs.", "balance": "Helping others does not require taking responsibility for everything.", "prompt": "Where would a healthy boundary support you and someone else?"}, "7": {"title": "The investigator", "themes": "Reflection · study · insight", "meaning": "Making time to question, research and think deeply.", "balance": "Connect reflection with real-world experience and conversation.", "prompt": "What question deserves your undivided attention?"}, "8": {"title": "The organiser of resources", "themes": "Ambition · stewardship · accountability", "meaning": "Working with goals, resources and the responsibilities of leadership.", "balance": "Define achievement in a way that includes your values.", "prompt": "How could you use your time or resources more deliberately?"}, "9": {"title": "The humanitarian", "themes": "Compassion · perspective · service", "meaning": "Looking beyond immediate concerns and considering a wider community.", "balance": "Choose sustainable ways to help rather than carrying every problem.", "prompt": "Which cause matters enough for one practical contribution?"}};
})();
