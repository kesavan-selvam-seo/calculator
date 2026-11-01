const assert=require("node:assert/strict");
const {test}=require("node:test");
const bank=require("../assets/js/inorganic-exceptions-question-bank.js");
const {chooseQuestions,grade}=require("../assets/js/inorganic-exceptions-quiz.js");
const topics=["Periodicity","Chemical Bonding","p-Block","d- and f-Block","Coordination"];
test("26 original JEE inorganic questions present",()=>assert.equal(bank.length,26));
test("each question has a unique stable ID",()=>assert.equal(new Set(bank.map(q=>q.id)).size,bank.length));
test("each question has one unambiguous keyed index A-D",()=>{
 for(const q of bank){
  assert.ok(q.id&&q.question&&q.explanation&&topics.includes(q.topic));
  assert.equal(q.options.length,4);
  assert.equal(new Set(q.options).size,4);
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=3);
 }
});
test("five supported topics are present",()=>assert.deepEqual([...new Set(bank.map(q=>q.topic))].sort(),topics.slice().sort()));
test("topic filtering selects only matching questions",()=>{
 const q=chooseQuestions(bank,"p-Block",10,()=>.5);
 assert.equal(q.length,5);assert.ok(q.every(x=>x.topic==="p-Block"));
});
test("default sample selects 10 distinct questions",()=>{
 const q=chooseQuestions(bank,"all",10,()=>.33);
 assert.equal(q.length,10);
 assert.equal(new Set(q.map(x=>x.id)).size,10);
});
test("full mode selects all 26 without repetition",()=>{
 const q=chooseQuestions(bank,"all","all",()=>.21);
 assert.equal(q.length,bank.length);
 assert.equal(new Set(q.map(x=>x.id)).size,bank.length);
});
test("grading follows +4 correct, -1 incorrect, zero skipped",()=>{
 const r=grade([{topic:"Periodicity",chosen:1,answer:1},{topic:"Periodicity",chosen:0,answer:2},{topic:"Coordination",chosen:null,answer:3}]);
 assert.equal(r.correct,1);assert.equal(r.wrong,1);assert.equal(r.skipped,1);
 assert.equal(r.score,3);assert.equal(r.maximum,12);assert.equal(r.accuracy,50);
});
test("all-correct score and topic breakdown",()=>{
 const r=grade(bank.map(q=>({topic:q.topic,chosen:q.answer,answer:q.answer})));
 assert.equal(r.correct,26);assert.equal(r.wrong,0);assert.equal(r.score,104);
 assert.equal(Object.keys(r.byTopic).length,5);
});
test("all-skipped score and accuracy",()=>{
 const r=grade(bank.slice(0,10).map(q=>({topic:q.topic,chosen:null,answer:q.answer})));
 assert.equal(r.score,0);assert.equal(r.accuracy,0);assert.equal(r.skipped,10);
});
