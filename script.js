
const $ = (id) => document.getElementById(id);

function money(n){ return isFinite(n) ? n.toLocaleString(undefined,{maximumFractionDigits:2}) : "0"; }

function calculate(type){
  let html = "";
  if(type === "sip"){
    const p = +$("monthly").value || 0, r = (+$("rate").value || 0)/100/12, m = (+$("years").value || 0)*12;
    const fv = r ? p * (((Math.pow(1+r,m)-1)/r)*(1+r)) : p*m;
    const invested = p*m;
    html = `<p>Future Value</p><strong>₹${money(fv)}</strong><p>Invested Amount: ₹${money(invested)} | Estimated Returns: ₹${money(fv-invested)}</p>`;
  }
  if(type === "emi"){
    const loan = +$("loan").value || 0, rate = (+$("rate").value || 0)/100/12, months = (+$("years").value || 0)*12;
    const emi = rate ? loan*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1) : loan/months;
    html = `<p>Monthly EMI</p><strong>₹${money(emi)}</strong><p>Total Payment: ₹${money(emi*months)} | Interest: ₹${money((emi*months)-loan)}</p>`;
  }
  if(type === "compound"){
    const p = +$("principal").value || 0, r = (+$("rate").value || 0)/100, t = +$("years").value || 0, n = +$("frequency").value || 1;
    const a = p*Math.pow(1+r/n,n*t);
    html = `<p>Maturity Amount</p><strong>₹${money(a)}</strong><p>Compound Interest: ₹${money(a-p)}</p>`;
  }
  if(type === "age"){
    const dob = new Date($("dob").value);
    const today = new Date();
    if(!isNaN(dob)){
      let y = today.getFullYear()-dob.getFullYear();
      let m = today.getMonth()-dob.getMonth();
      let d = today.getDate()-dob.getDate();
      if(d < 0){ m--; d += new Date(today.getFullYear(),today.getMonth(),0).getDate(); }
      if(m < 0){ y--; m += 12; }
      html = `<p>Your Age</p><strong>${y} years</strong><p>${m} months and ${d} days</p>`;
    } else html = `<p>Please select your date of birth.</p>`;
  }
  if(type === "percentage"){
    const value = +$("value").value || 0, total = +$("total").value || 0;
    const pct = total ? (value/total)*100 : 0;
    html = `<p>Percentage</p><strong>${money(pct)}%</strong><p>${money(value)} is ${money(pct)}% of ${money(total)}</p>`;
  }
  if(type === "discount"){
    const price = +$("price").value || 0, discount = +$("discount").value || 0;
    const save = price*discount/100, final = price-save;
    html = `<p>Final Price</p><strong>₹${money(final)}</strong><p>You save ₹${money(save)}</p>`;
  }
  if(type === "bmi"){
    const weight = +$("weight").value || 0, height = (+$("height").value || 0)/100;
    const bmi = height ? weight/(height*height) : 0;
    let status = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    html = `<p>Your BMI</p><strong>${money(bmi)}</strong><p>Status: ${status}</p>`;
  }
  if(type === "calorie"){
    const w=+$("weight").value||0,h=+$("height").value||0,a=+$("age").value||0, gender=$("gender").value;
    const bmr = gender==="female" ? 10*w + 6.25*h - 5*a - 161 : 10*w + 6.25*h - 5*a + 5;
    html = `<p>Estimated Daily Calories</p><strong>${money(bmr*1.4)}</strong><p>Based on light activity estimate.</p>`;
  }
  if(type === "cgpa"){
    const cgpa=+$("cgpa").value||0, mult=+$("multiplier").value||9.5;
    html = `<p>Percentage</p><strong>${money(cgpa*mult)}%</strong><p>Formula used: CGPA × ${mult}</p>`;
  }
  if(type === "attendance"){
    const attended=+$("attended").value||0,total=+$("total").value||0,target=(+$("target").value||75)/100;
    let needed=0;
    while((attended+needed)/(total+needed) < target && needed < 10000) needed++;
    html = `<p>Classes Needed</p><strong>${needed}</strong><p>To reach ${target*100}% attendance.</p>`;
  }
  if(type === "batting"){
    const runs=+$("runs").value||0,out=+$("outs").value||0;
    html = `<p>Batting Average</p><strong>${out ? money(runs/out) : "Not Out"}</strong><p>Runs divided by dismissals.</p>`;
  }
  if(type === "win"){
    const wins=+$("wins").value||0,total=+$("total").value||0;
    html = `<p>Win Percentage</p><strong>${total ? money((wins/total)*100) : 0}%</strong><p>${wins} wins out of ${total} matches.</p>`;
  }
  $("result").innerHTML = html;
}

function filterCalculators(){
  const input = document.getElementById("calculatorSearch");
  if(!input) return;
  const q = input.value.toLowerCase();
  document.querySelectorAll("[data-calc-card]").forEach(card=>{
    card.style.display = card.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}
