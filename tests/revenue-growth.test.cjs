const assert=require("node:assert/strict");
const {test}=require("node:test");
const {calculate,revenueCents,years,cycles,ratePercent}=require("../assets/js/revenue-growth-calculator.js");
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,String(a)+" vs "+String(b));
test("YoY 100000 to 120000 = 20% growth",()=>{
 const r=calculate("period",{previous:"100000",current:"120000"});
 near(r.rate,20);near(r.change,20000);near(r.factor,1.2);
});
test("Revenue decline 120000 to 100000",()=>{
 const r=calculate("period",{previous:"120000",current:"100000"});
 near(r.rate,-100/6);near(r.change,-20000);
});
test("No change = 0%",()=>near(calculate("period",{previous:"100",current:"100"}).rate,0));
test("New revenue from zero keeps delta but N/A percentage",()=>{
 const r=calculate("period",{previous:"0",current:"1000"});
 assert.equal(r.rate,null);assert.equal(r.change,1000);assert.equal(r.isNewRevenue,true);
});
test("Both zero revenues show undefined percent",()=>{
 const r=calculate("period",{previous:"0",current:"0"});
 assert.equal(r.rate,null);assert.equal(r.change,0);
});
test("Revenue to zero = -100%",()=>near(calculate("period",{previous:"100",current:"0"}).rate,-100));
test("CAGR 100 to 144 over 2 years = 20%",()=>{
 const r=calculate("cagr",{previous:"100",current:"144",years:"2"});
 near(r.rate,20);near(r.overallGrowth,44);
});
test("CAGR decline 100 to 81 over 2 years = -10%",()=>{
 const r=calculate("cagr",{previous:"100",current:"81",years:"2"});
 near(r.rate,-10);
});
test("CAGR zero baseline is undefined",()=>{
 assert.equal(calculate("cagr",{previous:"0",current:"100",years:"2"}).rate,null);
});
test("CAGR positive to zero = -100%",()=>near(calculate("cagr",{previous:"100",current:"0",years:"2"}).rate,-100));
test("Revenue projection compounds 20% for 3 periods",()=>{
 const r=calculate("target",{previous:"100000",rate:"20",periods:"3"});
 near(r.current,172800);near(r.change,72800);near(r.rate,20);
});
test("Revenue projection compounds -10% over 2 periods",()=>{
 const r=calculate("target",{previous:"1000",rate:"-10",periods:"2"});
 near(r.current,810);
});
test("Revenue projection starting at zero stays zero",()=>near(calculate("target",{previous:"0",rate:"20",periods:"3"}).current,0));
test("Decimal cents are parsed exactly",()=>assert.equal(revenueCents("1000.09","Revenue"),100009));
test("Reject negative previous or current revenue",()=>{
 for(const s of ["-100",""])assert.throws(()=>calculate("period",{previous:s,current:"100"}),Error);
});
test("Reject invalid revenue decimal precision",()=>{
 for(const s of ["1.234","1e5","1000000000001"])assert.throws(()=>revenueCents(s,"Revenue"),Error);
});
test("Reject zero, negative or excessive years",()=>{
 for(const v of ["0","-1","101"])assert.throws(()=>years(v),Error);
});
test("Reject noninteger and excessive target periods",()=>{
 for(const v of ["0","2.5","51"])assert.throws(()=>cycles(v),Error);
});
test("Reject target growth beyond -100 to 1000 percent",()=>{
 for(const v of ["-101","1001",""])assert.throws(()=>ratePercent(v),Error);
});
test("Reject impossible enormous projected revenue",()=>assert.throws(()=>
 calculate("target",{previous:"1000000000000",rate:"1000",periods:"5"}),Error));
test("Reject unknown mode",()=>assert.throws(()=>calculate("bad",{previous:"10",current:"20"}),Error));
