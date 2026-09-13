from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAGE = ROOT / "calculators" / "conversions-numbers-to-words" / "index.html"

text = PAGE.read_text(encoding="utf-8")

replacements = {
    '<title>Numbers to Words Converter Online | Rupees & Amount in Words</title>': '<title>Number to Words Converter – Indian Rupees & Amount in Words</title>',
    '<meta name="description" content="Use our free numbers to words converter to convert numbers, amounts, rupees and paise into words. Supports Indian system, lakh, crore, English, Hindi, Telugu, Tamil and Malayalam.">': '<meta name="description" content="Convert numbers to words online for free. Convert Indian rupees, amounts, lakh, crore, decimals and large numbers into words instantly.">',
    '<h1>Numbers to Words Converter Online</h1>': '<h1>Number to Words Converter</h1>',
    '<p>Convert numbers, amounts, rupees and paise into words in English and Indian languages.</p>': '<p>Convert numbers, amounts, rupees and paise into words using Indian or international number formats.</p>',
    '<h2 class="tool-title">Numbers to Words Converter<span>Indian Rupees, Cheque Amount, English, Hindi, Telugu, Tamil & Malayalam</span></h2>': '<h2 class="tool-title">Number to Words Converter<span>Indian Rupees, Cheque Amount, Indian & International Formats</span></h2>',
}

for old, new in replacements.items():
    text = text.replace(old, new)

# Add social metadata once.
marker = '  <meta name="robots" content="index, follow">\n'
if 'property="og:title"' not in text:
    social = '''  <meta property="og:type" content="website">\n  <meta property="og:title" content="Number to Words Converter – Indian Rupees & Amount in Words">\n  <meta property="og:description" content="Convert numbers, amounts and Indian rupees into words online with Indian and international number formats.">\n  <meta property="og:url" content="https://www.calcuportal.com/calculators/conversions-numbers-to-words/">\n  <meta property="og:image" content="https://www.calcuportal.com/logo.png">\n  <meta name="twitter:card" content="summary">\n  <meta name="twitter:title" content="Number to Words Converter – Indian Rupees & Amount in Words">\n  <meta name="twitter:description" content="Free number to words converter for Indian rupees, amounts, lakh, crore, decimals and large numbers.">\n'''
    text = text.replace(marker, marker + social, 1)

# Add quick examples directly below the converter for better task completion and long-tail relevance.
quick_marker = '          <p class="helper-text">Tip: For cheque writing, choose English + Indian System + Indian Rupees Format.</p>\n\n          <button id="calculate-btn" class="calc-btn">Convert</button>'
quick_block = '''          <p class="helper-text">Tip: For cheque writing, choose English + Indian System + Indian Rupees Format.</p>\n\n          <div class="quick-examples" aria-label="Quick number to words examples">\n            <strong>Quick examples:</strong>\n            <button type="button" class="example-chip" data-example="1000">1,000</button>\n            <button type="button" class="example-chip" data-example="100000">1 Lakh</button>\n            <button type="button" class="example-chip" data-example="1000000">10 Lakh</button>\n            <button type="button" class="example-chip" data-example="10000000">1 Crore</button>\n            <button type="button" class="example-chip" data-example="1250.75">₹1,250.75</button>\n          </div>\n\n          <button id="calculate-btn" class="calc-btn">Convert</button>'''
if 'class="quick-examples"' not in text:
    text = text.replace(quick_marker, quick_block, 1)

