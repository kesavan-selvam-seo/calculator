const assert=require('node:assert/strict'),C=require('../calculators/life-path-number-calculator/life-path-core.js');
const today=new Date(2026,9,25),calc=o=>C.calculate(o,today);
assert.equal(calc({year:1990,month:8,day:14}).value,5);
assert.equal(calc({year:2000,month:8,day:19}).value,11);
assert.equal(calc({year:2000,month:8,day:19,method:'digits'}).value,2);
assert.equal(calc({year:1987,month:6,day:9}).value,22);
assert.equal(calc({year:2009,month:11,day:11}).value,33);
assert.equal(calc({year:2009,month:11,day:11,method:'digits'}).value,6);
assert.equal(calc({year:2009,month:11,day:11,keep:false}).value,6);
assert.deepEqual(C.reduce(1990).chain,[1990,19,10,1]);assert.equal(C.reduce(44).value,8);assert.equal(C.reduce(29).value,11);
assert.equal(calc({year:2024,month:2,day:29}).birthNumber,2);
for(const date of [{year:2023,month:2,day:29},{year:1900,month:2,day:29},{year:2000,month:4,day:31},{year:2026,month:10,day:26},{year:999,month:1,day:1},{year:2000,month:2,day:1.5}])assert.throws(()=>calc(date));
assert.doesNotThrow(()=>calc({year:2000,month:2,day:29}));assert.doesNotThrow(()=>calc({year:2026,month:10,day:25}));
// Invariant: reduction order must preserve the digital root; all output steps sum correctly.
let count=0;const seen=new Set();for(let year=1950;year<=2025;year++)for(let month=1;month<=12;month++)for(let day=1;day<=new Date(Date.UTC(year,month,0)).getUTCDate();day++){
 const r=calc({year,month,day});seen.add(r.value);assert.equal(C.reduce(r.partsResult.value,false).value,C.reduce(r.digitResult.value,false).value);assert([1,2,3,4,5,6,7,8,9,11,22,33].includes(r.value));assert.equal(r.partsTotal,r.parts.reduce((s,p)=>s+p.value,0));count++;
}
assert.equal(seen.size,12);console.log('PASS: examples for 5, 11, 22, 33; method differences; master toggle; leap/future validation; '+count+' valid dates and all 12 result values.');
