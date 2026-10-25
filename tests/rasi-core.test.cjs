/* Run: node tests/rasi-core.test.cjs
   Lunar reference longitudes from independent Swiss Ephemeris 2.10,
   sidereal Lahiri mode (ordinary Swiss calculation, not our approximation).
*/
const assert=require('node:assert/strict');
globalThis.Astronomy=require('../calculators/zodiac-sign-calculator/vendor/astronomy-2.1.19.min.js');
const C=require('../calculators/rasi-nakshatra-calculator/rasi-core.js');

assert.equal(C.signs.length,12);
assert.equal(C.nakshatras.length,27);
assert.equal(new Set(C.nakshatras.map(n=>n.name)).size,27);
assert.equal(C.nakshatras[0].name,'Ashwini');
assert.equal(C.nakshatras[26].name,'Revati');
assert.equal(C.nakshatras[0].lord,'Ketu');
assert.equal(C.nakshatras[8].lord,'Mercury');

const reference=[
  ['2024-01-01T00:00:00Z',131.80106418],
  ['2026-10-25T00:00:00Z',351.85857508],
  ['2000-01-01T06:30:00Z',196.71168769],
  ['1985-04-17T10:00:00Z',333.22602931]
];
for(const [utc,expected] of reference){
  const moon=C.sky(Date.parse(utc));
  assert(Math.abs(moon.sidereal-expected)<0.015,
    utc+': sidereal Moon deviation more than 0.015° from independent Swiss Lahiri reference');
  assert(moon.sign>=0&&moon.sign<12&&moon.nak>=0&&moon.nak<27);
  assert(moon.pada>=1&&moon.pada<=4);
}
const i=C.calc({y:2000,m:1,d:1,known:true,h:12,min:0,zone:'Asia/Kolkata'});
const u=C.calc({y:2000,m:1,d:1,known:true,h:6,min:30,zone:'UTC'});
const offset=C.calc({y:2000,m:1,d:1,known:true,h:12,min:0,zone:'manual',offset:330});
assert.equal(i.moment,u.moment);
assert.equal(i.moment,offset.moment);
assert.equal(i.moon.sign,6);
assert.equal(i.moon.nak,14);
assert.equal(i.moon.pada,4);
const unknown=C.calc({y:2000,m:1,d:1,known:false,zone:'Asia/Kolkata'});
assert.deepEqual(unknown.possibilities.signs,[6]);
assert.deepEqual(unknown.possibilities.naks,[14,15]);
assert.deepEqual(unknown.possibilities.padas,[57,58,59,60]);
assert.equal(unknown.possibilities.padaChanges.length,3);

assert.throws(()=>C.calc({y:2023,m:2,d:29,known:true,h:12,min:0,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calc({y:2024,m:4,d:31,known:true,h:12,min:0,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calc({y:1899,m:1,d:1,known:true,h:12,min:0,zone:'UTC'}),/valid birth date/);
assert.throws(()=>C.calc({y:2024,m:10,d:1,known:true,h:24,min:0,zone:'UTC'}),/valid birth time/);
assert.throws(()=>C.calc({y:2024,m:10,d:1,known:true,h:12,min:0,zone:'manual',offset:900}),/UTC/);
assert.throws(()=>C.calc({y:2024,m:10,d:1,known:true,h:12,min:0,zone:'not-a-time-zone'}),/IANA/);

assert.throws(()=>C.calc({y:2024,m:3,d:10,known:true,h:2,min:30,zone:'America/New_York'}),/did not occur/);
const repeated={y:2024,m:11,d:3,known:true,h:1,min:30,zone:'America/New_York'};
assert.throws(()=>C.calc(repeated),/occurred twice/);
const early=C.calc({...repeated,fold:'earlier'});
const late=C.calc({...repeated,fold:'later'});
assert.equal(late.moment-early.moment,3600000);
assert.equal(C.dayStart(2024,3,11,'America/New_York',0)-C.dayStart(2024,3,10,'America/New_York',0),23*3600000);
assert.equal(C.dayStart(2024,11,4,'America/New_York',0)-C.dayStart(2024,11,3,'America/New_York',0),25*3600000);

console.log('PASS: 4 Swiss Lahiri crosschecks; 12 Rasi; 27 stars; timezone/IST/UTC; full-day transitions; DST folds/gaps; date and offset validation.');