# Add supporting SEO sections before the existing Important Note.
seo_marker = '          <h2>Important Note</h2>'
seo_block = '''          <h2>Number to Words Examples</h2>\n          <p>Use the examples below to check common number names in the Indian and international systems. The same numeric value can have different wording depending on the selected number system.</p>\n          <table class="seo-table">\n            <thead><tr><th>Number</th><th>Indian System</th><th>International System</th></tr></thead>\n            <tbody>\n              <tr><td>1,000</td><td>One Thousand</td><td>One Thousand</td></tr>\n              <tr><td>1,00,000</td><td>One Lakh</td><td>One Hundred Thousand</td></tr>\n              <tr><td>10,00,000</td><td>Ten Lakh</td><td>One Million</td></tr>\n              <tr><td>1,00,00,000</td><td>One Crore</td><td>Ten Million</td></tr>\n              <tr><td>1,00,00,00,000</td><td>One Hundred Crore</td><td>One Billion</td></tr>\n            </tbody>\n          </table>\n\n          <h2>1 Lakh, 1 Crore and Large Numbers in Words</h2>\n          <p>In the Indian numbering system, 1 lakh is 1,00,000 and 1 crore is 1,00,00,000. Ten lakh equals one million, while ten crore equals one hundred million. These terms are commonly used for salaries, property prices, business figures, budgets and other amounts in India.</p>\n          <p>For very large values, the international system uses million, billion and trillion. Choosing the correct system helps prevent confusion when the same number is used in Indian and international financial or business contexts.</p>\n\n          <h2>How to Write an Amount in Words on a Cheque</h2>\n          <p>For an Indian cheque, enter the numeric amount, choose <strong>English</strong>, select <strong>Indian System</strong> and use <strong>Indian Rupees Format</strong>. For example, ₹1,25,500 is written as <strong>One Lakh Twenty Five Thousand Five Hundred Rupees Only</strong>. Always compare the words with the numeric amount before submitting a cheque or financial document.</p>\n\n          <h2>Number to Words Converter for Invoices and Receipts</h2>\n          <p>Businesses can use the converter to prepare readable amounts for invoices, receipts, quotations and payment records. Converting the amount automatically helps reduce typing errors and keeps the numeric figure and written amount consistent.</p>\n\n          <h2>Number to Words Converter for Students</h2>\n          <p>Students can use the tool to practice number names, place values, the Indian number system and the international number system. It is useful for learning how values such as 1,00,000, 10,00,000 and 1,00,00,000 are written in words.</p>\n\n          <h2>Related CalcuPortal Calculators</h2>\n          <p>Explore these related tools when you need to work with large numbers, currency values or other conversions:</p>\n          <ul class="related-tools-list">\n            <li><a href="/calculators/big-number-calculator/">Big Number Calculator</a> for calculations involving large values.</li>\n            <li><a href="/calculators/million-to-rupees/">Million to Rupees Calculator</a> for converting millions into Indian rupees.</li>\n            <li><a href="/calculators/billion-to-rupees/">Billion to Rupees Calculator</a> for converting billions into Indian rupees.</li>\n            <li><a href="/categories/conversions/">Conversions & Unit Tools</a> for more conversion utilities.</li>\n          </ul>\n\n          <h2>Number to Words Converter FAQs</h2>\n          <p>For common questions about number names, Indian rupees, lakh, crore and international formats, see the FAQs below.</p>\n\n          <h2>Important Note</h2>'''
if 'Number to Words Examples</h2>' not in text:
    text = text.replace(seo_marker, seo_block, 1)

# Add styles for quick examples and related links.
style_marker = '    .seo-table {\n'
if '.quick-examples' not in text.split('</style>', 1)[0]:
    style = '''    .quick-examples {\n      width: 100%;\n      max-width: 420px;\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      justify-content: center;\n      gap: 8px;\n      margin: 0.25rem auto 0;\n      font-size: 0.9rem;\n    }\n\n    .example-chip {\n      border: 1px solid #d1d5db;\n      border-radius: 999px;\n      background: #ffffff;\n      padding: 7px 11px;\n      cursor: pointer;\n      font: inherit;\n    }\n\n    .related-tools-list li {\n      margin-bottom: 0.55rem;\n    }\n\n'''
    text = text.replace(style_marker, style + style_marker, 1)

# Wire quick examples to the existing calculator input.
script_marker = "    if (calculateBtn) {\n      calculateBtn.addEventListener('click', function() {"
example_script = '''    document.querySelectorAll('.example-chip').forEach(function(button) {\n      button.addEventListener('click', function() {\n        document.getElementById('num-input').value = button.getAttribute('data-example');\n        document.getElementById('num-input').focus();\n      });\n    });\n\n'''
if "querySelectorAll('.example-chip')" not in text:
    text = text.replace(script_marker, example_script + script_marker, 1)

PAGE.write_text(text, encoding="utf-8")
print(f"Optimized {PAGE}")
