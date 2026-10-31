const assert = require("node:assert/strict");
const { test } = require("node:test");
const { calculate, oversToBalls, numberOfRuns } = require("../assets/js/net-run-rate.js");
const row = (scored, faced, conceded, bowled, allOutFor=false, allOutAgainst=false) =>
  ({ scored, faced, conceded, bowled, allOutFor, allOutAgainst });
const near = (actual, expected) => assert.ok(Math.abs(actual-expected)<1e-10, actual+" !== "+expected);

test("20-over single match 180 v 160 gives +1.000", () =>
  near(calculate([row(180,"20.0",160,"20.0")],20).nrr,1));

test("all-out side gets full overs quota", () => {
  const result=calculate([row(140,"18.4",160,"20.0",true)],20);
  assert.equal(result.forBalls,120);
  near(result.nrr,-1);
});

test("18.4 represents 18 overs plus four balls, not decimal 18.4", () => {
  assert.equal(oversToBalls("18.4",20),112);
  near(calculate([row(150,"18.4",140,"20.0")],20).scoringRate,150*6/112);
});

test("multiple matches aggregate runs and effective overs", () => {
  const result=calculate([
    row(180,"20.0",160,"20.0"),
    row(140,"18.4",150,"20.0",true)
  ],20);
  assert.equal(result.forRuns,320);
  assert.equal(result.againstRuns,310);
  assert.equal(result.forBalls,240);
  assert.equal(result.againstBalls,240);
  near(result.nrr,0.25);
});

test("all-out opponent charged full bowling quota", () => {
  const result=calculate([row(155,"19.0",144,"17.2",false,true)],20);
  assert.equal(result.againstBalls,120);
  near(result.concedingRate,7.2);
});

test("ordinary chase ending early uses actual overs", () => {
  const result=calculate([row(161,"18.2",160,"20.0")],20);
  assert.equal(result.forBalls,110);
});

test("standard ODI 50-over calculation", () =>
  near(calculate([row(250,"50",230,"50")],50).nrr,.4));

test("zero runs permitted", () =>
  assert.equal(calculate([row(0,"0.1",120,"20.0",true)],20).forRuns,0));

test("cricket overs validation accepts only balls 0 through 5", () => {
  for(const value of ["18.6","18.9","18.44","18.40","abc","", "-1.2", "3.5.1"])
    assert.throws(()=>oversToBalls(value,20),Error);
});

test("overs greater than quota rejected", () => {
  for(const value of ["20.1","21.0","40"])assert.throws(()=>oversToBalls(value,20),Error);
});

test("zero legal balls rejected",()=>assert.throws(()=>oversToBalls("0.0",20),Error));

test("invalid runs and fractional runs rejected", () => {
  for(const value of ["-1","50.5","", "10000","NaN"])
    assert.throws(()=>numberOfRuns(value),Error);
});

test("invalid quota rejected", () => {
  for(const quota of [0,51,20.5,"invalid"])
    assert.throws(()=>calculate([row(100,"20",90,"20")],quota),Error);
});

test("empty and excess match arrays rejected", () => {
  assert.throws(()=>calculate([],20),Error);
  assert.throws(()=>calculate(Array(41).fill(row(100,"20",90,"20")),20),Error);
});

console.log("NRR calculator core tests complete.");
