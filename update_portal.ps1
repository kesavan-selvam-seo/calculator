# update_portal.ps1
# Script to regenerate index.html and sitemap.xml with all 54 calculators.

$categories = @(
  @{ Id = "sec-dates"; Title = "📅 Date & Age Calculators" },
  @{ Id = "sec-health"; Title = "💪 Health & Fitness Calculators" },
  @{ Id = "sec-finance"; Title = "💵 Finance & Loan Calculators" },
  @{ Id = "sec-general"; Title = "📐 Scientific & Math Tools" },
  @{ Id = "sec-conversions"; Title = "⚖️ Conversions & Unit Tools" },
  @{ Id = "sec-games"; Title = "🎰 Games & Fun Tools" }
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

  # Health & Fitness (6)
  @{ Slug = "bmi-calculator"; Title = "BMI Calculator"; Icon = "⚖️"; Desc = "Determine your Body Mass Index (BMI) and check if your weight falls in the underweight, normal, overweight, or obese ranges."; CategoryId = "sec-health" },
  @{ Slug = "calorie-calculator"; Title = "Calorie Intake & BMR Calculator"; Icon = "🔥"; Desc = "Calculate your Basal Metabolic Rate (BMR) and learn your daily caloric needs for weight maintenance, loss, or gain."; CategoryId = "sec-health" },
  @{ Slug = "pregnancy-calculator"; Title = "Pregnancy Due Date Calculator"; Icon = "👶"; Desc = "Estimate your due date, current gestational age, and pregnancy progress milestones based on your last menstrual period (LMP)."; CategoryId = "sec-health" },
  @{ Slug = "tdee-calculator"; Title = "TDEE Calculator"; Icon = "🔥"; Desc = "Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and physical activity thresholds."; CategoryId = "sec-health" },
  @{ Slug = "weight-watchers-points"; Title = "Weight Watchers Points Calculator"; Icon = "🍎"; Desc = "Estimate dietary points valuations based on calories, fat grams, and dietary fiber contents."; CategoryId = "sec-health" },
  @{ Slug = "bmr-calculator"; Title = "BMR Calculator"; Icon = "🔥"; Desc = "Estimate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor. Learn baseline rest calories."; CategoryId = "sec-health" },

  # Finance & Business (9)
  @{ Slug = "compound-interest-calculator"; Title = "Compound Interest Calculator"; Icon = "📈"; Desc = "Project how your money grows over time with compounding interest. Adjust monthly deposits, interest rates, and compound frequencies."; CategoryId = "sec-finance" },
  @{ Slug = "loan-emi-calculator"; Title = "Loan EMI Calculator"; Icon = "🏠"; Desc = "Calculate your monthly equated installments (EMIs), interest payable, and total loan payment for mortgages or car loans."; CategoryId = "sec-finance" },
  @{ Slug = "discount-calculator"; Title = "Discount & Savings Calculator"; Icon = "🏷️"; Desc = "Instantly compute final store sale prices, markdown values, percentage savings, and sales tax additions at checkout."; CategoryId = "sec-finance" },
  @{ Slug = "fuel-cost-calculator"; Title = "Fuel Cost Calculator"; Icon = "⛽"; Desc = "Calculate fuel cost for any trip. Input distance, efficiency, and price to see travel cost."; CategoryId = "sec-finance" },
  @{ Slug = "profit-calculator"; Title = "Profit & Margin Calculator"; Icon = "📈"; Desc = "Calculate business profit amounts, markup ratios, and margins instantly based on cost and selling price."; CategoryId = "sec-finance" },
  @{ Slug = "amortization-calculator"; Title = "Loan Amortization Calculator"; Icon = "🏠"; Desc = "Generate a full amortization schedule detailing principal and interest breakdowns for any loan borrowing."; CategoryId = "sec-finance" },
  @{ Slug = "mileage-calculator"; Title = "Gas Mileage Calculator"; Icon = "🚗"; Desc = "Determine your vehicle's gas mileage (MPG or km/L) based on distance driven and fuel consumed."; CategoryId = "sec-finance" },
  @{ Slug = "electricity-calculator"; Title = "Electricity Cost Calculator"; Icon = "⚡"; Desc = "Calculate appliance electricity cost. Input wattage, hours used, and utility rate to see daily/yearly expenses."; CategoryId = "sec-finance" },
  @{ Slug = "irr-calculator"; Title = "IRR Calculator"; Icon = "📈"; Desc = "Estimate the Internal Rate of Return (IRR) for a series of annual investment cash flows."; CategoryId = "sec-finance" },

  # Scientific & Math (13)
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

  # Games & Fun (3)
  @{ Slug = "games-lottery-number-generator"; Title = "Lottery Number Generator"; Icon = "🎰"; Desc = "Generate random lottery ticket numbers. Choose your range size and count to customize tickets."; CategoryId = "sec-games" },
  @{ Slug = "games-bingo-number-generator"; Title = "Bingo Number Generator"; Icon = "🎱"; Desc = "Call random Bingo numbers from 1 to 75. Keep track of previous draws."; CategoryId = "sec-games" },
  @{ Slug = "games-dice-roller"; Title = "Dice Roller"; Icon = "🎲"; Desc = "Roll standard 6-sided dice for board games. Customize the number of dice rolled."; CategoryId = "sec-games" }
)

# 1. Generate index.html Content
$cardsHtml = ""
foreach ($cat in $categories) {
  $catId = $cat.Id
  $catTitle = $cat.Title
  
  $cardsHtml += "`n    <!-- Category Section: $catTitle -->`n"
  $cardsHtml += "    <section class='category-section' id='$catId'>`n"
  $cardsHtml += "      <div class='category-header'>`n"
  $cardsHtml += "        <span class='category-title'>$catTitle</span>`n"
  $cardsHtml += "      </div>`n"
  $cardsHtml += "      <div class='category-grid'>`n"

  $catCalcs = $calculators | Where-Object { $_.CategoryId -eq $catId }
  foreach ($calc in $catCalcs) {
    $slug = $calc.Slug
    $title = $calc.Title
    $icon = $calc.Icon
    $desc = $calc.Desc
    
    $cardsHtml += "        <a href='calculators/$slug.html' class='calc-card'>`n"
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

  $cardsHtml += "      </div>`n"
  $cardsHtml += "    </section>`n"
}

# Read index.html and update it
$indexHtml = Get-Content -Path .\index.html -Raw -Encoding utf8
$pattern = "(?s)<!-- Category 1: Dates & Age -->.*?</main>"
$replacement = "$cardsHtml`n  </main>"
$newIndexHtml = [regex]::Replace($indexHtml, $pattern, $replacement)
Set-Content -Path .\index.html -Value $newIndexHtml -Encoding utf8
Write-Host "Updated index.html successfully!"

# 2. Generate sitemap.xml Content
$sitemapHtml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.calcuportal.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
"@

foreach ($calc in $calculators) {
  $slug = $calc.Slug
  $sitemapHtml += @"

  <url>
    <loc>https://www.calcuportal.com/calculators/$slug.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
"@
}

$pages = @("about.html", "contact.html", "privacy-policy.html", "terms-conditions.html", "disclaimer.html", "advertise.html")
foreach ($page in $pages) {
  $sitemapHtml += @"

  <url>
    <loc>https://www.calcuportal.com/pages/$page</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
"@
}

$sitemapHtml += @"

</urlset>
"@

Set-Content -Path .\sitemap.xml -Value $sitemapHtml -Encoding utf8
Write-Host "Updated sitemap.xml successfully!"
