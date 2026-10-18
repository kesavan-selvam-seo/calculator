// Google Analytics 4 Tracking
(function () {
  var gaId = "G-449EVK65FB";

  if (!window.gtag) {
    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", gaId, {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title
    });
  }
})();


/**
 * CalcuPortal Homepage Interactive Engine
 * Handles Multi-Calculator Sandbox, Live Search, Theme Switcher, and Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Theme Manager (Dark / Light Mode)
  // -------------------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  let savedTheme; try { savedTheme = localStorage.getItem('theme'); } catch {}
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // -------------------------------------------------------------
  // 2. Mobile Menu Navigation Drawer
  // -------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  if (menuToggle && mobileNavPanel) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // -------------------------------------------------------------
  // 3. Hero Sandbox Tab Switcher
  // -------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.sandbox-tabs .tab-btn');
  const sandboxPanels = document.querySelectorAll('.sandbox-panel');
  const sandboxBadge = document.getElementById('sandbox-calc-badge');

  const badgeLabels = {
    'emi': 'Real-Time EMI Engine',
    'age': 'Milestone & Age Tracker',
    'bmi': 'Health Index Meter',
    'sip': 'Wealth Growth Simulator'
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {b.classList.remove('active');b.setAttribute('aria-selected','false');b.tabIndex=-1;});
      sandboxPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');btn.setAttribute('aria-selected','true');btn.tabIndex=0;
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) targetPanel.classList.add('active');
      if (sandboxBadge && badgeLabels[targetTab]) {
        sandboxBadge.textContent = badgeLabels[targetTab];
      }
    });
  });

  // -------------------------------------------------------------
  // 4. Sandbox Calculator #1: Loan EMI Calculator
  // -------------------------------------------------------------
  const emiAmountRange = document.getElementById('emi-amount');
  const emiRateRange = document.getElementById('emi-rate');
  const emiTenureRange = document.getElementById('emi-tenure');
  const emiAmountVal = document.getElementById('emi-amount-val');
  const emiRateVal = document.getElementById('emi-rate-val');
  const emiTenureVal = document.getElementById('emi-tenure-val');
  const emiMonthlyVal = document.getElementById('emi-monthly-val');
  const emiTotalVal = document.getElementById('emi-total-val');
  const emiInterestVal = document.getElementById('emi-interest-val');
  const propPrincipalBar = document.getElementById('prop-principal-bar');
  const propInterestBar = document.getElementById('prop-interest-bar');

  const inrFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

  function calculateEMI() {
    if (!emiAmountRange || !emiRateRange || !emiTenureRange) return;
    const principal = parseFloat(emiAmountRange.value);
    const annualRate = parseFloat(emiRateRange.value);
    const years = parseFloat(emiTenureRange.value);

    const monthlyRate = (annualRate / 12) / 100;
    const months = years * 12;

    const factor = Math.pow(1 + monthlyRate, months);
    const emi = monthlyRate === 0 ? principal / months : (principal * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    if (emiAmountVal) emiAmountVal.textContent = '₹' + inrFormatter.format(principal);
    if (emiRateVal) emiRateVal.textContent = annualRate.toFixed(1) + '%';
    if (emiTenureVal) emiTenureVal.textContent = years + (years === 1 ? ' Year' : ' Years');

    if (emiMonthlyVal) emiMonthlyVal.textContent = '₹' + inrFormatter.format(Math.round(emi));
    if (emiTotalVal) emiTotalVal.textContent = '₹' + inrFormatter.format(Math.round(totalPayment));
    if (emiInterestVal) emiInterestVal.textContent = '₹' + inrFormatter.format(Math.round(totalInterest));

    // Update proportion bar
    const principalPercent = (principal / totalPayment) * 100;
    const interestPercent = 100 - principalPercent;
    if (propPrincipalBar && propInterestBar) {
      propPrincipalBar.style.width = principalPercent.toFixed(1) + '%';
      propInterestBar.style.width = interestPercent.toFixed(1) + '%';
    }
  }

  if (emiAmountRange && emiRateRange && emiTenureRange) {
    emiAmountRange.addEventListener('input', calculateEMI);
    emiRateRange.addEventListener('input', calculateEMI);
    emiTenureRange.addEventListener('input', calculateEMI);

    // Preset buttons for loan amount
    document.querySelectorAll('.preset-chip[data-loan]').forEach(chip => {
      chip.addEventListener('click', () => {
        emiAmountRange.value = chip.getAttribute('data-loan');
        calculateEMI();
      });
    });

    calculateEMI();
  }

  // -------------------------------------------------------------
  // 5. Sandbox Calculator #2: Age & Birthday Countdown
  // -------------------------------------------------------------
  const ageDobInput = document.getElementById('age-dob-input');
  const ageYearsVal = document.getElementById('age-years-val');
  const ageMonthsVal = document.getElementById('age-months-val');
  const ageDaysVal = document.getElementById('age-days-val');
  const ageDaysLivedVal = document.getElementById('age-days-lived-val');
  const nextBirthdayVal = document.getElementById('next-birthday-val');

  function calculateAge() {
    const clear = message => {
      [ageYearsVal, ageMonthsVal, ageDaysVal, ageDaysLivedVal].forEach(el => { if(el) el.textContent = '—'; });
      if(nextBirthdayVal) nextBirthdayVal.textContent = 'Enter a valid date of birth';
      document.getElementById('age-error').textContent = message;
    };
    if (!ageDobInput || !ageDobInput.value) { clear('Choose your date of birth.'); return; }
    const parts = ageDobInput.value.split('-').map(Number);
    const dob = new Date(parts[0],parts[1]-1,parts[2]); dob.setFullYear(parts[0]);
    const now = new Date(); const today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    if(parts.length !== 3 || isNaN(dob) || dob.getFullYear() !== parts[0] || dob.getMonth() !== parts[1]-1 || dob.getDate() !== parts[2] || dob > today) {clear('Enter a valid birth date on or before today.'); return;}
    document.getElementById('age-error').textContent = '';
    const anniversary = (year,month) => new Date(year,month,Math.min(dob.getDate(),new Date(year,month+1,0).getDate()));
    let years = today.getFullYear()-dob.getFullYear();
    if(anniversary(dob.getFullYear()+years,dob.getMonth())>today) years--;
    let months=0;
    while(months<11 && anniversary(dob.getFullYear()+years,dob.getMonth()+months+1)<=today) months++;
    const anchor=anniversary(dob.getFullYear()+years,dob.getMonth()+months);
    const serial=d=>Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());
    const days=Math.round((serial(today)-serial(anchor))/86400000);
    const lived=Math.round((serial(today)-serial(dob))/86400000);
    let birthday=anniversary(today.getFullYear(),dob.getMonth());
    if(birthday<today)birthday=anniversary(today.getFullYear()+1,dob.getMonth());
    const until=Math.round((serial(birthday)-serial(today))/86400000);
    ageYearsVal.textContent=years;ageMonthsVal.textContent=months;ageDaysVal.textContent=days;ageDaysLivedVal.textContent=lived.toLocaleString('en-IN');
    nextBirthdayVal.textContent=until===0?'Today is your birthday!':until+' days to next birthday';
  }

  if (ageDobInput) {
    ageDobInput.addEventListener('change', calculateAge);
    calculateAge();
  }

  // -------------------------------------------------------------
  // 6. Sandbox Calculator #3: BMI & Health Index Meter
  // -------------------------------------------------------------
  const bmiHeightRange = document.getElementById('bmi-height');
  const bmiWeightRange = document.getElementById('bmi-weight');
  const bmiHeightVal = document.getElementById('bmi-height-val');
  const bmiWeightVal = document.getElementById('bmi-weight-val');
  const bmiScoreVal = document.getElementById('bmi-score-val');
  const bmiStatusBadge = document.getElementById('bmi-status-badge');
  const bmiPointer = document.getElementById('bmi-pointer');
  const bmiIdealRangeVal = document.getElementById('bmi-ideal-range-val');

  function calculateBMI() {
    if (!bmiHeightRange || !bmiWeightRange) return;
    const heightCm = parseFloat(bmiHeightRange.value);
    const weightKg = parseFloat(bmiWeightRange.value);

    if (bmiHeightVal) bmiHeightVal.textContent = heightCm + ' cm';
    if (bmiWeightVal) bmiWeightVal.textContent = weightKg + ' kg';

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);

    if (bmiScoreVal) bmiScoreVal.textContent = bmiRounded;

    // Ideal healthy weight calculation (BMI 18.5 to 24.9)
    const minHealthyWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthyWeight = (24.9 * heightM * heightM).toFixed(1);
    if (bmiIdealRangeVal) {
      bmiIdealRangeVal.textContent = `${minHealthyWeight} – ${maxHealthyWeight} kg`;
    }

    // Status category & badge
    let category = '';
    let badgeClass = '';
    if (bmi < 18.5) {
      category = 'Underweight';
      badgeClass = 'bmi-status-under';
    } else if (bmi < 25) {
      category = 'Within adult reference range';
      badgeClass = 'bmi-status-normal';
    } else if (bmi < 30) {
      category = 'Overweight';
      badgeClass = 'bmi-status-over';
    } else {
      category = 'Obese';
      badgeClass = 'bmi-status-obese';
    }

    if (bmiStatusBadge) {
      bmiStatusBadge.textContent = category;
      bmiStatusBadge.className = 'bmi-status-badge ' + badgeClass;
    }

    // Position pointer (clamp between 15 and 35 BMI)
    if (bmiPointer) {
      const minScale = 15;
      const maxScale = 35;
      let pct = ((bmi - minScale) / (maxScale - minScale)) * 100;
      pct = Math.max(5, Math.min(95, pct));
      bmiPointer.style.left = pct.toFixed(1) + '%';
    }
  }

  if (bmiHeightRange && bmiWeightRange) {
    bmiHeightRange.addEventListener('input', calculateBMI);
    bmiWeightRange.addEventListener('input', calculateBMI);
    calculateBMI();
  }

  // -------------------------------------------------------------
  // 7. Sandbox Calculator #4: SIP Wealth Growth Simulator
  // -------------------------------------------------------------
  const sipMonthlyRange = document.getElementById('sip-monthly');
  const sipRateRange = document.getElementById('sip-rate');
  const sipTenureRange = document.getElementById('sip-tenure');
  const sipMonthlyVal = document.getElementById('sip-monthly-val');
  const sipRateVal = document.getElementById('sip-rate-val');
  const sipTenureVal = document.getElementById('sip-tenure-val');
  const sipFutureVal = document.getElementById('sip-future-val');
  const sipInvestedVal = document.getElementById('sip-invested-val');
  const sipGainVal = document.getElementById('sip-gain-val');

  function calculateSIP() {
    if (!sipMonthlyRange || !sipRateRange || !sipTenureRange) return;
    const monthlyDeposit = parseFloat(sipMonthlyRange.value);
    const annualRate = parseFloat(sipRateRange.value);
    const years = parseFloat(sipTenureRange.value);

    const i = (annualRate / 12) / 100;
    const n = years * 12;

    const futureValue = i === 0 ? monthlyDeposit * n : monthlyDeposit * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = monthlyDeposit * n;
    const estimatedGain = futureValue - investedAmount;

    if (sipMonthlyVal) sipMonthlyVal.textContent = '₹' + inrFormatter.format(monthlyDeposit);
    if (sipRateVal) sipRateVal.textContent = annualRate.toFixed(1) + '%';
    if (sipTenureVal) sipTenureVal.textContent = years + (years === 1 ? ' Year' : ' Years');

    if (sipFutureVal) sipFutureVal.textContent = '₹' + inrFormatter.format(Math.round(futureValue));
    if (sipInvestedVal) sipInvestedVal.textContent = '₹' + inrFormatter.format(Math.round(investedAmount));
    if (sipGainVal) sipGainVal.textContent = '₹' + inrFormatter.format(Math.round(estimatedGain));
  }

  if (sipMonthlyRange && sipRateRange && sipTenureRange) {
    sipMonthlyRange.addEventListener('input', calculateSIP);
    sipRateRange.addEventListener('input', calculateSIP);
    sipTenureRange.addEventListener('input', calculateSIP);
    calculateSIP();
  }

  // -------------------------------------------------------------
  // 8. Instant Live Search Engine (Spotlight Catalog)
  // -------------------------------------------------------------
  const searchInput = document.getElementById('hero-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchResultsSection = document.getElementById('search-results-section');
  const searchResultsGrid = document.getElementById('search-results-grid');
  const searchResultsCount = document.getElementById('search-results-count');
  const quickSearchBtn = document.getElementById('quick-search-btn');

  // Pre-indexed CalcuPortal Tools & Guides Catalog
  const siteCatalog = [{"title": "Add Business Days Calculator", "desc": "Add or subtract weekdays from a starting date while skipping weekends.", "category": "Calculator", "url": "/calculators/add-business-days-calculator/"}, {"title": "Age Calculator Online", "desc": "Calculate your exact age from date of birth in years, months and days. Check age as of any date, next birthday and total days lived.", "category": "Calculator", "url": "/calculators/age-calculator/"}, {"title": "Age Difference Calculator", "desc": "Compare two birthdays and calculate the exact age gap in years, months, and days.", "category": "Calculator", "url": "/calculators/age-difference-calculator/"}, {"title": "Loan Amortization Calculator", "desc": "Generate a full amortization schedule detailing principal and interest breakdowns for any loan borrowing.", "category": "Calculator", "url": "/calculators/amortization-calculator/"}, {"title": "Auto Loan Calculator – Car Payment & EMI Calculator", "desc": "Use our auto loan calculator for the US and India. Estimate monthly car payments or EMI, total interest, taxes, fees, down payment and amortization instantly.", "category": "Calculator", "url": "/calculators/auto-loan-calculator/"}, {"title": "Big Number Calculator", "desc": "Perform arithmetic calculations on extremely large numbers that exceed typical browser storage scales.", "category": "Calculator", "url": "/calculators/big-number-calculator/"}, {"title": "Billion to Rupees Converter", "desc": "Convert billion to rupees instantly. See 1 billion in rupees, crores, lakhs and millions with formulas, examples and a conversion table.", "category": "Calculator", "url": "/calculators/billion-to-rupees/"}, {"title": "Decimal to Binary Calculator", "desc": "Convert a whole decimal number to its base-2 binary representation.", "category": "Calculator", "url": "/calculators/binary-calculator/"}, {"title": "BMI Calculator", "desc": "Use this free BMI calculator to calculate your Body Mass Index online. Check BMI category, healthy weight range, BMI Prime, Ponderal Index, formula, chart and result instantly.", "category": "Calculator", "url": "/calculators/bmi-calculator/"}, {"title": "Basal Metabolic Rate (BMR) Calculator", "desc": "Estimate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor. Learn baseline rest calories.", "category": "Calculator", "url": "/calculators/bmr-calculator/"}, {"title": "Body Fat Calculator", "desc": "Estimate your body fat percentage using standard tape measure parameters designed by the US Navy.", "category": "Calculator", "url": "/calculators/body-fat-calculator/"}, {"title": "Break-Even Point Calculator", "desc": "Estimate the sales quantity and revenue needed to cover fixed and variable costs.", "category": "Calculator", "url": "/calculators/break-even-calculator/"}, {"title": "Business Days Between Dates Calculator", "desc": "Count weekdays between two dates, excluding Saturdays and Sundays.", "category": "Calculator", "url": "/calculators/business-days-between-dates-calculator/"}, {"title": "Bytes to Megabytes Converter", "desc": "Convert bytes to decimal megabytes and binary mebibytes.", "category": "Calculator", "url": "/calculators/bytes-to-megabytes-converter/"}, {"title": "Calorie Burn MET Calculator", "desc": "Estimate calories burned during workouts using standard clinical MET activity ratings, your body weight, and duration.", "category": "Calculator", "url": "/calculators/calorie-burn-met-calculator/"}, {"title": "Calorie Calculator", "desc": "Use this free Calorie Calculator to estimate your BMR, TDEE and daily calorie intake for maintenance, weight loss or weight gain using the Mifflin-St Jeor formula.", "category": "Calculator", "url": "/calculators/calorie-calculator/"}, {"title": "Celsius to Kelvin Converter", "desc": "Convert Celsius temperature to kelvin using the standard formula.", "category": "Calculator", "url": "/calculators/celsius-to-kelvin-converter/"}, {"title": "Centimeters to Meters Converter", "desc": "Use our free Centimeters to Meters Converter to convert cm to m instantly. Learn the cm to meter formula, examples, conversion table, and reverse m to cm conversion.", "category": "Calculator", "url": "/calculators/centimeter-to-meter/"}, {"title": "CGPA Calculator", "desc": "Use this free CGPA Calculator to calculate CGPA from semesters, SGPA from subjects, CGPA to percentage, and target CGPA planning with credits and grade points.", "category": "Calculator", "url": "/calculators/cgpa-calculator/"}, {"title": "Click-Through Rate Calculator", "desc": "Calculate click-through rate from clicks and impressions.", "category": "Calculator", "url": "/calculators/click-through-rate-calculator/"}, {"title": "Complex Number Magnitude Calculator", "desc": "Calculate the magnitude and angle of a complex number from its real and imaginary parts.", "category": "Calculator", "url": "/calculators/complex-number-calculator/"}, {"title": "Compound Interest Calculator", "desc": "Calculate how your money grows over time with compound interest. Adjust starting principal, monthly additions, compounding frequencies, and see your future wealth.", "category": "Calculator", "url": "/calculators/compound-interest-calculator/"}, {"title": "Height Feet to Centimeters Converter", "desc": "Convert heights between Feet/Inches and Centimeters instantly with our free online conversion tool.", "category": "Calculator", "url": "/calculators/conversions-height-ft-cm/"}, {"title": "Number to Words Converter", "desc": "Convert numbers to words online for free. Write numbers in English words, from small numbers to large numbers and decimals, with instant results.", "category": "Calculator", "url": "/calculators/conversions-numbers-to-words/"}, {"title": "Pressure Units Converter", "desc": "Convert pressure units between PSI, Bar, Pascal, and Atmospheres instantly with our free online tool.", "category": "Calculator", "url": "/calculators/conversions-pressure/"}, {"title": "Roman Numeral Date Converter", "desc": "Convert calendar dates to Roman numerals instantly. Perfect for tattoos, carvings, and formatting styles.", "category": "Calculator", "url": "/calculators/conversions-roman-numeral-date-converter/"}, {"title": "Time Unit Converter", "desc": "Convert time measurements between seconds, minutes, hours, days, weeks, months, and years.", "category": "Calculator", "url": "/calculators/conversions-time/"}, {"title": "Cost Per Click Calculator", "desc": "Calculate average cost per click from total spend and clicks.", "category": "Calculator", "url": "/calculators/cost-per-click-calculator/"}, {"title": "CPM Calculator", "desc": "Calculate cost per thousand impressions from campaign cost and impressions.", "category": "Calculator", "url": "/calculators/cpm-calculator/"}, {"title": "Credit Card Payoff Calculator", "desc": "Calculate how long it takes to pay off credit card debt based on interest rate and monthly payments.", "category": "Calculator", "url": "/calculators/credit-card-payoff/"}, {"title": "Cubic Metres to Litres Converter", "desc": "Convert cubic metres to litres for volume and capacity calculations.", "category": "Calculator", "url": "/calculators/cubic-meters-to-liters/"}, {"title": "Cylinder Volume Calculator", "desc": "Calculate the volume of a cylinder from its radius and height.", "category": "Calculator", "url": "/calculators/cylinder-volume-calculator/"}, {"title": "Date & Calendar Calculator", "desc": "Calculate the number of days, weeks, months, or years between two dates, or add/subtract days from a specific calendar date.", "category": "Calculator", "url": "/calculators/date-calculator/"}, {"title": "Day Counter", "desc": "Count the exact number of days between two dates. Fast and easy to use.", "category": "Calculator", "url": "/calculators/day-counter/"}, {"title": "Decimal Hours to Hours and Minutes Converter", "desc": "Convert decimal hours such as 7.75 into hours and minutes.", "category": "Calculator", "url": "/calculators/decimal-hours-to-time-converter/"}, {"title": "Degrees to Radians Converter", "desc": "Convert angles from degrees to radians for geometry and trigonometry.", "category": "Calculator", "url": "/calculators/degrees-to-radians-converter/"}, {"title": "2x2 Determinant Calculator", "desc": "Find the determinant of a 2×2 matrix using four values.", "category": "Calculator", "url": "/calculators/determinant-calculator/"}, {"title": "Discount & Savings Calculator", "desc": "Calculate discount percentages, savings amounts, and final prices including sales tax with our free online discount calculator.", "category": "Calculator", "url": "/calculators/discount-calculator/"}, {"title": "Electricity Cost Calculator", "desc": "Calculate appliance electricity cost. Input wattage, hours used, and utility rate to see daily/yearly expenses.", "category": "Calculator", "url": "/calculators/electricity-calculator/"}, {"title": "Email Open Rate Calculator", "desc": "Calculate recorded email open rate from delivered messages and recorded opens.", "category": "Calculator", "url": "/calculators/email-open-rate-calculator/"}, {"title": "Exponent Calculator", "desc": "Calculate a base raised to a selected power, including negative powers where defined.", "category": "Calculator", "url": "/calculators/exponent-calculator/"}, {"title": "Fahrenheit to Celsius Converter", "desc": "Convert Fahrenheit temperatures to Celsius.", "category": "Calculator", "url": "/calculators/fahrenheit-to-celsius-converter/"}, {"title": "FLAMES Calculator Online", "desc": "Use the free FLAMES Calculator online to check Friendship, Love, Affection, Marriage, Enemy, or Sibling result between two names instantly.", "category": "Calculator", "url": "/calculators/flames-calculator/"}, {"title": "Fraction Calculator", "desc": "Add, subtract, multiply, and divide fractions easily. Displays simplified fractional answers.", "category": "Calculator", "url": "/calculators/fraction-calculator/"}, {"title": "Fuel Cost Calculator", "desc": "Estimate trip fuel costs using km/L, L/100 km or US MPG with explicit distance and fuel-price units.", "category": "Calculator", "url": "/calculators/fuel-cost-calculator/"}, {"title": "Gallons to Liters Converter", "desc": "Convert US Gallons to Liters and vice versa instantly. Free fluid volume converter.", "category": "Calculator", "url": "/calculators/gallons-to-liters/"}, {"title": "Bingo Number Generator", "desc": "Use the free Bingo Number Generator to call random Bingo numbers from 1 to 75. Track called numbers, reset the board, and play Bingo online.", "category": "Calculator", "url": "/calculators/games-bingo-number-generator/"}, {"title": "Dice Roller", "desc": "Use this free online dice roller to roll D4, D6, D8, D10, D12, D20 and D100 dice. Get animated dice results, total score, roll history and probability guide.", "category": "Calculator", "url": "/calculators/games-dice-roller/"}, {"title": "Lottery Number Generator", "desc": "Use the free Lottery Number Generator to create random lottery numbers instantly. Choose minimum value, maximum value and number count for custom lottery picks.", "category": "Calculator", "url": "/calculators/games-lottery-number-generator/"}, {"title": "GPA Calculator", "desc": "Use this free GPA Calculator to calculate semester GPA, cumulative GPA and target GPA planning. Add courses, credits and grades to estimate your GPA online.", "category": "Calculator", "url": "/calculators/gpa-calculator/"}, {"title": "Final Grade Calculator", "desc": "Use this free Final Grade Calculator to calculate your current weighted grade, final exam score needed, course grade, letter grade and grade planning results online.", "category": "Calculator", "url": "/calculators/grade-calculator/"}, {"title": "HCF & LCM Calculator", "desc": "Find the Highest Common Factor (HCF / GCD) and Least Common Multiple (LCM) for any two numbers.", "category": "Calculator", "url": "/calculators/hcf-calculator/"}, {"title": "Hectares to Acres Converter", "desc": "Convert hectares to acres for general land-area calculations.", "category": "Calculator", "url": "/calculators/hectares-to-acres-converter/"}, {"title": "Ideal Weight Calculator", "desc": "Find your ideal body weight range based on scientific clinical formulas including Devine and Robinson.", "category": "Calculator", "url": "/calculators/ideal-weight-calculator/"}, {"title": "Income Tax Calculator", "desc": "Estimate 2026 US federal income tax using IRS marginal brackets and standard deductions for single and married filing jointly filers.", "category": "Calculator", "url": "/calculators/income-tax-calculator/"}, {"title": "Inflation Calculator", "desc": "Determine the future buying power of money and adjust value calculations for inflation rates.", "category": "Calculator", "url": "/calculators/inflation-calculator/"}, {"title": "Investment Calculator", "desc": "Project the future value of your investments with regular monthly contributions and compound interest.", "category": "Calculator", "url": "/calculators/investment-calculator/"}, {"title": "IRR (Internal Rate of Return) Calculator", "desc": "Estimate the Internal Rate of Return (IRR) for a series of annual investment cash flows.", "category": "Calculator", "url": "/calculators/irr-calculator/"}, {"title": "ISO Week Number Calculator", "desc": "Find the ISO week number and ISO week-year for a calendar date.", "category": "Calculator", "url": "/calculators/iso-week-number-calculator/"}, {"title": "Joules to Calories Converter", "desc": "Convert energy in joules to small calories and food Calories.", "category": "Calculator", "url": "/calculators/joules-to-calories/"}, {"title": "Kilometres per Hour to MPH Converter", "desc": "Convert speed from kilometres per hour to miles per hour.", "category": "Calculator", "url": "/calculators/kmh-to-mph/"}, {"title": "Kilowatts to Horsepower Converter", "desc": "Convert kilowatts to mechanical horsepower for power comparisons.", "category": "Calculator", "url": "/calculators/kw-to-horsepower/"}, {"title": "kWh to Megajoules Converter", "desc": "Convert energy from kilowatt-hours to megajoules.", "category": "Calculator", "url": "/calculators/kwh-to-mj-converter/"}, {"title": "Pounds to Kilograms Converter", "desc": "Convert weight measurements from Pounds (lbs) to Kilograms (kg) and vice versa with our free online weight converter.", "category": "Calculator", "url": "/calculators/lbs-to-kg-converter/"}, {"title": "L/100 km to MPG Converter", "desc": "Convert litres per 100 kilometres to US miles per gallon.", "category": "Calculator", "url": "/calculators/liters-per-100km-to-mpg/"}, {"title": "Loan EMI Calculator", "desc": "Calculate your monthly EMI, total interest, and total payment for home, car, or personal loans. See instant breakdowns.", "category": "Calculator", "url": "/calculators/loan-emi-calculator/"}, {"title": "Logarithm Calculator", "desc": "Calculate a logarithm using a number and a selected base.", "category": "Calculator", "url": "/calculators/logarithm-calculator/"}, {"title": "Love Calculator by Name", "desc": "Use the free Love Calculator by Name to check love percentage, name compatibility, crush match, and fun relationship score instantly online.", "category": "Calculator", "url": "/calculators/love-calculator-by-name/"}, {"title": "Love Tester Online", "desc": "Use the free Love Tester online to check a fun love compatibility score with names and quiz questions. Test love percentage and playful match result instantly.", "category": "Calculator", "url": "/calculators/love-tester/"}, {"title": "Markup Calculator", "desc": "Calculate a markup amount and selling price from cost and markup percentage.", "category": "Calculator", "url": "/calculators/markup-calculator/"}, {"title": "Long Division Calculator", "desc": "Perform long division and see calculated quotients and remainders instantly with our free online tool.", "category": "Calculator", "url": "/calculators/math-long-division/"}, {"title": "Rounding Numbers Calculator", "desc": "Round numbers to the nearest unit, ten, hundred, thousand, or decimal index. Free and fast.", "category": "Calculator", "url": "/calculators/math-rounding-numbers/"}, {"title": "2x2 Matrix Calculator", "desc": "Calculate the determinant and inverse of a 2×2 matrix from four entries.", "category": "Calculator", "url": "/calculators/matrix-calculator/"}, {"title": "Mean Median Mode Calculator", "desc": "Find the mean, median and mode of a comma-separated list of numbers.", "category": "Calculator", "url": "/calculators/mean-median-mode-calculator/"}, {"title": "Megabytes to Gigabytes Converter", "desc": "Convert megabytes to decimal gigabytes and compare binary units.", "category": "Calculator", "url": "/calculators/megabytes-to-gigabytes-converter/"}, {"title": "Meters to Feet Converter", "desc": "Convert meters to feet and vice versa instantly. Supports decimal values.", "category": "Calculator", "url": "/calculators/meter-to-feet/"}, {"title": "Gas Mileage Calculator", "desc": "Determine your vehicle's gas mileage (MPG or km/L) based on distance driven and fuel consumed.", "category": "Calculator", "url": "/calculators/mileage-calculator/"}, {"title": "Million to Crore Converter", "desc": "Convert Millions to Crores instantly. Check international financial scaling in Indian number formats.", "category": "Calculator", "url": "/calculators/million-to-crore/"}, {"title": "Million to Rupees Converter", "desc": "Convert Millions to Indian Rupees (INR) instantly. Supports custom conversions for Lakhs and Crores.", "category": "Calculator", "url": "/calculators/million-to-rupees/"}, {"title": "Mortgage Calculator", "desc": "Calculate monthly mortgage payments factoring in home price, down payment, interest rate, property taxes, and insurance.", "category": "Calculator", "url": "/calculators/mortgage-calculator/"}, {"title": "Metres per Second to KM/H Converter", "desc": "Convert speed from metres per second to kilometres per hour.", "category": "Calculator", "url": "/calculators/mps-to-kmh/"}, {"title": "Running Pace Calculator", "desc": "Calculate your average running pace, duration, or distances for training runs and race splits.", "category": "Calculator", "url": "/calculators/pace-calculator/"}, {"title": "Secure Password Generator", "desc": "Generate strong, randomized passwords instantly to secure your online credentials.", "category": "Calculator", "url": "/calculators/password-generator/"}, {"title": "Percentage Calculator", "desc": "Find percentages of numbers, proportion percentages, and percentage increases or decreases instantly with our free percentage calculator.", "category": "Calculator", "url": "/calculators/percentage-calculator/"}, {"title": "Permutation and Combination Calculator", "desc": "Calculate permutations and combinations when selecting r items from n distinct items.", "category": "Calculator", "url": "/calculators/permutation-combination-calculator/"}, {"title": "Pregnancy Due Date Calculator", "desc": "Estimate your due date, current gestational age, and pregnancy progress milestones based on your last menstrual period (LMP).", "category": "Calculator", "url": "/calculators/pregnancy-calculator/"}, {"title": "Prime Factorization Calculator", "desc": "Break a positive integer into its prime factors.", "category": "Calculator", "url": "/calculators/prime-factorization-calculator/"}, {"title": "Probability Calculator", "desc": "Calculate event probability from favourable outcomes and total possible outcomes.", "category": "Calculator", "url": "/calculators/probability-calculator/"}, {"title": "Profit & Margin Calculator", "desc": "Calculate business profit amounts, markup ratios, and margins instantly based on cost and selling price.", "category": "Calculator", "url": "/calculators/profit-calculator/"}, {"title": "Proportion Calculator", "desc": "Solve the missing value in a proportion a:b = c:x.", "category": "Calculator", "url": "/calculators/proportion-calculator/"}, {"title": "Pythagorean Theorem Calculator", "desc": "Find the hypotenuse of a right triangle from its two perpendicular sides.", "category": "Calculator", "url": "/calculators/pythagorean-theorem-calculator/"}, {"title": "Quadratic Equation Calculator", "desc": "Solve quadratic equations of the form ax² + bx + c = 0 and calculate their roots.", "category": "Calculator", "url": "/calculators/quadratic-equation-calculator/"}, {"title": "Random Number Generator", "desc": "Generate truly random integers between custom range limits. Perfect for games and drawings.", "category": "Calculator", "url": "/calculators/random-number-generator/"}, {"title": "Ratio Simplifier Calculator", "desc": "Reduce a two-term whole-number ratio to its lowest terms.", "category": "Calculator", "url": "/calculators/ratio-simplifier/"}, {"title": "Remainder Calculator", "desc": "Find the remainder of a division instantly. Ideal for modular arithmetic problems.", "category": "Calculator", "url": "/calculators/remainder-calculator/"}, {"title": "Revenue Growth Rate Calculator", "desc": "Calculate percentage revenue growth or decline between two periods.", "category": "Calculator", "url": "/calculators/revenue-growth-rate-calculator/"}, {"title": "ROAS Calculator", "desc": "Calculate return on ad spend by comparing attributed revenue with advertising cost.", "category": "Calculator", "url": "/calculators/roas-calculator/"}, {"title": "Rounding Calculator", "desc": "Round any decimals or fractions up, down, or to the nearest digit index instantly.", "category": "Calculator", "url": "/calculators/rounding-calculator/"}, {"title": "Sales Commission Calculator", "desc": "Calculate estimated sales commission from a sales amount and commission rate.", "category": "Calculator", "url": "/calculators/sales-commission-calculator/"}, {"title": "Sales Tax Calculator", "desc": "Find the total retail cost and sales tax amount for any purchase by entering product net price and tax rates.", "category": "Calculator", "url": "/calculators/sales-tax-calculator/"}, {"title": "Scientific Calculator", "desc": "Free online scientific calculator for trigonometry, logarithms, powers, roots, factorials, and constants. Switch between degrees and radians.", "category": "Calculator", "url": "/calculators/scientific-calculator/"}, {"title": "Scientific Notation Calculator", "desc": "Express a number as a coefficient multiplied by a power of ten.", "category": "Calculator", "url": "/calculators/scientific-notation-calculator/"}, {"title": "Significant Figures Calculator", "desc": "Round a number to a selected number of significant figures for science and study.", "category": "Calculator", "url": "/calculators/significant-figures-calculator/"}, {"title": "SIP Calculator Online", "desc": "Use this free SIP Calculator to estimate total investment, SIP returns, maturity value and wealth gain for monthly or quarterly investments.", "category": "Calculator", "url": "/calculators/sip-calculator/"}, {"title": "Slope Calculator", "desc": "Find the slope of a line through two coordinate points.", "category": "Calculator", "url": "/calculators/slope-calculator/"}, {"title": "Sphere Surface Area Calculator", "desc": "Calculate the surface area and volume of a sphere from its radius.", "category": "Calculator", "url": "/calculators/sphere-surface-area-calculator/"}, {"title": "Square Footage Calculator", "desc": "Calculate the square footage (area) of a room or space. Enter length and width measurements.", "category": "Calculator", "url": "/calculators/square-footage-calculator/"}, {"title": "Square Meters to Square Feet Converter", "desc": "Convert square meters to square feet and vice versa instantly. Perfect for real estate and flooring calculations.", "category": "Calculator", "url": "/calculators/square-meter-to-square-feet/"}, {"title": "Square Metres to Acres Converter", "desc": "Convert square metres to acres for land-area measurements.", "category": "Calculator", "url": "/calculators/square-meters-to-acres/"}, {"title": "Standard Deviation Calculator", "desc": "Calculate population and sample standard deviation, variance, and mean for any dataset.", "category": "Calculator", "url": "/calculators/standard-deviation-calculator/"}, {"title": "Statistics Percentile Calculator", "desc": "Find the k-th percentile value for any data set. Enter list values and see calculations.", "category": "Calculator", "url": "/calculators/statistics-percentile/"}, {"title": "TDEE Calculator", "desc": "Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and physical activity thresholds.", "category": "Calculator", "url": "/calculators/tdee-calculator/"}, {"title": "Time Age Checker", "desc": "Check exact ages, verify thresholds (e.g. 18+, 21+), and view time metrics based on birthday.", "category": "Calculator", "url": "/calculators/time-age-checker/"}, {"title": "Day of Week Finder", "desc": "Find what day of the week (Monday, Tuesday, etc.) any specific calendar date falls on.", "category": "Calculator", "url": "/calculators/time-date-day/"}, {"title": "Time Duration Calculator", "desc": "Calculate elapsed hours and minutes between two time periods. Perfect for timesheets and shift tracking.", "category": "Calculator", "url": "/calculators/time-duration/"}, {"title": "How Old Am I Calculator", "desc": "Find your exact age in years, months, weeks, days, and seconds. Realtime countdown calculator.", "category": "Calculator", "url": "/calculators/time-how-old-am-i/"}, {"title": "Time Add & Subtract Calculator", "desc": "Add or subtract days, hours, and minutes from any starting time. Ideal for time cards and duration planning.", "category": "Calculator", "url": "/calculators/time-time-calculator/"}, {"title": "Work Hours Calculator", "desc": "Calculate daily and weekly work hours, breaks, and gross pay with our free online timesheet calculator.", "category": "Calculator", "url": "/calculators/time-work-hours/"}, {"title": "Time Zone Offset Converter", "desc": "Convert a local date and time between two manually entered UTC offsets.", "category": "Calculator", "url": "/calculators/time-zone-offset-converter/"}, {"title": "How Much Water Should I Drink a Day Calculator", "desc": "Use our water intake calculator to estimate how much water you should drink daily in litres, ounces, cups and bottles based on weight, activity, climate and life stage.", "category": "Calculator", "url": "/calculators/water-intake-calculator/"}, {"title": "Watts to Amps Calculator", "desc": "Estimate electrical current from power in watts and voltage in volts.", "category": "Calculator", "url": "/calculators/watts-to-amps-calculator/"}, {"title": "Website Conversion Rate Calculator", "desc": "Calculate website conversion rate from visitors and completed conversions.", "category": "Calculator", "url": "/calculators/website-conversion-rate-calculator/"}, {"title": "Weight Watchers Points Calculator", "desc": "Estimate dietary points valuations based on calories, fat grams, and dietary fiber contents.", "category": "Calculator", "url": "/calculators/weight-watchers-points/"}, {"title": "Z-Score Calculator", "desc": "Calculate how many standard deviations a value is above or below the mean.", "category": "Calculator", "url": "/calculators/z-score-calculator/"}, {"title": "Apple iPhone 17 Pro Max Buying Guide: Price, Specs & Is It Worth It?", "desc": "Apple iPhone 17 Pro Max buying guide for India in 2026: price, specs, camera, battery, storage, features and iPhone 18 Pro Max comparison before you buy.", "category": "Article", "url": "/blog/apple-iphone-17-pro-max-buying-guide/"}, {"title": "CBSE Class 10 Board Exam Date 2027: Latest Date Sheet Update", "desc": "Check the latest CBSE Class 10 board exam date 2027 update, date sheet release status, expected exam period and how to download the official timetable PDF.", "category": "Article", "url": "/blog/education/cbse-class-10-board-exam-date-2027/"}, {"title": "EMI Calculation Guide", "desc": "Learn how EMI is calculated with formula, step-by-step examples, loan EMI calculation method, monthly payment details, and tips to reduce EMI.", "category": "Article", "url": "/blog/emi-calculation-guide/"}, {"title": "General Knowledge About India", "desc": "General knowledge about India with 100+ useful GK facts on states, capitals, geography, history, culture, national symbols, rivers, mountains and important places.", "category": "Article", "url": "/blog/general-knowledge/general-knowledge-about-india/"}, {"title": "Highest Mountains and Peaks in India", "desc": "Explore the highest mountains in India with peak heights, states, ranges, rankings and key facts about Kangchenjunga, Nanda Devi, Kamet and other major peaks.", "category": "Article", "url": "/blog/general-knowledge/highest-mountains-in-india/"}, {"title": "Important Lakes in India", "desc": "Explore important lakes in India with states, types, locations and key GK facts about Wular, Chilika, Sambhar, Loktak, Vembanad, Dal and other major lakes.", "category": "Article", "url": "/blog/general-knowledge/important-lakes-in-india/"}, {"title": "Important Rivers in India", "desc": "Learn about important rivers in India with sources, tributaries, states, drainage systems, lengths and key GK facts about the Ganga, Godavari, Brahmaputra, Narmada and more.", "category": "Article", "url": "/blog/general-knowledge/important-rivers-of-india/"}, {"title": "Indian States and Capitals", "desc": "Check the 28 states of India and their capitals in an updated list, with state-wise details, regional grouping, important GK facts and FAQs for quick revision.", "category": "Article", "url": "/blog/general-knowledge/indian-states-and-capitals/"}, {"title": "Indian States and Languages", "desc": "Check the major languages spoken or associated with all 28 Indian states, language families, scripts, 22 scheduled languages and key GK facts.", "category": "Article", "url": "/blog/general-knowledge/indian-states-and-languages/"}, {"title": "Major Dams in India", "desc": "Explore major dams in India with their rivers, states, uses and key GK facts about Bhakra, Tehri, Hirakud, Sardar Sarovar, Nagarjuna Sagar and more.", "category": "Article", "url": "/blog/general-knowledge/major-dams-in-india/"}, {"title": "National Parks in India", "desc": "Explore national parks in India with the current count, state-wise examples, famous wildlife, first national park, major parks and important GK facts.", "category": "Article", "url": "/blog/general-knowledge/national-parks-in-india/"}, {"title": "National Symbols of India", "desc": "Learn the national symbols of India with the flag, emblem, anthem, song, animal, bird, flower, tree, fruit, aquatic animal and important GK facts.", "category": "Article", "url": "/blog/general-knowledge/national-symbols-of-india/"}, {"title": "Navratri 9 Colours 2026: Day-Wise List with Dates & Goddess", "desc": "See Navratri colours 2026 from 11–19 October with the colour for each day, Goddess Durga’s nine forms, meanings, outfit ideas and FAQs.", "category": "Article", "url": "/blog/general-knowledge/navratri-colours-2026/"}, {"title": "Navratri Mantras 2026: 9 Devi Mantras with Meaning", "desc": "Read the 9 Navratri Devi mantras for 2026 in Sanskrit with transliteration, simple meanings, day-wise dates from Oct 11–19 and respectful chanting guidance.", "category": "Article", "url": "/blog/general-knowledge/navratri-mantras-2026/"}, {"title": "Navratri Wishes 2026: 50+ Messages, Quotes & WhatsApp Status", "desc": "Share Happy Navratri 2026 wishes, heartfelt messages, Maa Durga quotes, short WhatsApp status, greetings for family and friends, and social captions.", "category": "Article", "url": "/blog/general-knowledge/navratri-wishes-2026/"}, {"title": "Union Territories of India", "desc": "Learn about the 8 Union Territories of India with capitals, locations, formation, administrative structure, important GK facts, questions and quick revision notes.", "category": "Article", "url": "/blog/general-knowledge/union-territories-of-india/"}, {"title": "How to Calculate Age Online", "desc": "Learn how to calculate age online from date of birth with simple steps, formula, examples, and exact age in years, months, and days.", "category": "Article", "url": "/blog/how-to-calculate-age/"}, {"title": "How to Calculate BMI: Formula, Chart and Examples", "desc": "Learn how to calculate BMI using the BMI formula with examples, BMI chart, categories, healthy weight range, and easy online BMI calculation steps.", "category": "Article", "url": "/blog/how-to-calculate-bmi/"}, {"title": "Important Days in November 2026 – National & International Days", "desc": "Explore important days in November 2026, including Indian national observances, UN international days, Diwali, Children’s Day, Guru Nanak Jayanti, Constitution Day and more.", "category": "Article", "url": "/blog/important-days-in-november/"}, {"title": "Important Days in October 2026 – National & International Days", "desc": "Explore the important days in October 2026, including national and international days, Gandhi Jayanti, World Teachers’ Day, World Food Day, Dussehra and more.", "category": "Article", "url": "/blog/important-days-in-october/"}, {"title": "Important Days in September 2026: National & International Days", "desc": "Explore the important days in September 2026, including national and international days, awareness days, festivals, and special events.", "category": "Article", "url": "/blog/important-days-in-september/"}, {"title": "How to Calculate Percentages: Complete Percentage Calculation Guide", "desc": "Learn how to calculate percentages with simple formulas, step-by-step examples, percentage increase, decrease, marks, discounts, and real-life calculations.", "category": "Article", "url": "/blog/percentage-calculation-guide/"}, {"title": "Asia Cup Winners List", "desc": "Asia Cup winners list from 1984 to 2025 with champions, runners-up, hosts, formats, final results and the most successful teams in men's Asia Cup history.", "category": "Article", "url": "/blog/sports/asia-cup-winners/"}, {"title": "Cricket Stadiums in India", "desc": "Explore major cricket stadiums in India with cities, states, capacities, home teams, international venues and key cricket facts.", "category": "Article", "url": "/blog/sports/cricket-stadiums-in-india/"}, {"title": "Cricket World Cup Winners List", "desc": "Cricket World Cup winners list from 1975 to 2023 with champions, runners-up, hosts, final venues, winning margins and key World Cup records.", "category": "Article", "url": "/blog/sports/cricket-world-cup-winners/"}, {"title": "Highest Individual Score in ODI Cricket", "desc": "Find the highest individual score in ODI cricket, led by Rohit Sharma’s 264, with the top 10 scores, players, teams, venues and key ODI records.", "category": "Article", "url": "/blog/sports/highest-individual-score-odi/"}, {"title": "IPL 2026 Season Review: Champions, Awards and Records", "desc": "Review IPL 2026 after the final: RCB's title defence, final score, Orange and Purple Cap winners and major season records.", "category": "Article", "url": "/blog/sports/ipl-2026-season-review/"}, {"title": "IPL Auction and Player-Retention Rules Explained", "desc": "Understand IPL player auctions, retained and released players, franchise purse, bidding, overseas limits and why rules vary by season.", "category": "Article", "url": "/blog/sports/ipl-auction-rules/"}, {"title": "Fastest Centuries in IPL History", "desc": "Find the fastest hundreds in IPL history, including Chris Gayle's 30-ball century and Vaibhav Sooryavanshi's Indian-player milestone.", "category": "Article", "url": "/blog/sports/ipl-fastest-century/"}, {"title": "Fastest Fifties in IPL History", "desc": "Check the fastest half-centuries in IPL history, including 13-ball fifties by Yashasvi Jaiswal and Urvil Patel through IPL 2026.", "category": "Article", "url": "/blog/sports/ipl-fastest-fifty/"}, {"title": "IPL Guide: Teams, Winners, Records, Rules and History", "desc": "Explore the IPL guide for team lists, champions, Orange and Purple Cap winners, records, rules, points system, auction basics and IPL 2026 results.", "category": "Article", "url": "/blog/sports/ipl-guide/"}, {"title": "Highest Individual Score in IPL History", "desc": "Find the highest individual score in IPL history, from Chris Gayle's 175* to recent record innings, with notable scores through IPL 2026.", "category": "Article", "url": "/blog/sports/ipl-highest-individual-score/"}, {"title": "Highest Team Totals in IPL History", "desc": "See the highest team innings totals in IPL history, including Sunrisers Hyderabad's 287/3 record and big totals from the 2026 season.", "category": "Article", "url": "/blog/sports/ipl-highest-team-total/"}, {"title": "IPL History: From the First Season to 2026", "desc": "Explore IPL history from 2008 to 2026, including the first match, early champions, team expansion, major milestones and recent winners.", "category": "Article", "url": "/blog/sports/ipl-history/"}, {"title": "IPL Teams and Their Home Grounds", "desc": "Browse all ten IPL teams, their principal home cities and stadiums, with a note on alternate venues and season changes.", "category": "Article", "url": "/blog/sports/ipl-home-grounds/"}, {"title": "IPL Impact Player Rule Explained", "desc": "Learn how the IPL Impact Player rule works, how substitutes are nominated, overseas-player restrictions and key conditions.", "category": "Article", "url": "/blog/sports/ipl-impact-player-rule/"}, {"title": "Most Centuries in IPL History", "desc": "See the leading IPL century-makers through 2026, including Virat Kohli, Jos Buttler, KL Rahul and the record for most hundreds in one season.", "category": "Article", "url": "/blog/sports/ipl-most-centuries/"}, {"title": "Most Runs in IPL History: Top Run-Scorers Through 2026", "desc": "See the IPL all-time leading run-scorers through the 2026 final, including Virat Kohli, Rohit Sharma, career milestones and season-run records.", "category": "Article", "url": "/blog/sports/ipl-most-runs-in-ipl/"}, {"title": "Most Sixes in IPL History", "desc": "Explore IPL six-hitting records through 2026, including career leaders, Vaibhav Sooryavanshi's record 72 sixes in a season and Chris Gayle's milestones.", "category": "Article", "url": "/blog/sports/ipl-most-sixes/"}, {"title": "Most Wickets in IPL History: Leading Bowlers Through 2026", "desc": "Explore the IPL all-time wicket-takers through the 2026 final, led by Yuzvendra Chahal, with career figures and seasonal wicket records.", "category": "Article", "url": "/blog/sports/ipl-most-wickets-in-ipl/"}, {"title": "IPL Orange Cap Winners List from 2008 to 2026", "desc": "See every IPL Orange Cap winner from 2008 to 2026 with team and runs, plus the highest single-season run tally and award records.", "category": "Article", "url": "/blog/sports/ipl-orange-cap-winners/"}, {"title": "IPL Points System and Playoff Qualification Explained", "desc": "Learn how IPL points, wins, no-results, net run rate and the four-team playoff system determine the road to the final.", "category": "Article", "url": "/blog/sports/ipl-points-system-playoffs/"}, {"title": "IPL Purple Cap Winners List from 2008 to 2026", "desc": "Check the full IPL Purple Cap winners list from 2008–2026 with each bowler's team and wicket tally, including the latest winner.", "category": "Article", "url": "/blog/sports/ipl-purple-cap-winners/"}, {"title": "IPL Rules and Format Explained", "desc": "Understand IPL match rules, T20 overs, overseas-player limits, league-stage matches and playoff format.", "category": "Article", "url": "/blog/sports/ipl-rules-format/"}, {"title": "IPL Teams List 2026", "desc": "IPL teams list 2026 with all 10 current teams, abbreviations, home cities, captains, titles, former team names and key IPL facts.", "category": "Article", "url": "/blog/sports/ipl-teams-list/"}, {"title": "IPL Winners List", "desc": "IPL winners list from 2008 to 2026 with champions, runners-up, final venues, winning margins and most successful IPL teams by titles.", "category": "Article", "url": "/blog/sports/ipl-winners-list/"}, {"title": "Most Centuries in International Cricket", "desc": "Check the most centuries in international cricket, led by Sachin Tendulkar, with top century-makers across Tests, ODIs and T20Is and key records.", "category": "Article", "url": "/blog/sports/most-centuries-international-cricket/"}, {"title": "Most Runs in International Cricket: Top Run Scorers", "desc": "Check the most runs in international cricket, with Sachin Tendulkar at the top, Virat Kohli in second and format-wise records across Tests, ODIs and T20Is.", "category": "Article", "url": "/blog/sports/most-runs-international-cricket/"}, {"title": "Most Wickets in International Cricket", "desc": "Check the most wickets in international cricket, led by Muttiah Muralitharan, with top wicket takers across Tests, ODIs and T20Is and format-wise records.", "category": "Article", "url": "/blog/sports/most-wickets-international-cricket/"}, {"title": "T20 World Cup Winners List", "desc": "Men's T20 World Cup winners list from 2007 to 2026 with champions, runners-up, hosts, final venues, winning margins and key T20 World Cup records.", "category": "Article", "url": "/blog/sports/t20-world-cup-winners/"}, {"title": "Bangalore to Goa Distance, Route & Travel Time", "desc": "Plan a Bangalore to Goa journey with route options, approximate travel time, breaks and travel-budget considerations.", "category": "Article", "url": "/blog/travel/bangalore-to-goa-distance/"}, {"title": "Bangalore to Ooty Distance, Route & Travel Time", "desc": "Find the Bangalore to Ooty distance, best road routes, travel time, Bandipur timings, fuel cost tips and practical stops for planning your trip.", "category": "Article", "url": "/blog/travel/bangalore-to-ooty-distance/"}, {"title": "Best Places to Visit in Goa", "desc": "Explore the best places to visit in Goa, from Baga and Palolem to Fort Aguada, Old Goa and Dudhsagar Falls, with practical trip-planning tips.", "category": "Article", "url": "/blog/travel/best-places-to-visit-in-goa/"}, {"title": "Best Places to Visit in Kerala", "desc": "Explore the best places to visit in Kerala, from Munnar and Wayanad to Alleppey, Kochi, Varkala and Thekkady, with practical trip-planning tips.", "category": "Article", "url": "/blog/travel/best-places-to-visit-in-kerala/"}, {"title": "Best Places to Visit in Ooty", "desc": "Explore the best places to visit in Ooty, including Ooty Lake, Botanical Garden, Doddabetta, Rose Garden, Pykara, Avalanche and Nilgiri Mountain Railway, with practical trip-planni", "category": "Article", "url": "/blog/travel/best-places-to-visit-in-ooty/"}, {"title": "Best Time to Visit Goa", "desc": "Find the best time to visit Goa month by month, with weather, monsoon, beach conditions, crowds and practical travel tips for planning your trip.", "category": "Article", "url": "/blog/travel/best-time-to-visit-goa/"}, {"title": "Best Time to Visit Kodaikanal | Month-by-Month Weather Guide", "desc": "Find the best time to visit Kodaikanal month by month, with weather, crowds, rainfall, sightseeing conditions and practical travel tips.", "category": "Article", "url": "/blog/travel/best-time-to-visit-kodaikanal/"}, {"title": "Best Time to Visit Munnar: Month-by-Month Weather & Travel Guide", "desc": "Find the best time to visit Munnar month by month, with weather, monsoon, sightseeing conditions, crowds and practical trip-planning tips.", "category": "Article", "url": "/blog/travel/best-time-to-visit-munnar/"}, {"title": "Best Time to Visit Ooty: Month-by-Month Weather & Travel Guide", "desc": "Find the best time to visit Ooty month by month, with weather, seasons, crowds, sightseeing conditions and practical trip-planning tips.", "category": "Article", "url": "/blog/travel/best-time-to-visit-ooty/"}, {"title": "Chennai to Pondicherry Distance, Route & Travel Time", "desc": "Check the Chennai to Pondicherry distance by road, ECR route, travel time, transport options, fuel cost formula, stops and practical road-trip tips.", "category": "Article", "url": "/blog/travel/chennai-to-pondicherry-distance/"}, {"title": "Goa 3-Day Itinerary: Beaches, Forts & Things to Do", "desc": "Plan a balanced 3-day Goa itinerary with beaches, heritage attractions, food breaks and practical travel tips.", "category": "Article", "url": "/blog/travel/goa-3-day-itinerary/"}, {"title": "Goa Trip Cost: Budget for 3, 5 & 7 Days", "desc": "Plan a practical Goa trip budget for 3, 5 or 7 days with travel, hotels, food, local transport, sightseeing and extra expenses.", "category": "Article", "url": "/blog/travel/goa-trip-cost/"}, {"title": "Kerala Trip Cost: Complete Budget Guide for 3, 5 & 7 Days", "desc": "Plan a Kerala trip budget for 3, 5 or 7 days with travel, hotels, food, local transport, sightseeing, houseboats and extra expenses.", "category": "Article", "url": "/blog/travel/kerala-trip-cost/"}, {"title": "Kodaikanal 2-Day Itinerary: Complete Travel Plan", "desc": "Follow a practical 2-day Kodaikanal itinerary covering the lake, Coaker's Walk, viewpoints, Pillar Rocks, Pine Forest and nearby attractions.", "category": "Article", "url": "/blog/travel/kodaikanal-2-day-itinerary/"}, {"title": "Kodaikanal Trip Cost: Complete Budget Guide", "desc": "Plan your Kodaikanal trip cost for 2, 3 or 4 days with a practical budget breakdown for travel, hotels, food, local transport and sightseeing.", "category": "Article", "url": "/blog/travel/kodaikanal-trip-cost/"}, {"title": "Munnar Trip Cost: Complete Budget Guide for 3, 5 & 7 Days", "desc": "Plan a Munnar trip budget for 3, 5 or 7 days with travel, hotels, food, local transport, sightseeing and activities.", "category": "Article", "url": "/blog/travel/munnar-trip-cost/"}, {"title": "Ooty 2-Day Itinerary: Places, Timings & Travel Tips", "desc": "Plan a practical 2-day Ooty itinerary covering Ooty Lake, Rose Garden, Doddabetta, Coonoor, Sim’s Park and scenic viewpoints without rushing.", "category": "Article", "url": "/blog/travel/ooty-2-day-itinerary/"}, {"title": "Ooty Trip Cost: Complete Budget Guide", "desc": "Plan your Ooty trip cost for 2, 3 or 4 days with a practical budget breakdown for travel, hotels, food, local transport, sightseeing and extra expenses.", "category": "Article", "url": "/blog/travel/ooty-trip-cost/"}, {"title": "Best Places to Visit in Kodaikanal", "desc": "Explore the best places to visit in Kodaikanal, including the lake, Coaker’s Walk, Bryant Park, viewpoints, Pine Forest, Guna Caves and scenic nature spots.", "category": "Article", "url": "/blog/travel/places-to-visit-in-kodaikanal/"}, {"title": "Best Places to Visit in Munnar", "desc": "Explore the best places to visit in Munnar, including Eravikulam National Park, Mattupetty Dam, Top Station, Kundala Lake, tea estates, waterfalls and viewpoints.", "category": "Article", "url": "/blog/travel/places-to-visit-in-munnar/"}];

  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function performSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      if (searchResultsSection) searchResultsSection.classList.remove('active');
      if (searchClearBtn) searchClearBtn.classList.remove('active');
      return;
    }

    if (searchClearBtn) searchClearBtn.classList.add('active');
    if (searchResultsSection) searchResultsSection.classList.add('active');

    const matches = siteCatalog.filter(item =>
      cleanQuery.split(/\s+/).every(word => (item.title+' '+item.desc+' '+item.category).toLowerCase().includes(word))
    );

    if (searchResultsCount) {
      searchResultsCount.textContent = `${matches.length} Result${matches.length === 1 ? '' : 's'}`;
    }

    if (!searchResultsGrid) return;
    searchResultsGrid.innerHTML = '';

    if (matches.length === 0) {
      searchResultsGrid.innerHTML = `
        <div class="no-results-box">
          <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">No matching tools or guides found</p>
          <p style="color: var(--text-muted); font-size: 0.92rem;">Try searching for "loan", "age", "health", "bmi", or "percentage".</p>
        </div>
      `;
      return;
    }

    matches.forEach(item => {
      const card = document.createElement('a');
      card.className = 'tool-card';
      card.href = item.url;
      card.innerHTML = `
        <div class="tool-card-top">
          <span class="tool-category-badge">${escapeHTML(item.category)}</span>
          <span style="color: var(--primary); font-size: 1.1rem;">↗</span>
        </div>
        <div class="tool-card-body">
          <h3 class="tool-title">${escapeHTML(item.title)}</h3>
          <p class="tool-desc">${escapeHTML(item.desc)}</p>
        </div>
        <div class="tool-card-footer">
          <span>Open ${item.category === 'Article' ? 'Guide' : 'Calculator'}</span>
          <span class="tool-cta-text">Launch &rarr;</span>
        </div>
      `;
      searchResultsGrid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch('');
        searchInput.focus();
      });
    }
  }

  // Quick Search Keyboard Trigger (Cmd+K / Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    if (e.key === 'Escape' && searchInput) {
      searchInput.value = '';
      performSearch('');
    }
  });

  if (quickSearchBtn && searchInput) {
    quickSearchBtn.addEventListener('click', () => {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Trending search pills click
  document.querySelectorAll('.trending-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const term = pill.getAttribute('data-search') || pill.textContent.trim();
      if (searchInput) {
        searchInput.value = term;
        performSearch(term);
        searchResultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------------------------------------------------------------
  // 9. Popular Tools Category Filter Bar
  // -------------------------------------------------------------
  const filterPills = document.querySelectorAll('.tools-filter-bar .filter-pill');
  const toolCards = document.querySelectorAll('.tools-grid .tool-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {p.classList.remove('active');p.setAttribute('aria-pressed','false');});
      pill.classList.add('active');pill.setAttribute('aria-pressed','true');

      const selectedCategory = pill.getAttribute('data-category');
      toolCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCat === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 10. Interactive FAQ Accordion
  // -------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Keyboard navigation, menu closing and initial accessible states.
  tabBtns.forEach((btn,index)=>btn.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabBtns.length;
    if(event.key==='ArrowLeft')next=(index+tabBtns.length-1)%tabBtns.length;
    if(event.key==='Home')next=0;if(event.key==='End')next=tabBtns.length-1;
    if(next!==undefined){event.preventDefault();tabBtns[next].click();tabBtns[next].focus();}
  }));
  const closeMenu=()=>{mobileNavPanel?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');};
  mobileNavPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && mobileNavPanel?.classList.contains('open')){closeMenu();menuToggle.focus();}});
  filterPills.forEach(p=>p.setAttribute('aria-pressed',String(p.classList.contains('active'))));
  const filterGrid=document.querySelector('.tools-grid');
  const filterNote=document.createElement('p');filterNote.className='filter-empty';filterNote.hidden=true;filterNote.textContent='Explore the Games & Fun category below for these tools.';filterGrid?.after(filterNote);
  filterPills.forEach(p=>p.addEventListener('click',()=>{filterNote.hidden=Array.from(toolCards).some(c=>c.style.display!=='none');}));
  searchInput?.addEventListener('keydown',event=>{if(event.key==='Enter'){performSearch(searchInput.value);searchResultsSection?.scrollIntoView({behavior:'smooth',block:'start'});}});
  document.querySelector('.search-action-btn')?.addEventListener('click',()=>{performSearch(searchInput.value);searchResultsSection?.scrollIntoView({behavior:'smooth',block:'start'});});
  // Current Year in Footer
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
