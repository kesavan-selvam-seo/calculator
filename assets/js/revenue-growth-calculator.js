/* CalcuPortal Revenue Growth Rate Calculator core: revenue is non-negative; no currency conversion. */
(function(root){
  "use strict";
  function revenueCents(value,label){
    const s=String(value==null?"":value).trim();
    if(!/^(?:0|[1-9]\d{0,12})(?:\.\d{1,2})?$/.test(s)||Number(s)>1000000000000)
      throw new Error(label+" must be a non-negative amount up to 1 trillion with no more than 2 decimal places.");
    return Math.round(Number(s)*100);
  }
  function years(value){
    const s=String(value==null?"":value).trim(),v=Number(s);
    if(!/^\d{1,3}(?:\.\d{1,3})?$/.test(s)||!Number.isFinite(v)||v<=0||v>100)
      throw new Error("Years must be greater than 0 and no more than 100 (up to 3 decimal places).");
    return v;
  }
  function cycles(value){
    const s=String(value==null?"":value).trim(),v=Number(s);
    if(!/^[1-9]\d?$/.test(s)||v>50)throw new Error("Number of periods must be a whole number from 1 to 50.");
    return v;
  }
  function ratePercent(value){
    const s=String(value==null?"":value).trim(),v=Number(s);
    if(!/^-?(?:0|[1-9]\d{0,3})(?:\.\d{1,4})?$/.test(s)||!Number.isFinite(v)||v< -100||v>1000)
      throw new Error("Growth rate must be between -100% and 1000%, up to 4 decimal places.");
    return v;
  }
  function calculate(mode,values){
    const input=values||{};
    if(mode==="period"||mode==="cagr"){
      const prev=revenueCents(input.previous,"Previous revenue");
      const now=revenueCents(input.current,"Current revenue");
      const change=now-prev;
      const growth=prev===0?null:(change/prev)*100;
      const time=mode==="cagr"?years(input.years):null;
      const cagr=mode==="cagr"?(prev===0?null:(Math.pow(now/prev,1/time)-1)*100):null;
      const validRate=mode==="period"?growth:cagr;
      if(validRate!==null&&!Number.isFinite(validRate))throw new Error("The growth percentage is too large to display reliably.");
      return {
        mode,previous:prev/100,current:now/100,change:change/100,
        overallGrowth:growth,rate:validRate,years:time,
        factor:prev===0?null:now/prev,
        isNewRevenue:prev===0&&now>0,
        isZeroBaseline:prev===0,
        note:prev===0?"Percentage growth is undefined when previous revenue is zero.":null
      };
    }
    if(mode==="target"){
      const base=revenueCents(input.previous,"Starting revenue");
      const rate=ratePercent(input.rate);
      const n=cycles(input.periods);
      const mult=Math.pow(1+rate/100,n);
      const end=base*mult;
      if(!Number.isFinite(end)||end>100000000000000)
        throw new Error("Projected revenue exceeds the calculator's supported 1 trillion range. Reduce rate or periods.");
      const endCents=Math.round(end);
      return {
        mode,previous:base/100,current:endCents/100,change:(endCents-base)/100,
        rate,periods:n,factor:mult,overallGrowth:base===0?null:(endCents-base)/base*100,
        isZeroBaseline:base===0
      };
    }
    throw new Error("Select a valid calculation mode.");
  }
  const api={calculate,revenueCents,years,cycles,ratePercent};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  else root.CalcuRevenueGrowth=api;
})(typeof window!=="undefined"?window:globalThis);
