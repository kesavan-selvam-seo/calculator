/* Original CalcuPortal inorganic exceptions quiz UI & pure grading helpers. */
(function(root){
"use strict";
function chooseQuestions(items,topic,count,rng){
 const random=typeof rng==="function"?rng:Math.random;
 const pool=items.filter(q=>topic==="all"||q.topic===topic).slice();
 for(let i=pool.length-1;i>0;i--){
   const j=Math.floor(random()*(i+1));
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
   else {wrong++;t.wrong++;}
 }
 return {correct,wrong,skipped,score:correct*4-wrong,maximum:responses.length*4,
   accuracy:correct+wrong?Math.round(correct/(correct+wrong)*100):0,byTopic};
}
const api={chooseQuestions,grade};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
else root.CalcuInorganicQuiz=api;
if(typeof document==="undefined")return;
document.addEventListener("DOMContentLoaded",()=>{
 const bank=root.CalcuInorganicExceptionsQuestions;
 const section=document.getElementById("iq-quiz");
 if(!section)return;
 const $=id=>document.getElementById(id);
 const setup=$("iq-setup"),play=$("iq-play"),finish=$("iq-finish"),error=$("iq-error");
 let session=null,selection=null,locked=false;
 const allPanels=[setup,play,finish];
 function view(which){allPanels.forEach(panel=>panel.hidden=panel!==which)}
 function showError(message){error.textContent=message;error.hidden=false}
 function hideError(){error.hidden=true;error.textContent=""}
 function initialize(){
   if(!Array.isArray(bank)||bank.length===0){showError("Quiz questions couldn't load. Please refresh the page.");return;}
   hideError();
   const topics=[...new Set(bank.map(q=>q.topic))];
   const topic=$("iq-topic");
   topics.forEach(t=>{const op=document.createElement("option");op.value=t;op.textContent=t+" ("+bank.filter(q=>q.topic===t).length+" questions)";topic.appendChild(op)});
   $("iq-question-count").textContent=bank.length+" original questions available";
   $("iq-all-label").textContent="All "+bank.length+" questions";
 }
 function start(fromWrong){
   hideError();
   if(!Array.isArray(bank)){showError("Question bank not available. Please refresh.");return;}
   const topic=$("iq-topic").value,count=$("iq-count").value;
   const chosen=fromWrong||api.chooseQuestions(bank,topic,count);
   if(!chosen.length){showError("No questions available for that topic.");return;}
   session={questions:chosen,responses:[],index:0};
   locked=false;selection=null;
   view(play);render();
 }
 function render(){
   const q=session.questions[session.index],total=session.questions.length;
   selection=null;locked=false;
   $("iq-topic-badge").textContent=q.topic;
   $("iq-question-number").textContent="Question "+(session.index+1)+" of "+total;
   $("iq-progress").style.width=(session.index/total*100)+"%";
   $("iq-progress-bar").setAttribute("aria-valuenow",String(session.index));
   $("iq-progress-bar").setAttribute("aria-valuemax",String(total));
   $("iq-prompt").textContent=q.question;
   const holder=$("iq-options");holder.replaceChildren();
   const abc=["A","B","C","D"];
   q.options.forEach((option,index)=>{
     const label=document.createElement("label");label.className="iq-option";
     const input=document.createElement("input");input.type="radio";input.name="iq-answer";input.value=String(index);
     const letter=document.createElement("span");letter.className="iq-letter";letter.textContent=abc[index];
     const txt=document.createElement("span");txt.textContent=option;
     label.append(input,letter,txt);
     input.addEventListener("change",()=>{
       if(locked)return;
       selection=index;
       $("iq-check").disabled=false;
       [...holder.children].forEach((l,i)=>l.classList.toggle("selected",i===index));
     });
     holder.appendChild(label);
   });
   $("iq-feedback").hidden=true;$("iq-feedback").replaceChildren();
   $("iq-check").hidden=false;$("iq-check").disabled=true;
   $("iq-skip").hidden=false;$("iq-next").hidden=true;
   $("iq-next").textContent=session.index===total-1?"See my results":"Next question";
 }
 function lock(chosen){
   if(locked)return;
   locked=true;
   const q=session.questions[session.index];
   session.responses.push({id:q.id,topic:q.topic,chosen,answer:q.answer});
   const correct=chosen===q.answer;
   const opts=[...$("iq-options").children];
   opts.forEach((el,i)=>{
     el.classList.toggle("correct",i===q.answer);
     el.classList.toggle("incorrect",chosen===i&&chosen!==q.answer);
     const inp=el.querySelector("input");inp.disabled=true;
   });
   const feedback=$("iq-feedback");feedback.replaceChildren();
   const heading=document.createElement("strong");
   heading.textContent=chosen===null?"Skipped — answer revealed":correct?"Correct! +4 points":"Not quite. −1 point";
   const explanation=document.createElement("p");
   explanation.textContent="Answer: "+["A","B","C","D"][q.answer]+". "+q.options[q.answer]+". "+q.explanation;
   feedback.append(heading,explanation);
   feedback.className="iq-feedback "+(chosen!==null&&correct?"is-correct":chosen!==null?"is-wrong":"is-skipped");
   feedback.hidden=false;
   $("iq-check").hidden=true;$("iq-skip").hidden=true;$("iq-next").hidden=false;
   $("iq-next").focus();
 }
 function summary(){
   const r=api.grade(session.responses);
   view(finish);
   $("iq-progress").style.width="100%";
   $("iq-score").textContent=r.score+" / "+r.maximum;
   $("iq-stat-correct").textContent=String(r.correct);
   $("iq-stat-wrong").textContent=String(r.wrong);
   $("iq-stat-skipped").textContent=String(r.skipped);
   $("iq-accuracy").textContent=r.accuracy+"%";
   const detail=$("iq-topic-results");detail.replaceChildren();
   for(const [topic,stats] of Object.entries(r.byTopic)){
     const row=document.createElement("div");row.className="iq-topic-row";
     const name=document.createElement("strong");name.textContent=topic;
     const count=document.createElement("span");count.textContent=stats.correct+" correct · "+stats.wrong+" wrong · "+stats.skipped+" skipped";
     row.append(name,count);detail.appendChild(row);
   }
   const wrongIds=new Set(session.responses.filter(x=>x.chosen!==x.answer).map(x=>x.id));
   const wrongQuestions=session.questions.filter(q=>wrongIds.has(q.id));
   const retry=$("iq-retry");retry.hidden=wrongQuestions.length===0;
   retry.onclick=()=>start(wrongQuestions);
   $("iq-summary-note").textContent=r.correct===session.questions.length?
     "Excellent! All questions answered correctly. Try a new category to keep practising.":
     "Review the concepts you missed, then use Retry missed questions to practise those exceptions again.";
 }
 $("iq-start").addEventListener("click",()=>start(null));
 $("iq-check").addEventListener("click",()=>{if(selection!==null)lock(selection)});
 $("iq-skip").addEventListener("click",()=>lock(null));
 $("iq-next").addEventListener("click",()=>{session.index++;if(session.index>=session.questions.length)summary();else render()});
 $("iq-restart").addEventListener("click",()=>{session=null;view(setup);$("iq-progress").style.width="0";});
 $("iq-restart-play").addEventListener("click",()=>{session=null;view(setup);$("iq-progress").style.width="0";});
 initialize();view(setup);
});
})(typeof window!=="undefined"?window:globalThis);
