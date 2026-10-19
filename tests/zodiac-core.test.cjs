const assert=require('node:assert/strict');
globalThis.Astronomy=require('../calculators/zodiac-sign-calculator/vendor/astronomy-2.1.19.min.js');
const C=require('../calculators/zodiac-sign-calculator/zodiac-core.js');
const base={y:2024,m:3,d:20,zone:'Asia/Kolkata'};
const cusp=C.calculate(base);assert(cusp.uncertain);assert.equal(cusp.first,11);assert.equal(cusp.last,0);
// Independent published reference: USNO 2024 March equinox, 20 March 03:06 UTC.
assert(Math.abs(cusp.cross-Date.parse('2024-03-20T03:06:00Z'))<60000);
assert.equal(C.calculate({...base,known:true,h:8,min:0}).index,11);
assert.equal(C.calculate({...base,known:true,h:9,min:0}).index,0);
assert(C.calculate({...base,known:true,h:8,min:36}).nearBoundary);
const utc=C.calculate({...base,zone:'UTC',known:true,h:3,min:30});
const india=C.calculate({...base,known:true,h:9,min:0});assert.equal(india.moment,utc.moment);assert.equal(india.index,utc.index);
assert.equal(C.calculate({...base,zone:'manual',offset:330,known:true,h:9,min:0}).moment,india.moment);
assert.equal(C.calculate({y:2024,m:2,d:29,zone:'UTC'}).index,11);
assert.throws(()=>C.calculate({y:2023,m:2,d:29,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calculate({y:2024,m:4,d:31,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calculate({y:1899,m:1,d:1,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calculate({...base,zone:'manual',offset:900}),/UTC offset/);
assert.throws(()=>C.calculate({...base,known:true,h:24,min:0}),/valid birth time/);
assert.equal(C.calculate({y:2024,m:1,d:1,zone:'UTC'}).index,9);
// DST gaps, repeated clock times, and days which are not 24 hours.
assert.throws(()=>C.calculate({y:2024,m:3,d:10,zone:'America/New_York',known:true,h:2,min:30}),/did not occur/);
assert.throws(()=>C.calculate({y:2024,m:11,d:3,zone:'America/New_York',known:true,h:1,min:30}),/happened twice/);
const f={y:2024,m:11,d:3,zone:'America/New_York',known:true,h:1,min:30};assert.equal(C.calculate({...f,fold:'later'}).moment-C.calculate({...f,fold:'earlier'}).moment,3600000);
const spring=C.calculate({y:2024,m:3,d:10,zone:'America/New_York'});assert.equal((spring.end-spring.start)/3600000,23);
const fall=C.calculate({y:2024,m:11,d:3,zone:'America/New_York'});assert.equal((fall.end-fall.start)/3600000,25);
// Normal dates in each sign, each year; every transition flips the expected sector.
for(const y of [1900,1950,2000,2024])for(let i=0;i<12;i++){
 const m=(i+3)%12+1,r=C.calculate({y,m,d:10,zone:'UTC'});assert.equal(r.index,i);assert(!r.uncertain);
 const target=i*30,anchor=new Date(Date.UTC(y,(i+2)%12,1));
 const event=Astronomy.SearchSunLongitude(target,anchor,40);assert(event);const ms=event.date.getTime();assert.equal(C.indexAt(ms-120000),(i+11)%12);assert.equal(C.indexAt(ms+120000),i);
}
console.log('PASS: all 12 signs across four years; 48 astronomical boundaries; USNO reference; leap days; UTC/IST equivalence; DST gap, fold and 23/25-hour days; invalid input checks.');
