# generate_categories.ps1
# Script to generate 6 category-level (Type 2) pages.

$categories = @(
  @{ Id = "sec-dates"; Slug = "date-age"; Title = "Date & Age Calculators" },
  @{ Id = "sec-health"; Slug = "health-fitness"; Title = "Health & Fitness Calculators" },
  @{ Id = "sec-finance"; Slug = "finance"; Title = "Finance & Loan Calculators" },
  @{ Id = "sec-general"; Slug = "math"; Title = "Scientific & Math Tools" },
  @{ Id = "sec-conversions"; Slug = "conversions"; Title = "Conversions & Unit Tools" },
  @{ Id = "sec-games"; Slug = "games"; Title = "Games & Fun Tools" }
)

$calculators = @(
  # Date & Age (10)
  @{ Slug = "age-calculator"; Title = "Online Age Calculator"; Icon = "🎂"; Desc = "Calculate your exact age in years, months, and days based on your date of birth, and see a countdown to your next birthday."; CategoryId = "sec-dates" },
  @{ Slug = "date-calculator"; Title = "Date & Calendar Calculator"; Icon = "📅"; Desc = "Calculate the exact number of days between two dates, or add/subtract days, weeks, months, and years from any starting date."; CategoryId = "sec-dates" },
  @{ Slug = "time-age-checker"; Title = "Time Age Checker"; Icon = "🔞"; Desc = "Check exact ages, verify thresholds (e.g. 18+, 21+), and view time metrics based on birthday."; CategoryId = "sec-dates" },
  @{ Slug = "day-counter"; Title = "Day Counter"; Icon = "📅"; Desc = "Count the exact number of days between two dates. Fast and easy to use."; CategoryId = "sec-dates" },
  @{ Slug = "time-how-old-am-i"; Title = "Time How Old Am I"; Icon = "⏱️"; Desc = "Find your exact age in years, months, weeks, days, and seconds. Realtime countdown calculator."; CategoryId = "sec-dates" },
  @{ Slug = "time-duration"; Title = "Time Duration Calculator"; Icon = "⏱️"; Desc = "Calculate elapsed hours and minutes between two time periods. Perfect for timesheets and shift tracking."; CategoryId = "sec-dates" },
  @{ Slug = "time-work-hours"; Title = "Work Hours Calculator"; Icon = "💼"; Desc = "Calculate daily and weekly work hours, breaks, and gross pay with our free online timesheet calculator."; CategoryId = "sec-dates" },
  @{ Slug = "age-difference-calculator"; Title = "Age Difference Calculator"; Icon = "🎂"; Desc = "Compare two birthdays and calculate the exact age gap in years, months, and days."; CategoryId = "sec-dates" },
  @{ Slug = "time-date-day"; Title = "Day of Week Finder"; Icon = "📅"; Desc = "Find what day of the week (Monday, Tuesday, etc.) any specific calendar date falls on."; CategoryId = "sec-dates" },
  @{ Slug = "time-time-calculator"; Title = "Time Add & Subtract Calculator"; Icon = "⏱️"; Desc = "Add or subtract days, hours, and minutes from any starting time. Ideal for time cards and duration planning."; CategoryId = "sec-dates" },

  # Health & Fitness (10)
  @{ Slug = "bmi-calculator"; Title = "BMI Calculator"; Icon = "⚖️"; Desc = "Determine your Body Mass Index (BMI) and check if your weight falls in the underweight, normal, overweight, or obese ranges."; CategoryId = "sec-health" },
  @{ Slug = "calorie-calculator"; Title = "Calorie Intake & BMR Calculator"; Icon = "🔥"; Desc = "Calculate your Basal Metabolic Rate (BMR) and learn your daily caloric needs for weight maintenance, loss, or gain."; CategoryId = "sec-health" },
  @{ Slug = "pregnancy-calculator"; Title = "Pregnancy Due Date Calculator"; Icon = "👶"; Desc = "Estimate your due date, current gestational age, and pregnancy progress milestones based on your last menstrual period (LMP)."; CategoryId = "sec-health" },
  @{ Slug = "tdee-calculator"; Title = "TDEE Calculator"; Icon = "🔥"; Desc = "Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and physical activity thresholds."; CategoryId = "sec-health" },
  @{ Slug = "weight-watchers-points"; Title = "Weight Watchers Points Calculator"; Icon = "🍎"; Desc = "Estimate dietary points valuations based on calories, fat grams, and dietary fiber contents."; CategoryId = "sec-health" },
  @{ Slug = "bmr-calculator"; Title = "BMR Calculator"; Icon = "🔥"; Desc = "Estimate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor. Learn baseline rest calories."; CategoryId = "sec-health" },
  @{ Slug = "ideal-weight-calculator"; Title = "Ideal Weight Calculator"; Icon = "⚖️"; Desc = "Find your ideal body weight range based on scientific clinical formulas including Devine and Robinson."; CategoryId = "sec-health" },
  @{ Slug = "body-fat-calculator"; Title = "Body Fat Calculator"; Icon = "📏"; Desc = "Estimate your body fat percentage using standard tape measure parameters designed by the US Navy."; CategoryId = "sec-health" },
  @{ Slug = "pace-calculator"; Title = "Running Pace Calculator"; Icon = "🏃"; Desc = "Calculate your average running pace, duration, or distances for training runs and race splits."; CategoryId = "sec-health" },
  @{ Slug = "calorie-burn-met-calculator"; Title = "Calorie Burn MET Calculator"; Icon = "🔥"; Desc = "Estimate daily exercise calories burned during workouts using standard clinical MET activity ratings."; CategoryId = "sec-health" },

  # Finance & Business (16)
  @{ Slug = "compound-interest-calculator"; Title = "Compound Interest Calculator"; Icon = "📈"; Desc = "Project how your money grows over time with compounding interest. Adjust monthly deposits, interest rates, and compound frequencies."; CategoryId = "sec-finance" },
  @{ Slug = "loan-emi-calculator"; Title = "Loan EMI Calculator"; Icon = "🏠"; Desc = "Calculate your monthly equated installments (EMIs), interest payable, and total loan payment for mortgages or car loans."; CategoryId = "sec-finance" },
  @{ Slug = "discount-calculator"; Title = "Discount & Savings Calculator"; Icon = "🏷️"; Desc = "Instantly compute final store sale prices, markdown values, percentage savings, and sales tax additions at checkout."; CategoryId = "sec-finance" },
  @{ Slug = "fuel-cost-calculator"; Title = "Fuel Cost Calculator"; Icon = "⛽"; Desc = "Calculate fuel cost for any trip. Input distance, efficiency, and price to see travel cost."; CategoryId = "sec-finance" },
  @{ Slug = "profit-calculator"; Title = "Profit & Margin Calculator"; Icon = "📈"; Desc = "Calculate business profit amounts, markup ratios, and margins instantly based on cost and selling price."; CategoryId = "sec-finance" },
  @{ Slug = "amortization-calculator"; Title = "Loan Amortization Calculator"; Icon = "🏠"; Desc = "Generate a full amortization schedule detailing principal and interest breakdowns for any loan borrowing."; CategoryId = "sec-finance" },
  @{ Slug = "mileage-calculator"; Title = "Gas Mileage Calculator"; Icon = "🚗"; Desc = "Determine your vehicle's gas mileage (MPG or km/L) based on distance driven and fuel consumed."; CategoryId = "sec-finance" },
  @{ Slug = "electricity-calculator"; Title = "Electricity Cost Calculator"; Icon = "⚡"; Desc = "Calculate appliance electricity cost. Input wattage, hours used, and utility rate to see daily/yearly expenses."; CategoryId = "sec-finance" },
  @{ Slug = "irr-calculator"; Title = "IRR Calculator"; Icon = "📈"; Desc = "Estimate the Internal Rate of Return (IRR) for a series of annual investment cash flows."; CategoryId = "sec-finance" },
  @{ Slug = "mortgage-calculator"; Title = "Mortgage Calculator"; Icon = "🏠"; Desc = "Calculate monthly mortgage payments factoring in home price, down payment, interest rate, property taxes, and insurance."; CategoryId = "sec-finance" },
  @{ Slug = "auto-loan-calculator"; Title = "Auto Loan Calculator"; Icon = "🚗"; Desc = "Estimate your monthly car payments using vehicle price, down payment, trade-in value, and interest rate."; CategoryId = "sec-finance" },
  @{ Slug = "investment-calculator"; Title = "Investment Calculator"; Icon = "📈"; Desc = "Project the future value of your investments with regular monthly contributions and compound interest."; CategoryId = "sec-finance" },
  @{ Slug = "inflation-calculator"; Title = "Inflation Calculator"; Icon = "💵"; Desc = "Determine the future buying power of money and adjust value calculations for inflation rates."; CategoryId = "sec-finance" },
  @{ Slug = "income-tax-calculator"; Title = "Income Tax Calculator"; Icon = "💼"; Desc = "Estimate your federal income tax brackets, standard deductions, and net take-home pay."; CategoryId = "sec-finance" },
  @{ Slug = "sales-tax-calculator"; Title = "Sales Tax Calculator"; Icon = "🏷️"; Desc = "Find the total retail cost and sales tax amount for any purchase by entering product net price and tax rates."; CategoryId = "sec-finance" },
  @{ Slug = "credit-card-payoff"; Title = "Credit Card Payoff Calculator"; Icon = "💳"; Desc = "Calculate how long it takes to pay off credit card debt based on interest rate and monthly payments."; CategoryId = "sec-finance" },

  # Scientific & Math (15)
  @{ Slug = "scientific-calculator"; Title = "Scientific Calculator"; Icon = "📐"; Desc = "Perform advanced arithmetic, trigonometric functions (sin/cos/tan), logarithms, exponential powers, and root calculations."; CategoryId = "sec-general" },
  @{ Slug = "percentage-calculator"; Title = "Percentage Calculator"; Icon = "％"; Desc = "Find percentages of numbers, proportion percentages, and calculate percentage changes (increases and decreases)."; CategoryId = "sec-general" },
  @{ Slug = "cgpa-calculator"; Title = "CGPA Calculator"; Icon = "🎓"; Desc = "Estimate your Cumulative Grade Point Average (CGPA) from individual semester grade marks."; CategoryId = "sec-general" },
  @{ Slug = "statistics-percentile"; Title = "Statistics Percentile Calculator"; Icon = "📊"; Desc = "Find the k-th percentile value for any data set. Enter list values and see calculations."; CategoryId = "sec-general" },
  @{ Slug = "hcf-calculator"; Title = "HCF & LCM Calculator"; Icon = "📐"; Desc = "Find the Highest Common Factor (HCF / GCD) and Least Common Multiple (LCM) for any two numbers."; CategoryId = "sec-general" },
  @{ Slug = "math-rounding-numbers"; Title = "Rounding Numbers Calculator"; Icon = "🔢"; Desc = "Round numbers to the nearest unit, ten, hundred, thousand, or decimal index."; CategoryId = "sec-general" },
  @{ Slug = "math-long-division"; Title = "Long Division Calculator"; Icon = "📐"; Desc = "Perform long division and see calculated quotients and remainders instantly."; CategoryId = "sec-general" },
  @{ Slug = "remainder-calculator"; Title = "Remainder Calculator"; Icon = "🔢"; Desc = "Find the remainder of a division instantly. Ideal for modular arithmetic problems."; CategoryId = "sec-general" },
  @{ Slug = "square-footage-calculator"; Title = "Square Footage Calculator"; Icon = "📐"; Desc = "Calculate the square footage (area) of a room or space. Enter length and width measurements."; CategoryId = "sec-general" },
  @{ Slug = "rounding-calculator"; Title = "Rounding Calculator"; Icon = "🔢"; Desc = "Round any decimals or fractions up, down, or to the nearest digit index instantly."; CategoryId = "sec-general" },
  @{ Slug = "gpa-calculator"; Title = "GPA Calculator"; Icon = "🎓"; Desc = "Calculate your semester grade point average (GPA) from course credits and grade letters."; CategoryId = "sec-general" },
  @{ Slug = "big-number-calculator"; Title = "Big Number Calculator"; Icon = "🔢"; Desc = "Perform arithmetic calculations on extremely large numbers that exceed typical browser storage scales."; CategoryId = "sec-general" },
  @{ Slug = "grade-calculator"; Title = "Class Grade Calculator"; Icon = "📝"; Desc = "Find your current class grade average or check what score you need on the final exam to pass."; CategoryId = "sec-general" },
  @{ Slug = "fraction-calculator"; Title = "Fraction Calculator"; Icon = "➗"; Desc = "Add, subtract, multiply, and divide fractions easily. Displays simplified fractional answers."; CategoryId = "sec-general" },
  @{ Slug = "standard-deviation-calculator"; Title = "Standard Deviation Calculator"; Icon = "📊"; Desc = "Calculate population and sample standard deviation, variance, and mean for any dataset."; CategoryId = "sec-general" },

  # Conversions & Units (13)
  @{ Slug = "conversions-numbers-to-words"; Title = "Numbers to Words Converter"; Icon = "🔢"; Desc = "Convert numbers to their English word equivalents instantly. Supports large numbers, decimals, and custom outputs."; CategoryId = "sec-conversions" },
  @{ Slug = "conversions-height-ft-cm"; Title = "Height Ft to Cm Converter"; Icon = "📐"; Desc = "Convert heights between Feet/Inches and Centimeters instantly with our free online conversion tool."; CategoryId = "sec-conversions" },
  @{ Slug = "million-to-rupees"; Title = "Million to Rupees Converter"; Icon = "🇮🇳"; Desc = "Convert Millions to Indian Rupees (INR) instantly. Supports custom conversions for Lakhs and Crores."; CategoryId = "sec-conversions" },
  @{ Slug = "lbs-to-kg-converter"; Title = "Pounds to Kilograms Converter"; Icon = "⚖️"; Desc = "Convert weight measurements from Pounds (lbs) to Kilograms (kg) and vice versa."; CategoryId = "sec-conversions" },
  @{ Slug = "billion-to-rupees"; Title = "Billion to Rupees Converter"; Icon = "🇮🇳"; Desc = "Convert Billions to Indian Rupees (INR) instantly. Check the conversion value in Crores and Lakhs."; CategoryId = "sec-conversions" },
  @{ Slug = "million-to-crore"; Title = "Million to Crore Converter"; Icon = "🇮🇳"; Desc = "Convert Millions to Crores instantly. Check international financial scaling in Indian number formats."; CategoryId = "sec-conversions" },
  @{ Slug = "conversions-roman-numeral-date-converter"; Title = "Roman Numeral Date Converter"; Icon = "🏛️"; Desc = "Convert calendar dates to Roman numerals instantly. Perfect for tattoos, carvings, and formatting styles."; CategoryId = "sec-conversions" },
  @{ Slug = "meter-to-feet"; Title = "Meters to Feet Converter"; Icon = "📏"; Desc = "Convert meters to feet and vice versa instantly. Supports decimal values."; CategoryId = "sec-conversions" },
  @{ Slug = "square-meter-to-square-feet"; Title = "Square Meters to Square Feet"; Icon = "📐"; Desc = "Convert square meters to square feet and vice versa instantly. Perfect for real estate and flooring calculations."; CategoryId = "sec-conversions" },
  @{ Slug = "centimeter-to-meter"; Title = "Centimeters to Meters Converter"; Icon = "📏"; Desc = "Convert centimeters to meters and vice versa instantly. Fast metric conversions."; CategoryId = "sec-conversions" },
  @{ Slug = "conversions-pressure"; Title = "Pressure Units Converter"; Icon = "🌬️"; Desc = "Convert pressure units between PSI, Bar, Pascal, and Atmospheres instantly."; CategoryId = "sec-conversions" },
  @{ Slug = "gallons-to-liters"; Title = "Gallons to Liters Converter"; Icon = "🥤"; Desc = "Convert US Gallons to Liters and vice versa instantly. Free fluid volume converter."; CategoryId = "sec-conversions" },
  @{ Slug = "conversions-time"; Title = "Time Unit Converter"; Icon = "⏱️"; Desc = "Convert time measurements between seconds, minutes, hours, days, weeks, months, and years."; CategoryId = "sec-conversions" },

  # Games & Fun (5)
  @{ Slug = "games-lottery-number-generator"; Title = "Lottery Number Generator"; Icon = "🎰"; Desc = "Generate random lottery ticket numbers. Choose your range size and count to customize tickets."; CategoryId = "sec-games" },
  @{ Slug = "games-bingo-number-generator"; Title = "Bingo Number Generator"; Icon = "🎱"; Desc = "Call random Bingo numbers from 1 to 75. Keep track of previous draws."; CategoryId = "sec-games" },
  @{ Slug = "games-dice-roller"; Title = "Dice Roller"; Icon = "🎲"; Desc = "Roll standard 6-sided dice for board games. Customize the number of dice rolled."; CategoryId = "sec-games" },
  @{ Slug = "password-generator"; Title = "Secure Password Generator"; Icon = "🔑"; Desc = "Generate strong, randomized passwords instantly to secure your online credentials."; CategoryId = "sec-games" },
  @{ Slug = "random-number-generator"; Title = "Random Number Generator"; Icon = "🎲"; Desc = "Generate truly random integers between custom range limits. Perfect for games and drawings."; CategoryId = "sec-games" }
)

