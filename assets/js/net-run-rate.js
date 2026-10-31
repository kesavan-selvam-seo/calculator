/* CalcuPortal NRR engine: runs per six legal balls; DLS figures must be adjusted outside this tool. */
(function(root){
  "use strict";
  function oversToBalls(value, quota){
    const str=String(value==null?"":value).trim();
    if(!/^(?:0|[1-9]\d{0,2})(?:\.[0-5])?$/.test(str)){
      throw new Error("Enter overs as O.B: 18.4 means 18 overs and 4 balls. A ball digit of 6 or more is invalid.");
    }
    const parts=str.split(".");
    const balls=Number(parts[0])*6+Number(parts[1]||0);
    if(balls<=0)throw new Error("Overs must contain at least one legal ball.");
    if(balls>quota*6)throw new Error("Overs cannot exceed the allotted "+quota+" overs.");
    return balls;
  }
  function numberOfRuns(value){
    const str=String(value==null?"":value).trim();
    if(!/^\d{1,4}$/.test(str))throw new Error("Runs must be a whole number from 0 to 9999.");
    return Number(str);
  }
  function calculate(matches,quota){
    const full=Number(quota);
    if(!Number.isInteger(full)||full<1||full>50)throw new Error("Set allotted overs from 1 to 50.");
    if(!Array.isArray(matches)||matches.length===0||matches.length>40)throw new Error("Enter between 1 and 40 completed matches.");
    let forRuns=0,againstRuns=0,forBalls=0,againstBalls=0;
    const details=matches.map((m,i)=>{
      try{
        const scored=numberOfRuns(m.scored);
        const conceded=numberOfRuns(m.conceded);
        const actualFor=oversToBalls(m.faced,full);
        const actualAgainst=oversToBalls(m.bowled,full);
        const effectiveFor=m.allOutFor?full*6:actualFor;
        const effectiveAgainst=m.allOutAgainst?full*6:actualAgainst;
        forRuns+=scored;againstRuns+=conceded;forBalls+=effectiveFor;againstBalls+=effectiveAgainst;
        return {scored,conceded,actualFor,actualAgainst,effectiveFor,effectiveAgainst};
      }catch(e){throw new Error("Match "+(i+1)+": "+e.message);}
    });
    const scoringRate=forRuns*6/forBalls,concedingRate=againstRuns*6/againstBalls;
    return {nrr:scoringRate-concedingRate,scoringRate,concedingRate,forRuns,againstRuns,forBalls,againstBalls,matchCount:matches.length,details};
  }
  const api={oversToBalls,numberOfRuns,calculate};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  else root.CalcuNRR=api;
})(typeof window!=="undefined"?window:globalThis);
