const assert=require("node:assert/strict");
const {test}=require("node:test");
const {calculate,cents,percent,whole}=require("../assets/js/amortization-calculator.js");
const near=(a,b,tol=.011)=>assert.ok(Math.abs(a-b)<=tol,String(a)+" differs from "+String(b));
const params=(principal="20000",annualRate="5.5",years="5",months="0",extra="0")=>({principal,annualRate,years,months,extra});
test("zero interest EMI and exact schedule",()=>{
 const r=calculate(params("12000","0","1","0"));
 near(r.monthlyPayment,1000);assert.equal(r.baseline.months,12);
 near(r.baseline.totalInterest,0);near(r.baseline.totalPaid,12000);near(r.baseline.rows.at(-1).balance,0);
});
test("five-year $20k at 5.5% EMI about 382.02",()=>{
 const r=calculate(params());
 near(r.monthlyPayment,382.02);assert.equal(r.baseline.months,60);
 near(r.baseline.rows.at(-1).balance,0);
});
test("zero-interest loan final installment corrects rounding",()=>{
 const r=calculate(params("100","0","0","3"));
 near(r.monthlyPayment,33.33);near(r.baseline.rows.at(-1).payment,33.34);
 near(r.baseline.totalPaid,100);
});
test("one-month loan pays principal plus one month of interest",()=>{
 const r=calculate(params("1200","12","0","1"));
 near(r.monthlyPayment,1212);near(r.baseline.totalInterest,12);
});
test("extra monthly payment saves interest and months",()=>{
 const r=calculate(params("150000","9","15","0","1000"));
 assert.ok(r.monthsSaved>0);assert.ok(r.interestSaved>0);
 assert.equal(r.accelerated.rows.at(-1).balance,0);
});
test("zero extra payment yields unchanged schedule",()=>{
 const r=calculate(params("100000","8","20","0","0"));
 assert.equal(r.accelerated,r.baseline);
 near(r.interestSaved,0);assert.equal(r.monthsSaved,0);
});
test("very large monthly prepayment pays off in first month",()=>{
 const r=calculate(params("10000","10","5","0","10000"));
 assert.equal(r.accelerated.months,1);near(r.accelerated.rows.at(-1).balance,0);
});
test("sum of schedule principal equals loan principal",()=>{
 const r=calculate(params("120000","6.5","30","0","200"));
 near(r.accelerated.rows.at(-1).cumulativePrincipal,120000);
});
test("every row balances principal and interest against payment",()=>{
 const r=calculate(params("100000","7.5","30","0","100"));
 for(const x of r.accelerated.rows){
  assert.ok(x.balance>=0&&x.interest>=0&&x.principal>=0);
  near(x.payment,x.interest+x.principal,0.001);
 }
});
test("forty years produces 480-month full schedule",()=>{
 const r=calculate(params("1000000","6","40","0"));
 assert.equal(r.termMonths,480);assert.equal(r.baseline.months,480);
});
test("one month minimum term",()=>assert.equal(calculate(params("1000","0","0","1")).termMonths,1));
test("one-cent principal never becomes an infinite loop",()=>{
 const r=calculate(params("0.01","0","1","0"));
 near(r.baseline.totalPaid,.01);assert.equal(r.baseline.months,1);
});
test("principal precision capped at two decimals",()=>{
 near(cents("1.01","Loan",false),101,0);
 assert.throws(()=>cents("1.001","Loan",false),Error);
});
test("reject principal negative, empty and zero",()=>{
 for(const v of ["-50","","0"])assert.throws(()=>calculate(params(v)),Error);
});
test("reject negative, empty or over-100% rate",()=>{
 for(const v of ["-2","","101"])assert.throws(()=>calculate(params("100",v)),Error);
});
test("reject zero loan term",()=>assert.throws(()=>calculate(params("100","10","0","0")),Error));
test("reject fractional years",()=>assert.throws(()=>calculate(params("100","10","1.5","0")),Error));
test("reject invalid additional months",()=>assert.throws(()=>calculate(params("100","10","0","12")),Error));
test("reject negative or too-precise monthly extra",()=>{
 for(const v of ["-1","12.345"])assert.throws(()=>calculate(params("100","10","1","0",v)),Error);
});
test("rate precision at most four decimal places",()=>{
 near(percent("5.1234"),5.1234,0);
 assert.throws(()=>percent("5.12345"),Error);
});
test("year term must be a whole number 0 to 40",()=>{
 for(const v of ["41","0.5","-1"])assert.throws(()=>whole(v,"Years",0,40),Error);
});
