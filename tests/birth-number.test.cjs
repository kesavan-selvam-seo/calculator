const assert = require('node:assert/strict');
const {calculate} = require('../calculators/birth-number-calculator/birth-number-core.js');
const groups = {1:[1,10,19,28],2:[2,11,20,29],3:[3,12,21,30],4:[4,13,22,31],5:[5,14,23],6:[6,15,24],7:[7,16,25],8:[8,17,26],9:[9,18,27]};
for (const [number, days] of Object.entries(groups)) {
  for (const day of days) {
    const r = calculate(day);
    assert.equal(r.value, Number(number));
    assert.deepEqual(r.sameDays, days);
    assert.equal(r.chain[0], day);
    assert.equal(r.chain.at(-1), r.value);
    assert.equal(r.masterAlternative, day === 11 || day === 29 ? 11 : day === 22 ? 22 : null);
  }
}
assert.deepEqual(calculate(29).chain, [29,11,2]);
assert.deepEqual(calculate(19).chain, [19,10,1]);
assert.deepEqual(calculate(28).chain, [28,10,1]);
assert.deepEqual(calculate(22).chain, [22,4]);
assert.deepEqual(calculate(7).chain, [7]);
for (const invalid of [0,32,-1,1.5,NaN,Infinity,null,undefined,'29','',true]) assert.throws(() => calculate(invalid), RangeError);
console.log('PASS: all 31 birth days, all nine result groups, master alternatives, multi-step reductions and invalid inputs.');
