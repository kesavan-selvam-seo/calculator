/* CalcuPortal: explicit, deterministic numerology conventions. */
(function(root){
'use strict';
const masters=new Set([11,22,33]);
function sum(n){return String(n).split('').reduce((total,digit)=>total+Number(digit),0);}
function reduce(n,keep=true){const chain=[n];while(n>9&&!(keep&&masters.has(n))){n=sum(n);chain.push(n);}return {value:n,chain};}
function calculate({year,month,day,method='parts',keep=true},today=new Date()){
 if(![year,month,day].every(Number.isInteger)||year<1000||year>9999||month<1||month>12||day<1||day>31)throw new Error('Enter a complete, valid four-digit birth year, month and day.');
 const date=new Date(Date.UTC(year,month-1,day));
 if(date.getUTCFullYear()!==year||date.getUTCMonth()!==month-1||date.getUTCDate()!==day)throw new Error('That date does not exist. Check the day, month and leap year.');
 const now=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
 if(year*10000+month*100+day>now)throw new Error('Your birth date cannot be in the future.');
 if(!['parts','digits'].includes(method)||typeof keep!=='boolean')throw new Error('Choose a valid calculation method and master-number setting.');
 const parts=[month,day,year].map(n=>reduce(n,keep));
 const partsTotal=parts.reduce((t,p)=>t+p.value,0),partsResult=reduce(partsTotal,keep);
 const digits=String(month).padStart(2,'0')+String(day).padStart(2,'0')+String(year),digitTotal=[...digits].reduce((t,n)=>t+Number(n),0),digitResult=reduce(digitTotal,keep);
 const selected=method==='parts'?partsResult:digitResult;
 return {year,month,day,method,keep,parts,partsTotal,partsResult,digits,digitTotal,digitResult,value:selected.value,root:reduce(selected.value,false).value,birthNumber:reduce(day,false).value,master:masters.has(selected.value),selected};
}
const api={sum,reduce,calculate};if(typeof module==='object'&&module.exports)module.exports=api;root.LifePathCore=api;
})(typeof window==='undefined'?globalThis:window);
