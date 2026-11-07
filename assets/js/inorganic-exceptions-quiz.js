/* CalcuPortal JEE Main Inorganic Chemistry Exceptions: timed exam-mode UI.
   Existing original 26-question bank remains unchanged.
   All responses stay in this browser tab; results are shown only after final submit.
   Date.now-based deadlines correctly continue if a browser tab is in the background.
*/
(function(root){
"use strict";
function chooseQuestions(items,topic,count,rng){
 const random=typeof rng==="function"?rng:Math.random;
 const pool=items.filter(q=>topic==="all"||q.topic===topic).slice();
 for(let i=pool.length-1;i>0;i--){
   const j=Math.max(0,Math.min(i,Math.floor(random()*(i+1))));
   [pool[i],pool[j]]=[pool[j],pool[i]];
 }
 const amount=count==="all"?pool.length:Math.min(pool.length,Number(count)||10);
 return pool.slice(0,amount);
}
function grade(responses){
 let correct=0,wrong=0,skipped=0;
 const byTopic={};
 for(const r of responses){
  const t=byTopic[r.topic]||(byTopic[r.topic]={correct:0,wrong:0,skipped:0});
  if(r.chosen===null||r.chosen===undefined){skipped++;t.skipped++;}
  else if(r.chosen===r.answer){correct++;t.correct++;}
  else{wrong++;t.wrong++;}
 }
 const attempts=correct+wrong;
 return {correct,wrong,skipped,attempts,score:correct*4-wrong,maximum:responses.length*4,
  accuracy:attempts?Math.round(correct/attempts*100):0,byTopic};
}
function formatClock(seconds){
 const s=Math.max(0,Math.floor(seconds));
 return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
}
function evaluate(questions,answers){
 return grade(questions.map((q,i)=>({id:q.id,topic:q.topic,answer:q.answer,chosen:answers[i]})));
}
const api={chooseQuestions,grade,formatClock,evaluate};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
else root.CalcuInorganicQuiz=api;
if(typeof document==="undefined")return;
document.addEventListener("DOMContentLoaded",()=>{
 const bank=root.CalcuInorganicExceptionsQuestions;
 const $=id=>document.getElementById(id);
 const quiz=$("iq-quiz");if(!quiz)return;
 const setup=$("iq-setup"),play=$("iq-play"),finish=$("iq-finish"),error=$("iq-error");
 const panels=[setup,play,finish];
 let session=null,ticker=null;
 const make=(tag,text,cls)=>{
  const e=document.createElement(tag);
  if(text!==undefined)e.textContent=String(text);
  if(cls)e.className=cls;
  return e;
 };
 function setText(id,text){$(id).textContent=String(text)}
 function view(which){panels.forEach(p=>p.hidden=p!==which);quiz.setAttribute("data-phase",which===setup?"setup":which===play?"play":"finish")}
 function fail(msg){error.textContent=msg;error.hidden=false}
 function clearError(){error.hidden=true;error.textContent=""}
 function stopTimer(){if(ticker!==null){root.clearInterval(ticker);ticker=null}}
 function selectedTopic(){
  return Array.isArray(bank)?bank.filter(q=>$("iq-topic").value==="all"||q.topic===$("iq-topic").value):[];
 }
 function updateAvailable(){
  const n=selectedTopic().length;
  const count=$("iq-count"); const existing=count.value;
  count.replaceChildren();
  for(const val of ["10","20","all"]){
   const opt=make("option",val==="all"?"All "+n+" questions":Math.min(Number(val),n)+" questions"+(val==="10"?" · Quick test":" · Exam practice"));
   opt.value=val;count.appendChild(opt);
  }
  count.value=existing||"10";
  setText("iq-question-count",n+" original questions available in this selection");
  updateEstimate();
 }
 function updateEstimate(){
  const n=selectedTopic().length;
  const select=$("iq-count").value;
  const total=select==="all"?n:Math.min(n,Number(select)||10);
  const sec=Number($("iq-time-mode").value)||0;
  setText("iq-estimate",sec?formatClock(total*sec)+" total time for "+total+" questions":"Untimed · "+total+" questions");
 }
 function init(){
  if(!Array.isArray(bank)||!bank.length){fail("Question bank could not load. Refresh the page.");$("iq-start").disabled=true;return}
  const topics=[...new Set(bank.map(x=>x.topic))];
  const topic=$("iq-topic");
  topics.forEach(t=>{
    const op=make("option",t+" · "+bank.filter(q=>q.topic===t).length+" questions");
    op.value=t;topic.appendChild(op);
  });
  topic.addEventListener("change",updateAvailable);
  $("iq-count").addEventListener("change",updateEstimate);
  $("iq-time-mode").addEventListener("change",updateEstimate);
  updateAvailable();
 }
 function counts(){
  const answered=session.answers.filter(x=>x!==null).length;
  const marked=session.marked.filter(Boolean).length;
  return {answered,marked,unanswered:session.questions.length-answered};
 }
 function start(override){
  clearError();stopTimer();
  if(!Array.isArray(bank)||!bank.length){fail("Questions unavailable. Refresh the page.");return}
  const topic=$("iq-topic").value,count=$("iq-count").value;
  const questions=override||api.chooseQuestions(bank,topic,count);
  if(!questions.length){fail("No questions available for the selected topic.");return}
  const perQuestion=Number($("iq-time-mode").value)||0;
  const durationMs=perQuestion>0?questions.length*perQuestion*1000:null;
  const now=Date.now();
  session={
   questions,answers:Array(questions.length).fill(null),marked:Array(questions.length).fill(false),
   index:0,startedAt:now,deadline:durationMs!==null?now+durationMs:null,
   durationMs,finished:false,timeout:false,source:override?"retry":"new"
  };
  $("iq-play").hidden=false;view(play);
  setText("iq-total-questions",questions.length);
  updateClock();
  buildPalette();render();
  ticker=root.setInterval(updateClock,250);
  quiz.scrollIntoView({behavior:"auto",block:"start"});
 }
 function remainingMs(){
  return session.deadline===null?null:Math.max(0,session.deadline-Date.now());
 }
 function updateClock(){
  if(!session||session.finished)return;
  const remain=remainingMs();
  const el=$("iq-clock");
  if(remain===null){
   el.textContent="Untimed";el.classList.remove("is-low");
   $("iq-time-status").textContent="No time limit";
   return;
  }
  el.textContent=formatClock(Math.ceil(remain/1000));
  el.classList.toggle("is-low",remain<=60000);
  $("iq-time-status").textContent=remain<=60000?"Less than one minute remaining":"Timer runs even when you switch tabs";
  if(remain===0)submit(true);
 }
 function renderStatus(){
  const {answered,marked,unanswered}=counts();
  setText("iq-answered-count",answered);
  setText("iq-marked-count",marked);
  setText("iq-unanswered-count",unanswered);
  setText("iq-complete",answered+" of "+session.questions.length+" answered");
  const percent=100*answered/session.questions.length;
  $("iq-progress").style.width=percent.toFixed(1)+"%";
  $("iq-progress-bar").setAttribute("aria-valuenow",String(answered));
  $("iq-progress-bar").setAttribute("aria-valuemax",String(session.questions.length));
  [...$("iq-palette").children].forEach((btn,i)=>{
   const selected=session.answers[i]!==null,flagged=session.marked[i],current=i===session.index;
   btn.className="iq-palette-number"+(selected?" answered":"")+(flagged?" flagged":"")+(current?" active":"");
   btn.setAttribute("aria-current",current?"step":"false");
   btn.setAttribute("aria-label","Question "+(i+1)+(selected?", answered":", unanswered")+(flagged?", marked for review":""));
  });
 }
 function buildPalette(){
  const palette=$("iq-palette");palette.replaceChildren();
  session.questions.forEach((_,i)=>{
   const btn=make("button",i+1,"iq-palette-number");
   btn.type="button";btn.addEventListener("click",()=>go(i));
   palette.appendChild(btn);
  });
  renderStatus();
 }
 function render(){
  if(!session||session.finished)return;
  if(remainingMs()===0){submit(true);return}
  const q=session.questions[session.index],i=session.index,total=session.questions.length;
  setText("iq-topic-badge",q.topic);
  setText("iq-question-number","Question "+(i+1)+" of "+total);
  setText("iq-prompt",q.question);
  const container=$("iq-options");container.replaceChildren();
  q.options.forEach((choice,j)=>{
   const label=make("label",undefined,"iq-option"+(session.answers[i]===j?" selected":""));
   const inp=make("input");
   inp.type="radio";inp.name="iq-answer";inp.value=String(j);inp.checked=session.answers[i]===j;
   inp.addEventListener("change",()=>{
    if(session.finished||remainingMs()===0)return;
    session.answers[i]=j;
    [...container.children].forEach((el,k)=>el.classList.toggle("selected",k===j));
    renderStatus();
   });
   const letter=make("span",String.fromCharCode(65+j),"iq-letter");
   const txt=make("span",choice,"iq-choice-text");
   label.append(inp,letter,txt);container.appendChild(label);
  });
  $("iq-previous").disabled=i===0;
  $("iq-next").textContent=i===total-1?"Review & submit":"Save & next";
  const marked=session.marked[i];
  $("iq-mark").classList.toggle("marked",marked);
  $("iq-mark").setAttribute("aria-pressed",String(marked));
  $("iq-mark").textContent=marked?"★ Marked for review":"☆ Mark for review";
  renderStatus();
 }
 function go(index){
  if(!session||session.finished)return;
  if(remainingMs()===0){submit(true);return}
  if(index<0||index>=session.questions.length)return;
  session.index=index;render();
 }
 function confirmation(){
  if(!session||session.finished)return;
  if(remainingMs()===0){submit(true);return}
  const {unanswered,marked}=counts();
  const msg="Submit your chemistry quiz now?\n"+
    (unanswered?unanswered+" unanswered question(s) will score 0.\n":"All questions have a selected answer.\n")+
    (marked?marked+" question(s) are marked for review.\n":"")+
    "Answers and explanations will appear after submission. You cannot edit responses afterward.";
  if(root.confirm(msg))submit(false);
 }
 function submit(timedOut){
  if(!session||session.finished)return;
  session.finished=true;session.timeout=!!timedOut;
  stopTimer();clearError();
  const qs=session.questions,rs=qs.map((q,i)=>({id:q.id,topic:q.topic,answer:q.answer,chosen:session.answers[i]}));
  const stats=api.grade(rs);
  const elapsedMs=Math.max(0,Date.now()-session.startedAt);
  const elapsed=session.durationMs===null?elapsedMs:Math.min(elapsedMs,session.durationMs);
  view(finish);
  setText("iq-score",stats.score+" / "+stats.maximum);
  setText("iq-stat-correct",stats.correct);
  setText("iq-stat-wrong",stats.wrong);
  setText("iq-stat-skipped",stats.skipped);
  setText("iq-accuracy",stats.accuracy+"%");
  setText("iq-stat-time",formatClock(Math.floor(elapsed/1000)));
  setText("iq-final-percent",Math.round(stats.correct/qs.length*100)+"% correct");
  $("iq-timeout-banner").hidden=!timedOut;
  const name=stats.correct===qs.length?"Perfect practice!":
   stats.accuracy>=80?"Great revision work!":
   stats.accuracy>=60?"Good progress — review your weak topics.":"Keep practising — revisit the explanations.";
  setText("iq-performance-title",name);
  setText("iq-summary-note",timedOut?
    "Time expired, so the quiz was submitted automatically. Unanswered questions score 0. Review the complete answer key below.":
    "Your test is complete. Review every explanation below; your answers were not revealed during the test.");
  const topics=$("iq-topic-results");topics.replaceChildren();
  Object.entries(stats.byTopic).forEach(([topic,s])=>{
   const row=make("div",undefined,"iq-topic-row");
   row.append(make("strong",topic),make("span",s.correct+" correct · "+s.wrong+" wrong · "+s.skipped+" skipped"));
   topics.appendChild(row);
  });
  const wrongIds=new Set(rs.filter(r=>r.chosen!==r.answer).map(r=>r.id));
  const missed=qs.filter(q=>wrongIds.has(q.id));
  const retry=$("iq-retry");retry.hidden=missed.length===0;
  retry.onclick=()=>start(missed);
  renderReview("all");
  $("iq-review-filter").value="all";
  quiz.scrollIntoView({behavior:"auto",block:"start"});
 }
 function renderReview(filter){
  if(!session||!session.finished)return;
  const holder=$("iq-review-list");holder.replaceChildren();
  let shown=0;
  session.questions.forEach((q,i)=>{
   const choice=session.answers[i],isSkipped=choice===null,isCorrect=choice===q.answer;
   if(filter==="wrong"&&(isCorrect||isSkipped))return;
   if(filter==="skipped"&&!isSkipped)return;
   if(filter==="incorrect-or-skipped"&&isCorrect)return;
   shown++;
   const article=make("article",undefined,"iq-review-item"+(isCorrect?" correct":isSkipped?" skipped":" wrong"));
   const heading=make("div",undefined,"iq-review-heading");
   heading.append(make("span","Q"+(i+1)+" · "+q.topic),make("strong",isCorrect?"✓ Correct":isSkipped?"— Skipped":"✕ Incorrect"));
   article.appendChild(heading);
   article.appendChild(make("h4",q.question));
   article.appendChild(make("p","Your answer: "+(isSkipped?"Not attempted":String.fromCharCode(65+choice)+". "+q.options[choice])));
   article.appendChild(make("p","Correct answer: "+String.fromCharCode(65+q.answer)+". "+q.options[q.answer],"iq-correct-answer"));
   article.appendChild(make("p",q.explanation,"iq-explanation"));
   holder.appendChild(article);
  });
  if(!shown)holder.appendChild(make("div","No questions match this filter. Choose another filter to see your explanations.","iq-review-empty"));
  setText("iq-review-count",shown+" of "+session.questions.length+" questions shown");
 }
 function reset(){
  stopTimer();session=null;clearError();
  view(setup);
  $("iq-progress").style.width="0%";
  quiz.scrollIntoView({behavior:"auto",block:"start"});
 }
 $("iq-start").addEventListener("click",()=>start(null));
 $("iq-previous").addEventListener("click",()=>go(session.index-1));
 $("iq-next").addEventListener("click",()=>{
  if(!session||session.finished)return;
  if(session.index===session.questions.length-1)confirmation();
  else go(session.index+1);
 });
 $("iq-mark").addEventListener("click",()=>{
  if(!session||session.finished)return;
  session.marked[session.index]=!session.marked[session.index];render();
 });
 $("iq-clear").addEventListener("click",()=>{
  if(!session||session.finished)return;
  session.answers[session.index]=null;render();
 });
 $("iq-submit").addEventListener("click",confirmation);
 $("iq-review-filter").addEventListener("change",e=>renderReview(e.target.value));
 $("iq-retry").addEventListener("click",()=>{
  if(!session)return;
  const missed=session.questions.filter((q,i)=>session.answers[i]!==q.answer);
  if(missed.length)start(missed);
 });
 $("iq-restart").addEventListener("click",reset);
 $("iq-restart-play").addEventListener("click",()=>{
  if(!session||session.finished){reset();return}
  if(root.confirm("End this attempt without a score and return to setup?"))reset();
 });
 document.addEventListener("visibilitychange",()=>{
  if(session&&!session.finished)updateClock();
 });
 root.addEventListener("focus",()=>{
  if(session&&!session.finished)updateClock();
 });
 root.addEventListener("pagehide",stopTimer);
 init();view(setup);
});
})(typeof window!=="undefined"?window:globalThis);
