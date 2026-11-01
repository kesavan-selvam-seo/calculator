/* CalcuPortal: fixed-rate reducing-balance loan amortization, currency cents throughout. */
(function(root){
"use strict";
function cents(value,label,allowZero){
 const raw=String(value==null?"":value).trim();
 if(!/^\d{1,10}(?:\.\d{1,2})?$/.test(raw)||Number(raw)>1000000000)
   throw new Error(label+" must be between 0 and 1,000,000,000 with up to two decimal places.");
 const n=Math.round(Number(raw)*100);
 if(!allowZero&&n<=0)throw new Error(label+" must be greater than zero.");
 return n;
}
function percent(value){
 const raw=String(value==null?"":value).trim();
 if(!/^\d{1,3}(?:\.\d{1,4})?$/.test(raw)||Number(raw)>100)
   throw new Error("Annual interest rate must be from 0% to 100% (up to four decimal places).");
 return Number(raw);
}
function whole(value,label,min,max){
 const s=String(value==null?"":value).trim();
 if(!/^(?:0|[1-9]\d{0,2})$/.test(s)||Number(s)<min||Number(s)>max)
   throw new Error(label+" must be a whole number from "+min+" to "+max+".");
 return Number(s);
}
function makeSchedule(principalCents,rate,numberOfMonths,regularCents,extraCents){
 const rows=[];let balance=principalCents,interestSum=0,paidSum=0,extraSum=0;
 for(let month=1;month<=numberOfMonths&&balance>0;month++){
   const interest=Math.round(balance*rate);
   let paid=Math.min(regularCents,balance+interest);
   if(month===numberOfMonths) paid=balance+interest; // settle lender rounding difference
   const principal=paid-interest;
   if(principal<0)throw new Error("The estimated monthly payment would not cover interest.");
   const extra=Math.min(extraCents,balance-principal);
   const total=paid+extra;
   balance-=principal+extra;interestSum+=interest;paidSum+=total;extraSum+=extra;
   rows.push({month,payment:total/100,regularPayment:paid/100,extraPayment:extra/100,
     interest:interest/100,principal:(principal+extra)/100,balance:balance/100,
     cumulativePrincipal:(principalCents-balance)/100,cumulativeInterest:interestSum/100});
 }
 return {rows,months:rows.length,principal:principalCents/100,totalPaid:paidSum/100,
   totalInterest:interestSum/100,extraPaid:extraSum/100,payoffEarly:rows.length<numberOfMonths};
}
function calculate(values){
 const v=values||{},principal=cents(v.principal,"Loan amount",false);
 const annualRate=percent(v.annualRate);
 const years=whole(v.years,"Years",0,40),months=whole(v.months,"Additional months",0,11);
 const term=years*12+months;
 if(term<1||term>480)throw new Error("Loan term must be between 1 and 480 months.");
 const extra=cents(v.extra==null?"0":v.extra,"Extra monthly payment",true);
 const rate=annualRate/1200;
 const rawMonthly=rate===0?principal/term:principal*rate/(1-Math.pow(1+rate,-term));
 let regular=Math.max(1,Math.round(rawMonthly));
 if(term>1&&regular<=Math.round(principal*rate))throw new Error("This term and rate cannot be amortized to cents with a fixed monthly payment.");
 const baseline=makeSchedule(principal,rate,term,regular,0);
 const accelerated=extra>0?makeSchedule(principal,rate,term,regular,extra):baseline;
 return {principal:principal/100,annualRate,termMonths:term,monthlyPayment:regular/100,
    extraMonthly:extra/100,baseline,accelerated,interestSaved:(baseline.totalInterest*100-accelerated.totalInterest*100)/100,
    monthsSaved:baseline.months-accelerated.months,
    note:"Monthly interest and each payment are rounded to the nearest cent. The final regular payment is adjusted to clear the remaining balance. Extra payments are applied to principal after the scheduled payment."
 };
}
const api={calculate,cents,percent,whole};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
else root.CalcuAmortization=api;
})(typeof window!=="undefined"?window:globalThis);
