const assert=require("node:assert/strict");
const {test}=require("node:test");
const {calculate,money,percent,quantity}=require("../assets/js/discount-calculator.js");
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-9,String(x)+" != "+String(y));

test("single 20% off 1,000 gives 800 and saving 200",()=>{
 const r=calculate("single",{original:"1000",discount:"20",tax:"0",quantity:"1"});
 near(r.total,800);near(r.savings,200);near(r.effectiveDiscount,20);
});
test("single with 18% tax on discounted 800 gives 944",()=>{
 const r=calculate("single",{original:"1000",discount:"20",tax:"18",quantity:"1"});
 near(r.subtotal,800);near(r.tax,144);near(r.total,944);
});
test("two successive discounts: 20% plus 10% is 28%",()=>{
 const r=calculate("stacked",{original:"1000",discount:"20",extra:"10",coupon:"0",tax:"0",quantity:"1"});
 near(r.firstStage,800);near(r.secondStage,720);near(r.savings,280);near(r.total,720);
});
test("stacked discounts then flat coupon then tax",()=>{
 const r=calculate("stacked",{original:"1000",discount:"20",extra:"10",coupon:"50",tax:"18",quantity:"1"});
 near(r.subtotal,670);near(r.tax,120.6);near(r.total,790.6);
});
test("quantity multiplies rounded per-item total",()=>{
 const r=calculate("single",{original:"1000",discount:"20",tax:"18",quantity:"2"});
 near(r.total,1888);near(r.savings,400);near(r.tax,288);
});
test("2-decimal stages round each item first",()=>{
 const r=calculate("single",{original:"0.99",discount:"50",tax:"0",quantity:"2"});
 near(r.unitSubtotal,.5);near(r.total,1);
});
test("reverse 800 with 20% off originated at 1,000",()=>{
 const r=calculate("reverse",{sale:"800",discount:"20"});
 near(r.original,1000);near(r.savings,200);
});
test("find discount 25% using 1000 and 750",()=>{
 const r=calculate("percent",{original:"1000",sale:"750"});
 near(r.effectiveDiscount,25);near(r.savings,250);
});
test("zero and complete discounts",()=>{
 near(calculate("single",{original:"100",discount:"0",tax:"0",quantity:"1"}).total,100);
 near(calculate("single",{original:"100",discount:"100",tax:"18",quantity:"1"}).total,0);
});
test("coupon equal to remaining price gives zero",()=>{
 near(calculate("stacked",{original:"100",discount:"50",extra:"20",coupon:"40",tax:"8",quantity:"1"}).total,0);
});
test("reject coupon bigger than price",()=>{
 assert.throws(()=>calculate("stacked",{original:"100",discount:"50",extra:"0",coupon:"51",tax:"0",quantity:"1"}),/coupon/i);
});
test("reject invalid percentage including negative and above 100",()=>{
 for(const v of ["-1","101","","abc"])assert.throws(()=>percent(v,"Discount"),Error);
});
test("reject reverse 100% where original cannot be found",()=>{
 assert.throws(()=>calculate("reverse",{sale:"0",discount:"100"}),/unique original/i);
});
test("reject higher sale price than original",()=>{
 assert.throws(()=>calculate("percent",{original:"100",sale:"101"}),/exceed/i);
});
test("reject zero original for find percentage",()=>{
 assert.throws(()=>calculate("percent",{original:"0",sale:"0"}),/greater than zero/i);
});
test("validate quantity and money inputs",()=>{
 for(const v of ["0","1.5","1000","-1",""])assert.throws(()=>quantity(v),Error);
 for(const v of ["-1","3.141","", "1000000001"])assert.throws(()=>money(v,"Price"),Error);
});
test("reject missing tax and missing discount",()=>{
 assert.throws(()=>calculate("single",{original:"100",discount:"20",tax:"",quantity:"1"}),/Tax rate/i);
 assert.throws(()=>calculate("single",{original:"100",discount:"",tax:"0",quantity:"1"}),/Discount rate/i);
});
