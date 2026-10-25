/* Run with: node tests/lagna-core.test.cjs
   Independent reference values: Swiss Ephemeris 2.10.03, swe_houses_ex,
   sidereal / SIDM_LAHIRI. UTC clock times and site coordinates are explicit.
   Approximate Lahiri tolerances deliberately allow several tenths of an arcminute.
*/
const assert=require("node:assert/strict");
globalThis.Astronomy=require("../calculators/zodiac-sign-calculator/vendor/astronomy-2.1.19.min.js");
globalThis.RasiCore=require("../calculators/rasi-nakshatra-calculator/rasi-core.js");
const C=require("../calculators/lagna-calculator/lagna-core.js");
assert.equal(C.signs.length,12);
assert.equal(C.nakshatras.length,27);
assert(C.places.length>=20);
const cases=[
 ["Delhi 1990",{y:1990,m:8,d:15,h:14,min:30,lat:28.6139,lon:77.209,zone:"Asia/Kolkata"},230.29576956],
 ["Chennai 2000",{y:2000,m:1,d:1,h:12,min:0,lat:13.0827,lon:80.2707,zone:"Asia/Kolkata"},345.82650625],
 ["Bengaluru 2020",{y:2020,m:5,d:10,h:9,min:0,lat:12.9716,lon:77.5946,zone:"Asia/Kolkata"},69.72277743],
 ["NY 2024",{y:2024,m:11,d:3,h:1,min:30,lat:40.7128,lon:-74.006,zone:"America/New_York",fold:"earlier"},125.35244205],
 ["Sydney 2005",{y:2005,m:9,d:15,h:21,min:45,lat:-33.8688,lon:151.2093,zone:"Australia/Sydney"},19.51215318],
 ["Equator 2026",{y:2026,m:10,d:25,h:0,min:0,lat:0,lon:0,zone:"UTC"},96.93910575],
 ["London 2000",{y:2000,m:1,d:1,h:0,min:0,lat:51.5,lon:0,zone:"UTC"},163.17419871]
];
for(const [label,input,reference] of cases){
 const result=C.calculate(input),actual=result.birth.sidereal;
 const delta=Math.abs((((actual-reference)+540)%360)-180);
 assert(delta<0.01,label+" differs from reference by "+(delta*60).toFixed(3)+" arcminutes");
 assert(result.birth.sign>=0&&result.birth.sign<12);
 assert(result.birth.nak>=0&&result.birth.nak<27);
 assert(result.birth.pada>=1&&result.birth.pada<=4);
 assert.equal(result.checks.length,6);
}
const india={y:2000,m:1,d:1,h:12,min:0,lat:13.0827,lon:80.2707};
const ist=C.calculate({...india,zone:"Asia/Kolkata"});
const utc=C.calculate({...india,h:6,min:30,zone:"UTC"});
const offset=C.calculate({...india,zone:"manual",offset:330});
assert.equal(ist.ms,utc.ms);
assert.equal(ist.ms,offset.ms);
assert.equal(ist.birth.sign,11);
assert.equal(ist.birth.nak,25);
assert.equal(ist.birth.pada,4);
assert.throws(()=>C.calculate({...india,y:2023,m:2,d:29,zone:"UTC"}),/valid birth date/);
assert.throws(()=>C.calculate({...india,y:2024,m:4,d:31,zone:"UTC"}),/valid birth date/);
assert.throws(()=>C.calculate({...india,h:24,zone:"UTC"}),/valid birth time/);
assert.throws(()=>C.calculate({...india,lat:70,zone:"UTC"}),/latitude/);
assert.throws(()=>C.calculate({...india,lon:190,zone:"UTC"}),/longitude/);
assert.throws(()=>C.calculate({...india,zone:"manual",offset:900}),/UTC offset/);
assert.throws(()=>C.calculate({...india,zone:"Not/AZone"}),/IANA time zone/);
assert.throws(()=>C.calculate({...india,y:2024,m:3,d:10,h:2,min:30,lat:40.7128,lon:-74.006,zone:"America/New_York"}),/did not occur/);
const fold={y:2024,m:11,d:3,h:1,min:30,lat:40.7128,lon:-74.006,zone:"America/New_York"};
assert.throws(()=>C.calculate(fold),/occurred twice/);
const early=C.calculate({...fold,fold:"earlier"});
const late=C.calculate({...fold,fold:"later"});
assert.equal(late.ms-early.ms,3600000);
// Lagna sensitivity must reflect the actual change across a calculated transition.
assert(ist.later);
const changed=C.calcAt(ist.later.ms+60000,india.lat,india.lon);
assert.notEqual(changed.sign,ist.birth.sign);
const earlierAt=C.calcAt(ist.later.ms-60000,india.lat,india.lon);
assert.equal(earlierAt.sign,ist.birth.sign);
console.log("PASS: 7 Swiss Ephemeris Lahiri ascendants; IST/UTC/manual offsets; signs and nakshatra; DST gap/fold; location & date validation; ascendant transitions.");
