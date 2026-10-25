/* Rasi & Nakshatra calculator UI. Data never submitted to a server. */
(function(){
'use strict';
const $=id=>document.getElementById(id),Core=window.RasiCore;
if(!Core)return;
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const error=$("rn-error"),result=$("rn-result");
let active=null;
$("year").textContent=new Date().getFullYear();
$("rn-year").max=String(new Date().getFullYear());
function el(tag,text,cl){
 const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);if(cl)e.className=cl;return e;
}
function put(id,v){$(id).textContent=String(v);}
function formatOffset(n){
 const abs=Math.abs(n);
 return "UTC"+(n<0?"−":"+")+String(Math.floor(abs/60)).padStart(2,"0")+":"+String(abs%60).padStart(2,"0");
}
for(let n=-720;n<=840;n+=15){
 const option=new Option(formatOffset(n),String(n));$("rn-offset").add(option);
}
$("rn-offset").value="330";
try{
 const zone=$("rn-zone"),present=new Set([...zone.options].map(o=>o.value));
 const group=document.createElement("optgroup");group.label="Additional IANA time zones";
 Intl.supportedValuesOf("timeZone").forEach(z=>{
   if(!present.has(z))group.append(new Option(z.replaceAll("_"," "),z));
 });
 zone.append(group);
}catch(_){/* Preselected locations and manual UTC offsets remain usable. */}
function updateDays(){
 const m=Number($("rn-month").value),y=Number($("rn-year").value)||2000,prev=$("rn-day").value;
 const max=m?new Date(Date.UTC(y,m,0)).getUTCDate():31;
 const day=$("rn-day");day.replaceChildren(new Option("Select day",""));
 for(let d=1;d<=max;d++)day.add(new Option(String(d),String(d)));
 day.value=prev&&Number(prev)<=max?prev:"";
}
function updateFields(){
 const known=$("rn-known").checked,manual=$("rn-zone").value==="manual";
 $("rn-time-wrap").hidden=!known;$("rn-time").disabled=!known;
 $("rn-fold-wrap").hidden=!known||manual;$("rn-fold").disabled=!known||manual;
 $("rn-offset-wrap").hidden=!manual;$("rn-offset").disabled=!manual;
 put("rn-zone-help",manual?"Use the UTC offset in force at your birth, including any daylight-saving adjustment.":"The birth location is used to interpret the clock time. The Moon's position is geocentric, so coordinates are not required.");
 if(!known)put("rn-precision-note","Without a birth time, this tool checks the full local date and lists possible signs, stars and padas. It will not invent a single exact result.");
 else put("rn-precision-note","Birth time is used to locate the Moon at your birth moment. Results close to a boundary need an independent ephemeris check.");
}
function clear(){
 active=null;result.hidden=true;error.hidden=true;
 put("rn-copy-status","");
}
function readInput(){
 const rawYear=$("rn-year").value,rawMonth=$("rn-month").value,rawDay=$("rn-day").value;
 if(!rawYear||!rawMonth||!rawDay)throw new Error("Enter your complete birth date.");
 const known=$("rn-known").checked,t=$("rn-time").value;
 if(known&&!/^\d\d:\d\d$/.test(t))throw new Error("Enter an exact birth time in HH:MM format, or uncheck the birth time box.");
 const [h,min]=known?t.split(":").map(Number):[12,0];
 return {y:Number(rawYear),m:Number(rawMonth),d:Number(rawDay),known,h,min,zone:$("rn-zone").value,offset:Number($("rn-offset").value),fold:$("rn-fold").value};
}
function localTime(ms,opts,includeDate=true){
 const fmt={hour:'2-digit',minute:'2-digit',hourCycle:'h23'};
 if(includeDate){fmt.day="numeric";fmt.month="short";fmt.year="numeric";}
 if(opts.zone==="manual"){
   return new Intl.DateTimeFormat("en-GB",{...fmt,timeZone:"UTC"}).format(new Date(ms+opts.offset*60000))+" "+formatOffset(opts.offset);
 }
 return new Intl.DateTimeFormat("en-GB",{...fmt,timeZone:opts.zone,timeZoneName:"short"}).format(new Date(ms));
}
function angle(deg){const d=Math.floor(deg),m=Math.floor((deg-d)*60),s=Math.round(((deg-d)*60-m)*60);return d+"° "+String(m+(s===60?1:0)).padStart(2,"0")+"′";}
function makeTable(id,rows){
 const tbody=$(id);tbody.replaceChildren();
 for(const row of rows){const tr=el("tr");row.forEach(v=>tr.appendChild(el("td",v)));tbody.appendChild(tr);}
}
function renderSigns(selected){
 const zone=$("rn-signs");zone.replaceChildren();
 Core.signs.forEach((sign,i)=>{
   const cell=el("div",undefined,"rn-sign-tile"+(selected.includes(i)?" selected":""));
   cell.appendChild(el("span",sign.glyph,"rn-sign-icon"));
   cell.appendChild(el("b",sign.name));cell.appendChild(el("small",sign.tamil));
   zone.appendChild(cell);
 });
}
function selectedNakName(i){return Core.nakshatras[i].name;}
function padLabel(combo){const i=Math.floor(combo/4),pad=combo%4+1;return selectedNakName(i)+" — Pada "+pad;}
function renderKnown(r){
 const m=r.moon,s=Core.signs[m.sign],n=Core.nakshatras[m.nak],o=r.input;
 put("rn-heading","YOUR BIRTH RASI & NAKSHATRA");put("rn-sign",s.name);put("rn-nak",n.name);put("rn-pada",m.pada);
 put("rn-tamil",s.tamil+" · "+n.tamil);
 put("rn-lord",n.lord);put("rn-sign-lord",s.lord);
 put("rn-date-summary",localTime(r.moment,o));
 put("rn-confidence",r.caution?"Close to a pada boundary — verify independently":"Approximate Lahiri / geocentric Moon");
 put("rn-context","This is an estimated Moon sign and birth star at the entered local birth time, not a Western Sun sign. Different ayanamsas or ephemerides can produce different results near boundaries.");
 put("rn-degree",angle(m.degree)+" within "+s.name);
 put("rn-nak-degree",angle(m.degreeNak)+" within "+n.name);
 put("rn-tropical",m.tropical.toFixed(4)+"°");
 put("rn-ayan",m.ayan.toFixed(4)+"°");
 put("rn-sidereal",m.sidereal.toFixed(4)+"°");
 put("rn-utc",new Date(m.ms).toISOString().replace(".000Z"," UTC"));
 put("rn-method-name","Approximate Lahiri ayanamsa · Astronomy Engine 2.1.19 · geocentric Moon");
 put("rn-result-explainer","Your sidereal Moon longitude is "+m.sidereal.toFixed(3)+"°. Divide into 12 signs of 30° and 27 nakshatras of 13°20′, each with four padas of 3°20′. The Moon is in "+s.name+", "+n.name+" Pada "+m.pada+".");
 $("rn-uncertain").hidden=true;$("rn-certain").hidden=false;
 $("rn-boundary").hidden=!r.caution;
 if(r.caution)put("rn-boundary","This Moon position is within 0.18° of a Pada boundary. A small birth-time difference, ayanamsa convention or model difference may change the Pada or even the nakshatra/rasi near a shared boundary.");
 renderSigns([m.sign]);
 makeTable("rn-work-table",[
 ["Birth moment",localTime(r.moment,o)],
 ["Birth moment (UTC)",new Date(m.ms).toISOString()],
 ["Apparent tropical Moon",m.tropical.toFixed(4)+"°"],
 ["Approximate Lahiri ayanamsa",m.ayan.toFixed(4)+"°"],
 ["Sidereal Moon = tropical − ayanamsa",m.sidereal.toFixed(4)+"°"],
 ["Rasi (30° sectors)",s.name+" / "+s.tamil+" · "+angle(m.degree)],
 ["Nakshatra (13°20′ sectors)",n.name+" / "+n.tamil+" · "+angle(m.degreeNak)],
 ["Pada (3°20′ sectors)","Pada "+m.pada],
 ["Nakshatra ruler",n.lord]
 ]);
 active={known:true,result:r,summary:"CalcuPortal — Rasi & Nakshatra (approximate Lahiri)\n"+localTime(r.moment,o)+"\nRasi: "+s.name+" ("+s.tamil+")\nNakshatra: "+n.name+" ("+n.tamil+")\nPada: "+m.pada+"\nNakshatra lord: "+n.lord+"\nApproximate sidereal Moon: "+m.sidereal.toFixed(4)+"°\nCultural interpretation only; confirm boundaries with a professional Panchang."};
}
function renderUnknown(r){
 const poss=r.possibilities,o=r.input;
 put("rn-heading","POSSIBLE RESULTS FOR YOUR BIRTH DATE");
 put("rn-date-summary",MONTHS[o.m-1]+" "+o.d+", "+o.y+" · "+(o.zone==="manual"?formatOffset(o.offset):o.zone)+" · time unknown");
 put("rn-sign",poss.signs.map(i=>Core.signs[i].name).join(" / "));
 put("rn-nak",poss.naks.map(i=>Core.nakshatras[i].name).join(" / "));
 put("rn-pada",poss.padas.length===1?(poss.padas[0]%4+1):"Varies");
 put("rn-tamil","The local-day Moon position can change; no single birth star or pada is assigned.");
 put("rn-lord",poss.naks.map(i=>Core.nakshatras[i].lord).filter((s,i,a)=>a.indexOf(s)===i).join(" / "));
 put("rn-sign-lord",poss.signs.map(i=>Core.signs[i].lord).filter((s,i,a)=>a.indexOf(s)===i).join(" / "));
 put("rn-confidence",poss.signs.length===1&&poss.naks.length===1&&poss.padas.length===1?"Same Rasi, nakshatra and Pada all day (approx.)":"More than one possible birth-star or Pada");
 put("rn-context","Birth time not supplied. The result shows possibilities across the local date, rather than treating noon as your birth moment.");
 const rows=[
  ["Rasi","Possible: "+poss.signs.map(i=>Core.signs[i].name).join(", ")],
  ["Nakshatra","Possible: "+poss.naks.map(i=>Core.nakshatras[i].name).join(", ")],
  ["Nakshatra and Pada","Possible: "+poss.padas.map(padLabel).join("; ")],
  ["Moon sign transitions",poss.signChanges.length?poss.signChanges.map(x=>Core.signs[x.before].name+" → "+Core.signs[x.after].name+" around "+localTime(x.ms,o)).join("; "):"No sign change within the local day in this model"],
  ["Nakshatra transitions",poss.nakChanges.length?poss.nakChanges.map(x=>Core.nakshatras[x.before].name+" → "+Core.nakshatras[x.after].name+" around "+localTime(x.ms,o)).join("; "):"No nakshatra change within the local day in this model"],
  ["Pada transitions",poss.padaChanges.length?poss.padaChanges.map(x=>padLabel(x.before)+" → "+padLabel(x.after)+" around "+localTime(x.ms,o)).join("; "):"No pada change within the local day in this model"]
 ];
 makeTable("rn-work-table",rows);
 const list=$("rn-transition-list");list.replaceChildren();
 if(poss.padaChanges.length){
  poss.padaChanges.forEach(ch=>{
    list.appendChild(el("li",padLabel(ch.before)+" → "+padLabel(ch.after)+" around "+localTime(ch.ms,o)));
  });
 }else list.appendChild(el("li","No Pada change detected across this local day; the result still uses an approximate model."));
 put("rn-uncertain-explanation",poss.padas.length>1?"The Moon moves enough during this local day to cross one or more Pada boundaries. Add the recorded birth time to narrow the result.":"This approximate model shows the same Pada across the day, but an exact birth time and independent Panchang remain the best way to verify.");
 $("rn-certain").hidden=true;$("rn-uncertain").hidden=false;
 $("rn-boundary").hidden=true;
 renderSigns(poss.signs);
 active={known:false,result:r,summary:"CalcuPortal — approximate possible Rasi & Nakshatra, birth time unknown\n"+
 MONTHS[o.m-1]+" "+o.d+", "+o.y+"\nPossible Rasi: "+poss.signs.map(i=>Core.signs[i].name).join(", ")+
 "\nPossible Nakshatras: "+poss.naks.map(i=>Core.nakshatras[i].name).join(", ")+
 "\nPossible Nakshatra/Pada: "+poss.padas.map(padLabel).join("; ")+"\nAn exact time is needed near transitions."};
}
function calc(){
 clear();
 try{
   const o=readInput(),r=Core.calc(o);
   if(r.known)renderKnown(r);else renderUnknown(r);
   result.hidden=false;
   put("rn-status","Calculation complete. "+(r.known?"Estimated Rasi "+Core.signs[r.moon.sign].name+" and Nakshatra "+Core.nakshatras[r.moon.nak].name:"Possible results displayed for the full day")+".");
   if(window.matchMedia("(max-width:760px)").matches)result.scrollIntoView({behavior:"auto",block:"start"});
 }catch(e){
   error.hidden=false;error.textContent=e.message||"Could not calculate. Please check the birth details.";
   put("rn-status","Calculation error: "+(e.message||"Invalid input"));
 }
}
$("rn-form").addEventListener("submit",e=>{e.preventDefault();calc();});
$("rn-form").addEventListener("input",clear);
$("rn-form").addEventListener("change",clear);
$("rn-month").addEventListener("change",updateDays);
$("rn-year").addEventListener("change",updateDays);
$("rn-known").addEventListener("change",updateFields);
$("rn-zone").addEventListener("change",updateFields);
$("rn-example").addEventListener("click",()=>{
 $("rn-year").value="2000";$("rn-month").value="1";updateDays();$("rn-day").value="1";
 $("rn-known").checked=true;$("rn-time").value="12:00";$("rn-zone").value="Asia/Kolkata";
 $("rn-fold").value="";updateFields();calc();
});
$("rn-reset").addEventListener("click",()=>{
 $("rn-form").reset();updateDays();updateFields();clear();
});
$("rn-copy").addEventListener("click",async()=>{
 if(!active){calc();if(!active)return;}
 const msg=active.summary,button=$("rn-copy");
 try{
   if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(msg);
   else{
     const temp=document.createElement("textarea");temp.value=msg;temp.style.position="fixed";temp.style.opacity="0";document.body.appendChild(temp);temp.select();
     const ok=document.execCommand("copy");temp.remove();if(!ok)throw new Error("Clipboard unavailable");
   }
   put("rn-copy-status","Copied. Birth details are included: review before sharing.");
 }catch(_){put("rn-copy-status","Clipboard unavailable. Select and copy the visible results manually.");}
});
const table=$("rn-reference-table");
Core.nakshatras.forEach(n=>{
  const tr=el("tr");
  [
    n.index+1,n.name+" / "+n.tamil,n.lord,
    (n.index*13+Math.floor(n.index/3))===-1?"":((n.index*360/27).toFixed(2)+"°–"+((n.index+1)*360/27).toFixed(2)+"°")
  ].forEach(x=>tr.appendChild(el("td",x)));
  table.appendChild(tr);
});
updateDays();updateFields();clear();
})();
