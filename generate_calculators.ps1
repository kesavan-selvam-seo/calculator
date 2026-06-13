# Script to generate 45+ unique calculator pages with custom SEO tags and layouts.

$calculators = @(
  # 1. Numbers to Words
  @{
    Slug = "conversions-numbers-to-words"
    Title = "Numbers to Words Converter"
    MetaTitle = "Numbers to Words Converter - Free Online Tool"
    MetaDesc = "Convert numbers to their English word equivalents instantly. Supports large numbers, decimals, and custom outputs."
    Category = "Conversions & Units"
    Icon = "🔢"
    Html = @"
        <div class="form-group">
          <label for="num-input">Enter Number</label>
          <input type="number" id="num-input" value="12345" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert to Words</button>
        <div id="result-section" class="result-section hidden">
          <div class="summary-title">Word Output</div>
          <div id="word-output" class="breakdown-info" style="font-size: 1.125rem; font-weight: 700; margin-top: 1rem;">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const num = parseFloat(document.getElementById('num-input').value);
        if (isNaN(num)) {
          alert('Please enter a valid number.');
          return;
        }
        
        function numberToWords(n) {
          if (n === 0) return 'zero';
          const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
          const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
          const g = ['', 'thousand', 'million', 'billion', 'trillion'];
          
          let string = '';
          let count = 0;
          let temp = Math.floor(n);
          
          if (temp === 0) return 'zero';
          
          while (temp > 0) {
            let rem = temp % 1000;
            if (rem > 0) {
              let s = '';
              if (rem >= 100) {
                s += a[Math.floor(rem / 100)] + ' hundred ';
                rem %= 100;
              }
              if (rem >= 20) {
                s += b[Math.floor(rem / 10)] + (rem % 10 > 0 ? '-' + a[rem % 10] : '');
              } else if (rem > 0) {
                s += a[rem];
              }
              string = s + ' ' + g[count] + ' ' + string;
            }
            temp = Math.floor(temp / 1000);
            count++;
          }
          
          let result = string.trim();
          const dec = Math.round((n - Math.floor(n)) * 100);
          if (dec > 0) {
            result += ' point ' + numberToWords(dec);
          }
          return result;
        }
        
        document.getElementById('word-output').innerText = numberToWords(num);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Numbers to Words Conversion</h2><p>This tool converts numbers into standard English text words. It handles thousands, millions, billions, and decimal points automatically.</p>"
    Faq = "[{`"question`":`"How high can this convert?`",`"answer`":`"It supports numbers up to trillions.`"}]"
  },
  # 2. Time Age Checker
  @{
    Slug = "time-age-checker"
    Title = "Time Age Checker"
    MetaTitle = "Time Age Checker - Verify Age Online"
    MetaDesc = "Check exact ages, verify thresholds (e.g. 18+, 21+), and view time metrics based on birthday."
    Category = "Date & Age"
    Icon = "🔞"
    Html = @"
        <div class="form-group">
          <label for="birth-date">Enter Birth Date</label>
          <input type="date" id="birth-date" class="input-field" />
        </div>
        <div class="form-group">
          <label for="verify-age">Target Age to Verify</label>
          <input type="number" id="verify-age" value="18" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Verify Age</button>
        <div id="result-section" class="result-section hidden">
          <div class="total-balance" id="check-status">Eligible</div>
          <div id="check-details" class="breakdown-info">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dobVal = document.getElementById('birth-date').value;
        const targetAge = parseInt(document.getElementById('verify-age').value);
        if (!dobVal || isNaN(targetAge)) {
          alert('Please enter valid inputs.');
          return;
        }
        const dob = new Date(dobVal);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        const statusEl = document.getElementById('check-status');
        const detailsEl = document.getElementById('check-details');
        
        if (age >= targetAge) {
          statusEl.innerText = 'Verified (' + age + ' Years Old)';
          statusEl.style.color = '#10b981';
          detailsEl.innerText = 'The individual meets the age threshold of ' + targetAge + '.';
        } else {
          statusEl.innerText = 'Not Verified (' + age + ' Years Old)';
          statusEl.style.color = '#ef4444';
          detailsEl.innerText = 'The individual does not meet the age threshold of ' + targetAge + '.';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Verify Age Milestones</h2><p>This age verification utility checks compliance for age gating (like 18+ and 21+ restrictions) instantly based on the birthdate.</p>"
    Faq = "[{`"question`":`"How is the age verified?`",`"answer`":`"It counts the calendar years, months, and days relative to the current local browser time.`"}]"
  },
  # 3. Day Counter
  @{
    Slug = "day-counter"
    Title = "Day Counter"
    MetaTitle = "Day Counter - Count Days Between Dates"
    MetaDesc = "Count the exact number of days between two dates. Fast and easy to use."
    Category = "Date & Age"
    Icon = "📅"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="start-date">Start Date</label>
            <input type="date" id="start-date" class="input-field" />
          </div>
          <div class="form-group">
            <label for="end-date">End Date</label>
            <input type="date" id="end-date" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Count Days</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Total Difference</div>
          <div class="total-balance" id="days-count">0 Days</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const start = document.getElementById('start-date').value;
        const end = document.getElementById('end-date').value;
        if (!start || !end) {
          alert('Please enter both dates.');
          return;
        }
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diff = Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
        document.getElementById('days-count').innerText = diff + ' Days';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Day Counting Online</h2><p>Find the calendar distance between two dates. Ideal for timeline tracking, project goals, and countdown milestones.</p>"
    Faq = "[{`"question`":`"Does it count the end date?`",`"answer`":`"It counts the duration difference between the two calendar points.`"}]"
  },
  # 4. Fuel Cost
  @{
    Slug = "fuel-cost-calculator"
    Title = "Fuel Cost Calculator"
    MetaTitle = "Fuel Cost Calculator - Estimate Trip Expenses"
    MetaDesc = "Calculate fuel cost for any trip. Input distance, efficiency, and price to see travel cost."
    Category = "Finance & Business"
    Icon = "⛽"
    Html = @"
        <div class="form-group">
          <label for="distance">Trip Distance</label>
          <input type="number" id="distance" value="100" class="input-field" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="efficiency">Fuel Efficiency (MPG or L/100km)</label>
            <input type="number" id="efficiency" value="25" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="fuel-price">Fuel Price (per gallon/liter)</label>
            <input type="number" id="fuel-price" value="3.50" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Cost</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Total Fuel Cost</div>
          <div class="total-balance" id="fuel-cost-val">$14.00</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dist = parseFloat(document.getElementById('distance').value);
        const eff = parseFloat(document.getElementById('efficiency').value);
        const price = parseFloat(document.getElementById('fuel-price').value);
        
        if (isNaN(dist) || isNaN(eff) || isNaN(price) || eff <= 0) {
          alert('Please enter valid numeric inputs.');
          return;
        }
        
        // Simple MPG formula
        const gallons = dist / eff;
        const total = gallons * price;
        
        document.getElementById('fuel-cost-val').innerText = '$' + total.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Trip Fuel Budgets</h2><p>Planning a road trip? Estimate gasoline or diesel costs based on vehicle mileage ratings and local pump rates.</p>"
    Faq = "[{`"question`":`"How can I increase gas mileage?`",`"answer`":`"Maintain tires, reduce high highway speeds, and avoid carrying excess load.`"}]"
  },
  # 5. Conversions Height Ft Cm
  @{
    Slug = "conversions-height-ft-cm"
    Title = "Height Feet to Centimeters Converter"
    MetaTitle = "Height Ft to Cm Converter - Convert Height Online"
    MetaDesc = "Convert heights between Feet/Inches and Centimeters instantly with our free online conversion tool."
    Category = "Conversions & Units"
    Icon = "📐"
    Html = @"
        <div class="unit-tabs">
          <button id="ft-to-cm-tab" class="tab-btn active">Ft/In to Cm</button>
          <button id="cm-to-ft-tab" class="tab-btn">Cm to Ft/In</button>
        </div>
        <div id="ft-form" class="form-row">
          <div class="form-group">
            <label for="height-ft">Feet</label>
            <input type="number" id="height-ft" value="5" class="input-field" />
          </div>
          <div class="form-group">
            <label for="height-in">Inches</label>
            <input type="number" id="height-in" value="9" class="input-field" />
          </div>
        </div>
        <div id="cm-form" class="form-group hidden">
          <label for="height-cm">Centimeters</label>
          <input type="number" id="height-cm" value="175" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert Height</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="conversion-result">175.26 cm</div>
        </div>
"@
    Js = @"
      let mode = 'ft-to-cm';
      document.getElementById('ft-to-cm-tab').addEventListener('click', () => {
        mode = 'ft-to-cm';
        document.getElementById('ft-to-cm-tab').classList.add('active');
        document.getElementById('cm-to-ft-tab').classList.remove('active');
        document.getElementById('ft-form').classList.remove('hidden');
        document.getElementById('cm-form').classList.add('hidden');
      });
      document.getElementById('cm-to-ft-tab').addEventListener('click', () => {
        mode = 'cm-to-ft';
        document.getElementById('cm-to-ft-tab').classList.add('active');
        document.getElementById('ft-to-cm-tab').classList.remove('active');
        document.getElementById('cm-form').classList.remove('hidden');
        document.getElementById('ft-form').classList.add('hidden');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const resultEl = document.getElementById('conversion-result');
        if (mode === 'ft-to-cm') {
          const ft = parseFloat(document.getElementById('height-ft').value) || 0;
          const inch = parseFloat(document.getElementById('height-in').value) || 0;
          const cm = ((ft * 12) + inch) * 2.54;
          resultEl.innerText = cm.toFixed(2) + ' cm';
        } else {
          const cm = parseFloat(document.getElementById('height-cm').value) || 0;
          const totalInches = cm / 2.54;
          const ft = Math.floor(totalInches / 12);
          const inch = Math.round(totalInches % 12);
          resultEl.innerText = ft + ' ft ' + inch + ' in';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Height Metric Conversion</h2><p>Easily convert height measurements between the Imperial (feet/inches) and Metric (centimeters) systems.</p>"
    Faq = "[{`"question`":`"How many cm is 1 inch?`",`"answer`":`"One inch is exactly equal to 2.54 centimeters.`"}]"
  },
  # 6. Time How Old Am I
  @{
    Slug = "time-how-old-am-i"
    Title = "How Old Am I Calculator"
    MetaTitle = "How Old Am I? - Age in Days & Seconds"
    MetaDesc = "Find your exact age in years, months, weeks, days, and seconds. Realtime countdown calculator."
    Category = "Date & Age"
    Icon = "⏱️"
    Html = @"
        <div class="form-group">
          <label for="birthdate-input">Enter Birth Date &amp; Time</label>
          <input type="datetime-local" id="birthdate-input" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Find Age</button>
        <div id="result-section" class="result-section hidden">
          <div class="summary-title" style="text-align: center;">Age Statistics</div>
          <div class="metric-grid" style="margin-top: 1rem;">
            <div class="metric-card">
              <span class="metric-title">Days Old</span>
              <span class="metric-value" id="days-old">0</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Hours Old</span>
              <span class="metric-value" id="hours-old">0</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Seconds Old</span>
              <span class="metric-value" id="seconds-old">0</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      let timer = null;
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const bdayVal = document.getElementById('birthdate-input').value;
        if (!bdayVal) {
          alert('Please enter a birthdate.');
          return;
        }
        if (timer) clearInterval(timer);
        
        function updateAge() {
          const dob = new Date(bdayVal);
          const now = new Date();
          const diffMs = now - dob;
          if (diffMs < 0) {
            document.getElementById('days-old').innerText = '0';
            document.getElementById('hours-old').innerText = '0';
            document.getElementById('seconds-old').innerText = '0';
            return;
          }
          const seconds = Math.floor(diffMs / 1000);
          const hours = Math.floor(seconds / 3600);
          const days = Math.floor(hours / 24);
          
          document.getElementById('days-old').innerText = days.toLocaleString();
          document.getElementById('hours-old').innerText = hours.toLocaleString();
          document.getElementById('seconds-old').innerText = seconds.toLocaleString();
        }
        
        updateAge();
        timer = setInterval(updateAge, 1000);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Compute Your Lifespan Metrics</h2><p>Get a ticking, real-time breakdown of your existence on Earth down to the second.</p>"
    Faq = "[{`"question`":`"How accurate is this checker?`",`"answer`":`"It counts the millisecond timestamps directly from your system calendar clocks.`"}]"
  },
  # 7. Million to Rupees
  @{
    Slug = "million-to-rupees"
    Title = "Million to Rupees Converter"
    MetaTitle = "Million to Rupees Converter - Indian Currency Converter"
    MetaDesc = "Convert Millions to Indian Rupees (INR) instantly. Supports custom conversions for Lakhs and Crores."
    Category = "Conversions & Units"
    Icon = "🇮🇳"
    Html = @"
        <div class="form-group">
          <label for="millions-val">Millions</label>
          <input type="number" id="millions-val" value="1" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert to INR</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Indian Rupees (INR)</div>
          <div class="total-balance" id="rupees-val">₹10,00,000</div>
          <div class="breakdown-info" id="lakh-crore-val">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const millions = parseFloat(document.getElementById('millions-val').value);
        if (isNaN(millions) || millions < 0) {
          alert('Please enter a valid amount.');
          return;
        }
        
        // 1 Million = 10 Lakhs = 1,000,000 Rupees
        const rupees = millions * 1000000;
        const lakhs = millions * 10;
        const crores = millions / 10;
        
        const formatRupees = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(rupees);
        
        document.getElementById('rupees-val').innerText = formatRupees;
        document.getElementById('lakh-crore-val').innerHTML = 'Equivalent to: <strong>' + lakhs + ' Lakhs</strong> or <strong>' + crores + ' Crores</strong>.';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Convert International Scales to Indian System</h2><p>Indian currency calculations express large amounts in Lakhs and Crores rather than Millions or Billions. Use this converter to align international numbers into Indian Rupee scales.</p>"
    Faq = "[{`"question`":`"What is 1 Million in Rupees?`",`"answer`":`"1 Million is equal to 10 Lakh Rupees (₹10,00,000).`"}]"
  },
  # 8. Lbs to Kg Converter
  @{
    Slug = "lbs-to-kg-converter"
    Title = "Pounds to Kilograms Converter"
    MetaTitle = "Lbs to Kg Converter - Convert Weight Online"
    MetaDesc = "Convert weight measurements from Pounds (lbs) to Kilograms (kg) and vice versa with our free online weight converter."
    Category = "Conversions & Units"
    Icon = "⚖️"
    Html = @"
        <div class="unit-tabs">
          <button id="lbs-to-kg-tab" class="tab-btn active">Lbs to Kg</button>
          <button id="kg-to-lbs-tab" class="tab-btn">Kg to Lbs</button>
        </div>
        <div class="form-group">
          <label for="weight-input">Enter Weight</label>
          <input type="number" id="weight-input" value="150" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert Weight</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="weight-result">68.04 kg</div>
        </div>
"@
    Js = @"
      let mode = 'lbs-to-kg';
      document.getElementById('lbs-to-kg-tab').addEventListener('click', () => {
        mode = 'lbs-to-kg';
        document.getElementById('lbs-to-kg-tab').classList.add('active');
        document.getElementById('kg-to-lbs-tab').classList.remove('active');
      });
      document.getElementById('kg-to-lbs-tab').addEventListener('click', () => {
        mode = 'kg-to-lbs';
        document.getElementById('kg-to-lbs-tab').classList.add('active');
        document.getElementById('lbs-to-kg-tab').classList.remove('active');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('weight-input').value);
        if (isNaN(val)) {
          alert('Please enter a valid weight.');
          return;
        }
        const resEl = document.getElementById('weight-result');
        if (mode === 'lbs-to-kg') {
          resEl.innerText = (val * 0.45359237).toFixed(2) + ' kg';
        } else {
          resEl.innerText = (val / 0.45359237).toFixed(2) + ' lbs';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Weight Conversion Formula</h2><p>Pounds to kilograms conversion uses the multiplier <code>0.45359237</code>. Multiply pounds by this value to get weight in kg.</p>"
    Faq = "[{`"question`":`"How many lbs is 1 kg?`",`"answer`":`"One kilogram is roughly equal to 2.20462 pounds.`"}]"
  },
  # 9. Pregnancy
  @{
    Slug = "pregnancy-calculator"
    Title = "Pregnancy Due Date Calculator"
    MetaTitle = "Pregnancy Calculator - Estimate Due Date"
    MetaDesc = "Estimate your due date, current gestational age, and pregnancy progress milestones based on your last menstrual period (LMP)."
    Category = "Fitness & Health"
    Icon = "👶"
    Html = @"
        <div class="form-group">
          <label for="lmp-date">First Day of Last Period (LMP)</label>
          <input type="date" id="lmp-date" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Due Date</button>
        <div id="result-section" class="result-section hidden">
          <div class="summary-title" style="text-align: center;">Estimated Due Date</div>
          <div class="total-balance" id="due-date-val" style="text-align: center; font-size: 2rem; color: var(--accent);">...</div>
          <div class="breakdown-info" id="gestational-details" style="margin-top: 1.5rem;">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const lmpVal = document.getElementById('lmp-date').value;
        if (!lmpVal) {
          alert('Please select a date.');
          return;
        }
        const lmp = new Date(lmpVal);
        // Naegele's rule: add 280 days (40 weeks) to LMP
        const due = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
        
        const now = new Date();
        const diffMs = now - lmp;
        const totalDays = diffMs / (1000 * 60 * 60 * 24);
        const weeks = Math.floor(totalDays / 7);
        const days = Math.floor(totalDays % 7);
        
        document.getElementById('due-date-val').innerText = due.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let details = '';
        if (weeks >= 40) {
          details = 'You are at full term. Estimated gestational age is: <strong>' + weeks + ' weeks</strong>.';
        } else if (weeks < 0) {
          details = 'LMP cannot be in the future of today.';
        } else {
          details = 'Gestational progress: <strong>' + weeks + ' weeks and ' + days + ' days</strong>.<br>Days remaining: <strong>' + Math.ceil(280 - totalDays) + ' days</strong>.';
        }
        document.getElementById('gestational-details').innerHTML = details;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Pregnancy Timeline Verification</h2><p>This calculator estimates gestational milestones according to the standard clinical 40-week gestation calendar cycle.</p>"
    Faq = "[{`"question`":`"What is Naegele's Rule?`",`"answer`":`"It is a clinical estimation formula that takes the first day of your LMP, adds one year, subtracts three months, and adds seven days.`"}]"
  },
  # 10. Billion to Rupees
  @{
    Slug = "billion-to-rupees"
    Title = "Billion to Rupees Converter"
    MetaTitle = "Billion to Rupees Converter - Indian Currency Converter"
    MetaDesc = "Convert Billions to Indian Rupees (INR) instantly. Check the conversion value in Crores and Lakhs."
    Category = "Conversions & Units"
    Icon = "🇮🇳"
    Html = @"
        <div class="form-group">
          <label for="billions-val">Billions</label>
          <input type="number" id="billions-val" value="1" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert to INR</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Indian Rupees (INR)</div>
          <div class="total-balance" id="b-rupees-val">₹1,00,00,00,000</div>
          <div class="breakdown-info" id="b-crore-val">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const billions = parseFloat(document.getElementById('billions-val').value);
        if (isNaN(billions) || billions < 0) {
          alert('Please enter a valid amount.');
          return;
        }
        
        // 1 Billion = 1,000 Millions = 100 Crores = 1,000,000,000 Rupees
        const rupees = billions * 1000000000;
        const crores = billions * 100;
        
        const formatRupees = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(rupees);
        
        document.getElementById('b-rupees-val').innerText = formatRupees;
        document.getElementById('b-crore-val').innerHTML = 'Equivalent to: <strong>' + crores + ' Crores</strong>.';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Convert Billions to Indian Rupees</h2><p>Align international financial metrics expressing values in Billions directly with Indian currency scales (Crores).</p>"
    Faq = "[{`"question`":`"What is 1 Billion in Crores?`",`"answer`":`"1 Billion is exactly equal to 100 Crores.`"}]"
  },
  # 11. Time Duration
  @{
    Slug = "time-duration"
    Title = "Time Duration Calculator"
    MetaTitle = "Time Duration Calculator - Time Difference Online"
    MetaDesc = "Calculate elapsed hours and minutes between two time periods. Perfect for timesheets and shift tracking."
    Category = "Date & Age"
    Icon = "⏱️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="time-start">Start Time</label>
            <input type="time" id="time-start" class="input-field" />
          </div>
          <div class="form-group">
            <label for="time-end">End Time</label>
            <input type="time" id="time-end" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Duration</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Elapsed Time</div>
          <div class="total-balance" id="duration-val">0h 0m</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const start = document.getElementById('time-start').value;
        const end = document.getElementById('time-end').value;
        if (!start || !end) {
          alert('Please enter both start and end times.');
          return;
        }
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        
        let startMinutes = (sh * 60) + sm;
        let endMinutes = (eh * 60) + em;
        
        if (endMinutes < startMinutes) {
          // Wrap around next day
          endMinutes += 24 * 60;
        }
        
        const diff = endMinutes - startMinutes;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        
        document.getElementById('duration-val').innerText = h + ' hours ' + m + ' minutes';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Elapsed Shift Timelines</h2><p>Track working shift spans or task elapsed periods by entering start and end times.</p>"
    Faq = "[{`"question`":`"Does this handle overnight times?`",`"answer`":`"Yes. If the end time is numerically before the start time, it assumes a crossing into the next day.`"}]"
  },
  # 12. CGPA
  @{
    Slug = "cgpa-calculator"
    Title = "CGPA Calculator"
    MetaTitle = "CGPA Calculator - Cumulative Grade Point Average"
    MetaDesc = "Estimate your Cumulative Grade Point Average (CGPA) from individual semester grade marks."
    Category = "Scientific & Math"
    Icon = "🎓"
    Html = @"
        <div id="semesters-container">
          <div class="form-row semester-row">
            <div class="form-group">
              <label>GPA Semester 1</label>
              <input type="number" class="input-field gpa-val" placeholder="e.g. 8.5" step="0.01" />
            </div>
            <div class="form-group">
              <label>Credits Semester 1</label>
              <input type="number" class="input-field credit-val" placeholder="e.g. 20" />
            </div>
          </div>
        </div>
        <button id="add-sem-btn" class="calc-btn" style="background:var(--border-light); color:var(--text-primary); margin-bottom:1rem;">+ Add Semester</button>
        <button id="calc-btn" class="calc-btn">Calculate CGPA</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Cumulative Grade Points (CGPA)</div>
          <div class="total-balance" id="cgpa-val" style="color:var(--accent);">0.00</div>
        </div>
"@
    Js = @"
      let semesterCount = 1;
      document.getElementById('add-sem-btn').addEventListener('click', () => {
        semesterCount++;
        const container = document.getElementById('semesters-container');
        const div = document.createElement('div');
        div.className = 'form-row semester-row';
        div.innerHTML = `
          <div class="form-group">
            <label>GPA Semester ${semesterCount}</label>
            <input type="number" class="input-field gpa-val" placeholder="e.g. 8.5" step="0.01" />
          </div>
          <div class="form-group">
            <label>Credits Semester ${semesterCount}</label>
            <input type="number" class="input-field credit-val" placeholder="e.g. 20" />
          </div>
        `;
        container.appendChild(div);
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const gpaInputs = document.querySelectorAll('.gpa-val');
        const creditInputs = document.querySelectorAll('.credit-val');
        
        let totalWeightedPoints = 0;
        let totalCredits = 0;
        
        for (let i = 0; i < gpaInputs.length; i++) {
          const gpa = parseFloat(gpaInputs[i].value);
          const credits = parseFloat(creditInputs[i].value) || 1; // Default credit weight 1 if empty
          
          if (!isNaN(gpa)) {
            totalWeightedPoints += (gpa * credits);
            totalCredits += credits;
          }
        }
        
        if (totalCredits === 0) {
          alert('Please enter valid semesters GPA.');
          return;
        }
        
        const cgpa = totalWeightedPoints / totalCredits;
        document.getElementById('cgpa-val').innerText = cgpa.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Semester CGPA</h2><p>Our CGPA calculator weights individual GPA inputs by semester credits, yielding an accurate cumulative grade average.</p>"
    Faq = "[{`"question`":`"How is CGPA calculated?`",`"answer`":`"Multiply GPA of each semester by its credit value. Sum these up and divide by the total number of credits.`"}]"
  },
  # 13. Profit
  @{
    Slug = "profit-calculator"
    Title = "Profit & Margin Calculator"
    MetaTitle = "Profit & Margin Calculator - Free Business Calculator"
    MetaDesc = "Calculate business profit amounts, markup ratios, and margins instantly based on cost and selling price."
    Category = "Finance & Business"
    Icon = "📈"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="cost-price">Cost Price ($)</label>
            <input type="number" id="cost-price" value="50" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="selling-price">Selling Price ($)</label>
            <input type="number" id="selling-price" value="80" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Profit</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Gross Profit</span>
              <span class="metric-value" id="profit-val">$30.00</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Profit Margin</span>
              <span class="metric-value" id="margin-val">37.5%</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Markup</span>
              <span class="metric-value" id="markup-val">60%</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const cost = parseFloat(document.getElementById('cost-price').value);
        const sell = parseFloat(document.getElementById('selling-price').value);
        
        if (isNaN(cost) || isNaN(sell) || cost < 0 || sell < 0 || sell === 0) {
          alert('Please enter valid numeric inputs.');
          return;
        }
        
        const profit = sell - cost;
        const margin = (profit / sell) * 100;
        const markup = cost === 0 ? 0 : (profit / cost) * 100;
        
        document.getElementById('profit-val').innerText = '$' + profit.toFixed(2);
        document.getElementById('margin-val').innerText = margin.toFixed(1) + '%';
        document.getElementById('markup-val').innerText = markup.toFixed(1) + '%';
        
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Retail Margin Metrics</h2><p>Understand the profitability of your products. Margin measures profit relative to sales price, while markup evaluates markup over purchase cost.</p>"
    Faq = "[{`"question`":`"What is the difference between margin and markup?`",`"answer`":`"Margin is profit divided by sales price. Markup is profit divided by cost price.`"}]"
  },
  # 14. Statistics Percentile
  @{
    Slug = "statistics-percentile"
    Title = "Statistics Percentile Calculator"
    MetaTitle = "Percentile Calculator - Statistics Tool"
    MetaDesc = "Find the k-th percentile value for any data set. Enter list values and see calculations."
    Category = "Scientific & Math"
    Icon = "📊"
    Html = @"
        <div class="form-group">
          <label for="data-set">Data Set (Comma-separated numbers)</label>
          <input type="text" id="data-set" value="10, 20, 35, 45, 50, 60, 75, 80, 90" class="input-field" />
        </div>
        <div class="form-group">
          <label for="percentile-k">Percentile Value (K %)</label>
          <input type="number" id="percentile-k" value="90" class="input-field" min="1" max="99" />
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Percentile</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">K-th Percentile Value</div>
          <div class="total-balance" id="percentile-result" style="color:var(--accent);">80.0</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const text = document.getElementById('data-set').value;
        const k = parseFloat(document.getElementById('percentile-k').value);
        
        if (!text || isNaN(k) || k <= 0 || k >= 100) {
          alert('Please enter valid dataset inputs and K values.');
          return;
        }
        
        const arr = text.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a,b) => a-b);
        if (arr.length === 0) {
          alert('Invalid dataset input.');
          return;
        }
        
        // Percentile rank index: (k/100) * (N - 1)
        const index = (k / 100) * (arr.length - 1);
        let val = 0;
        if (index % 1 === 0) {
          val = arr[index];
        } else {
          const lower = arr[Math.floor(index)];
          const upper = arr[Math.ceil(index)];
          val = lower + (index - Math.floor(index)) * (upper - lower);
        }
        
        document.getElementById('percentile-result').innerText = val.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Percentiles</h2><p>A percentile indicates the value below which a given percentage of observations falls. Excellent tool for standardized grading checks.</p>"
    Faq = "[{`"question`":`"What does the 90th percentile mean?`",`"answer`":`"It means that 90% of the values in the dataset are below or equal to this number.`"}]"
  },
  # 15. Games Lottery Number Generator
  @{
    Slug = "games-lottery-number-generator"
    Title = "Lottery Number Generator"
    MetaTitle = "Lottery Number Generator - Random Numbers"
    MetaDesc = "Generate random lottery ticket numbers. Choose your range size and count to customize tickets."
    Category = "Games & Fun"
    Icon = "🎰"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="lot-min">Min Value</label>
            <input type="number" id="lot-min" value="1" class="input-field" />
          </div>
          <div class="form-group">
            <label for="lot-max">Max Value</label>
            <input type="number" id="lot-max" value="49" class="input-field" />
          </div>
          <div class="form-group">
            <label for="lot-count">Numbers Count</label>
            <input type="number" id="lot-count" value="6" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Generate Ticket</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Your Numbers</div>
          <div class="total-balance" id="lottery-numbers" style="display:flex; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-top:1rem;">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const min = parseInt(document.getElementById('lot-min').value);
        const max = parseInt(document.getElementById('lot-max').value);
        const count = parseInt(document.getElementById('lot-count').value);
        
        if (isNaN(min) || isNaN(max) || isNaN(count) || count <= 0 || max <= min || (max - min + 1) < count) {
          alert('Please enter valid configuration ranges.');
          return;
        }
        
        const set = new Set();
        while (set.size < count) {
          const rand = Math.floor(Math.random() * (max - min + 1)) + min;
          set.add(rand);
        }
        
        const nums = Array.from(set).sort((a,b) => a-b);
        const html = nums.map(n => `<span style="background:var(--primary); color:white; font-size:1.25rem; font-weight:800; width:3rem; height:3rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);">${n}</span>`).join('');
        document.getElementById('lottery-numbers').innerHTML = html;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Generate Lucky Numbers</h2><p>Draw randomized lottery entries based on configurable bounds. Great for Powerball, Mega Millions, or general prize draws.</p>"
    Faq = "[{`"question`":`"Are these numbers truly random?`",`"answer`":`"They are generated using JavaScript's pseudo-random number generator, which yields high randomness for casual games.`"}]"
  },
  # 16. Time Work Hours
  @{
    Slug = "time-work-hours"
    Title = "Work Hours Calculator"
    MetaTitle = "Work Hours Calculator - Employee Timesheet Tool"
    MetaDesc = "Calculate daily and weekly work hours, breaks, and gross pay with our free online timesheet calculator."
    Category = "Date & Age"
    Icon = "💼"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="hours-mon">Mon Hours</label>
            <input type="number" id="hours-mon" value="8" class="input-field hours-input" step="any" />
          </div>
          <div class="form-group">
            <label for="hours-tue">Tue Hours</label>
            <input type="number" id="hours-tue" value="8" class="input-field hours-input" step="any" />
          </div>
          <div class="form-group">
            <label for="hours-wed">Wed Hours</label>
            <input type="number" id="hours-wed" value="8" class="input-field hours-input" step="any" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="hours-thu">Thu Hours</label>
            <input type="number" id="hours-thu" value="8" class="input-field hours-input" step="any" />
          </div>
          <div class="form-group">
            <label for="hours-fri">Fri Hours</label>
            <input type="number" id="hours-fri" value="8" class="input-field hours-input" step="any" />
          </div>
          <div class="form-group">
            <label for="hourly-rate">Hourly Rate ($)</label>
            <input type="number" id="hourly-rate" value="15" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Pay</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Total Hours</span>
              <span class="metric-value" id="work-hours-val">40</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Gross Pay</span>
              <span class="metric-value" id="gross-pay-val" style="color:var(--accent);">$600.00</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const rate = parseFloat(document.getElementById('hourly-rate').value) || 0;
        let totalHours = 0;
        document.querySelectorAll('.hours-input').forEach(input => {
          totalHours += parseFloat(input.value) || 0;
        });
        const pay = totalHours * rate;
        document.getElementById('work-hours-val').innerText = totalHours.toFixed(1);
        document.getElementById('gross-pay-val').innerText = '$' + pay.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Weekly Wages</h2><p>Enter your hours worked from Monday to Friday, input your hourly wage rate, and check your projected earnings.</p>"
    Faq = "[{`"question`":`"How is overtime handled?`",`"answer`":`"This simple sheet calculates raw hours times rate. Standard overtime premiums can be configured by increasing hours or computing separately.`"}]"
  },
  # 17. HCF Calculator
  @{
    Slug = "hcf-calculator"
    Title = "HCF & LCM Calculator"
    MetaTitle = "HCF & LCM Calculator - Find Common Factors"
    MetaDesc = "Find the Highest Common Factor (HCF / GCD) and Least Common Multiple (LCM) for any two numbers."
    Category = "Scientific & Math"
    Icon = "📐"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="num-a">Number A</label>
            <input type="number" id="num-a" value="24" class="input-field" />
          </div>
          <div class="form-group">
            <label for="num-b">Number B</label>
            <input type="number" id="num-b" value="36" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Find Factors</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">HCF (GCD)</span>
              <span class="metric-value" id="hcf-val">12</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">LCM</span>
              <span class="metric-value" id="lcm-val">72</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        let a = Math.abs(parseInt(document.getElementById('num-a').value));
        let b = Math.abs(parseInt(document.getElementById('num-b').value));
        
        if (isNaN(a) || isNaN(b) || a === 0 || b === 0) {
          alert('Please enter valid non-zero integers.');
          return;
        }
        
        const origA = a;
        const origB = b;
        
        // Euclidean algorithm for GCD
        while (b) {
          let temp = b;
          b = a % b;
          a = temp;
        }
        const hcf = a;
        const lcm = (origA * origB) / hcf;
        
        document.getElementById('hcf-val').innerText = hcf;
        document.getElementById('lcm-val').innerText = lcm;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Common Factors Math</h2><p>Find the highest common division factor (HCF) and the lowest common multiple (LCM) for integers instantly.</p>"
    Faq = "[{`"question`":`"What is Euclidean algorithm?`",`"answer`":`"It is an ancient, highly efficient mathematical method to calculate the greatest common divisor of two numbers by repeated division modulo.`"}]"
  },
  # 18. TDEE
  @{
    Slug = "tdee-calculator"
    Title = "TDEE Calculator"
    MetaTitle = "TDEE Calculator - Total Daily Energy Expenditure"
    MetaDesc = "Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and physical activity thresholds."
    Category = "Fitness & Health"
    Icon = "🔥"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="t-bmr">Basal Metabolic Rate (BMR) (kcal)</label>
            <input type="number" id="t-bmr" value="1600" class="input-field" />
          </div>
          <div class="form-group">
            <label for="t-activity">Activity Level</label>
            <select id="t-activity" class="select-field">
              <option value="1.2" selected>Sedentary (1.2)</option>
              <option value="1.375">Lightly Active (1.375)</option>
              <option value="1.55">Moderately Active (1.55)</option>
              <option value="1.725">Very Active (1.725)</option>
              <option value="1.9">Extra Active (1.9)</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate TDEE</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Total Energy Burned (TDEE)</div>
          <div class="total-balance" id="tdee-val" style="color:var(--accent);">1,920 kcal</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const bmr = parseFloat(document.getElementById('t-bmr').value);
        const act = parseFloat(document.getElementById('t-activity').value);
        if (isNaN(bmr) || bmr <= 0) {
          alert('Please enter a valid BMR.');
          return;
        }
        const tdee = bmr * act;
        document.getElementById('tdee-val').innerText = Math.round(tdee).toLocaleString() + ' kcal';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Total Energy Outlay</h2><p>Your TDEE estimates how many total calories your body burns in a 24-hour cycle including physical movements and workouts.</p>"
    Faq = "[{`"question`":`"How is TDEE used in dieting?`",`"answer`":`"Eat below TDEE for weight loss; eat above TDEE for muscle mass gain.`"}]"
  },
  # 19. Weight Watchers Points
  @{
    Slug = "weight-watchers-points"
    Title = "Weight Watchers Points Calculator"
    MetaTitle = "Weight Watchers Points Calculator - Dietary Estimator"
    MetaDesc = "Estimate dietary points valuations based on calories, fat grams, and dietary fiber contents."
    Category = "Fitness & Health"
    Icon = "🍎"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="ww-calories">Calories (kcal)</label>
            <input type="number" id="ww-calories" value="150" class="input-field" />
          </div>
          <div class="form-group">
            <label for="ww-fat">Fat (grams)</label>
            <input type="number" id="ww-fat" value="5" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="ww-fiber">Fiber (grams)</label>
            <input type="number" id="ww-fiber" value="2" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Estimate Points</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">WW Point Value</div>
          <div class="total-balance" id="ww-points-val">3 Points</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const cal = parseFloat(document.getElementById('ww-calories').value) || 0;
        const fat = parseFloat(document.getElementById('ww-fat').value) || 0;
        const fib = parseFloat(document.getElementById('ww-fiber').value) || 0;
        
        // Classic WW Formula: (Calories / 50) + (Fat / 12) - (Fiber / 5, max 4)
        const fiberPart = Math.min(fib, 4) / 5;
        let points = (cal / 50) + (fat / 12) - fiberPart;
        points = Math.max(0, Math.round(points));
        
        document.getElementById('ww-points-val').innerText = points + ' ' + (points === 1 ? 'Point' : 'Points');
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Dietary Point Estimation</h2><p>Our calculator yields values close to original classic points formulas, helping you evaluate portion selections.</p>"
    Faq = "[{`"question`":`"Is this affiliated with WW?`",`"answer`":`"No. This is an independent mathematical simulation of classic point index formulas.`"}]"
  },
  # 20. Million to Crore
  @{
    Slug = "million-to-crore"
    Title = "Million to Crore Converter"
    MetaTitle = "Million to Crore Converter - Indian Scaling Converter"
    MetaDesc = "Convert Millions to Crores instantly. Check international financial scaling in Indian number formats."
    Category = "Conversions & Units"
    Icon = "🇮🇳"
    Html = @"
        <div class="form-group">
          <label for="mc-millions">Millions</label>
          <input type="number" id="mc-millions" value="10" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert to Crore</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Crores</div>
          <div class="total-balance" id="crore-val-result">1.0 Crore</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const m = parseFloat(document.getElementById('mc-millions').value);
        if (isNaN(m) || m < 0) {
          alert('Please enter valid inputs.');
          return;
        }
        // 10 Million = 1 Crore
        const c = m / 10;
        document.getElementById('crore-val-result').innerText = c.toFixed(2) + ' Crore';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Million to Crore Indian System</h2><p>Quick conversion to represent international metrics in Crore formats (1 Crore = 10 Millions).</p>"
    Faq = "[{`"question`":`"What is 100 Million in Crore?`",`"answer`":`"100 Million equals exactly 10 Crore.`"}]"
  },
  # 21. Math Rounding Numbers
  @{
    Slug = "math-rounding-numbers"
    Title = "Rounding Numbers Calculator"
    MetaTitle = "Math Rounding Calculator - Round Numbers Online"
    MetaDesc = "Round numbers to the nearest unit, ten, hundred, thousand, or decimal index. Free and fast."
    Category = "Scientific & Math"
    Icon = "🔢"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="round-num">Number</label>
            <input type="number" id="round-num" value="123.456" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="round-place">Rounding Mode</label>
            <select id="round-place" class="select-field">
              <option value="0">Nearest Integer</option>
              <option value="1">1 Decimal Place (Tenths)</option>
              <option value="2" selected>2 Decimal Places (Hundredths)</option>
              <option value="-1">Nearest Ten</option>
              <option value="-2">Nearest Hundred</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Round Number</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Rounded Value</div>
          <div class="total-balance" id="rounded-result">123.46</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('round-num').value);
        const place = parseInt(document.getElementById('round-place').value);
        
        if (isNaN(val)) {
          alert('Please enter a valid number.');
          return;
        }
        
        let result = 0;
        if (place >= 0) {
          result = Math.round(val * Math.pow(10, place)) / Math.pow(10, place);
        } else {
          const factor = Math.pow(10, Math.abs(place));
          result = Math.round(val / factor) * factor;
        }
        
        document.getElementById('rounded-result').innerText = result;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Numbers Rounding Methods</h2><p>Round numeric digits according to standard arithmetic rules. If the trailing digit is 5 or greater, the number rounds up.</p>"
    Faq = "[{`"question`":`"How does round-half-up work?`",`"answer`":`"Halfway values (like 0.5) round up to the next highest integer.`"}]"
  },
  # 22. Age Difference
  @{
    Slug = "age-difference-calculator"
    Title = "Age Difference Calculator"
    MetaTitle = "Age Difference Calculator - Compare Birthday Ages"
    MetaDesc = "Compare two birthdays and calculate the exact age gap in years, months, and days."
    Category = "Date & Age"
    Icon = "🎂"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="bday-a">Person A Birthday</label>
            <input type="date" id="bday-a" class="input-field" />
          </div>
          <div class="form-group">
            <label for="bday-b">Person B Birthday</label>
            <input type="date" id="bday-b" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Find Difference</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Age Gap</div>
          <div class="total-balance" id="age-gap-val">0 Years</div>
          <div class="breakdown-info" id="age-gap-breakdown" style="text-align: left; margin-top: 1rem;">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const aVal = document.getElementById('bday-a').value;
        const bVal = document.getElementById('bday-b').value;
        if (!aVal || !bVal) {
          alert('Please enter both dates.');
          return;
        }
        
        const d1 = new Date(aVal);
        const d2 = new Date(bVal);
        
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        let years = Math.abs(d2.getFullYear() - d1.getFullYear());
        let months = Math.abs(d2.getMonth() - d1.getMonth());
        let days = Math.abs(d2.getDate() - d1.getDate());
        
        document.getElementById('age-gap-val').innerText = (diffDays / 365.25).toFixed(1) + ' Years';
        document.getElementById('age-gap-breakdown').innerHTML = 'The exact difference in calendar days is: <strong>' + diffDays.toLocaleString() + ' Days</strong>.';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Compare Ages Between People</h2><p>Find the exact timeline gap between spouses, siblings, or friends instantly by comparing birthdays.</p>"
    Faq = "[{`"question`":`"Who is older?`",`"answer`":`"The person with the earlier chronological birth date is older.`"}]"
  },
  # 23. Math Long Division
  @{
    Slug = "math-long-division"
    Title = "Long Division Calculator"
    MetaTitle = "Long Division Calculator - Solve Division Steps"
    MetaDesc = "Perform long division and see calculated quotients and remainders instantly with our free online tool."
    Category = "Scientific & Math"
    Icon = "📐"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="dividend">Dividend</label>
            <input type="number" id="dividend" value="125" class="input-field" />
          </div>
          <div class="form-group">
            <label for="divisor">Divisor</label>
            <input type="number" id="divisor" value="4" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Solve Division</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Quotient (Integer)</span>
              <span class="metric-value" id="quotient-val">31</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Remainder</span>
              <span class="metric-value" id="remainder-val">1</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Decimal Quotient</span>
              <span class="metric-value" id="decimal-val">31.25</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dividend = parseInt(document.getElementById('dividend').value);
        const divisor = parseInt(document.getElementById('divisor').value);
        
        if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
          alert('Please enter valid numbers. Divisor cannot be zero.');
          return;
        }
        
        const quot = Math.floor(dividend / divisor);
        const rem = dividend % divisor;
        const dec = dividend / divisor;
        
        document.getElementById('quotient-val').innerText = quot;
        document.getElementById('remainder-val').innerText = rem;
        document.getElementById('decimal-val').innerText = dec.toFixed(4).replace(/\.?0+$/, '');
        
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Division Rules</h2><p>Division fractions have four main components: Dividend (what you divide), Divisor (what you divide by), Quotient (integer results), and Remainder.</p>"
    Faq = "[{`"question`":`"What happens when remainder is zero?`",`"answer`":`"It means the divisor divides the dividend perfectly without leftovers.`"}]"
  },
  # 24. Amortization
  @{
    Slug = "amortization-calculator"
    Title = "Loan Amortization Calculator"
    MetaTitle = "Amortization Calculator - Free Amortization Schedule"
    MetaDesc = "Generate a full amortization schedule detailing principal and interest breakdowns for any loan borrowing."
    Category = "Finance & Business"
    Icon = "🏠"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="am-principal">Principal Amount ($)</label>
            <input type="number" id="am-principal" value="20000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="am-rate">Interest Rate (%)</label>
            <input type="number" id="am-rate" value="5.5" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="am-years">Tenure (Years)</label>
            <input type="number" id="am-years" value="5" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Generate Schedule</button>
        <div id="result-section" class="result-section hidden">
          <div class="summary-title" style="text-align:center;">Monthly Installment (EMI)</div>
          <div class="total-balance" id="am-payment" style="text-align:center; color:var(--accent); margin-bottom:1rem;">$382.02</div>
          <div id="am-table-wrapper" class="article-content" style="max-height: 250px; overflow-y: auto;">
            <table style="width:100%;">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody id="am-tbody">
                <!-- Injected via JS -->
              </tbody>
            </table>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('am-principal').value);
        const rate = parseFloat(document.getElementById('am-rate').value);
        const years = parseInt(document.getElementById('am-years').value);
        
        if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || rate <= 0 || years <= 0) {
          alert('Please enter valid inputs.');
          return;
        }
        
        const totalMonths = years * 12;
        const monthlyRate = rate / (12 * 100);
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        document.getElementById('am-payment').innerText = '$' + emi.toFixed(2);
        
        let html = '';
        let balance = principal;
        for (let m = 1; m <= Math.min(totalMonths, 36); m++) {
          const interest = balance * monthlyRate;
          const principalPaid = emi - interest;
          balance -= principalPaid;
          html += `
            <tr>
              <td>Month ${m}</td>
              <td>$${interest.toFixed(2)}</td>
              <td>$${principalPaid.toFixed(2)}</td>
              <td>$${Math.max(0, balance).toFixed(2)}</td>
            </tr>
          `;
        }
        if (totalMonths > 36) {
          html += `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">... Showing first 36 months schedule ...</td></tr>`;
        }
        document.getElementById('am-tbody').innerHTML = html;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Amortization Projections</h2><p>Amortization spreads out loan balances over periodic installations, showing exactly how much of each payment covers principal vs. interest.</p>"
    Faq = "[{`"question`":`"How is interest calculated?`",`"answer`":`"Interest is calculated monthly on the remaining outstanding principal balance.`"}]"
  },
  # 25. Remainder
  @{
    Slug = "remainder-calculator"
    Title = "Remainder Calculator"
    MetaTitle = "Remainder Calculator - Find Remainders Online"
    MetaDesc = "Find the remainder of a division instantly. Ideal for modular arithmetic problems."
    Category = "Scientific & Math"
    Icon = "🔢"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="rem-dividend">Dividend</label>
            <input type="number" id="rem-dividend" value="10" class="input-field" />
          </div>
          <div class="form-group">
            <label for="rem-divisor">Divisor</label>
            <input type="number" id="rem-divisor" value="3" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Remainder</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Remainder</div>
          <div class="total-balance" id="rem-val-result" style="color:var(--accent);">1</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dividend = parseInt(document.getElementById('rem-dividend').value);
        const divisor = parseInt(document.getElementById('rem-divisor').value);
        if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
          alert('Please enter valid inputs. Divisor cannot be zero.');
          return;
        }
        const rem = dividend % divisor;
        document.getElementById('rem-val-result').innerText = rem;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Modular Modulo Calculator</h2><p>Calculate remainders for standard division algorithms, which is identical to the modulo (mod) operation.</p>"
    Faq = "[{`"question`":`"What is modulo?`",`"answer`":`"Modulo is an operation that finds the remainder after dividing one integer by another.`"}]"
  },
  # 26. Games Bingo Number Generator
  @{
    Slug = "games-bingo-number-generator"
    Title = "Bingo Number Generator"
    MetaTitle = "Bingo Number Generator - Random Caller"
    MetaDesc = "Call random Bingo numbers from 1 to 75. Keep track of previous draws."
    Category = "Games & Fun"
    Icon = "🎱"
    Html = @"
        <button id="draw-btn" class="calc-btn">Draw Next Number</button>
        <button id="reset-btn" class="calc-btn" style="background:var(--border-light); color:var(--text-primary); margin-top:0.5rem;">Reset Board</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Called Number</div>
          <div class="total-balance" id="called-num" style="font-size: 3.5rem; color:var(--primary); margin:1rem 0;">G-46</div>
          <div class="breakdown-info" style="text-align:left;">
            <p>Called Numbers History: <span id="bingo-history">...</span></p>
          </div>
        </div>
"@
    Js = @"
      let drawn = [];
      const letterRanges = [
        { letter: 'B', min: 1, max: 15 },
        { letter: 'I', min: 16, max: 30 },
        { letter: 'N', min: 31, max: 45 },
        { letter: 'G', min: 46, max: 60 },
        { letter: 'O', min: 61, max: 75 }
      ];
      
      document.getElementById('calculate-btn').addEventListener('click', () => {
        if (drawn.length >= 75) {
          alert('All numbers drawn! Reset board to play again.');
          return;
        }
        let rand = 0;
        do {
          rand = Math.floor(Math.random() * 75) + 1;
        } while (drawn.includes(rand));
        
        drawn.push(rand);
        
        let rangeObj = letterRanges.find(r => rand >= r.min && rand <= r.max);
        const code = rangeObj.letter + '-' + rand;
        
        document.getElementById('called-num').innerText = code;
        document.getElementById('bingo-history').innerText = drawn.map(n => {
          let r = letterRanges.find(x => n >= x.min && n <= x.max);
          return r.letter + n;
        }).join(', ');
        
        document.getElementById('result-section').classList.remove('hidden');
      });
      
      document.getElementById('reset-btn').addEventListener('click', () => {
        drawn = [];
        document.getElementById('called-num').innerText = '--';
        document.getElementById('bingo-history').innerText = 'None';
        document.getElementById('result-section').classList.add('hidden');
      });
"@
    Seo = "<h2>Automated Bingo Caller</h2><p>Host Bingo game nights without a physical rolling cage using our automated 1-75 caller.</p>"
    Faq = "[{`"question`":`"How many numbers are in standard Bingo?`",`"answer`":`"Standard American Bingo has 75 numbers categorized under B, I, N, G, and O.`"}]"
  },
  # 27. Dice Roller
  @{
    Slug = "games-dice-roller"
    Title = "Dice Roller"
    MetaTitle = "Dice Roller - Roll Random Dice Online"
    MetaDesc = "Roll standard 6-sided dice for board games. Customize the number of dice rolled."
    Category = "Games & Fun"
    Icon = "🎲"
    Html = @"
        <div class="form-group">
          <label for="dice-count">Number of Dice</label>
          <input type="number" id="dice-count" value="2" min="1" max="10" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Roll Dice</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Roll Results</div>
          <div id="dice-container" style="display:flex; justify-content:center; gap:0.5rem; margin:1rem 0;">...</div>
          <div class="total-balance" id="dice-total">Total: 7</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const count = parseInt(document.getElementById('dice-count').value);
        if (isNaN(count) || count <= 0 || count > 10) {
          alert('Please enter a valid count between 1 and 10.');
          return;
        }
        
        let total = 0;
        let html = '';
        for (let i = 0; i < count; i++) {
          const roll = Math.floor(Math.random() * 6) + 1;
          total += roll;
          html += `<span style="background:var(--bg-primary); border:2px solid var(--border-color); font-size:1.5rem; font-weight:800; width:3.5rem; height:3.5rem; border-radius:0.5rem; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);">${roll}</span>`;
        }
        
        document.getElementById('dice-container').innerHTML = html;
        document.getElementById('dice-total').innerText = 'Total: ' + total;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Virtual Dice Roller</h2><p>Missing dice for Monopoly or Yahtzee? Roll up to 10 standard 6-sided virtual dice simultaneously.</p>"
    Faq = "[{`"question`":`"What are the odds of rolling double sixes?`",`"answer`":`"The probability of rolling double sixes with two dice is 1 in 36 (or roughly 2.78%).`"}]"
  },
  # 28. Square Footage
  @{
    Slug = "square-footage-calculator"
    Title = "Square Footage Calculator"
    MetaTitle = "Square Footage Calculator - Room & Area Size"
    MetaDesc = "Calculate the square footage (area) of a room or space. Enter length and width measurements."
    Category = "Scientific & Math"
    Icon = "📐"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="sq-length">Length (Feet)</label>
            <input type="number" id="sq-length" value="12" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="sq-width">Width (Feet)</label>
            <input type="number" id="sq-width" value="10" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Area</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Total Area</div>
          <div class="total-balance" id="sq-ft-val" style="color:var(--accent);">120 sq ft</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const len = parseFloat(document.getElementById('sq-length').value);
        const wid = parseFloat(document.getElementById('sq-width').value);
        if (isNaN(len) || isNaN(wid) || len < 0 || wid < 0) {
          alert('Please enter valid measurements.');
          return;
        }
        const area = len * wid;
        document.getElementById('sq-ft-val').innerText = area.toFixed(1) + ' sq ft';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Room Square Footage</h2><p>Calculate space flooring requirements or project painting costs by estimating length times width area.</p>"
    Faq = "[{`"question`":`"How is square footage calculated?`",`"answer`":`"Multiply length in feet by width in feet to get square feet.`"}]"
  },
  # 29. BMR
  @{
    Slug = "bmr-calculator"
    Title = "Basal Metabolic Rate (BMR) Calculator"
    MetaTitle = "BMR Calculator - Calculate Rest Energy Calories"
    MetaDesc = "Estimate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor. Learn baseline rest calories."
    Category = "Fitness & Health"
    Icon = "🔥"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="bmr-age">Age (Years)</label>
            <input type="number" id="bmr-age" value="25" class="input-field" />
          </div>
          <div class="form-group">
            <label for="bmr-gender">Gender</label>
            <select id="bmr-gender" class="select-field">
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="bmr-height">Height (cm)</label>
            <input type="number" id="bmr-height" value="175" class="input-field" />
          </div>
          <div class="form-group">
            <label for="bmr-weight">Weight (kg)</label>
            <input type="number" id="bmr-weight" value="70" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate BMR</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Basal Metabolic Rate (BMR)</div>
          <div class="total-balance" id="bmr-value-result">1,657 kcal</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const age = parseFloat(document.getElementById('bmr-age').value);
        const gender = document.getElementById('bmr-gender').value;
        const height = parseFloat(document.getElementById('bmr-height').value);
        const weight = parseFloat(document.getElementById('bmr-weight').value);
        
        if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
          alert('Please enter valid inputs.');
          return;
        }
        
        let bmr = 0;
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        
        document.getElementById('bmr-value-result').innerText = Math.round(bmr).toLocaleString() + ' kcal';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Base Metabolic Energy Calculations</h2><p>BMR gauges what caloric energy quantities the body consumes to continue basic survival functions at rest.</p>"
    Faq = "[{`"question`":`"What slows BMR down?`",`"answer`":`"Loss of muscle mass, starvation deficits, and older ages decrease BMR.`"}]"
  },
  # 30. Conversions Roman Numeral Date Converter
  @{
    Slug = "conversions-roman-numeral-date-converter"
    Title = "Roman Numeral Date Converter"
    MetaTitle = "Roman Numeral Date Converter - Convert Dates Online"
    MetaDesc = "Convert calendar dates to Roman numerals instantly. Perfect for tattoos, carvings, and formatting styles."
    Category = "Conversions & Units"
    Icon = "🏛️"
    Html = @"
        <div class="form-group">
          <label for="roman-date-input">Select Date</label>
          <input type="date" id="roman-date-input" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert to Roman</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Roman Numeral Date</div>
          <div class="total-balance" id="roman-date-val" style="font-size: 2rem; color:var(--primary); margin-top:1rem;">VI.XIII.MMXXVI</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dateVal = document.getElementById('roman-date-input').value;
        if (!dateVal) {
          alert('Please select a date.');
          return;
        }
        const date = new Date(dateVal);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        function toRoman(num) {
          const map = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
          let str = '';
          for (let i in map) {
            while (num >= map[i]) {
              str += i;
              num -= map[i];
            }
          }
          return str;
        }
        
        const romanDay = toRoman(day);
        const romanMonth = toRoman(month);
        const romanYear = toRoman(year);
        
        document.getElementById('roman-date-val').innerText = romanMonth + '.' + romanDay + '.' + romanYear;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Convert Dates to Roman Numerals</h2><p>Get stylish Roman numeral formats for custom date prints, certificates, or artistic layouts.</p>"
    Faq = "[{`"question`":`"How is a year converted?`",`"answer`":`"Each digit place (thousands, hundreds, tens, units) is computed separately. For instance, 2026 is MMXXVI.`"}]"
  },
  # 31. Rounding
  @{
    Slug = "rounding-calculator"
    Title = "Rounding Calculator"
    MetaTitle = "Rounding Calculator - Math Tool"
    MetaDesc = "Round any decimals or fractions up, down, or to the nearest digit index instantly."
    Category = "Scientific & Math"
    Icon = "🔢"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="rd-input">Number</label>
            <input type="number" id="rd-input" value="4.567" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="rd-mode">Mode</label>
            <select id="rd-mode" class="select-field">
              <option value="round" selected>Round (Nearest)</option>
              <option value="ceil">Ceil (Up)</option>
              <option value="floor">Floor (Down)</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Round</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="rd-result">5</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('rd-input').value);
        const mode = document.getElementById('rd-mode').value;
        if (isNaN(val)) {
          alert('Please enter a valid number.');
          return;
        }
        let result = 0;
        if (mode === 'round') result = Math.round(val);
        else if (mode === 'ceil') result = Math.ceil(val);
        else result = Math.floor(val);
        
        document.getElementById('rd-result').innerText = result;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Arithmetic Rounding</h2><p>Our rounding calculator resolves integer estimates using ceiling, floor, or standard round-half-up math algorithms.</p>"
    Faq = "[{`"question`":`"What is Ceiling?`",`"answer`":`"Ceiling rounds numbers up to the next highest integer, regardless of fractional value.`"}]"
  },
  # 32. GPA
  @{
    Slug = "gpa-calculator"
    Title = "GPA Calculator"
    MetaTitle = "GPA Calculator - Semester GPA Estimator"
    MetaDesc = "Calculate your semester grade point average (GPA) from course credits and grade letters."
    Category = "Scientific & Math"
    Icon = "🎓"
    Html = @"
        <div id="courses-container">
          <div class="form-row course-row">
            <div class="form-group" style="flex:2;">
              <label>Grade Letter</label>
              <select class="select-field grade-letter">
                <option value="4.0">A (4.0)</option>
                <option value="3.0">B (3.0)</option>
                <option value="2.0">C (2.0)</option>
                <option value="1.0">D (1.0)</option>
                <option value="0.0">F (0.0)</option>
              </select>
            </div>
            <div class="form-group" style="flex:1;">
              <label>Credits</label>
              <input type="number" class="input-field course-credits" value="3" />
            </div>
          </div>
        </div>
        <button id="add-course-btn" class="calc-btn" style="background:var(--border-light); color:var(--text-primary); margin-bottom:1rem;">+ Add Course</button>
        <button id="calc-btn" class="calc-btn">Calculate GPA</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Grade Point Average (GPA)</div>
          <div class="total-balance" id="gpa-val-result" style="color:var(--accent);">4.00</div>
        </div>
"@
    Js = @"
      document.getElementById('add-course-btn').addEventListener('click', () => {
        const container = document.getElementById('courses-container');
        const div = document.createElement('div');
        div.className = 'form-row course-row';
        div.innerHTML = `
          <div class="form-group" style="flex:2;">
            <label>Grade Letter</label>
            <select class="select-field grade-letter">
              <option value="4.0">A (4.0)</option>
              <option value="3.0">B (3.0)</option>
              <option value="2.0">C (2.0)</option>
              <option value="1.0">D (1.0)</option>
              <option value="0.0">F (0.0)</option>
            </select>
          </div>
          <div class="form-group" style="flex:1;">
            <label>Credits</label>
            <input type="number" class="input-field course-credits" value="3" />
          </div>
        `;
        container.appendChild(div);
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const grades = document.querySelectorAll('.grade-letter');
        const credits = document.querySelectorAll('.course-credits');
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < grades.length; i++) {
          const g = parseFloat(grades[i].value);
          const c = parseFloat(credits[i].value) || 0;
          totalPoints += (g * c);
          totalCredits += c;
        }
        if (totalCredits === 0) {
          alert('Please enter valid credits.');
          return;
        }
        const gpa = totalPoints / totalCredits;
        document.getElementById('gpa-val-result').innerText = gpa.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Academic GPA Calculations</h2><p>Calculate your course grades averages by weighting standard points scores against credit hours.</p>"
    Faq = "[{`"question`":`"What is a good GPA?`",`"answer`":`"A GPA above 3.0 represents a solid B average and is generally considered good.`"}]"
  },
  # 33. Big Number
  @{
    Slug = "big-number-calculator"
    Title = "Big Number Calculator"
    MetaTitle = "Big Number Calculator - Large Scale Math"
    MetaDesc = "Perform arithmetic calculations on extremely large numbers that exceed typical browser storage scales."
    Category = "Scientific & Math"
    Icon = "🔢"
    Html = @"
        <div class="form-group">
          <label for="big-a">Big Number A</label>
          <input type="text" id="big-a" value="12345678901234567890" class="input-field" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="big-op">Operation</label>
            <select id="big-op" class="select-field">
              <option value="add">Add (+)</option>
              <option value="multiply">Multiply (*)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="big-b">Big Number B</label>
            <input type="text" id="big-b" value="98765432109876543210" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Compute Big Math</button>
        <div id="result-section" class="result-section hidden">
          <div class="summary-title">Big Result</div>
          <div id="big-result-val" class="breakdown-info" style="word-break: break-all; font-weight:700; margin-top:1rem;">...</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const aVal = document.getElementById('big-a').value;
        const bVal = document.getElementById('big-b').value;
        const op = document.getElementById('big-op').value;
        
        try {
          const a = BigInt(aVal);
          const b = BigInt(bVal);
          let res = 0n;
          if (op === 'add') res = a + b;
          else res = a * b;
          
          document.getElementById('big-result-val').innerText = res.toString();
          document.getElementById('result-section').classList.remove('hidden');
        } catch (e) {
          alert('Please enter valid integers. Do not include decimals or characters.');
        }
      });
"@
    Seo = "<h2>Arbitrary Precision Big Math</h2><p>Standard JavaScript numbers lose precision after 15 digits. Our big number calculator uses modern BigInt libraries to compute exact values for hundreds of digits.</p>"
    Faq = "[{`"question`":`"Why does normal math fail?`",`"answer`":`"Browsers represent numbers using double-precision floats, which cap exact integers at 9,007,199,254,740,991.`"}]"
  },
  # 34. Meter to Feet
  @{
    Slug = "meter-to-feet"
    Title = "Meters to Feet Converter"
    MetaTitle = "Meters to Feet Converter - Length Conversion"
    MetaDesc = "Convert meters to feet and vice versa instantly. Supports decimal values."
    Category = "Conversions & Units"
    Icon = "📏"
    Html = @"
        <div class="unit-tabs">
          <button id="m-to-ft-tab" class="tab-btn active">Meters to Feet</button>
          <button id="ft-to-m-tab" class="tab-btn">Feet to Meters</button>
        </div>
        <div class="form-group">
          <label for="len-input">Length</label>
          <input type="number" id="len-input" value="10" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="len-result">32.81 ft</div>
        </div>
"@
    Js = @"
      let mode = 'm-to-ft';
      document.getElementById('m-to-ft-tab').addEventListener('click', () => {
        mode = 'm-to-ft';
        document.getElementById('m-to-ft-tab').classList.add('active');
        document.getElementById('ft-to-m-tab').classList.remove('active');
      });
      document.getElementById('ft-to-m-tab').addEventListener('click', () => {
        mode = 'ft-to-m';
        document.getElementById('ft-to-m-tab').classList.add('active');
        document.getElementById('m-to-ft-tab').classList.remove('active');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('len-input').value);
        if (isNaN(val)) {
          alert('Please enter a valid number.');
          return;
        }
        const resEl = document.getElementById('len-result');
        if (mode === 'm-to-ft') {
          resEl.innerText = (val * 3.2808399).toFixed(2) + ' ft';
        } else {
          resEl.innerText = (val / 3.2808399).toFixed(2) + ' m';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Length Metrics Conversions</h2><p>Meters is the base unit of length in the International System of Units (SI). Feet is the Imperial equivalent (1m = 3.28084ft).</p>"
    Faq = "[{`"question`":`"What is 1 meter in feet?`",`"answer`":`"1 meter is equal to 3.28084 feet.`"}]"
  },
  # 35. Square Meter to Square Feet
  @{
    Slug = "square-meter-to-square-feet"
    Title = "Square Meters to Square Feet Converter"
    MetaTitle = "Sq M to Sq Ft Converter - Area Conversion"
    MetaDesc = "Convert square meters to square feet and vice versa instantly. Perfect for real estate and flooring calculations."
    Category = "Conversions & Units"
    Icon = "📐"
    Html = @"
        <div class="unit-tabs">
          <button id="sm-to-sf-tab" class="tab-btn active">Sq M to Sq Ft</button>
          <button id="sf-to-sm-tab" class="tab-btn">Sq Ft to Sq M</button>
        </div>
        <div class="form-group">
          <label for="area-input">Area</label>
          <input type="number" id="area-input" value="10" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert Area</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="area-result">107.64 sq ft</div>
        </div>
"@
    Js = @"
      let mode = 'sm-to-sf';
      document.getElementById('sm-to-sf-tab').addEventListener('click', () => {
        mode = 'sm-to-sf';
        document.getElementById('sm-to-sf-tab').classList.add('active');
        document.getElementById('sf-to-sm-tab').classList.remove('active');
      });
      document.getElementById('sf-to-sm-tab').addEventListener('click', () => {
        mode = 'sf-to-sm';
        document.getElementById('sf-to-sm-tab').classList.add('active');
        document.getElementById('sm-to-sf-tab').classList.remove('active');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('area-input').value);
        if (isNaN(val)) {
          alert('Please enter a valid area.');
          return;
        }
        const resEl = document.getElementById('area-result');
        if (mode === 'sm-to-sf') {
          resEl.innerText = (val * 10.7639104).toFixed(2) + ' sq ft';
        } else {
          resEl.innerText = (val / 10.7639104).toFixed(2) + ' sq m';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Real Estate Area conversions</h2><p>Convert floor planning metrics. One square meter represents roughly 10.7639 square feet.</p>"
    Faq = "[{`"question`":`"How do you convert sq m to sq ft?`",`"answer`":`"Multiply the square meters value by 10.7639.`"}]"
  },
  # 36. Mileage
  @{
    Slug = "mileage-calculator"
    Title = "Gas Mileage Calculator"
    MetaTitle = "Mileage Calculator - Vehicle Fuel Economy"
    MetaDesc = "Determine your vehicle's gas mileage (MPG or km/L) based on distance driven and fuel consumed."
    Category = "Finance & Business"
    Icon = "🚗"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="mil-distance">Distance Driven (Miles/Km)</label>
            <input type="number" id="mil-distance" value="300" class="input-field" />
          </div>
          <div class="form-group">
            <label for="mil-fuel">Fuel Consumed (Gallons/Liters)</label>
            <input type="number" id="mil-fuel" value="12" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Mileage</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Fuel Economy</div>
          <div class="total-balance" id="mileage-val">25.0 MPG</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dist = parseFloat(document.getElementById('mil-distance').value);
        const fuel = parseFloat(document.getElementById('mil-fuel').value);
        if (isNaN(dist) || isNaN(fuel) || fuel <= 0) {
          alert('Please enter valid inputs.');
          return;
        }
        const mpg = dist / fuel;
        document.getElementById('mileage-val').innerText = mpg.toFixed(1) + ' MPG (or units)';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Fuel Efficiency</h2><p>Determine your car's fuel consumption score to optimize long term fuel budgeting.</p>"
    Faq = "[{`"question`":`"What does MPG stand for?`",`"answer`":`"MPG stands for Miles Per Gallon, a standard rating unit for vehicle fuel economy.`"}]"
  },
  # 37. Grade
  @{
    Slug = "grade-calculator"
    Title = "Class Grade Calculator"
    MetaTitle = "Grade Calculator - Class Final Grade Estimator"
    MetaDesc = "Find your current class grade average or check what score you need on the final exam to pass."
    Category = "Scientific & Math"
    Icon = "📝"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="curr-grade">Current Grade (%)</label>
            <input type="number" id="curr-grade" value="85" class="input-field" />
          </div>
          <div class="form-group">
            <label for="target-grade">Target Grade (%)</label>
            <input type="number" id="target-grade" value="90" class="input-field" />
          </div>
          <div class="form-group">
            <label for="final-weight">Final Exam Weight (%)</label>
            <input type="number" id="final-weight" value="20" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Required Score</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Required Final Exam Score</div>
          <div class="total-balance" id="grade-req-val" style="color:var(--accent);">110%</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const curr = parseFloat(document.getElementById('curr-grade').value);
        const target = parseFloat(document.getElementById('target-grade').value);
        const weight = parseFloat(document.getElementById('final-weight').value);
        
        if (isNaN(curr) || isNaN(target) || isNaN(weight) || weight <= 0 || weight >= 100) {
          alert('Please enter valid percent values.');
          return;
        }
        
        // Formula: Required = (Target - Current * (1 - Weight)) / Weight
        const wFactor = weight / 100;
        const req = (target - curr * (1 - wFactor)) / wFactor;
        
        document.getElementById('grade-req-val').innerText = req.toFixed(1) + '%';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Final Exam Grade Calculations</h2><p>Understand the target goals required in subsequent finals to secure targeted passing marks.</p>"
    Faq = "[{`"question`":`"How is final weight configured?`",`"answer`":`"Check your course syllabus for grade distributions and percentage weights.`"}]"
  },
  # 38. Centimeter to Meter
  @{
    Slug = "centimeter-to-meter"
    Title = "Centimeters to Meters Converter"
    MetaTitle = "Cm to M Converter - Length Conversion"
    MetaDesc = "Convert centimeters to meters and vice versa instantly. Fast metric conversions."
    Category = "Conversions & Units"
    Icon = "📏"
    Html = @"
        <div class="unit-tabs">
          <button id="cm-to-m-tab" class="tab-btn active">Cm to Meters</button>
          <button id="m-to-cm-tab" class="tab-btn">Meters to Cm</button>
        </div>
        <div class="form-group">
          <label for="cm-m-input">Length</label>
          <input type="number" id="cm-m-input" value="150" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="cm-m-result">1.5 m</div>
        </div>
"@
    Js = @"
      let mode = 'cm-to-m';
      document.getElementById('cm-to-m-tab').addEventListener('click', () => {
        mode = 'cm-to-m';
        document.getElementById('cm-to-m-tab').classList.add('active');
        document.getElementById('m-to-cm-tab').classList.remove('active');
      });
      document.getElementById('m-to-cm-tab').addEventListener('click', () => {
        mode = 'm-to-cm';
        document.getElementById('m-to-cm-tab').classList.add('active');
        document.getElementById('cm-to-m-tab').classList.remove('active');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('cm-m-input').value);
        if (isNaN(val)) {
          alert('Please enter a valid length.');
          return;
        }
        const resEl = document.getElementById('cm-m-result');
        if (mode === 'cm-to-m') {
          resEl.innerText = (val / 100).toFixed(2).replace(/\.?0+$/, '') + ' m';
        } else {
          resEl.innerText = (val * 100).toFixed(2).replace(/\.?0+$/, '') + ' cm';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Metric Length Scaling</h2><p>Convert metrics within the standard SI system. One meter is equivalent to exactly 100 centimeters.</p>"
    Faq = "[{`"question`":`"How do I convert cm to meters?`",`"answer`":`"Divide centimeters by 100 to get meters.`"}]"
  },
  # 39. Electricity
  @{
    Slug = "electricity-calculator"
    Title = "Electricity Cost Calculator"
    MetaTitle = "Electricity Cost Calculator - Power Consumption Cost"
    MetaDesc = "Calculate appliance electricity cost. Input wattage, hours used, and utility rate to see daily/yearly expenses."
    Category = "Finance & Business"
    Icon = "⚡"
    Html = @"
        <div class="form-group">
          <label for="power-watts">Appliance Power (Watts)</label>
          <input type="number" id="power-watts" value="500" class="input-field" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="hours-day">Hours Used per Day</label>
            <input type="number" id="hours-day" value="4" class="input-field" min="1" max="24" />
          </div>
          <div class="form-group">
            <label for="kwh-cost">Cost per kWh ($)</label>
            <input type="number" id="kwh-cost" value="0.15" class="input-field" step="0.01" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Power Cost</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Daily Cost</span>
              <span class="metric-value" id="elec-daily">$0.30</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Monthly Cost</span>
              <span class="metric-value" id="elec-monthly">$9.00</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Yearly Cost</span>
              <span class="metric-value" id="elec-yearly">$109.50</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const watts = parseFloat(document.getElementById('power-watts').value);
        const hours = parseFloat(document.getElementById('hours-day').value);
        const cost = parseFloat(document.getElementById('kwh-cost').value);
        
        if (isNaN(watts) || isNaN(hours) || isNaN(cost) || hours <= 0 || hours > 24) {
          alert('Please enter valid inputs.');
          return;
        }
        
        // kWh = (Watts * Hours) / 1000
        const kwhDaily = (watts * hours) / 1000;
        const daily = kwhDaily * cost;
        const monthly = daily * 30;
        const yearly = daily * 365;
        
        document.getElementById('elec-daily').innerText = '$' + daily.toFixed(2);
        document.getElementById('elec-monthly').innerText = '$' + monthly.toFixed(2);
        document.getElementById('elec-yearly').innerText = '$' + yearly.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Home Power Costs</h2><p>Understand the running expenses of home utilities by computing appliance wattage outputs against local utility fees.</p>"
    Faq = "[{`"question`":`"What is a kWh?`",`"answer`":`"It stands for Kilowatt-hour, the standard unit of energy representing 1000 Watts consumed for 1 hour.`"}]"
  },
  # 40. IRR
  @{
    Slug = "irr-calculator"
    Title = "IRR (Internal Rate of Return) Calculator"
    MetaTitle = "IRR Calculator - Internal Rate of Return Online"
    MetaDesc = "Estimate the Internal Rate of Return (IRR) for a series of annual investment cash flows."
    Category = "Finance & Business"
    Icon = "📈"
    Html = @"
        <div class="form-group">
          <label for="cash-flows">Cash Flows (Comma-separated, first value negative e.g. -10000, 3000, 4200, 6800)</label>
          <input type="text" id="cash-flows" value="-10000, 3000, 4200, 6000" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Calculate IRR</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Internal Rate of Return (IRR)</div>
          <div class="total-balance" id="irr-result-val" style="color:var(--accent);">12.1%</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const text = document.getElementById('cash-flows').value;
        if (!text) return;
        const cfs = text.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        
        if (cfs.length < 2 || cfs[0] >= 0) {
          alert('Invalid cash flows. First cash flow representing initial investment must be negative.');
          return;
        }
        
        // Calculate IRR using Newton-Raphson approximation
        function npv(rate, flows) {
          let sum = 0;
          for (let t = 0; t < flows.length; t++) {
            sum += flows[t] / Math.pow(1 + rate, t);
          }
          return sum;
        }
        
        let rate = 0.1; // Initial guess
        let maxIterations = 1000;
        let precision = 1e-7;
        let success = false;
        
        for (let i = 0; i < maxIterations; i++) {
          let val = npv(rate, cfs);
          let deriv = 0;
          for (let t = 1; t < cfs.length; t++) {
            deriv -= t * cfs[t] / Math.pow(1 + rate, t + 1);
          }
          let nextRate = rate - val / deriv;
          if (Math.abs(nextRate - rate) < precision) {
            rate = nextRate;
            success = true;
            break;
          }
          rate = nextRate;
        }
        
        if (success && rate > -1 && rate < 10) {
          document.getElementById('irr-result-val').innerText = (rate * 100).toFixed(2) + '%';
        } else {
          document.getElementById('irr-result-val').innerText = 'Could not resolve';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Investment Returns</h2><p>The IRR represents the break-even discount rate where the Net Present Value (NPV) of all cash inflows and outflows equals zero.</p>"
    Faq = "[{`"question`":`"What is a good IRR?`",`"answer`":`"A higher IRR indicates a more profitable investment opportunity. Compare it against your capital cost benchmark.`"}]"
  },
  # 41. Conversions Pressure
  @{
    Slug = "conversions-pressure"
    Title = "Pressure Units Converter"
    MetaTitle = "Pressure Converter - PSI, Bar, Pascal"
    MetaDesc = "Convert pressure units between PSI, Bar, Pascal, and Atmospheres instantly with our free online tool."
    Category = "Conversions & Units"
    Icon = "🌬️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="pres-val">Value</label>
            <input type="number" id="pres-val" value="32" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="pres-from">From</label>
            <select id="pres-from" class="select-field">
              <option value="psi">PSI (Pound/sq in)</option>
              <option value="bar">Bar</option>
              <option value="pa">Pascal (Pa)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pres-to">To</label>
            <select id="pres-to" class="select-field">
              <option value="psi">PSI (Pound/sq in)</option>
              <option value="bar" selected>Bar</option>
              <option value="pa">Pascal (Pa)</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Convert Pressure</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Converted Pressure</div>
          <div class="total-balance" id="pres-result">2.21 Bar</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('pres-val').value);
        const from = document.getElementById('pres-from').value;
        const to = document.getElementById('pres-to').value;
        
        if (isNaN(val)) {
          alert('Please enter a valid numeric value.');
          return;
        }
        
        // Convert input to Pascal first
        let pa = 0;
        if (from === 'pa') pa = val;
        else if (from === 'psi') pa = val * 6894.75729;
        else if (from === 'bar') pa = val * 100000;
        
        // Convert Pascal to output
        let out = 0;
        if (to === 'pa') out = pa;
        else if (to === 'psi') out = pa / 6894.75729;
        else if (to === 'bar') out = pa / 100000;
        
        document.getElementById('pres-result').innerText = out.toFixed(4).replace(/\.?0+$/, '') + ' ' + to.toUpperCase();
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Conversions Pressure Index</h2><p>Easily convert tyre inflate PSI ratings to metric Bar or Pascal scales.</p>"
    Faq = "[{`"question`":`"What is standard atmospheric pressure?`",`"answer`":`"It is equal to roughly 14.696 PSI, or 1.01325 Bar.`"}]"
  },
  # 42. Gallons to Liters
  @{
    Slug = "gallons-to-liters"
    Title = "Gallons to Liters Converter"
    MetaTitle = "Gallons to Liters Converter - Liquid Volume"
    MetaDesc = "Convert US Gallons to Liters and vice versa instantly. Free fluid volume converter."
    Category = "Conversions & Units"
    Icon = "🥤"
    Html = @"
        <div class="unit-tabs">
          <button id="gal-to-l-tab" class="tab-btn active">Gallons to Liters</button>
          <button id="l-to-gal-tab" class="tab-btn">Liters to Gallons</button>
        </div>
        <div class="form-group">
          <label for="vol-input">Volume</label>
          <input type="number" id="vol-input" value="10" class="input-field" step="any" />
        </div>
        <button id="calc-btn" class="calc-btn">Convert Volume</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Result</div>
          <div class="total-balance" id="vol-result">37.85 Liters</div>
        </div>
"@
    Js = @"
      let mode = 'gal-to-l';
      document.getElementById('gal-to-l-tab').addEventListener('click', () => {
        mode = 'gal-to-l';
        document.getElementById('gal-to-l-tab').classList.add('active');
        document.getElementById('l-to-gal-tab').classList.remove('active');
      });
      document.getElementById('l-to-gal-tab').addEventListener('click', () => {
        mode = 'l-to-gal';
        document.getElementById('l-to-gal-tab').classList.add('active');
        document.getElementById('gal-to-l-tab').classList.remove('active');
      });
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('vol-input').value);
        if (isNaN(val)) {
          alert('Please enter a valid volume.');
          return;
        }
        const resEl = document.getElementById('vol-result');
        if (mode === 'gal-to-l') {
          resEl.innerText = (val * 3.785411784).toFixed(3) + ' Liters';
        } else {
          resEl.innerText = (val / 3.785411784).toFixed(3) + ' Gallons (US)';
        }
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Liquid Volume Conversions</h2><p>One US liquid gallon is equivalent to exactly 3.785411784 liters.</p>"
    Faq = "[{`"question`":`"Is UK gallon different?`",`"answer`":`"Yes. The Imperial (UK) gallon is equal to roughly 4.54609 liters.`"}]"
  },
  # 43. Time Date Day
  @{
    Slug = "time-date-day"
    Title = "Day of Week Finder"
    MetaTitle = "Day of Week Finder - What Day was I Born?"
    MetaDesc = "Find what day of the week (Monday, Tuesday, etc.) any specific calendar date falls on."
    Category = "Date & Age"
    Icon = "📅"
    Html = @"
        <div class="form-group">
          <label for="day-finder-date">Select Date</label>
          <input type="date" id="day-finder-date" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Find Day of Week</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Day of Week</div>
          <div class="total-balance" id="day-of-week-val" style="color:var(--primary); font-size:2.5rem; margin-top:1rem;">Tuesday</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = document.getElementById('day-finder-date').value;
        if (!val) {
          alert('Please select a date.');
          return;
        }
        const date = new Date(val);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById('day-of-week-val').innerText = day;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Find Calendar Day Names</h2><p>Perfect for looking up historical milestones. Find out whether a birthday or wedding was on a weekend or weekday.</p>"
    Faq = "[{`"question`":`"Does it account for historical calendar shifts?`",`"answer`":`"It uses the Gregorian calendar standard, which is standard for modern browser date systems.`"}]"
  },
  # 44. Time (Time Unit Converter)
  @{
    Slug = "conversions-time"
    Title = "Time Unit Converter"
    MetaTitle = "Time Unit Converter - Convert Hours, Minutes, Seconds"
    MetaDesc = "Convert time measurements between seconds, minutes, hours, days, weeks, months, and years."
    Category = "Conversions & Units"
    Icon = "⏱️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="time-val">Value</label>
            <input type="number" id="time-val" value="1" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="time-from">From</label>
            <select id="time-from" class="select-field">
              <option value="sec">Seconds</option>
              <option value="min">Minutes</option>
              <option value="hr" selected>Hours</option>
              <option value="day">Days</option>
              <option value="week">Weeks</option>
            </select>
          </div>
          <div class="form-group">
            <label for="time-to">To</label>
            <select id="time-to" class="select-field">
              <option value="sec">Seconds</option>
              <option value="min" selected>Minutes</option>
              <option value="hr">Hours</option>
              <option value="day">Days</option>
              <option value="week">Weeks</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Convert Time</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Converted Time</div>
          <div class="total-balance" id="time-result">60 Minutes</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('time-val').value);
        const from = document.getElementById('time-from').value;
        const to = document.getElementById('time-to').value;
        if (isNaN(val)) {
          alert('Please enter a valid numeric value.');
          return;
        }
        
        let seconds = 0;
        if (from === 'sec') seconds = val;
        else if (from === 'min') seconds = val * 60;
        else if (from === 'hr') seconds = val * 3600;
        else if (from === 'day') seconds = val * 86400;
        else if (from === 'week') seconds = val * 604800;
        
        let out = 0;
        let unit = '';
        if (to === 'sec') { out = seconds; unit = 'Seconds'; }
        else if (to === 'min') { out = seconds / 60; unit = 'Minutes'; }
        else if (to === 'hr') { out = seconds / 3600; unit = 'Hours'; }
        else if (to === 'day') { out = seconds / 86400; unit = 'Days'; }
        else if (to === 'week') { out = seconds / 604800; unit = 'Weeks'; }
        
        document.getElementById('time-result').innerText = out.toLocaleString(undefined, {maximumFractionDigits: 6}) + ' ' + unit;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Convert Time Units</h2><p>Our time unit converter allows you to switch between standard units like seconds, minutes, hours, days, and weeks instantly.</p>"
    Faq = "[{`"question`":`"How many seconds are in an hour?`",`"answer`":`"There are exactly 3,600 seconds in one hour.`"}]"
  },
  # 45. Time Time (Time Add & Subtract Calculator)
  @{
    Slug = "time-time-calculator"
    Title = "Time Add & Subtract Calculator"
    MetaTitle = "Time Math Calculator - Add or Subtract Time"
    MetaDesc = "Add or subtract days, hours, and minutes from any starting time. Ideal for time cards and duration planning."
    Category = "Date & Age"
    Icon = "⏱️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="time-time-start">Start Time (HH:MM)</label>
            <input type="text" id="time-time-start" placeholder="e.g. 08:30" class="input-field" value="08:30" />
          </div>
          <div class="form-group">
            <label for="time-time-op">Operation</label>
            <select id="time-time-op" class="select-field">
              <option value="add">Add (+)</option>
              <option value="sub">Subtract (-)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="time-time-dur">Duration (HH:MM)</label>
            <input type="text" id="time-time-dur" placeholder="e.g. 02:45" class="input-field" value="02:45" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Time</button>
        <div id="result-section" class="result-section hidden" style="text-align: center;">
          <div class="summary-title">Resulting Time</div>
          <div class="total-balance" id="time-time-result">11:15</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const startVal = document.getElementById('time-time-start').value.trim();
        const op = document.getElementById('time-time-op').value;
        const durVal = document.getElementById('time-time-dur').value.trim();
        
        const startMatch = startVal.match(/^(\d{1,2}):(\d{2})$/);
        const durMatch = durVal.match(/^(\d{1,2}):(\d{2})$/);
        
        if (!startMatch || !durMatch) {
          alert('Please enter times in HH:MM format (e.g. 08:30).');
          return;
        }
        
        const startH = parseInt(startMatch[1]);
        const startM = parseInt(startMatch[2]);
        const durH = parseInt(durMatch[1]);
        const durM = parseInt(durMatch[2]);
        
        let totalStartMin = (startH * 60) + startM;
        let totalDurMin = (durH * 60) + durM;
        
        let resultMin = 0;
        if (op === 'add') {
          resultMin = totalStartMin + totalDurMin;
        } else {
          resultMin = totalStartMin - totalDurMin;
          if (resultMin < 0) {
            resultMin += 24 * 60;
          }
        }
        
        resultMin = resultMin % (24 * 60);
        
        const endH = Math.floor(resultMin / 60);
        const endM = resultMin % 60;
        
        const pad = (n) => n.toString().padStart(2, '0');
        document.getElementById('time-time-result').innerText = pad(endH) + ':' + pad(endM);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Time Add and Subtract Math</h2><p>This utility enables you to easily add or subtract a duration (hours and minutes) to or from a starting time, which is helpful for timesheets, scheduling, and shifts.</p>"
    Faq = "[{`"question`":`"What format is supported?`",`"answer`":`"The calculator supports 24-hour time format (HH:MM) like 13:45 or 08:00.`"}]"
  }
)

