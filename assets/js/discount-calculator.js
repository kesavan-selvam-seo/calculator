/* CalcuPortal Discount Calculator | transparent per-item 2-decimal currency rounding */
(function(root){
  "use strict";
  const roundCents = value => Math.round(value);
  function money(value,label){
    const raw=String(value===undefined||value===null?"":value).trim();
    if(!/^\d{1,10}(?:\.\d{1,2})?$/.test(raw)||Number(raw)>1e9)
      throw new Error(label+" must be a non-negative amount up to 1,000,000,000, with up to 2 decimal places.");
    return Math.round(Number(raw)*100);
  }
  function percent(value,label){
    const raw=String(value===undefined||value===null?"":value).trim();
    if(!/^\d{1,3}(?:\.\d{1,4})?$/.test(raw)||Number(raw)>100)
      throw new Error(label+" must be from 0% to 100% (up to 4 decimal places).");
    return Number(raw);
  }
  function quantity(value){
    const raw=String(value===undefined||value===null?"":value).trim();
    if(!/^[1-9]\d{0,2}$/.test(raw))throw new Error("Quantity must be a whole number from 1 to 999.");
    return Number(raw);
  }
  function calculate(mode,p){
    const input=p||{};
    if(!["single","stacked","percent","reverse"].includes(mode))throw new Error("Choose a valid calculation mode.");
    if(mode==="percent"){
      const original=money(input.original,"Original price"),sale=money(input.sale,"Sale price");
      if(original===0)throw new Error("Original price must be greater than zero to find the discount percentage.");
      if(sale>original)throw new Error("Sale price cannot exceed original price when calculating a discount.");
      const savings=original-sale;
      return {mode,original:original/100,subtotal:sale/100,total:sale/100,savings:savings/100,tax:0,quantity:1,effectiveDiscount:savings/original*100,firstStage:sale/100,secondStage:sale/100,coupon:0};
    }
    if(mode==="reverse"){
      const sale=money(input.sale,"Discounted price");
      const rate=percent(input.discount,"Discount rate");
      if(rate>=100)throw new Error("A 100% discount has no unique original price. Enter a rate below 100%.");
      const original=roundCents(sale/(1-rate/100));
      if(original>1e11)throw new Error("Calculated original price exceeds the supported range.");
      const saved=original-sale;
      return {mode,original:original/100,subtotal:sale/100,total:sale/100,savings:saved/100,tax:0,quantity:1,effectiveDiscount:rate,firstStage:sale/100,secondStage:sale/100,coupon:0};
    }
    const base=money(input.original,"Original price");
    const rate1=percent(input.discount,"Discount rate");
    const rate2=mode==="stacked"?percent(input.extra,"Additional discount"):0;
    const coupon=mode==="stacked"?money(input.coupon,"Flat coupon"):0;
    const taxRate=percent(input.tax,"Tax rate"),qty=quantity(input.quantity);
    const afterFirst=roundCents(base*(1-rate1/100));
    const afterSecond=roundCents(afterFirst*(1-rate2/100));
    if(coupon>afterSecond)throw new Error("Flat coupon cannot exceed the price after percentage discounts.");
    const net=afterSecond-coupon;
    const tax=roundCents(net*taxRate/100);
    const originalTotal=base*qty;
    const subtotalTotal=net*qty;
    const savings=originalTotal-subtotalTotal;
    const taxTotal=tax*qty;
    return {
      mode,original:originalTotal/100,subtotal:subtotalTotal/100,total:(subtotalTotal+taxTotal)/100,
      savings:savings/100,tax:taxTotal/100,quantity:qty,
      effectiveDiscount:base>0?(base-net)/base*100:0,
      firstStage:afterFirst/100,secondStage:afterSecond/100,coupon:coupon/100,
      unitOriginal:base/100,unitSubtotal:net/100,unitTax:tax/100,unitTotal:(net+tax)/100,
      discount:rate1,extra:rate2,taxRate
    };
  }
  const api={calculate,money,percent,quantity};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  else root.CalcuDiscount=api;
})(typeof window!=="undefined"?window:globalThis);
