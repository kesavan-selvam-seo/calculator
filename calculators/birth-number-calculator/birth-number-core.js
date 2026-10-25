(function (root) {
  'use strict';
  function calculate(day) {
    if (!Number.isInteger(day) || day < 1 || day > 31) {
      throw new RangeError('Choose a whole birth day from 1 to 31.');
    }
    const chain = [day];
    while (chain[chain.length - 1] > 9) {
      chain.push(String(chain[chain.length - 1]).split('').reduce((total, digit) => total + Number(digit), 0));
    }
    const value = chain[chain.length - 1];
    return {
      day, value, chain,
      sameDays: Array.from({length: 31}, (_, i) => i + 1).filter(d => 1 + (d - 1) % 9 === value),
      masterAlternative: chain.find(n => n === 11 || n === 22) || null
    };
  }
  const api = {calculate};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BirthNumberCore = api;
})(typeof window === 'undefined' ? {} : window);
