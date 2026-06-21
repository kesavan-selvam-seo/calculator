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
  },
  # 46. Mortgage Calculator
  @{
    Slug = "mortgage-calculator"
    Title = "Mortgage Calculator"
    MetaTitle = "Mortgage Calculator - Estimate Monthly Payments"
    MetaDesc = "Calculate monthly mortgage payments factoring in home price, down payment, interest rate, property taxes, and insurance."
    Category = "Finance & Business"
    Icon = "🏠"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="mort-price">Home Price ($)</label>
            <input type="number" id="mort-price" value="300000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="mort-down">Down Payment ($)</label>
            <input type="number" id="mort-down" value="60000" class="input-field" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="mort-rate">Interest Rate (%)</label>
            <input type="number" id="mort-rate" value="6.5" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="mort-years">Loan Term (Years)</label>
            <input type="number" id="mort-years" value="30" class="input-field" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="mort-tax">Property Tax / Year ($)</label>
            <input type="number" id="mort-tax" value="3000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="mort-ins">Home Insurance / Year ($)</label>
            <input type="number" id="mort-ins" value="1200" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Mortgage</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Monthly P&amp;I Payment</span>
              <span class="metric-value" id="mort-pi-val">$1,516.89</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Total Monthly Payment</span>
              <span class="metric-value" id="mort-total-val" style="color:var(--accent);">$1,866.89</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const price = parseFloat(document.getElementById('mort-price').value) || 0;
        const down = parseFloat(document.getElementById('mort-down').value) || 0;
        const rate = parseFloat(document.getElementById('mort-rate').value) || 0;
        const years = parseInt(document.getElementById('mort-years').value) || 30;
        const tax = parseFloat(document.getElementById('mort-tax').value) || 0;
        const ins = parseFloat(document.getElementById('mort-ins').value) || 0;
        
        const principal = price - down;
        if (principal <= 0 || rate <= 0 || years <= 0) {
          alert('Please enter valid numeric values.');
          return;
        }
        
        const monthlyRate = (rate / 100) / 12;
        const totalMonths = years * 12;
        const piPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        const monthlyTax = tax / 12;
        const monthlyIns = ins / 12;
        const totalPayment = piPayment + monthlyTax + monthlyIns;
        
        document.getElementById('mort-pi-val').innerText = '$' + piPayment.toFixed(2);
        document.getElementById('mort-total-val').innerText = '$' + totalPayment.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Mortgage Payments</h2><p>Calculate your estimated monthly payment, including principal, interest, taxes, and home insurance (PITI) for purchasing a home.</p>"
    Faq = "[{`"question`":`"What is PMI?`",`"answer`":`"Private Mortgage Insurance is usually required if you put down less than 20% of the home purchase price.`"}]"
  },
  # 47. Auto Loan Calculator
  @{
    Slug = "auto-loan-calculator"
    Title = "Auto Loan Calculator"
    MetaTitle = "Auto Loan Calculator - Compare Car Payments"
    MetaDesc = "Estimate your monthly car payments using vehicle price, down payment, trade-in value, and interest rate."
    Category = "Finance & Business"
    Icon = "🚗"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="auto-price">Vehicle Price ($)</label>
            <input type="number" id="auto-price" value="25000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="auto-down">Down Payment ($)</label>
            <input type="number" id="auto-down" value="5000" class="input-field" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="auto-trade">Trade-in Value ($)</label>
            <input type="number" id="auto-trade" value="2000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="auto-rate">Interest Rate (%)</label>
            <input type="number" id="auto-rate" value="5.5" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="auto-months">Loan Term (Months)</label>
            <input type="number" id="auto-months" value="60" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Car Payment</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Monthly Payment</div>
          <div class="total-balance" id="auto-monthly-val" style="color:var(--accent);">$343.83</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const price = parseFloat(document.getElementById('auto-price').value) || 0;
        const down = parseFloat(document.getElementById('auto-down').value) || 0;
        const trade = parseFloat(document.getElementById('auto-trade').value) || 0;
        const rate = parseFloat(document.getElementById('auto-rate').value) || 0;
        const months = parseInt(document.getElementById('auto-months').value) || 60;
        
        const principal = price - down - trade;
        if (principal <= 0 || rate <= 0 || months <= 0) {
          alert('Please enter valid numeric values.');
          return;
        }
        
        const monthlyRate = (rate / 100) / 12;
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        
        document.getElementById('auto-monthly-val').innerText = '$' + payment.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Auto Financing Costs</h2><p>Planning to purchase a new or used vehicle? Calculate your monthly payment based on the loan term, trade-in equity, and down payment.</p>"
    Faq = "[{`"question`":`"How does term length affect my loan?`",`"answer`":`"A longer term length decreases your monthly payment but increases the total interest you pay over the life of the loan.`"}]"
  },
  # 48. Investment Calculator
  @{
    Slug = "investment-calculator"
    Title = "Investment Calculator"
    MetaTitle = "Investment Calculator - Project Growth Online"
    MetaDesc = "Project the future value of your investments with regular monthly contributions and compound interest."
    Category = "Finance & Business"
    Icon = "📈"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="inv-init">Starting Amount ($)</label>
            <input type="number" id="inv-init" value="10000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="inv-contrib">Monthly Contribution ($)</label>
            <input type="number" id="inv-contrib" value="200" class="input-field" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="inv-rate">Expected Return / Year (%)</label>
            <input type="number" id="inv-rate" value="8.0" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="inv-years">Years to Invest</label>
            <input type="number" id="inv-years" value="10" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Growth</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Total Balance</span>
              <span class="metric-value" id="inv-balance-val" style="color:var(--accent);">$58,260</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Total Contributions</span>
              <span class="metric-value" id="inv-contrib-val">$34,000</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const init = parseFloat(document.getElementById('inv-init').value) || 0;
        const contrib = parseFloat(document.getElementById('inv-contrib').value) || 0;
        const rate = parseFloat(document.getElementById('inv-rate').value) || 0;
        const years = parseInt(document.getElementById('inv-years').value) || 0;
        
        if (years <= 0) {
          alert('Please enter valid numeric values.');
          return;
        }
        
        let balance = init;
        const monthlyRate = (rate / 100) / 12;
        const totalMonths = years * 12;
        
        for (let i = 0; i < totalMonths; i++) {
          balance = (balance * (1 + monthlyRate)) + contrib;
        }
        
        const totalContrib = init + (contrib * totalMonths);
        
        document.getElementById('inv-balance-val').innerText = '$' + Math.round(balance).toLocaleString();
        document.getElementById('inv-contrib-val').innerText = '$' + Math.round(totalContrib).toLocaleString();
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Long-term Wealth Growth</h2><p>Enter your principal amount, expected annual growth, and regular monthly savings to project portfolio growth over a decade or more.</p>"
    Faq = "[{`"question`":`"What is compound interest?`",`"answer`":`"Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods.`"}]"
  },
  # 49. Inflation Calculator
  @{
    Slug = "inflation-calculator"
    Title = "Inflation Calculator"
    MetaTitle = "Inflation Calculator - Buying Power Estimator"
    MetaDesc = "Determine the future buying power of money and adjust value calculations for inflation rates."
    Category = "Finance & Business"
    Icon = "💵"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="inf-amount">Value of Money ($)</label>
            <input type="number" id="inf-amount" value="100" class="input-field" />
          </div>
          <div class="form-group">
            <label for="inf-rate">Expected Annual Inflation (%)</label>
            <input type="number" id="inf-rate" value="3.0" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="inf-years">Years in Future</label>
            <input type="number" id="inf-years" value="10" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Buying Power</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Future Value Required</div>
          <div class="total-balance" id="inf-result" style="color:var(--accent);">$134.39</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('inf-amount').value) || 0;
        const rate = parseFloat(document.getElementById('inf-rate').value) || 0;
        const years = parseInt(document.getElementById('inf-years').value) || 0;
        
        if (years < 0) {
          alert('Please enter valid numeric values.');
          return;
        }
        
        const future = amt * Math.pow(1 + (rate / 100), years);
        document.getElementById('inf-result').innerText = '$' + future.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Price Inflation Impact</h2><p>Calculate how annual price adjustments diminish currency purchasing capabilities or require higher monetary figures to represent equal values.</p>"
    Faq = "[{`"question`":`"What is CPI?`",`"answer`":`"Consumer Price Index measures the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services.`"}]"
  },
  # 50. Income Tax Calculator
  @{
    Slug = "income-tax-calculator"
    Title = "Income Tax Calculator"
    MetaTitle = "Income Tax Calculator - Federal Net Pay"
    MetaDesc = "Estimate your federal income tax brackets, standard deductions, and net take-home pay."
    Category = "Finance & Business"
    Icon = "💼"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="tax-income">Annual Pre-tax Income ($)</label>
            <input type="number" id="tax-income" value="75000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="tax-status">Filing Status</label>
            <select id="tax-status" class="select-field">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Net Pay</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Estimated Federal Tax</span>
              <span class="metric-value" id="tax-fed-val">$8,900</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Net Take-Home Pay</span>
              <span class="metric-value" id="tax-net-val" style="color:var(--accent);">$66,100</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const income = parseFloat(document.getElementById('tax-income').value) || 0;
        const status = document.getElementById('tax-status').value;
        
        if (income <= 0) {
          alert('Please enter a valid income.');
          return;
        }
        
        let stdDeduction = status === 'single' ? 15000 : 30000;
        let taxable = Math.max(0, income - stdDeduction);
        let tax = 0;
        
        if (status === 'single') {
          if (taxable > 100000) tax = 15000 + (taxable - 100000) * 0.24;
          else if (taxable > 45000) tax = 5000 + (taxable - 45000) * 0.22;
          else if (taxable > 11000) tax = 1100 + (taxable - 1100) * 0.12;
          else tax = taxable * 0.10;
        } else {
          if (taxable > 200000) tax = 30000 + (taxable - 200000) * 0.24;
          else if (taxable > 90000) tax = 10000 + (taxable - 90000) * 0.22;
          else if (taxable > 22000) tax = 2200 + (taxable - 2200) * 0.12;
          else tax = taxable * 0.10;
        }
        
        const net = income - tax;
        
        document.getElementById('tax-fed-val').innerText = '$' + Math.round(tax).toLocaleString();
        document.getElementById('tax-net-val').innerText = '$' + Math.round(net).toLocaleString();
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Net Income</h2><p>Understand how tax brackets and federal standard deductions impact your annual take-home wage projections.</p>"
    Faq = "[{`"question`":`"What is taxable income?`",`"answer`":`"Taxable income is your gross income minus any allowable standard or itemized deductions.`"}]"
  },
  # 51. Sales Tax Calculator
  @{
    Slug = "sales-tax-calculator"
    Title = "Sales Tax Calculator"
    MetaTitle = "Sales Tax Calculator - Calculate Retail Taxes"
    MetaDesc = "Find the total retail cost and sales tax amount for any purchase by entering product net price and tax rates."
    Category = "Finance & Business"
    Icon = "🏷️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="sales-amount">Net Price ($)</label>
            <input type="number" id="sales-amount" value="100" class="input-field" />
          </div>
          <div class="form-group">
            <label for="sales-rate">Sales Tax Rate (%)</label>
            <input type="number" id="sales-rate" value="8.25" class="input-field" step="any" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Tax</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Sales Tax Amount</span>
              <span class="metric-value" id="sales-tax-val">$8.25</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Total Price</span>
              <span class="metric-value" id="sales-total-val" style="color:var(--accent);">$108.25</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('sales-amount').value) || 0;
        const rate = parseFloat(document.getElementById('sales-rate').value) || 0;
        
        if (amt < 0 || rate < 0) {
          alert('Please enter valid inputs.');
          return;
        }
        
        const tax = amt * (rate / 100);
        const total = amt + tax;
        
        document.getElementById('sales-tax-val').innerText = '$' + tax.toFixed(2);
        document.getElementById('sales-total-val').innerText = '$' + total.toFixed(2);
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Calculate Purchasing Margins</h2><p>Calculate local sales tax values instantly to verify receipt pricing at store registers.</p>"
    Faq = "[{`"question`":`"Who sets sales tax rates?`",`"answer`":`"Sales tax rates are governed and set by individual state, county, and municipal authorities.`"}]"
  },
  # 52. Credit Card Payoff Calculator
  @{
    Slug = "credit-card-payoff"
    Title = "Credit Card Payoff Calculator"
    MetaTitle = "Credit Card Payoff Calculator - Debt Timeline"
    MetaDesc = "Calculate how long it takes to pay off credit card debt based on interest rate and monthly payments."
    Category = "Finance & Business"
    Icon = "💳"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="cc-balance">Card Balance ($)</label>
            <input type="number" id="cc-balance" value="5000" class="input-field" />
          </div>
          <div class="form-group">
            <label for="cc-rate">Interest Rate (APR %)</label>
            <input type="number" id="cc-rate" value="18.9" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="cc-payment">Monthly Payment ($)</label>
            <input type="number" id="cc-payment" value="200" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Payoff Time</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Payoff Time</span>
              <span class="metric-value" id="cc-months-val" style="color:var(--accent);">32 Months</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Total Interest Paid</span>
              <span class="metric-value" id="cc-interest-val">$1,385</span>
            </div>
          </div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const balance = parseFloat(document.getElementById('cc-balance').value) || 0;
        const apr = parseFloat(document.getElementById('cc-rate').value) || 0;
        const pmt = parseFloat(document.getElementById('cc-payment').value) || 0;
        
        if (balance <= 0 || apr < 0 || pmt <= 0) {
          alert('Please enter valid inputs.');
          return;
        }
        
        const r = (apr / 100) / 12;
        if (pmt <= balance * r) {
          alert('Your monthly payment must be higher than the monthly interest accrued.');
          return;
        }
        
        const num = Math.log(1 - (balance * r) / pmt);
        const den = Math.log(1 + r);
        const months = -num / den;
        
        const roundedMonths = Math.ceil(months);
        const totalPaid = pmt * months;
        const totalInterest = totalPaid - balance;
        
        document.getElementById('cc-months-val').innerText = roundedMonths + ' Months';
        document.getElementById('cc-interest-val').innerText = '$' + Math.max(0, Math.round(totalInterest)).toLocaleString();
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Card Repayment Milestones</h2><p>Determine how paying above minimum due helps clear card debts faster and saves interest payments.</p>"
    Faq = "[{`"question`":`"What is APR?`",`"answer`":`"Annual Percentage Rate is the interest rate applied to outstanding balances expressed as a yearly percentage.`"}]"
  },
  # 53. Ideal Weight Calculator
  @{
    Slug = "ideal-weight-calculator"
    Title = "Ideal Weight Calculator"
    MetaTitle = "Ideal Weight Calculator - Healthy Target Weight"
    MetaDesc = "Find your ideal body weight range based on scientific clinical formulas including Devine and Robinson."
    Category = "Fitness & Health"
    Icon = "⚖️"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="iw-height">Height (cm)</label>
            <input type="number" id="iw-height" value="175" class="input-field" />
          </div>
          <div class="form-group">
            <label for="iw-gender">Gender</label>
            <select id="iw-gender" class="select-field">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Ideal Weight</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Estimated Ideal Weight (Devine Formula)</div>
          <div class="total-balance" id="iw-result-val" style="color:var(--accent);">70.3 kg</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const heightCm = parseFloat(document.getElementById('iw-height').value) || 0;
        const gender = document.getElementById('iw-gender').value;
        
        if (heightCm <= 0) {
          alert('Please enter a valid height.');
          return;
        }
        
        const inches = heightCm / 2.54;
        const over5Feet = Math.max(0, inches - 60);
        
        let idealWeight = 0;
        if (gender === 'male') {
          idealWeight = 50.0 + (2.3 * over5Feet);
        } else {
          idealWeight = 45.5 + (2.3 * over5Feet);
        }
        
        document.getElementById('iw-result-val').innerText = idealWeight.toFixed(1) + ' kg (or ' + (idealWeight * 2.20462).toFixed(1) + ' lbs)';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Healthy Weight Ranges</h2><p>Ideal weight estimations are designed for medical reference, adjusting values according to height benchmarks.</p>"
    Faq = "[{`"question`":`"How is ideal weight defined?`",`"answer`":`"It is estimated based on statistical medical standards mapping height and gender ratios.`"}]"
  },
  # 54. Body Fat Calculator
  @{
    Slug = "body-fat-calculator"
    Title = "Body Fat Calculator"
    MetaTitle = "Body Fat Calculator - US Navy Method"
    MetaDesc = "Estimate your body fat percentage using standard tape measure parameters designed by the US Navy."
    Category = "Fitness & Health"
    Icon = "📏"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="bf-gender">Gender</label>
            <select id="bf-gender" class="select-field">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label for="bf-height">Height (cm)</label>
            <input type="number" id="bf-height" value="175" class="input-field" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="bf-neck">Neck Girth (cm)</label>
            <input type="number" id="bf-neck" value="38" class="input-field" />
          </div>
          <div class="form-group">
            <label for="bf-waist">Waist Girth (cm)</label>
            <input type="number" id="bf-waist" value="85" class="input-field" />
          </div>
          <div id="hip-group" class="form-group hidden">
            <label for="bf-hip">Hip Girth (cm)</label>
            <input type="number" id="bf-hip" value="95" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Body Fat</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Body Fat Percentage</div>
          <div class="total-balance" id="bf-result" style="color:var(--accent);">18.5%</div>
        </div>
"@
    Js = @"
      const genderSelect = document.getElementById('bf-gender');
      genderSelect.addEventListener('change', () => {
        if (genderSelect.value === 'female') {
          document.getElementById('hip-group').classList.remove('hidden');
        } else {
          document.getElementById('hip-group').classList.add('hidden');
        }
      });
      
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const gender = genderSelect.value;
        const height = parseFloat(document.getElementById('bf-height').value) || 0;
        const neck = parseFloat(document.getElementById('bf-neck').value) || 0;
        const waist = parseFloat(document.getElementById('bf-waist').value) || 0;
        const hip = parseFloat(document.getElementById('bf-hip').value) || 0;
        
        if (height <= 0 || neck <= 0 || waist <= 0 || (gender === 'female' && hip <= 0)) {
          alert('Please enter valid positive measurements.');
          return;
        }
        
        let bodyFat = 0;
        if (gender === 'male') {
          bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
          bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
        
        document.getElementById('bf-result').innerText = Math.max(0, bodyFat).toFixed(1) + '%';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Track Body Composition</h2><p>Calculate body fat ratios to assess fitness transformations beyond basic weight scale monitoring.</p>"
    Faq = "[{`"question`":`"How accurate is the Navy Method?`",`"answer`":`"It yields estimations within 2-4% of DEXA body scan diagnostics for most individuals.`"}]"
  },
  # 55. Pace Calculator
  @{
    Slug = "pace-calculator"
    Title = "Running Pace Calculator"
    MetaTitle = "Running Pace Calculator - Plan Race Speeds"
    MetaDesc = "Calculate your average running pace, duration, or distances for training runs and race splits."
    Category = "Fitness & Health"
    Icon = "🏃"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="pace-dist">Distance</label>
            <input type="number" id="pace-dist" value="5" class="input-field" step="any" />
          </div>
          <div class="form-group">
            <label for="pace-unit">Unit</label>
            <select id="pace-unit" class="select-field">
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Time (Hours)</label>
            <input type="number" id="pace-hr" value="0" class="input-field" />
          </div>
          <div class="form-group">
            <label>Minutes</label>
            <input type="number" id="pace-min" value="25" class="input-field" />
          </div>
          <div class="form-group">
            <label>Seconds</label>
            <input type="number" id="pace-sec" value="0" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Pace</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Average Running Pace</div>
          <div class="total-balance" id="pace-result-val" style="color:var(--accent);">5:00 min/km</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const dist = parseFloat(document.getElementById('pace-dist').value) || 0;
        const unit = document.getElementById('pace-unit').value;
        const hr = parseInt(document.getElementById('pace-hr').value) || 0;
        const min = parseInt(document.getElementById('pace-min').value) || 0;
        const sec = parseInt(document.getElementById('pace-sec').value) || 0;
        
        if (dist <= 0) {
          alert('Please enter a valid distance.');
          return;
        }
        
        const totalSec = (hr * 3600) + (min * 60) + sec;
        if (totalSec <= 0) {
          alert('Please enter a valid duration.');
          return;
        }
        
        const secPerUnit = totalSec / dist;
        const paceMin = Math.floor(secPerUnit / 60);
        const paceSec = Math.round(secPerUnit % 60);
        
        const pad = (n) => n.toString().padStart(2, '0');
        document.getElementById('pace-result-val').innerText = paceMin + ':' + pad(paceSec) + ' min/' + (unit === 'km' ? 'km' : 'mile');
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Plan Race Day Timing Splits</h2><p>Ideal tool for runners, cyclists, and fitness enthusiasts to calculate training paces.</p>"
    Faq = "[{`"question`":`"What is a good 5k pace?`",`"answer`":`"A pace of 6:00 min/km (30 minutes total time) is considered a good benchmark for casual runners.`"}]"
  },
  # 56. Fraction Calculator
  @{
    Slug = "fraction-calculator"
    Title = "Fraction Calculator"
    MetaTitle = "Fraction Calculator - Solve Fractions Online"
    MetaDesc = "Add, subtract, multiply, and divide fractions easily. Displays simplified fractional answers."
    Category = "Scientific & Math"
    Icon = "➗"
    Html = @"
        <div class="form-row">
          <div class="form-group" style="text-align:center;">
            <input type="number" id="frac-num1" value="1" class="input-field" style="text-align:center;" />
            <hr style="margin:0.25rem 0;" />
            <input type="number" id="frac-den1" value="2" class="input-field" style="text-align:center;" />
          </div>
          <div class="form-group" style="align-self:center; max-width:4rem;">
            <select id="frac-op" class="select-field" style="font-size:1.5rem; text-align:center;">
              <option value="add">+</option>
              <option value="sub">-</option>
              <option value="mul">*</option>
              <option value="div">/</option>
            </select>
          </div>
          <div class="form-group" style="text-align:center;">
            <input type="number" id="frac-num2" value="1" class="input-field" style="text-align:center;" />
            <hr style="margin:0.25rem 0;" />
            <input type="number" id="frac-den2" value="3" class="input-field" style="text-align:center;" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Fraction</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Fraction Result</div>
          <div class="total-balance" id="frac-result-val" style="color:var(--accent);">5 / 6</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const n1 = parseInt(document.getElementById('frac-num1').value);
        const d1 = parseInt(document.getElementById('frac-den1').value);
        const n2 = parseInt(document.getElementById('frac-num2').value);
        const d2 = parseInt(document.getElementById('frac-den2').value);
        const op = document.getElementById('frac-op').value;
        
        if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
          alert('Denominators cannot be zero and all values must be integers.');
          return;
        }
        
        let rn = 0;
        let rd = 1;
        
        if (op === 'add') {
          rn = (n1 * d2) + (n2 * d1);
          rd = d1 * d2;
        } else if (op === 'sub') {
          rn = (n1 * d2) - (n2 * d1);
          rd = d1 * d2;
        } else if (op === 'mul') {
          rn = n1 * n2;
          rd = d1 * d2;
        } else {
          rn = n1 * d2;
          rd = d1 * n2;
        }
        
        if (rd === 0) {
          alert('Invalid division by zero fraction.');
          return;
        }
        
        function gcd(a, b) {
          return b ? gcd(b, a % b) : a;
        }
        const divisor = Math.abs(gcd(rn, rd));
        rn /= divisor;
        rd /= divisor;
        
        if (rd < 0) {
          rn = -rn;
          rd = -rd;
        }
        
        document.getElementById('frac-result-val').innerText = rn + (rd === 1 ? '' : ' / ' + rd) + ' (or ' + (rn / rd).toFixed(4) + ')';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Perform Fraction Operations</h2><p>This fraction solver handles math formulas containing fractional bounds, simplifying answers dynamically.</p>"
    Faq = "[{`"question`":`"How do you simplify fractions?`",`"answer`":`"Divide the numerator and denominator by their Greatest Common Divisor (GCD).`"}]"
  },
  # 57. Standard Deviation Calculator
  @{
    Slug = "standard-deviation-calculator"
    Title = "Standard Deviation Calculator"
    MetaTitle = "Standard Deviation Calculator - Find Variance"
    MetaDesc = "Calculate population and sample standard deviation, variance, and mean for any dataset."
    Category = "Scientific & Math"
    Icon = "📊"
    Html = @"
        <div class="form-group">
          <label for="sd-data">Dataset (comma-separated values)</label>
          <input type="text" id="sd-data" value="10, 12, 23, 24, 30" class="input-field" />
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Variance &amp; SD</button>
        <div id="result-section" class="result-section hidden">
          <div class="metric-grid">
            <div class="metric-card">
              <span class="metric-title">Sample SD (s)</span>
              <span class="metric-value" id="sd-sample-val">8.34</span>
            </div>
            <div class="metric-card">
              <span class="metric-title">Population SD (&sigma;)</span>
              <span class="metric-value" id="sd-pop-val" style="color:var(--accent);">7.46</span>
          </div>
        </div>
      </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const txt = document.getElementById('sd-data').value;
        const arr = txt.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        
        if (arr.length < 2) {
          alert('Please enter at least 2 numbers.');
          return;
        }
        
        const n = arr.length;
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const sqDiffs = arr.map(val => Math.pow(val - mean, 2));
        const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);
        
        const sampleVar = sumSqDiffs / (n - 1);
        const popVar = sumSqDiffs / n;
        
        const sampleSD = Math.sqrt(sampleVar);
        const popSD = Math.sqrt(popVar);
        
        document.getElementById('sd-sample-val').innerText = sampleSD.toFixed(4).replace(/\.?0+$/, '');
        document.getElementById('sd-pop-val').innerText = popSD.toFixed(4).replace(/\.?0+$/, '');
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Statistical Deviations</h2><p>Standard deviation measures the spread or dispersion of datasets relative to their mathematical average.</p>"
    Faq = "[{`"question`":`"What is standard deviation?`",`"answer`":`"It evaluates statistical dispersion. Standard deviation maps how widely values differ from the mean.`"}]"
  },
  # 58. Secure Password Generator
  @{
    Slug = "password-generator"
    Title = "Secure Password Generator"
    MetaTitle = "Password Generator - Secure Passwords"
    MetaDesc = "Generate strong, randomized passwords instantly to secure your online credentials."
    Category = "Games & Fun"
    Icon = "🔑"
    Html = @"
        <div class="form-group">
          <label for="pass-len">Password Length</label>
          <input type="number" id="pass-len" value="12" min="6" max="64" class="input-field" />
        </div>
        <div class="form-row" style="margin-bottom:1rem; gap:1.5rem; justify-content:center;">
          <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="checkbox" id="pass-upper" checked /> Uppercase (A-Z)
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="checkbox" id="pass-num" checked /> Numbers (0-9)
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="checkbox" id="pass-sym" checked /> Symbols (!@#$)
          </label>
        </div>
        <button id="calc-btn" class="calc-btn">Generate Password</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Your Secure Password</div>
          <div class="total-balance" id="pass-result-val" style="font-size:1.5rem; word-break:break-all; color:var(--accent); margin-top:1rem;">password</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const len = parseInt(document.getElementById('pass-len').value) || 12;
        const upper = document.getElementById('pass-upper').checked;
        const num = document.getElementById('pass-num').checked;
        const sym = document.getElementById('pass-sym').checked;
        
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (num) chars += '0123456789';
        if (sym) chars += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
        
        let pass = '';
        for (let i = 0; i < len; i++) {
          pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        document.getElementById('pass-result-val').innerText = pass;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Generate Secure Keys</h2><p>Avoid standard easily hackable passwords. Generate randomized strings containing numbers, symbols, and caps.</p>"
    Faq = "[{`"question`":`"How is safety defined?`",`"answer`":`"A safe password must have at least 12 characters, including upper case, lower case, digits, and symbols.`"}]"
  },
  # 59. Random Number Generator
  @{
    Slug = "random-number-generator"
    Title = "Random Number Generator"
    MetaTitle = "Random Number Generator - Draw Numbers"
    MetaDesc = "Generate truly random integers between custom range limits. Perfect for games and drawings."
    Category = "Games & Fun"
    Icon = "🎲"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="rand-min">Minimum Value</label>
            <input type="number" id="rand-min" value="1" class="input-field" />
          </div>
          <div class="form-group">
            <label for="rand-max">Maximum Value</label>
            <input type="number" id="rand-max" value="100" class="input-field" />
          </div>
        </div>
        <button id="calc-btn" class="calc-btn">Generate Number</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Random Value</div>
          <div class="total-balance" id="rand-result-val" style="font-size:3rem; color:var(--accent); margin-top:1rem;">42</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const min = parseInt(document.getElementById('rand-min').value);
        const max = parseInt(document.getElementById('rand-max').value);
        
        if (isNaN(min) || isNaN(max) || max <= min) {
          alert('Please enter a valid range. Maximum must be greater than Minimum.');
          return;
        }
        
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('rand-result-val').innerText = rand;
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Generate Random Integers</h2><p>Draw values dynamically based on custom bounds. Excellent for raffles, prize allocations, or statistical samples.</p>"
    Faq = "[{`"question`":`"Is it biased?`",`"answer`":`"No, the script utilizes high-variance mathematical functions that distribute results evenly.`"}]"
  },
  ,
  # Age Calculator
  @{
    Slug = "age-calculator"
    Title = "Age Calculator"
    MetaTitle = "Age Calculator - Calculate Exact Age Online"
    MetaDesc = "Calculate your exact age in years, months, days, weeks, and minutes. See how many days are left until your next birthday. Free and responsive."
    Category = "Date & Age"
    Icon = "🎂"
    Html = @"
<div class=`"form-group`">
          <label for=`"dob`">Date of Birth</label>
          <input type=`"date`" id=`"dob`" class=`"input-field`" />
        </div>
        <div class=`"form-group`">
          <label for=`"today-date`">Calculate Age As Of</label>
          <input type=`"date`" id=`"today-date`" class=`"input-field`" />
        </div>
        <button id=`"calculate-btn`" class=`"calc-btn`">Calculate Age</button>

        <!-- Result -->
        <div id=`"result-section`" class=`"result-section hidden`">
          <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; text-align: center; margin-bottom: 0.5rem;`">Your Age is</div>
          <div class=`"metric-grid`">
            <div class=`"metric-card`">
              <span class=`"metric-title`">Years</span>
              <span class=`"metric-value`" id=`"res-years`">0</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Months</span>
              <span class=`"metric-value`" id=`"res-months`">0</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Days</span>
              <span class=`"metric-value`" id=`"res-days`">0</span>
            </div>
          </div>
          <div class=`"breakdown-info`">
            <p>Your exact age is: <strong id=`"full-sentence`">...</strong></p>
            <p style=`"margin-top: 0.5rem;`">Next birthday in: <strong id=`"next-birthday`">...</strong></p>
          </div>
        </div>
"@
    Js = @"

    // Set defaults
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = ```${yyyy}-`${mm}-`${dd}``;
    
    document.getElementById('today-date').value = todayStr;
    document.getElementById('dob').setAttribute('max', todayStr);

    document.getElementById('calculate-btn').addEventListener('click', () => {
      const dobVal = document.getElementById('dob').value;
      const targetVal = document.getElementById('today-date').value;
      
      if (!dobVal || !targetVal) {
        alert('Please fill in both date inputs!');
        return;
      }
      
      const dob = new Date(dobVal);
      const target = new Date(targetVal);
      
      if (dob > target) {
        alert('Birth date cannot be after the target date!');
        return;
      }
      
      let years = target.getFullYear() - dob.getFullYear();
      let months = target.getMonth() - dob.getMonth();
      let days = target.getDate() - dob.getDate();
      
      if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Calculate next birthday countdown
      let nextBdayYear = target.getFullYear();
      let nextBday = new Date(nextBdayYear, dob.getMonth(), dob.getDate());
      if (nextBday < target) {
        nextBdayYear++;
        nextBday = new Date(nextBdayYear, dob.getMonth(), dob.getDate());
      }
      const diffTime = Math.abs(nextBday - target);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Output
      document.getElementById('res-years').innerText = years;
      document.getElementById('res-months').innerText = months;
      document.getElementById('res-days').innerText = days;
      
      document.getElementById('full-sentence').innerText = ```${years} years, `${months} months, and `${days} days``;
      
      if (diffDays === 0 || (dob.getMonth() === target.getMonth() && dob.getDate() === target.getDate())) {
        document.getElementById('next-birthday').innerText = `"Happy Birthday! Today is your birthday! 🎉`";
      } else {
        document.getElementById('next-birthday').innerText = ```${diffDays} days left``;
      }
      
      document.getElementById('result-section').classList.remove('hidden');
    });
"@
    Seo = @"
<p>Our online age calculator deduces the exact timeline between a specific date of birth and your targeted chronological date (which defaults to today's date). The calculator breaks down the calculation into years, months, and days, so you do not have to manually account for leap years or month lengths.</p>
          <h3>Step-by-Step Calculation Guide</h3>
          <p>To compute your age manually, follow these calendar rules:</p>
          <ol>
            <li>Subtract the birth year from the target year.</li>
            <li>Subtract the birth month from the target month. If the result is negative, subtract 1 from the year value and add 12 to the month value.</li>
            <li>Subtract the birth day from the target day. If this result is negative, subtract 1 from the month and add the number of days in the previous month.</li>
          </ol>
"@
    Faq = '[{"question":"Does this age calculator account for leap years?","answer":"Yes, our age calculator accounts for leap years by checking the exact calendar date boundaries, including February 29th."}]'
  },
  # BMI Calculator
  @{
    Slug = "bmi-calculator"
    Title = "BMI Calculator"
    MetaTitle = "BMI Calculator - Calculate Body Mass Index Online"
    MetaDesc = "Calculate your BMI (Body Mass Index) with our free online tool. Supports metric and imperial systems. Includes weight category classifications."
    Category = "Fitness & Health"
    Icon = "⚖️"
    Html = @"
<div class=`"unit-tabs`">
          <button id=`"metric-tab`" class=`"tab-btn active`">Metric (cm/kg)</button>
          <button id=`"imperial-tab`" class=`"tab-btn`">Imperial (in/lbs)</button>
        </div>

        <!-- Metric Form -->
        <div id=`"metric-form`">
          <div class=`"form-row`">
            <div class=`"form-group`">
              <label for=`"height-cm`">Height (cm)</label>
              <input type=`"number`" id=`"height-cm`" placeholder=`"e.g. 175`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"weight-kg`">Weight (kg)</label>
              <input type=`"number`" id=`"weight-kg`" placeholder=`"e.g. 70`" class=`"input-field`" />
            </div>
          </div>
        </div>

        <!-- Imperial Form -->
        <div id=`"imperial-form`" class=`"hidden`">
          <div class=`"form-row`">
            <div class=`"form-group`">
              <label for=`"height-ft`">Height (feet)</label>
              <input type=`"number`" id=`"height-ft`" placeholder=`"ft`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"height-in`">Height (inches)</label>
              <input type=`"number`" id=`"height-in`" placeholder=`"in`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"weight-lbs`">Weight (pounds)</label>
              <input type=`"number`" id=`"weight-lbs`" placeholder=`"lbs`" class=`"input-field`" />
            </div>
          </div>
        </div>

        <button id=`"calculate-btn`" class=`"calc-btn`">Calculate BMI</button>

        <!-- Result -->
        <div id=`"result-section`" class=`"result-section hidden`">
          <div class=`"result-display`">
            <span class=`"score-label`">Your BMI is</span>
            <span id=`"bmi-score`" class=`"score-value`">22.9</span>
            <span id=`"bmi-category`" class=`"category-tag normal`">Normal Weight</span>
          </div>

          <!-- Gauge bar -->
          <div class=`"gauge-wrapper`">
            <div class=`"gauge-bar`">
              <div class=`"gauge-segment underweight`"></div>
              <div class=`"gauge-segment normal`"></div>
              <div class=`"gauge-segment overweight`"></div>
              <div class=`"gauge-segment obese`"></div>
            </div>
            <div id=`"gauge-pointer`" class=`"gauge-pointer`" style=`"left: 50%`"></div>
            <div class=`"gauge-labels`">
              <span>16.0</span>
              <span>18.5</span>
              <span>25.0</span>
              <span>30.0</span>
              <span>35.0</span>
            </div>
          </div>

          <div class=`"breakdown-info`">
            <p id=`"bmi-feedback`">...</p>
          </div>
        </div>
"@
    Js = @"

    let activeUnit = 'metric';
    const metricTab = document.getElementById('metric-tab');
    const imperialTab = document.getElementById('imperial-tab');
    const metricForm = document.getElementById('metric-form');
    const imperialForm = document.getElementById('imperial-form');

    metricTab.addEventListener('click', () => {
      activeUnit = 'metric';
      metricTab.classList.add('active');
      imperialTab.classList.remove('active');
      metricForm.classList.remove('hidden');
      imperialForm.classList.add('hidden');
    });

    imperialTab.addEventListener('click', () => {
      activeUnit = 'imperial';
      imperialTab.classList.add('active');
      metricTab.classList.remove('active');
      imperialForm.classList.remove('hidden');
      metricForm.classList.add('hidden');
    });

    document.getElementById('calculate-btn').addEventListener('click', () => {
      let bmi = 0;
      if (activeUnit === 'metric') {
        const cm = parseFloat(document.getElementById('height-cm').value);
        const kg = parseFloat(document.getElementById('weight-kg').value);
        
        if (!cm || !kg || cm <= 0 || kg <= 0) {
          alert('Please enter valid height and weight values!');
          return;
        }
        
        const m = cm / 100;
        bmi = kg / (m * m);
      } else {
        const ft = parseFloat(document.getElementById('height-ft').value) || 0;
        const inch = parseFloat(document.getElementById('height-in').value) || 0;
        const lbs = parseFloat(document.getElementById('weight-lbs').value);
        
        const totalInches = (ft * 12) + inch;
        if (totalInches <= 0 || !lbs || lbs <= 0) {
          alert('Please enter valid height and weight values!');
          return;
        }
        
        bmi = (lbs / (totalInches * totalInches)) * 703;
      }
      
      bmi = Math.round(bmi * 10) / 10;
      
      let category = '';
      let catClass = '';
      let feedback = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        catClass = 'underweight';
        feedback = 'Your BMI is underweight. Consider checking your metabolic requirements or talking to a doctor.';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        catClass = 'normal';
        feedback = 'Your BMI is in a healthy, normal range. Excellent job maintaining your energy balances!';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        catClass = 'overweight';
        feedback = 'Your BMI is in the overweight range. Incorporate daily activity or nutrition checks.';
      } else {
        category = 'Obese';
        catClass = 'obese';
        feedback = 'Your BMI falls in the obese category. Consult a healthcare provider or coach for health guidelines.';
      }
      
      // Update pointer position (16 is 0%, 35 is 100%)
      let pointerPos = 50;
      if (bmi < 16) pointerPos = 0;
      else if (bmi > 35) pointerPos = 100;
      else pointerPos = ((bmi - 16) / (35 - 16)) * 100;
      
      document.getElementById('bmi-score').innerText = bmi.toFixed(1);
      const catTag = document.getElementById('bmi-category');
      catTag.innerText = category;
      catTag.className = 'category-tag ' + catClass;
      document.getElementById('gauge-pointer').style.left = ```${pointerPos}%``;
      document.getElementById('bmi-feedback').innerText = feedback;
      
      document.getElementById('result-section').classList.remove('hidden');
    });
"@
    Seo = @"
<p>Body Mass Index (BMI) is a medical metric that estimates body fat levels based on a person's weight and height. It helps doctors screen for obesity, underweight conditions, and overall metabolic health risks.</p>
          <h3>WHO BMI Classification Table</h3>
          <table>
            <thead>
              <tr>
                <th>BMI Range</th>
                <th>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Less than 18.5</td>
                <td style=`"color:#3b82f6; font-weight:700;`">Underweight</td>
              </tr>
              <tr>
                <td>18.5 to 24.9</td>
                <td style=`"color:#10b981; font-weight:700;`">Normal Weight</td>
              </tr>
              <tr>
                <td>25.0 to 29.9</td>
                <td style=`"color:#f59e0b; font-weight:700;`">Overweight</td>
              </tr>
              <tr>
                <td>30.0 and above</td>
                <td style=`"color:#ef4444; font-weight:700;`">Obese</td>
              </tr>
            </tbody>
          </table>
"@
    Faq = '[]'
  },
  # Calorie Intake &amp; BMR Calculator
  @{
    Slug = "calorie-calculator"
    Title = "Calorie Intake &amp; BMR Calculator"
    MetaTitle = "Calorie Calculator - Daily Caloric Intake &amp; BMR Calculator"
    MetaDesc = "Calculate your BMR and daily calorie requirements to maintain, lose, or gain weight. Uses standard Mifflin-St Jeor formula. Free and responsive."
    Category = "Fitness & Health"
    Icon = "🔥"
    Html = @"
<div class=`"unit-tabs`">
          <button id=`"cal-metric-tab`" class=`"tab-btn active`">Metric (cm/kg)</button>
          <button id=`"cal-imperial-tab`" class=`"tab-btn`">Imperial (in/lbs)</button>
        </div>

        <div class=`"form-row`">
          <div class=`"form-group`">
            <label for=`"cal-age`">Age (years)</label>
            <input type=`"number`" id=`"cal-age`" value=`"25`" class=`"input-field`" min=`"15`" max=`"80`" />
          </div>
          <div class=`"form-group`">
            <label for=`"cal-gender`">Gender</label>
            <select id=`"cal-gender`" class=`"select-field`">
              <option value=`"male`" selected>Male</option>
              <option value=`"female`">Female</option>
            </select>
          </div>
        </div>

        <!-- Metric Fields -->
        <div id=`"cal-metric-form`" class=`"form-section`">
          <div class=`"form-row`">
            <div class=`"form-group`">
              <label for=`"cal-height-cm`">Height (cm)</label>
              <input type=`"number`" id=`"cal-height-cm`" value=`"175`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"cal-weight-kg`">Weight (kg)</label>
              <input type=`"number`" id=`"cal-weight-kg`" value=`"70`" class=`"input-field`" />
            </div>
          </div>
        </div>

        <!-- Imperial Fields -->
        <div id=`"cal-imperial-form`" class=`"form-section hidden`">
          <div class=`"form-row`">
            <div class=`"form-group`">
              <label for=`"cal-height-ft`">Height (ft)</label>
              <input type=`"number`" id=`"cal-height-ft`" value=`"5`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"cal-height-in`">Height (in)</label>
              <input type=`"number`" id=`"cal-height-in`" value=`"9`" class=`"input-field`" />
            </div>
            <div class=`"form-group`">
              <label for=`"cal-weight-lbs`">Weight (lbs)</label>
              <input type=`"number`" id=`"cal-weight-lbs`" value=`"154`" class=`"input-field`" />
            </div>
          </div>
        </div>

        <div class=`"form-group`">
          <label for=`"cal-activity`">Activity Level</label>
          <select id=`"cal-activity`" class=`"select-field`">
            <option value=`"1.2`" selected>Sedentary (Little or no exercise)</option>
            <option value=`"1.375`">Lightly Active (Exercise 1-3 times/week)</option>
            <option value=`"1.55`">Moderately Active (Exercise 4-5 times/week)</option>
            <option value=`"1.725`">Very Active (Intense exercise 6-7 times/week)</option>
            <option value=`"1.9`">Extra Active (Hard daily exercise / physical job)</option>
          </select>
        </div>

        <button id=`"cal-calc-btn`" class=`"calc-btn`">Calculate Calories</button>

        <!-- Result -->
        <div id=`"cal-result-section`" class=`"result-section hidden`" style=`"text-align: center;`">
          <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;`">Daily Maintenance Calories</div>
          <div class=`"total-balance`" id=`"cal-maintenance`" style=`"font-size: 2.5rem; font-weight: 900; color: var(--accent); margin: 0.5rem 0 1.5rem 0; line-height: 1;`">2,200 kcal</div>
          
          <div class=`"metric-grid`">
            <div class=`"metric-card`">
              <span class=`"metric-title`" style=`"font-size: 0.625rem;`">Mild Weight Loss (-0.25kg/wk)</span>
              <span class=`"metric-value`" id=`"cal-lose-mild`">1,950 kcal</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`" style=`"font-size: 0.625rem;`">Weight Loss (-0.5kg/wk)</span>
              <span class=`"metric-value`" id=`"cal-lose`">1,700 kcal</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`" style=`"font-size: 0.625rem;`">Weight Gain (+0.5kg/wk)</span>
              <span class=`"metric-value`" id=`"cal-gain`">2,700 kcal</span>
            </div>
          </div>
          
          <div class=`"breakdown-info`" style=`"text-align: left;`">
            <p>Your calculated <strong>Basal Metabolic Rate (BMR)</strong> is <strong><span id=`"bmr-val`">1,650</span> kcal</strong>. This represents the baseline energy your body needs to function at rest.</p>
          </div>
        </div>
"@
    Js = @"

    let activeUnit = 'metric';
    const metricTab = document.getElementById('cal-metric-tab');
    const imperialTab = document.getElementById('cal-imperial-tab');
    const metricForm = document.getElementById('cal-metric-form');
    const imperialForm = document.getElementById('cal-imperial-form');

    metricTab.addEventListener('click', () => {
      activeUnit = 'metric';
      metricTab.classList.add('active');
      imperialTab.classList.remove('active');
      metricForm.classList.remove('hidden');
      imperialForm.classList.add('hidden');
    });

    imperialTab.addEventListener('click', () => {
      activeUnit = 'imperial';
      imperialTab.classList.add('active');
      metricTab.classList.remove('active');
      imperialForm.classList.remove('hidden');
      metricForm.classList.add('hidden');
    });

    document.getElementById('cal-calc-btn').addEventListener('click', () => {
      const age = parseFloat(document.getElementById('cal-age').value);
      const gender = document.getElementById('cal-gender').value;
      const activity = parseFloat(document.getElementById('cal-activity').value);
      
      let weight = 0;
      let height = 0;
      
      if (activeUnit === 'metric') {
        height = parseFloat(document.getElementById('cal-height-cm').value);
        weight = parseFloat(document.getElementById('cal-weight-kg').value);
        
        if (!height || !weight || height <= 0 || weight <= 0) {
          alert('Please enter valid height and weight values!');
          return;
        }
      } else {
        const ft = parseFloat(document.getElementById('cal-height-ft').value) || 0;
        const inch = parseFloat(document.getElementById('cal-height-in').value) || 0;
        const lbs = parseFloat(document.getElementById('cal-weight-lbs').value) || 0;
        
        const totalInches = (ft * 12) + inch;
        if (totalInches <= 0 || lbs <= 0) {
          alert('Please enter valid height and weight values!');
          return;
        }
        
        height = totalInches * 2.54;
        weight = lbs * 0.45359237;
      }
      
      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      const maintenance = bmr * activity;
      const fmt = (num) => Math.round(num).toLocaleString() + ' kcal';
      
      document.getElementById('cal-maintenance').innerText = fmt(maintenance);
      document.getElementById('cal-lose-mild').innerText = fmt(maintenance - 250);
      document.getElementById('cal-lose').innerText = fmt(maintenance - 500);
      document.getElementById('cal-gain').innerText = fmt(maintenance + 500);
      
      document.getElementById('bmr-val').innerText = Math.round(bmr).toLocaleString();
      document.getElementById('cal-result-section').classList.remove('hidden');
    });
"@
    Seo = @"
<p>Your Basal Metabolic Rate (BMR) represents the energy expenditure required to sustain basic life processes. TDEE is BMR multiplied by your physical activity score. Adjusting your daily calories relative to TDEE lets you lose, maintain, or gain weight.</p>
"@
    Faq = '[]'
  },
  # Compound Interest Calculator
  @{
    Slug = "compound-interest-calculator"
    Title = "Compound Interest Calculator"
    MetaTitle = "Compound Interest Calculator - Free Investment Growth Projection"
    MetaDesc = "Calculate how your money grows over time with compound interest. Adjust starting principal, monthly additions, compounding frequencies, and see your future wealth."
    Category = "Finance & Business"
    Icon = "📈"
    Html = @"
<div class=`"form-row`">
          <div class=`"form-group`">
            <label for=`"principal`">Initial Investment (`$)</label>
            <input type=`"number`" id=`"principal`" value=`"10000`" class=`"input-field`" min=`"0`" />
          </div>
          <div class=`"form-group`">
            <label for=`"monthly-deposit`">Monthly Contribution (`$)</label>
            <input type=`"number`" id=`"monthly-deposit`" value=`"200`" class=`"input-field`" min=`"0`" />
          </div>
        </div>

        <div class=`"form-row`">
          <div class=`"form-group`">
            <label for=`"rate`">Annual Interest Rate (%)</label>
            <input type=`"number`" id=`"rate`" value=`"8`" step=`"0.1`" class=`"input-field`" min=`"0`" />
          </div>
          <div class=`"form-group`">
            <label for=`"years`">Time Period (Years)</label>
            <input type=`"number`" id=`"years`" value=`"10`" class=`"input-field`" min=`"1`" max=`"100`" />
          </div>
        </div>

        <div class=`"form-group`">
          <label for=`"frequency`">Compounding Frequency</label>
          <select id=`"frequency`" class=`"select-field`">
            <option value=`"12`" selected>Monthly (12/yr)</option>
            <option value=`"4`">Quarterly (4/yr)</option>
            <option value=`"2`">Semiannually (2/yr)</option>
            <option value=`"1`">Annually (1/yr)</option>
          </select>
        </div>

        <button id=`"calculate-btn`" class=`"calc-btn`">Calculate Growth</button>

        <!-- Result -->
        <div id=`"result-section`" class=`"result-section hidden`" style=`"text-align: center;`">
          <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;`">Future Balance Projection</div>
          <div class=`"total-balance`" id=`"total-balance`" style=`"font-size: 2.5rem; font-weight: 900; color: var(--accent); margin: 0.5rem 0 1.5rem 0; line-height: 1;`">`$34,896.42</div>
          
          <div class=`"metric-grid`">
            <div class=`"metric-card`">
              <span class=`"metric-title`">Initial Principal</span>
              <span class=`"metric-value`" id=`"init-principal`">`$10,000.00</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Total Contributions</span>
              <span class=`"metric-value`" id=`"total-contributions`">`$24,000.00</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Total Interest Earned</span>
              <span class=`"metric-value`" id=`"total-interest`">`$10,896.42</span>
            </div>
          </div>
          
          <div class=`"breakdown-info`" style=`"text-align: left;`">
            <p>By investing <strong>`$<span id=`"deposit-txt`">200</span></strong> monthly over <strong><span id=`"years-txt`">10</span> years</strong> at an annual rate of <strong><span id=`"rate-txt`">8</span>%</strong>, your initial deposit of <strong>`$<span id=`"init-txt`">10,000</span></strong> will grow by <strong>`$<span id=`"growth-txt`">24,896</span></strong>.</p>
          </div>
        </div>
"@
    Js = @"

    document.getElementById('calculate-btn').addEventListener('click', () => {
      const principal = parseFloat(document.getElementById('principal').value) || 0;
      const monthlyDeposit = parseFloat(document.getElementById('monthly-deposit').value) || 0;
      const rate = parseFloat(document.getElementById('rate').value) || 0;
      const years = parseInt(document.getElementById('years').value) || 0;
      const compoundFreq = parseInt(document.getElementById('frequency').value) || 12;
      
      if (years <= 0 || years > 100) {
        alert('Please enter a valid time period between 1 and 100 years.');
        return;
      }
      
      const r = rate / 100;
      const t = years;
      
      let balance = principal;
      let totalDeposited = principal;
      const totalMonths = t * 12;
      
      for (let m = 1; m <= totalMonths; m++) {
        const monthsPerComp = 12 / compoundFreq;
        if (m % monthsPerComp === 0) {
          const periodicRate = r / compoundFreq;
          balance += balance * periodicRate;
        }
        
        balance += monthlyDeposit;
        totalDeposited += monthlyDeposit;
      }
      
      const totalInterest = balance - totalDeposited;
      
      const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(val);
      };
      
      document.getElementById('total-balance').innerText = formatCurrency(balance);
      document.getElementById('init-principal').innerText = formatCurrency(principal);
      document.getElementById('total-contributions').innerText = formatCurrency(totalDeposited - principal);
      document.getElementById('total-interest').innerText = formatCurrency(totalInterest);
      
      document.getElementById('deposit-txt').innerText = monthlyDeposit;
      document.getElementById('years-txt').innerText = years;
      document.getElementById('rate-txt').innerText = rate;
      document.getElementById('init-txt').innerText = principal.toLocaleString();
      document.getElementById('growth-txt').innerText = Math.round(balance - principal).toLocaleString();
      
      document.getElementById('result-section').classList.remove('hidden');
    });
"@
    Seo = @"
<p>Compound interest is the concept of earning interest on interest. Unlike simple interest, which only calculates returns on your starting principal, compounding computes interest on your initial principal plus all the interest that has accumulated in preceding periods. Over longer timelines, compounding creates exponential growth, allowing your savings to compound into significant wealth.</p>
"@
    Faq = '[]'
  },
  # Date &amp; Calendar Calculator
  @{
    Slug = "date-calculator"
    Title = "Date &amp; Calendar Calculator"
    MetaTitle = "Date Calculator - Calculate Days Between Dates &amp; Add Days"
    MetaDesc = "Calculate the number of days, weeks, months, or years between two dates, or add/subtract days from a specific calendar date."
    Category = "Date & Age"
    Icon = "📅"
    Html = @"
<div class=`"unit-tabs`">
          <button id=`"date-diff-tab`" class=`"tab-btn active`">Days Between Dates</button>
          <button id=`"date-add-tab`" class=`"tab-btn`">Add/Subtract Days</button>
        </div>

        <!-- Tab 1: Days Between Dates -->
        <div id=`"date-diff-form`" class=`"form-section`">
          <div class=`"form-group`">
            <label for=`"diff-start`">Start Date</label>
            <input type=`"date`" id=`"diff-start`" class=`"input-field`" />
          </div>
          <div class=`"form-group`">
            <label for=`"diff-end`">End Date</label>
            <input type=`"date`" id=`"diff-end`" class=`"input-field`" />
          </div>
          <button id=`"date-diff-btn`" class=`"calc-btn`">Calculate Difference</button>
          
          <div id=`"diff-result`" class=`"result-section hidden`" style=`"text-align: center;`">
            <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;`">Time Difference</div>
            <div class=`"total-balance`" id=`"diff-days-val`" style=`"font-size: 2.25rem; font-weight: 900; color: var(--primary); margin: 0.5rem 0;`">0 Days</div>
            <div class=`"diff-breakdown`" id=`"diff-breakdown-val`">...</div>
          </div>
        </div>

        <!-- Tab 2: Add/Subtract Days -->
        <div id=`"date-add-form`" class=`"form-section hidden`">
          <div class=`"form-group`">
            <label for=`"add-start`">Start Date</label>
            <input type=`"date`" id=`"add-start`" class=`"input-field`" />
          </div>
          
          <div class=`"form-row`">
            <div class=`"form-group`">
              <label for=`"add-op`">Operation</label>
              <select id=`"add-op`" class=`"select-field`">
                <option value=`"add`" selected>Add (+)</option>
                <option value=`"sub`">Subtract (-)</option>
              </select>
            </div>
            <div class=`"form-group`">
              <label for=`"add-val`">Value</label>
              <input type=`"number`" id=`"add-val`" value=`"10`" class=`"input-field`" min=`"1`" />
            </div>
            <div class=`"form-group`">
              <label for=`"add-unit`">Unit</label>
              <select id=`"add-unit`" class=`"select-field`">
                <option value=`"days`" selected>Days</option>
                <option value=`"weeks`">Weeks</option>
                <option value=`"months`">Months</option>
                <option value=`"years`">Years</option>
              </select>
            </div>
          </div>
          
          <button id=`"date-add-btn`" class=`"calc-btn`">Compute New Date</button>
          
          <div id=`"add-result`" class=`"result-section hidden`" style=`"text-align: center;`">
            <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;`">Resulting Date</div>
            <div class=`"total-balance`" id=`"add-res-date`" style=`"font-size: 2.25rem; font-weight: 900; color: var(--primary); margin: 0.5rem 0;`">June 23, 2026</div>
            <p id=`"add-res-sub`" class=`"res-sub-text`">Tuesday</p>
          </div>
        </div>
"@
    Js = @"

    // Set defaults
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = ```${yyyy}-`${mm}-`${dd}``;

    document.getElementById('diff-start').value = todayStr;
    document.getElementById('diff-end').value = todayStr;
    document.getElementById('add-start').value = todayStr;

    const diffTab = document.getElementById('date-diff-tab');
    const addTab = document.getElementById('date-add-tab');
    const diffForm = document.getElementById('date-diff-form');
    const addForm = document.getElementById('date-add-form');

    diffTab.addEventListener('click', () => {
      diffTab.classList.add('active');
      addTab.classList.remove('active');
      diffForm.classList.remove('hidden');
      addForm.classList.add('hidden');
    });

    addTab.addEventListener('click', () => {
      addTab.classList.add('active');
      diffTab.classList.remove('active');
      addForm.classList.remove('hidden');
      diffForm.classList.add('hidden');
    });

    document.getElementById('date-diff-btn').addEventListener('click', () => {
      const startVal = document.getElementById('diff-start').value;
      const endVal = document.getElementById('diff-end').value;
      
      if (!startVal || !endVal) {
        alert('Please enter valid dates.');
        return;
      }
      
      const d1 = new Date(startVal);
      const d2 = new Date(endVal);
      const diffTime = d2 - d1;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();
      
      if (days < 0) {
        months--;
        const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      const absDays = Math.abs(diffDays);
      document.getElementById('diff-days-val').innerText = ```${absDays} `${absDays === 1 ? 'Day' : 'Days'}``;
      
      let breakdown = '';
      if (diffDays < 0) {
        breakdown = ``End date is before start date. Difference is: ``;
      } else {
        breakdown = 'Alternative breakdown: ';
      }
      
      const absYears = Math.abs(years);
      const absMonths = Math.abs(months);
      const absDaysRemainder = Math.abs(days);
      
      breakdown += ``<strong>`${absYears} years, `${absMonths} months, and `${absDaysRemainder} days</strong>``;
      
      const weeks = Math.floor(absDays / 7);
      const remDays = absDays % 7;
      breakdown += ``<br><span style=`"font-size:0.8rem; color:var(--text-muted);`">Or `${weeks} weeks and `${remDays} days</span>``;
      
      document.getElementById('diff-breakdown-val').innerHTML = breakdown;
      document.getElementById('diff-result').classList.remove('hidden');
    });

    document.getElementById('date-add-btn').addEventListener('click', () => {
      const startVal = document.getElementById('add-start').value;
      const op = document.getElementById('add-op').value;
      const quantity = parseInt(document.getElementById('add-val').value);
      const unit = document.getElementById('add-unit').value;
      
      if (!startVal || isNaN(quantity) || quantity <= 0) {
        alert('Please select a start date and enter a positive quantity.');
        return;
      }
      
      const date = new Date(startVal);
      const multiplier = op === 'add' ? 1 : -1;
      const val = quantity * multiplier;
      
      if (unit === 'days') {
        date.setDate(date.getDate() + val);
      } else if (unit === 'weeks') {
        date.setDate(date.getDate() + (val * 7));
      } else if (unit === 'months') {
        date.setMonth(date.getMonth() + val);
      } else if (unit === 'years') {
        date.setFullYear(date.getFullYear() + val);
      }
      
      document.getElementById('add-res-date').innerText = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('add-res-sub').innerText = date.toLocaleDateString('en-US', { weekday: 'long' });
      document.getElementById('add-result').classList.remove('hidden');
    });
"@
    Seo = @"
<p>Manual calendar calculations can lead to errors due to changing month lengths (28, 30, or 31 days) and leap years. Our date calculator solves calendar interval differences and projections client-side with 100% precision.</p>
"@
    Faq = '[]'
  },
  # Discount &amp; Savings Calculator
  @{
    Slug = "discount-calculator"
    Title = "Discount &amp; Savings Calculator"
    MetaTitle = "Discount Calculator - Calculate Sale Prices &amp; Savings"
    MetaDesc = "Calculate discount percentages, savings amounts, and final prices including sales tax with our free online discount calculator."
    Category = "Finance & Business"
    Icon = "🏷️"
    Html = @"
<div class=`"form-group`">
          <label for=`"disc-price`">Original Price (`$)</label>
          <input type=`"number`" id=`"disc-price`" value=`"100`" class=`"input-field`" min=`"0`" step=`"0.01`" />
        </div>
        
        <div class=`"form-row`">
          <div class=`"form-group`">
            <label for=`"disc-pct`">Discount (%)</label>
            <input type=`"number`" id=`"disc-pct`" value=`"20`" class=`"input-field`" min=`"0`" max=`"100`" step=`"any`" />
          </div>
          <div class=`"form-group`">
            <label for=`"disc-tax`">Sales Tax (%) (Optional)</label>
            <input type=`"number`" id=`"disc-tax`" value=`"0`" class=`"input-field`" min=`"0`" max=`"100`" step=`"any`" />
          </div>
        </div>
        
        <button id=`"calculate-btn`" class=`"calc-btn`">Calculate Savings</button>

        <!-- Result -->
        <div id=`"result-section`" class=`"result-section hidden`" style=`"text-align: center;`">
          <div class=`"summary-title`" style=`"font-size: 0.875rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;`">Final Price</div>
          <div class=`"total-balance`" id=`"disc-final-price`" style=`"font-size: 2.5rem; font-weight: 900; color: var(--accent); margin: 0.5rem 0 1.5rem 0; line-height: 1;`">`$80.00</div>
          
          <div class=`"metric-grid`">
            <div class=`"metric-card`">
              <span class=`"metric-title`">Original Price</span>
              <span class=`"metric-value`" id=`"disc-orig-val`">`$100.00</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Total Savings</span>
              <span class=`"metric-value`" id=`"disc-savings-val`" style=`"color: var(--accent);`">`$20.00</span>
            </div>
            <div class=`"metric-card`">
              <span class=`"metric-title`">Tax Amount</span>
              <span class=`"metric-value`" id=`"disc-tax-val`">`# 60. Calorie Burn MET Calculator
  @{
    Slug = "calorie-burn-met-calculator"
    Title = "Calorie Burn MET Calculator"
    MetaTitle = "Calorie Burn MET Calculator - Estimate Calories Burned"
    MetaDesc = "Estimate daily exercise calories burned during workouts using standard clinical MET activity ratings."
    Category = "Fitness & Health"
    Icon = "🔥"
    Html = @"
        <div class="form-row">
          <div class="form-group">
            <label for="met-weight">Weight (kg)</label>
            <input type="number" id="met-weight" value="70" class="input-field" />
          </div>
          <div class="form-group">
            <label for="met-duration">Duration (Minutes)</label>
            <input type="number" id="met-duration" value="30" class="input-field" />
          </div>
        </div>
        <div class="form-group">
          <label for="met-activity">Activity Type</label>
          <select id="met-activity" class="select-field">
            <option value="8.0">Running (8.0 MET)</option>
            <option value="4.0">Walking briskly (4.0 MET)</option>
            <option value="6.0">Bicycling moderate (6.0 MET)</option>
            <option value="9.8">Swimming (9.8 MET)</option>
            <option value="1.5">Sedentary desk work (1.5 MET)</option>
          </select>
        </div>
        <button id="calc-btn" class="calc-btn">Calculate Burned Calories</button>
        <div id="result-section" class="result-section hidden" style="text-align:center;">
          <div class="summary-title">Calories Burned</div>
          <div class="total-balance" id="met-result-val" style="color:var(--accent); margin-top:1rem;">210 kcal</div>
        </div>
"@
    Js = @"
      document.getElementById('calculate-btn').addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('met-weight').value) || 0;
        const dur = parseFloat(document.getElementById('met-duration').value) || 0;
        const met = parseFloat(document.getElementById('met-activity').value) || 0;
        
        if (weight <= 0 || dur <= 0) {
          alert('Please enter valid inputs.');
          return;
        }
        
        const burned = dur * (met * 3.5 * weight / 200);
        document.getElementById('met-result-val').innerText = Math.round(burned) + ' kcal';
        document.getElementById('result-section').classList.remove('hidden');
      });
"@
    Seo = "<h2>Understand Exercise Energy Consumption</h2><p>MET stands for Metabolic Equivalent of Task, a standard scoring system representing energy spend relative to baseline rest.</p>"
    Faq = "[{`"question`":`"What is a MET?`",`"answer`":`"One MET represents the rate of energy expenditure while sitting quietly, equal to roughly 1 kcal/kg/hour.`"}]"
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

  # Category mappings for breadcrumbs
  $catSlug = ""
  $catTitle = ""
  if ($category -eq "Date & Age" -or $category -eq "Dates & Age") {
    $catSlug = "date-age"
    $catTitle = "Date & Age Calculators"
  } elseif ($category -eq "Fitness & Health" -or $category -eq "Health & Fitness") {
    $catSlug = "health-fitness"
    $catTitle = "Health & Fitness Calculators"
  } elseif ($category -eq "Finance & Business" -or $category -eq "Finance & Loan" -or $category -eq "Finance") {
    $catSlug = "finance"
    $catTitle = "Finance & Loan Calculators"
  } elseif ($category -eq "Scientific & Math" -or $category -eq "Math") {
    $catSlug = "math"
    $catTitle = "Scientific & Math Tools"
  } elseif ($category -eq "Conversions & Units" -or $category -eq "Conversions") {
    $catSlug = "conversions"
    $catTitle = "Conversions & Unit Tools"
  } elseif ($category -eq "Games & Fun" -or $category -eq "Games") {
    $catSlug = "games"
    $catTitle = "Games & Fun Tools"
  } else {
    $catSlug = "math"
    $catTitle = "Scientific & Math Tools"
  }

  # Category Templates with {Title} placeholder for 600-1000 word justified SEO articles
  $dateAgeTemplate = @'
<h3>The Value of Accurate Timeline Tracking</h3>
<p>In our fast-paced globalized world, tracking time intervals, milestones, and chronological ages is crucial for both personal planning and professional operations. Whether you are calculating employee hours, project deadlines, or checking age thresholds for legal compliance, having a reliable online tool like the {Title} makes these processes seamless and error-free.</p>
<p>Modern time-tracking utilizes advanced algorithms to account for the irregularities of our calendar system. Unlike simple division, which might assume every month has 30 days or every year has 365 days, a proper calendar solver evaluates leap years, the varying length of months (from 28 to 31 days), and precise timezone boundaries. This level of accuracy is essential for contract agreements, logistics, billing systems, and medical health assessments.</p>
<h3>Step-by-Step Instructions & Best Practices</h3>
<p>Using the {Title} is straightforward, but following a few simple steps ensures you get the most accurate results:</p>
<ul>
  <li>First, verify that your browser's date and time settings are correct, as the calculator uses your local system clock for default values.</li>
  <li>Ensure that dates are input in the standard format (YYYY-MM-DD) or selected correctly using the interactive date picker.</li>
  <li>Double-check the boundaries of your calculation. For instance, determine whether you need to include or exclude the starting or ending day, as this can change the final count by one day (an occurrence known as the fencepost error).</li>
</ul>
<p>For best results, always review the generated breakdown, which displays the interval in years, months, weeks, and days, giving you multiple ways to understand the duration.</p>
<h3>Real-World Scenarios and Practical Examples</h3>
<p>Let us explore some common practical applications where this calculation plays a major role:</p>
<ol>
  <li><strong>Project Management:</strong> When planning a software development sprint or construction project, managers need to compute the exact working days between the kickoff and the deadline, factoring in weekends and holidays.</li>
  <li><strong>Legal and Compliance Checks:</strong> Businesses and event organizers frequently verify age gates (such as 18+ or 21+ restrictions) to ensure regulatory compliance. A quick scan of a birthdate using a verified tool eliminates human mathematical errors in high-pressure environments.</li>
  <li><strong>Personal Milestones:</strong> Tracking gestational weeks during pregnancy, counting down days to a wedding, or estimating exact retirement milestones are all simplified using digital calendar tools.</li>
</ol>
<p>By using a dedicated tool instead of manual head math, you eliminate the risk of leap-year discrepancies and minor addition errors, ensuring peace of mind in both your personal and professional life.</p>
'@

  $fitnessTemplate = @'
<h3>Understanding Modern Health & Metabolic Tracking</h3>
<p>Maintaining a healthy lifestyle requires a balance of proper nutrition, regular exercise, and accurate metabolic tracking. Utilizing tools like the {Title} allows you to calculate baseline physiological scores, providing actionable data to optimize your fitness journey. Whether you are tracking Body Mass Index, estimating daily caloric limits, or calculating body fat percentages, these assessments serve as the foundation of any health plan.</p>
<p>Metabolic rate equations (such as the Mifflin-St Jeor or Harris-Benedict formulas) take your age, gender, height, and weight to calculate how many calories your body burns at rest (BMR). By factoring in your activity level, you get your Total Daily Energy Expenditure (TDEE). This helps you determine your target calorie goals, whether your objective is weight maintenance, healthy fat loss, or muscle gain.</p>
<h3>How to Use This Tool Effectively</h3>
<p>To get the most accurate results from the {Title}, follow these best practices:</p>
<ul>
  <li>Take your measurements at the same time each day (preferably in the morning before eating or working out) to minimize fluctuations from water retention.</li>
  <li>Ensure you select the correct unit tab (Metric or Imperial) to avoid converting measurements manually, which can introduce calculation errors.</li>
  <li>Input your current physical activity level honestly. Overestimating activity levels is a common pitfall that leads to inflated energy expenditure estimates.</li>
</ul>
<p>Always remember that calculator outputs are estimations meant to serve as guidelines. Combining these digital tools with regular fitness reviews yields the best long-term success.</p>
<h3>Real-World Applications of Fitness Calculators</h3>
<p>Physiological calculators are used across several domains to tailor health programs:</p>
<ol>
  <li><strong>Nutritional Coaching:</strong> Certified nutritionists use caloric estimators to establish dietary baselines, adjusting protein, carbohydrate, and fat ratios to fit client goals.</li>
  <li><strong>Athletic Training:</strong> Runners and triathletes track activity METs and running paces to schedule workouts, prevent overtraining, and monitor metabolic burn rates.</li>
  <li><strong>Clinical Screening:</strong> Healthcare professionals use body mass indicators as a quick screening tool to identify potential health risks associated with weight categories.</li>
</ol>
<p>By leveraging these tools, you replace guesswork with scientifically validated estimations, enabling you to make informed decisions about your diet, workouts, and overall lifestyle habits.</p>
'@

  $financeTemplate = @'
<h3>The Foundations of Personal and Business Finance</h3>
<p>Navigating the complex world of finance requires precision, foresight, and data-driven decision making. Whether you are managing personal debt, projecting investment growth, or calculating tax brackets, using tools like the {Title} gives you immediate clarity on your money. Understanding financial metrics like the time value of money, amortization schedules, and interest rates is essential to building long-term financial security.</p>
<p>Calculations involving compound interest, loan repayments (EMIs), or investment returns rely on exponential formulas. Compounding interest, for instance, allows your money to grow exponentially by earning returns on your interest. In contrast, loan amortization spreads your monthly payments between principal repayment and interest costs, gradually reducing your overall debt. Visualizing these numbers helps you choose the best loan terms or investment durations.</p>
<h3>Step-by-Step Instructions & Financial Best Practices</h3>
<p>Using the {Title} tool is simple and effective. Here is how to perform your calculations correctly:</p>
<ul>
  <li>First, gather all relevant terms, including the starting amount (principal), interest rates, and loan tenure or investment duration.</li>
  <li>Input the figures into their respective fields. For interest rates, make sure to enter the annual rate (APR) as the tool handles periodic interest conversions automatically.</li>
  <li>Choose the correct compounding or payment frequency (e.g. monthly, quarterly, or annually) as this heavily influences your interest totals.</li>
</ul>
<p>We advise comparing multiple scenarios (for example, comparing a 15-year mortgage against a 30-year mortgage) to see how small changes in interest rates or monthly additions affect your lifetime costs.</p>
<h3>Practical Real-World Financial Scenarios</h3>
<p>Let us analyze three common scenarios where this calculator provides immediate value:</p>
<ol>
  <li><strong>Mortgage and Auto Financing:</strong> Homebuyers and car shoppers calculate monthly EMIs to ensure they do not exceed their monthly budgets, reviewing the full amortization table to understand how much interest they pay over time.</li>
  <li><strong>Retirement Planning:</strong> Investors project the compounding growth of their retirement funds by adjusting monthly contributions, visualizing how early investments result in larger future balances.</li>
  <li><strong>Business Profitability:</strong> Store owners and entrepreneurs calculate profit margins, markups, and break-even points to price their products correctly and maintain stable cash flows.</li>
</ol>
<p>By using our verified financial tools, you eliminate calculation mistakes, save money on financing fees, and optimize your wealth accumulation strategies with confidence.</p>
'@

  $mathTemplate = @'
<h3>The Importance of Mathematical Precision</h3>
<p>Mathematics is the universal language of science, engineering, and daily problem-solving. From computing semester GPAs to solving trigonometric functions, having access to reliable computational engines like the {Title} is essential for students, researchers, and professional workers. Utilizing digital calculation tools ensures you solve complex equations in seconds with absolute accuracy.</p>
<p>Advanced math calculations range from simple percentages and rounding to statistics (like standard deviations and percentiles) and scientific keypad expressions. In all these cases, the order of operations (PEMDAS/BODMAS) must be strictly maintained to get the correct result. Modern solvers handle parentheses, exponentiation, logs, and trigonometric ratios natively, giving you clean, verifiable mathematical answers.</p>
<h3>How to Use This Solver & Best Practices</h3>
<p>To compute your equations successfully using the {Title}, follow these guidelines:</p>
<ul>
  <li>Check if your inputs require specific unit formats. For example, when solving trigonometry, verify if the calculator expects values in radians or degrees.</li>
  <li>For statistics or datasets, format your list input using commas or spaces as specified by the helper labels.</li>
  <li>Review the final calculated steps or remainder breakdowns to verify the math logic behind your output.</li>
</ul>
<p>Using these online tools helps reinforce learning, letting students check homework solutions and engineers run rapid computations in the field without manual paperwork.</p>
<h3>Common Practical Applications of Math Solvers</h3>
<p>Mathematical calculations are widely used across multiple everyday scenarios:</p>
<ol>
  <li><strong>Academic Progress:</strong> Students and university coordinators calculate semester CGPAs and class grades to track academic performance and eligibility requirements.</li>
  <li><strong>Engineering and Trades:</strong> Technicians and builders use area, rounding, and division solvers to estimate project materials, square footage, and dimension cuts.</li>
  <li><strong>Statistical Analysis:</strong> Researchers calculate variance, sample standard deviations, and percentiles to interpret experimental data and identify trends.</li>
</ol>
<p>By using our digital mathematical solvers, you avoid manual arithmetic mistakes, save valuable study and work time, and achieve consistent precision in all your projects.</p>
'@

  $conversionsTemplate = @'
<h3>Navigating Global Systems of Measurement</h3>
<p>As our world becomes increasingly interconnected, unit conversions play an essential role in international commerce, travel, education, and technical trades. Whether you are translating weight from pounds to kilograms, measuring heights, or converting international financial scales (like millions to Indian crores), tools like the {Title} make unit scaling instant and easy.</p>
<p>Unit conversions rely on standardized mathematical conversion factors. For example, converting feet to centimeters requires multiplying by 30.48, while converting pounds to kilograms requires multiplying by 0.45359237. When scaling currencies or international numbers, understanding the difference between the Western numbering system (millions, billions) and the South Asian system (lakhs, crores) is crucial for accurate financial transactions and international business agreements.</p>
<h3>Step-by-Step Guide for Accurate Conversions</h3>
<p>Using the {Title} is simple, but keeping these tips in mind ensures error-free results:</p>
<ul>
  <li>Select the correct direction of conversion (e.g. from imperial to metric or metric to imperial) using the tab controls.</li>
  <li>Input your values carefully, paying attention to decimal points and scale settings.</li>
  <li>Understand the precision limits of your conversion. For instance, some technical applications require high decimal precision, while daily uses require rounded whole numbers.</li>
</ul>
<p>Our converters display results in high precision, while also providing rounded alternatives suitable for quick checks.</p>
<h3>Real-World Scenarios for Unit Converters</h3>
<p>Unit conversion is a daily necessity in many global sectors:</p>
<ol>
  <li><strong>Trade and Logistics:</strong> Freight forwarders and shipping managers convert package dimensions and weights (lbs, kg, meters, feet) to satisfy cargo regulations and international shipping fees.</li>
  <li><strong>Finance and Press:</strong> Journalists and financial analysts convert international funding rounds from billions of dollars to Indian rupees (INR) to make financial news accessible to local readers.</li>
  <li><strong>Science and Health:</strong> Doctors, athletes, and lab technicians convert pressure indices, fluid volumes (gallons, liters), and patient heights to standard clinical metrics.</li>
</ol>
<p>By using our standard conversion tools, you bypass complicated multiplication steps, eliminate conversion errors, and communicate measurements clearly across any regional boundary.</p>
'@

  $gamesTemplate = @'
<h3>The Mathematics of Probability, Gaming, and Security</h3>
<p>From playing board games to drawing sweepstakes and securing digital accounts, randomized numbers and logic play a massive role in our daily lives. Using specialized tools like the {Title} gives you access to unbiased, mathematically correct randomization algorithms. Whether you are calling numbers for a local bingo night, generating lottery ticket picks, or creating high-entropy passwords, digital generators ensure complete fairness and strong security.</p>
<p>Random number generation (RNG) in web browsers uses pseudo-random algorithms that are mathematically distributed across your specified bounds. This guarantees that every number in a draw has an equal probability of appearing, eliminating the biases of manual draws. In security, randomization is used to generate cryptographic passwords that prevent brute-force attacks and protect your private data online.</p>
<h3>How to Use Our Generators Effectively</h3>
<p>To get the best utility out of the {Title}, check out these standard rules:</p>
<ul>
  <li>For lottery and random drawing tools, set the lower and upper bounds carefully to match the official rules of the game you are playing.</li>
  <li>When generating passwords, check all key complexity options (uppercase, numbers, and special symbols) to create the strongest security key. We recommend using a length of at least 16 characters.</li>
  <li>For gaming tools like dice rollers, customize the number of active dice to fit the rules of your tabletop game.</li>
</ul>
<p>Since our tools run completely client-side in your browser, your generated passwords and numbers are private and are never sent or stored on any external server.</p>
'@

  # Select and customize the template based on category
  $selectedTemplate = ""
  if ($catSlug -eq "date-age") { $selectedTemplate = $dateAgeTemplate }
  elseif ($catSlug -eq "health-fitness") { $selectedTemplate = $fitnessTemplate }
  elseif ($catSlug -eq "finance") { $selectedTemplate = $financeTemplate }
  elseif ($catSlug -eq "math") { $selectedTemplate = $mathTemplate }
  elseif ($catSlug -eq "conversions") { $selectedTemplate = $conversionsTemplate }
  elseif ($catSlug -eq "games") { $selectedTemplate = $gamesTemplate }
  else { $selectedTemplate = $mathTemplate }

  $seoExtension = $selectedTemplate -replace '\{Title\}', $title

  # FAQ processing (HTML & JSON-LD schema)
  $faqHtml = ""
  $faqSchemaJson = ""
  
  $faqItems = @()
  if ($faq) {
    try {
      $faqItems = ConvertFrom-Json $faq
      if ($faqItems -eq $null) { $faqItems = @() }
    } catch {
      $faqItems = @()
    }
  }
  if ($faqItems -isnot [array]) {
    if ($faqItems -eq $null) {
      $faqItems = @()
    } else {
      $faqItems = @($faqItems)
    }
  }

  $generalFaqs = @(
    @{ question = "What is the {Title} used for?"; answer = "The {Title} is a free online tool designed to calculate solutions for {Title} queries instantly. It helps users get fast, error-free results." },
    @{ question = "How accurate are calculations on the {Title}?"; answer = "This tool uses industry-standard formulas and mathematical equations for {Category} to ensure 100% computational integrity and accuracy." },
    @{ question = "Is my data secure when using the {Title}?"; answer = "Yes. All computations are executed client-side in your web browser. We do not store, track, or transmit any input values or calculated results." },
    @{ question = "Can I use the {Title} on mobile devices?"; answer = "Absolutely. The calculator is built with a responsive mobile-first design, making it fully optimized for mobile web (mweb) as well as desktop viewports." },
    @{ question = "Are there any fees to use the {Title}?"; answer = "No. The {Title} is completely free to use with no hidden charges, registration requirements, or limits on calculation queries." }
  )

  # Pad to exactly 5 FAQs
  $finalFaqList = @()
  foreach ($item in $faqItems) {
    if ($finalFaqList.Count -lt 5) {
      $finalFaqList += $item
    }
  }
  foreach ($g in $generalFaqs) {
    if ($finalFaqList.Count -ge 5) { break }
    $qText = $g.question -replace '\{Title\}', $title
    $alreadyExists = $false
    foreach ($f in $finalFaqList) {
      if ($f.question -eq $qText) {
        $alreadyExists = $true
        break
      }
    }
    if (-not $alreadyExists) {
      $ansText = $g.answer -replace '\{Title\}', $title -replace '\{Category\}', $category
      $finalFaqList += @{ question = $qText; answer = $ansText }
    }
  }

  # Render the 5 FAQs in HTML and JSON-LD schema
  if ($finalFaqList.Count -gt 0) {
    $faqHtml = @"
      <!-- FAQ Section -->
      <section class="faq-section">
        <h2 class="faq-header">Frequently Asked Questions</h2>
        <div class="faq-grid">
"@
    foreach ($item in $finalFaqList) {
      $q = $item.question
      $a = $item.answer
      $faqHtml += @"
          <div class="faq-item">
            <h3 class="faq-question">$q</h3>
            <p class="faq-answer">$a</p>
          </div>
"@
    }
    $faqHtml += @"
        </div>
      </section>
"@

    $schemaList = @()
    foreach ($item in $finalFaqList) {
      $q = $item.question
      $a = $item.answer
      $qEsc = $q -replace '"', '\"'
      $aEsc = $a -replace '"', '\"'
      $schemaList += @"
    {
      "@type": "Question",
      "name": "$qEsc",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "$aEsc"
      }
    }
"@
    }
    $schemaMembers = $schemaList -join ",`n"
    $faqSchemaJson = @"
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
$schemaMembers
    ]
  }
  </script>