# Create folder if missing
if (-not (Test-Path "categories")) {
  New-Item -ItemType Directory -Path "categories"
}

foreach ($cat in $categories) {
  $catId = $cat.Id
  $catSlug = $cat.Slug
  $catTitle = $cat.Title

  # Build cards for this category
  $cardsHtml = ""
  $catCalcs = $calculators | Where-Object { $_.CategoryId -eq $catId }
  foreach ($calc in $catCalcs) {
    $slug = $calc.Slug
    $title = $calc.Title
    $icon = $calc.Icon
    $desc = $calc.Desc
    
    $cardsHtml += "        <a href='../../calculators/$slug/' class='calc-card'>`n"
    $cardsHtml += "          <div class='calc-card-header'>`n"
    $cardsHtml += "            <h3 class='calc-card-title'>$title</h3>`n"
    $cardsHtml += "            <span class='calc-card-icon'>$icon</span>`n"
    $cardsHtml += "          </div>`n"
    $cardsHtml += "          <p class='calc-card-desc'>$desc</p>`n"
    $cardsHtml += "          <div class='calc-card-footer'>`n"
    $cardsHtml += "            <span>Open Tool</span>`n"
    $cardsHtml += "            <span>&rarr;</span>`n"
    $cardsHtml += "          </div>`n"
    $cardsHtml += "        </a>`n"
  }

  $output = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="shortcut icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">
  <meta name="robots" content="index, follow">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$catTitle - Free Online Tools</title>
  <meta name="description" content="Access free online $catTitle. Fast, accurate, responsive, and 100% free to use.">
  <link rel="canonical" href="https://www.calcuportal.com/categories/$catSlug/">
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../script.js"></script>
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
        <a href="../../contact/" class="nav-link">Contact</a>
        <button class="theme-btn" title="Toggle Theme">
          <span class="theme-btn-icon"></span>
        </button>
      </nav>
    </div>
  </header>

  <main>
    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <a href="../../index.html">Home</a>
      <span class="separator">&rsaquo;</span>
      <span class="current">$catTitle</span>
    </div>

    <!-- Category Section -->
    <section class="category-section">
      <div class="category-header">
        <span class="category-title">$catTitle</span>
      </div>
      <p style="margin-bottom: 2rem; color: var(--text-secondary); max-width: 800px; line-height: 1.6;">
        Explore our complete directory of free online $catTitle. Click on any card below to open the calculator, view step-by-step instructions, read mathematical formulas, and check out our detailed FAQs.
      </p>
      
      <div class="category-grid">
$cardsHtml
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <div class="copyright-bar" style="border-top: none; padding-top: 0;">
      © <span id="year">2026</span> CalcuPortal. All rights reserved.
    </div>
  </footer>

  <script>
    document.getElementById('year').innerText = new Date().getFullYear();
  </script>
</body>
</html>
"@

  $catFolder = "categories/$catSlug"
  if (-not (Test-Path $catFolder)) {
    New-Item -ItemType Directory -Path $catFolder | Out-Null
  }
  $outputFile = "$catFolder/index.html"
  Set-Content -Path $outputFile -Value $output -Encoding utf8
  Write-Host "Generated category page: $outputFile"
}