# Template for generating individual calculator pages
function Generate-CalculatorPage($calc) {
  $slug = $calc.Slug
  $title = $calc.Title
  $metaTitle = $calc.MetaTitle
  $metaDesc = $calc.MetaDesc
  $category = $calc.Category
  $icon = $calc.Icon
  $html = $calc.Html
  $js = $calc.Js
  $seo = $calc.Seo
  $faq = $calc.Faq

  $output = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$metaTitle</title>
  <meta name="description" content="$metaDesc">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.calcuportal.com/calculators/$slug.html">
  <link rel="stylesheet" href="../styles.css">
  <script src="../script.js"></script>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="nav-container">
      <a href="../index.html" class="logo">
        <span class="logo-icon">🧮</span>
        <span>CalcuPortal</span>
      </a>
      <nav class="nav-links">
        <a href="../index.html" class="nav-link">Home</a>
        <a href="../pages/about.html" class="nav-link">About</a>
        <a href="../pages/contact.html" class="nav-link">Contact</a>
        <button class="theme-btn" title="Toggle Theme">
          <span class="theme-btn-icon"></span>
        </button>
      </nav>
    </div>
  </header>

  <main>
    <div class="detail-container">
      <a href="../index.html" class="back-btn">← Back to Directory</a>
      
      <div class="detail-header">
        <h1>$title</h1>
      </div>

      <!-- Calculator Widget -->
      <div class="calc-widget">
        $html
      </div>

      <!-- SEO Article -->
      <section class="article-section">
        <div class="article-header">
          <h2>$title Guides</h2>
        </div>
        <div class="article-content">
          $seo
        </div>
      </section>
    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="copyright-bar" style="border-top: none; padding-top: 0;">
      © <span id="year">2026</span> CalcuPortal. All rights reserved.
    </div>
  </footer>

  <script>
    document.getElementById('year').innerText = new Date().getFullYear();
    
    // Injected calculation script
    // Rename calculate button triggers
    const calculateBtn = document.getElementById('calc-btn');
    if (calculateBtn) {
      calculateBtn.id = 'calculate-btn';
    }
  </script>
  <script>
    $js
  </script>
</body>
</html>
"@
  
  $outputFile = "calculators/$slug.html"
  Set-Content -Path $outputFile -Value $output -Encoding utf8
  Write-Host "Generated $outputFile"
}

# Generate folders if missing
if (-not (Test-Path "calculators")) {
  New-Item -ItemType Directory -Path "calculators"
}

# Run generation
foreach ($c in $calculators) {
  Generate-CalculatorPage $c
}