"@
  }

  # Build the final page (clean URLs configuration - pointing stylesheets/scripts/links 2 levels up)
  $output = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="shortcut icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$metaTitle</title>
  <meta name="description" content="$metaDesc">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.calcuportal.com/calculators/$slug">
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../script.js"></script>
  $faqSchemaJson
</head>
<body>

  <!-- Header -->
  <header>
    <div class="nav-container">
      <a href="../../index.html" class="logo">
        <img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon">
        <span>CalcuPortal</span>
      </a>
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="nav-links" id="nav-links">
        <a href="../../index.html" class="nav-link">Home</a>
        <a href="../../about/" class="nav-link">About</a>
        <a href="../../pages/contact/" class="nav-link">Contact</a>
        <button class="theme-btn" title="Toggle Theme">
          <span class="theme-btn-icon"></span>
        </button>
      </nav>
    </div>
  </header>

  <main>
    <div class="detail-container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <a href="../../index.html">Home</a>
        <span class="separator">&rsaquo;</span>
        <a href="../../categories/$catSlug/">$catTitle</a>
        <span class="separator">&rsaquo;</span>
        <span class="current">$title</span>
      </div>

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
          $seoExtension
        </div>
      </section>

      $faqHtml
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
  
  # Clean URL directory write
  $folder = "calculators/$slug"
  if (-not (Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder
  }
  $outputFile = "$folder/index.html"
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

