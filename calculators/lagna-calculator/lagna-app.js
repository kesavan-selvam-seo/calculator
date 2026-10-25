/* CalcuPortal Lagna Calculator. Never transmits entered birth details. */
(function(){
'use strict';
const $=id=>document.getElementById(id),C=window.LagnaCore;
if(!C)return;
let last=null;
const city=$("lg-city"),zone=$("lg-zone");
$("lg-year").max=String(new Date().getFullYear());$("year").textContent=new Date().getFullYear();
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);if(cls)e.className=cls;return e}
function write(id,text){$(id).textContent=String(text)}
function fmtOffset(n){return "UTC"+(n<0?"−":"+")+String(Math.floor(Math.abs(n)/60)).padStart(2,"0")+String(Math.abs(n)%60).padStart(2,"0")}
function local(ms,opt,withDate=true){
 const f={hour:"2-digit",minute:"2-digit",hourCycle:"h23"};
 if(withDate)Object.assign(f,{year:"numeric",month:"short",day:"numeric"});
 if(opt.zone==="manual")return new Intl.DateTimeFormat("en-GB",{...f,timeZone:"UTC"}).format(new Date(ms+opt.offset*60000))+" "+fmtOffset(opt.offset);
 return new Intl.DateTimeFormat("en-GB",{...f,timeZone:opt.zone,timeZoneName:"short"}).format(new Date(ms));
}
function angle(x){const d=Math.floor(x),minutes=(x-d)*60;return d+"° "+minutes.toFixed(1).padStart(4,"0")+"′"}
C.places.forEach(p=>city.add(new Option(p.label,p.id)));
city.add(new Option("Custom coordinates / different birthplace","custom"));
function registerZones(){
 try{
 const existing=new Set([...zone.options].map(x=>x.value));
 const other=document.createElement("optgroup");other.label="Other IANA time zones";
 Intl.supportedValuesOf("timeZone").forEach(t=>{
   if(!existing.has(t))other.append(new Option(t.replaceAll("_"," "),t));
 });
 zone.append(other);
 }catch(_){/* Common zones and manual offset remain available. */}
}
registerZones();
for(let n=-720;n<=840;n+=15)$("lg-offset").add(new Option(fmtOffset(n),String(n)));
$("lg-offset").value="330";
function placeChange(){
 if(city.value==="custom")return;
 const place=C.places.find(x=>x.id===city.value);
 if(!place)return;
 $("lg-lat").value=place.lat;$("lg-lon").value=place.lon;
 zone.value=place.zone;syncFields();
}
function dayOptions(){
 const original=$("lg-day").value;
 const m=Number($("lg-month").value),y=Number($("lg-year").value)||2000;
 const max=m?new Date(Date.UTC(y,m,0)).getUTCDate():31;
 const list=$("lg-day");list.replaceChildren(new Option("Select day",""));
 for(let d=1;d<=max;d++)list.add(new Option(String(d),String(d)));
 list.value=original&&Number(original)<=max?original:"";
}
function syncFields(){
 const manual=zone.value==="manual";
 $("lg-offset-field").hidden=!manual;$("lg-offset").disabled=!manual;
 write("lg-zone-info",manual?"Use the historical UTC offset in effect at your birthplace, including daylight-saving changes.":"The timezone converts your birthplace clock time into a UTC moment using historical rules. City and geographic coordinates must match.");
}
function clear(){
 last=null;$("lg-results").hidden=true;$("lg-error").hidden=true;$("lg-error").textContent="";
 write("lg-copy-status","");
}
function read(){
 const yRaw=$("lg-year").value,mRaw=$("lg-month").value,dRaw=$("lg-day").value,t=$("lg-time").value,latRaw=$("lg-lat").value,lonRaw=$("lg-lon").value;
 if(!yRaw||!mRaw||!dRaw||latRaw.trim()===""||lonRaw.trim()==="")
   throw new Error("Complete the birth date and select a birthplace or enter latitude and longitude.");
 if(!/^\d\d:\d\d$/.test(t))throw new Error("Enter a recorded birth time in HH:MM (24-hour) format. A date alone cannot establish your Lagna.");
 const [h,min]=t.split(":").map(Number);
 return {y:Number(yRaw),m:Number(mRaw),d:Number(dRaw),h,min,lat:Number(latRaw),lon:Number(lonRaw),zone:zone.value,offset:Number($("lg-offset").value),fold:$("lg-fold").value};
}
function table(id,rows){
 const body=$(id);body.replaceChildren();
 rows.forEach(items=>{const tr=node("tr");items.forEach(t=>tr.appendChild(node("td",t)));body.appendChild(tr)});
}
function render(r){
 const {input:o,birth:b}=r;
 const sign=C.signs[b.sign],nak=C.nakshatras[b.nak];
 write("lg-main-number",sign.glyph);
 write("lg-lagna",sign.name+" Lagna");
 write("lg-tamil",sign.tamil+" · "+sign.english+" rising");
 write("lg-degree",angle(b.degree)+" within "+sign.name);
 write("lg-nak-name",nak.name+" · Pada "+b.pada);
 write("lg-nak-tamil",nak.tamil+" (Ascendant's nakshatra)");
 write("lg-ruler",sign.lord);
 write("lg-time-label",local(r.ms,o));
 write("lg-method","Sidereal Lagna · approximate Lahiri ayanamsa");
 write("lg-boundary-status",r.near?"Birth-time sensitive — check nearby minutes":"Not near a sign boundary in ±30 minute checks");
 $("lg-caution").hidden=!r.near;
 if(r.near)write("lg-caution","This ascendant is close to a sign boundary or changes within ±30 minutes. Verify the recorded birth time and an independent professional Panchang/ephemeris before deciding the Lagna.");
 write("lg-geo",o.lat.toFixed(4)+"° "+(o.lat>=0?"N":"S")+", "+Math.abs(o.lon).toFixed(4)+"° "+(o.lon>=0?"E":"W"));
 write("lg-utc",new Date(r.ms).toISOString());
 write("lg-gst",b.greenwichSidereal.toFixed(5)+"°");
 write("lg-lst",b.localSidereal.toFixed(5)+"°");
 write("lg-epsilon",b.obliquity.toFixed(5)+"°");
 write("lg-tropical",b.tropical.toFixed(5)+"°");
 write("lg-ayan",b.ayan.toFixed(5)+"°");
 write("lg-sidereal",b.sidereal.toFixed(5)+"°");
 write("lg-rule","Lagna is the ecliptic point rising on the eastern horizon at your recorded birth moment. We compute the tropical ascendant from latitude, local apparent sidereal time and obliquity, then subtract approximate Lahiri ayanamsa to obtain "+sign.name+" (sidereal longitude "+b.sidereal.toFixed(3)+"°).");
 const examples=r.checks.map(x=>[
 (x.delta>0?"+":"")+x.delta+" min",
 local(r.ms+x.delta*60000,o,false),
 C.signs[x.view.sign].name,
 angle(x.view.degree),
 x.view.sign!==b.sign?"Different sign":"Same sign"
 ]);
 table("lg-sensitivity-table",examples);
 write("lg-prev",r.earlier?C.signs[r.earlier.before].name+" → "+C.signs[r.earlier.after].name+" · "+local(r.earlier.ms,o):"Not found within the previous 6 hours");
 write("lg-next",r.later?C.signs[r.later.before].name+" → "+C.signs[r.later.after].name+" · "+local(r.later.ms,o):"Not found within the following 6 hours");
 const wheel=$("lg-wheel");wheel.replaceChildren();
 C.signs.forEach((s,i)=>{
  const tile=node("div",undefined,"lg-sign-tile"+(i===b.sign?" selected":""));
  tile.setAttribute("aria-label",(i===b.sign?"Rising sign: ":"")+s.name+" "+s.tamil);
  tile.appendChild(node("span",s.glyph,"lg-glyph"));tile.appendChild(node("b",s.name));tile.appendChild(node("small",s.tamil));
  wheel.appendChild(tile);
 });
 const houses=$("lg-houses");houses.replaceChildren();
 for(let i=0;i<12;i++){
  const s=C.signs[(b.sign+i)%12],tile=node("div",undefined,"lg-house"+(i===0?" first":""));
  tile.appendChild(node("small","HOUSE "+(i+1)));
  tile.appendChild(node("b",s.glyph+" "+s.name));
  tile.appendChild(node("span",s.tamil));
  houses.appendChild(tile);
 }
 table("lg-steps",[
  ["1 / Location and instant",local(r.ms,o)+"; "+writePlace(o)],
  ["2 / UTC conversion",new Date(r.ms).toISOString()],
  ["3 / Greenwich sidereal time",b.greenwichSidereal.toFixed(5)+"°"],
  ["4 / Local apparent sidereal time","(GST + "+o.lon.toFixed(4)+"° longitude) mod 360 = "+b.localSidereal.toFixed(5)+"°"],
  ["5 / True obliquity of the ecliptic",b.obliquity.toFixed(5)+"°"],
  ["6 / Rising tropical ascendant",b.tropical.toFixed(5)+"°"],
  ["7 / Approximate Lahiri ayanamsa",b.ayan.toFixed(5)+"°"],
  ["8 / Sidereal ascendant",b.sidereal.toFixed(5)+"°"],
  ["9 / Lagna sign and degree",sign.name+" · "+angle(b.degree)],
  ["10 / Ascendant Nakshatra (not Moon birth star)",nak.name+" · Pada "+b.pada]
 ]);
 $("lg-results").hidden=false;
 write("lg-announcement","Calculated approximate "+sign.name+" Lagna, "+angle(b.degree)+".");
 last={data:r,copy:[
 "CalcuPortal Lagna Calculator · approximate sidereal / Lahiri",
 "Birth: "+local(r.ms,o),
 "Coordinates: "+o.lat+", "+o.lon+"; timezone "+o.zone,
 "Lagna: "+sign.name+" ("+sign.tamil+"); degree "+angle(b.degree),
 "Ascendant nakshatra: "+nak.name+"; pada "+b.pada,
 "Sidereal longitude: "+b.sidereal.toFixed(5)+"°",
 "Tropical ascendant: "+b.tropical.toFixed(5)+"°",
 "Approx Lahiri ayanamsa: "+b.ayan.toFixed(5)+"°",
 r.near?"CAUTION: sign boundary close, verify actual birth minute.":"For cultural interest; independent verification recommended.",
 "https://www.calcuportal.com/calculators/lagna-calculator/"
 ].join("\n")};
 if(window.matchMedia("(max-width:760px)").matches)$("lg-results").scrollIntoView({behavior:"auto",block:"start"});
}
function writePlace(o){
 const entry=C.places.find(p=>p.id===city.value);
 return entry?entry.label+" (preset coordinates)":"Custom coordinates";
}
function run(){
 clear();
 try{
  const r=C.calculate(read());
  render(r);
 }catch(e){
  $("lg-error").hidden=false;$("lg-error").textContent=e.message||"Unable to calculate. Please check your inputs.";
  write("lg-announcement","Calculation error: "+(e.message||"Check inputs."));
 }
}
$("lg-form").addEventListener("submit",e=>{e.preventDefault();run()});
$("lg-form").addEventListener("input",clear);
$("lg-form").addEventListener("change",clear);
$("lg-month").addEventListener("change",dayOptions);
$("lg-year").addEventListener("change",dayOptions);
city.addEventListener("change",placeChange);
zone.addEventListener("change",()=>{city.value="custom";syncFields()});
["lg-lat","lg-lon"].forEach(id=>$(id).addEventListener("input",()=>{city.value="custom"}));
$("lg-example").addEventListener("click",()=>{
 city.value="1";placeChange();
 $("lg-year").value="2000";$("lg-month").value="1";dayOptions();$("lg-day").value="1";
 $("lg-time").value="12:00";$("lg-fold").value="";run();
});
$("lg-reset").addEventListener("click",()=>{
 $("lg-year").value="2000";$("lg-month").value="1";dayOptions();$("lg-day").value="1";
 $("lg-time").value="12:00";city.value="1";placeChange();$("lg-fold").value="";$("lg-offset").value="330";clear();
});
$("lg-copy").addEventListener("click",async()=>{
 if(!last){run();if(!last)return;}
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(last.copy);
  else{
   const text=document.createElement("textarea");text.value=last.copy;
   text.style.position="fixed";text.style.opacity="0";
   document.body.appendChild(text);text.select();
   const okay=document.execCommand("copy");text.remove();if(!okay)throw new Error("Copy failed");
  }
  write("lg-copy-status","Copied. This includes your birth date, time and coordinates; review before sharing.");
 }catch(_){write("lg-copy-status","Clipboard unavailable. You can select the visible details manually.");}
});
const rasiTable=$("lg-rasi-reference");
C.signs.forEach((s,i)=>{
 const tr=node("tr");
 [i+1,s.name+" ("+s.english+")",s.tamil,s.lord,(30*i)+"°–"+(30*i+30)+"°"]
 .forEach(x=>tr.appendChild(node("td",x)));rasiTable.appendChild(tr);
});
city.value="1";placeChange();dayOptions();$("lg-day").value="1";syncFields();clear();
})();
