/* CalcuPortal Rasi / Nakshatra core.
 * Moon: Astronomy Engine 2.1.19, geocentric apparent ecliptic of date.
 * Sidereal: approximate Lahiri ayanamsa, precession polynomial anchored at J2000.
 * Do not represent as a certified Swiss Ephemeris or a precise Panchang.
 * No network calls or transmission of birth details.
 */
(function(root){
'use strict';
const SIGNS=[
 ["Mesha","Aries","மேஷம்","♈","Mars"],["Vrishabha","Taurus","ரிஷபம்","♉","Venus"],
 ["Mithuna","Gemini","மிதுனம்","♊","Mercury"],["Karka","Cancer","கடகம்","♋","Moon"],
 ["Simha","Leo","சிம்மம்","♌","Sun"],["Kanya","Virgo","கன்னி","♍","Mercury"],
 ["Tula","Libra","துலாம்","♎","Venus"],["Vrischika","Scorpio","விருச்சிகம்","♏","Mars"],
 ["Dhanu","Sagittarius","தனுசு","♐","Jupiter"],["Makara","Capricorn","மகரம்","♑","Saturn"],
 ["Kumbha","Aquarius","கும்பம்","♒","Saturn"],["Meena","Pisces","மீனம்","♓","Jupiter"]
].map((x,i)=>({index:i,name:x[0],english:x[1],tamil:x[2],glyph:x[3],lord:x[4]}));
const NAMES=[
 ["Ashwini","அசுவினி"],["Bharani","பரணி"],["Krittika","கார்த்திகை"],["Rohini","ரோகிணி"],
 ["Mrigashira","மிருகசீரிடம்"],["Ardra","திருவாதிரை"],["Punarvasu","புனர்பூசம்"],["Pushya","பூசம்"],
 ["Ashlesha","ஆயில்யம்"],["Magha","மகம்"],["Purva Phalguni","பூரம்"],["Uttara Phalguni","உத்திரம்"],
 ["Hasta","ஹஸ்தம்"],["Chitra","சித்திரை"],["Swati","சுவாதி"],["Vishakha","விசாகம்"],
 ["Anuradha","அனுஷம்"],["Jyeshtha","கேட்டை"],["Mula","மூலம்"],["Purva Ashadha","பூராடம்"],
 ["Uttara Ashadha","உத்திராடம்"],["Shravana","திருவோணம்"],["Dhanishta","அவிட்டம்"],["Shatabhisha","சதயம்"],
 ["Purva Bhadrapada","பூரட்டாதி"],["Uttara Bhadrapada","உத்திரட்டாதி"],["Revati","ரேவதி"]
];
const NAK_LORDS=["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
const NAKS=NAMES.map((x,i)=>({index:i,name:x[0],tamil:x[1],lord:NAK_LORDS[i%9]}));
const DAY=86400000;
const normal=n=>((n%360)+360)%360;
const dd=n=>String(n).padStart(2,"0");
function ayanamsa(ms){
  const jd=ms/DAY+2440587.5;
  const T=(jd-2451545.0)/36525;
  // Mean approximation; no claim to replicate Swiss Ephemeris nutation/IAU corrections.
  return (23*3600+51*60+25.532+5029.0966*T+1.11161*T*T)/3600;
}
function sky(ms){
  if(!root.Astronomy||typeof root.Astronomy.EclipticGeoMoon!=="function")
    throw new Error("The astronomy library failed to load. Refresh the page and retry.");
  const point=root.Astronomy.EclipticGeoMoon(new Date(ms));
  const tropical=normal(point.lon),ayan=ayanamsa(ms),sidereal=normal(tropical-ayan);
  const s=Math.min(11,Math.floor(sidereal/30));
  const n=Math.min(26,Math.floor(sidereal/(360/27)));
  const p=Math.min(3,Math.floor((sidereal%(360/27))/(360/108)));
  const half=360/108;
  const nearBoundary=Math.min(sidereal%half,half-sidereal%half);
  return {ms,tropical,ayan,sidereal,sign:s,nak:n,pada:p+1,nakPada:n*4+p,
    degree:sidereal%30,degreeNak:sidereal%(360/27),boundaryDistance:nearBoundary};
}
function validDate(y,m,d){
  if(!Number.isInteger(y)||y<1900||y>new Date().getUTCFullYear()+1||!Number.isInteger(m)||!Number.isInteger(d))return false;
  const dt=new Date(Date.UTC(y,m-1,d));
  return dt.getUTCFullYear()===y&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d;
}
const formatterCache=new Map();
function formatParts(stamp,zone){
  if(!formatterCache.has(zone))formatterCache.set(zone,new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}));
  const out={};
  formatterCache.get(zone).formatToParts(new Date(stamp)).forEach(p=>{if(p.type!=='literal')out[p.type]=Number(p.value);});
  return out;
}
function candidates(y,m,d,h,min,zone){
  const local=Date.UTC(y,m-1,d,h,min),offsets=new Set();
  // Historical offsets and daylight saving can change; evaluate actual IANA rule.
  for(let delta=-36;delta<=36;delta+=6){
    const guess=local+delta*3600000,p=formatParts(guess,zone);
    offsets.add(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-guess);
  }
  return [...offsets].map(offset=>local-offset).filter(ms=>{
    const p=formatParts(ms,zone);
    return p.year===y&&p.month===m&&p.day===d&&p.hour===h&&p.minute===min;
  }).sort((a,b)=>a-b);
}
function moment(y,m,d,h,min,zone,offset,fold){
  if(zone==="manual")return Date.UTC(y,m-1,d,h,min)-offset*60000;
  const options=candidates(y,m,d,h,min,zone);
  if(!options.length)throw new Error("This local birth time did not occur in the selected time zone (daylight-saving gap). Check the time or choose the recorded UTC offset.");
  if(options.length>1&&!fold)throw new Error("This local birth time occurred twice during a clock change. Select first/second occurrence or use your recorded UTC offset.");
  return fold==="later"?options[options.length-1]:options[0];
}
function dayStart(y,m,d,zone,offset){
  if(zone==="manual")return Date.UTC(y,m-1,d)-offset*60000;
  for(let minutes=0;minutes<1440;minutes++){
    const list=candidates(y,m,d,Math.floor(minutes/60),minutes%60,zone);
    if(list.length)return list[0];
  }
  throw new Error("The selected local date did not occur in this time zone.");
}
function getInterval(y,m,d,zone,offset){
  const tomorrow=new Date(Date.UTC(y,m-1,d+1));
  return {start:dayStart(y,m,d,zone,offset),end:dayStart(tomorrow.getUTCFullYear(),tomorrow.getUTCMonth()+1,tomorrow.getUTCDate(),zone,offset)};
}
function changeEvents(start,end,key){
  const changes=[],seen=[sky(start+1000)],interval=30*60000;
  let previous=seen[0],at=start+1000;
  while(at<end-1000){
    const nextAt=Math.min(end-1000,at+interval),next=sky(nextAt);
    if(next[key]!==previous[key]){
      let lo=at,hi=nextAt;
      for(let i=0;i<25&&hi-lo>30000;i++){
        const mid=(lo+hi)/2;
        if(sky(mid)[key]===previous[key])lo=mid;else hi=mid;
      }
      const entry=sky(hi);
      changes.push({ms:hi,before:previous[key],after:entry[key]});
    }
    at=nextAt;previous=next;seen.push(next);
  }
  const ids=[...new Set(seen.map(x=>x[key]))];
  return {ids,changes};
}
function calc(opts){
  const o={zone:"Asia/Kolkata",offset:330,known:true,h:12,min:0,fold:"",...opts};
  const {y,m,d,zone,offset,known,h,min,fold}=o;
  if(!validDate(y,m,d))throw new Error("Enter a valid birth date between 1900 and today.");
  
  if(zone==="manual"&&(!Number.isFinite(offset)||offset<-720||offset>840))throw new Error("Enter an offset from UTC−12:00 to UTC+14:00.");
  if(known&&(!Number.isInteger(h)||h<0||h>23||!Number.isInteger(min)||min<0||min>59))throw new Error("Enter a valid birth time.");
  const timeZone=zone==="manual"?zone:(()=>{
    try{new Intl.DateTimeFormat('en',{timeZone:zone});return zone;}
    catch(e){throw new Error("Choose a valid IANA time zone or manual UTC offset.");}
  })();
  if(known){
    const ms=moment(y,m,d,h,min,timeZone,offset,fold);
    if(ms>Date.now())throw new Error("Birth time cannot be in the future.");
    const moon=sky(ms);
    return {input:o,known:true,moon,moment:ms,caution:moon.boundaryDistance<0.18};
  }
  const {start,end}=getInterval(y,m,d,timeZone,offset);
  const signs=changeEvents(start,end,"sign");
  const naks=changeEvents(start,end,"nak");
  const padas=changeEvents(start,end,"nakPada");
  if(start>Date.now())throw new Error("Birth date cannot be in the future.");
  const first=sky(start+1000);
  // The local day is an interval, not a single birth moment.
  return {input:o,known:false,start,end,first,possibilities:{
    signs:signs.ids,naks:naks.ids,padas:padas.ids,signChanges:signs.changes,nakChanges:naks.changes,padaChanges:padas.changes
  }};
}
root.RasiCore={signs:SIGNS,nakshatras:NAKS,ayanamsa,sky,calc,validDate,candidates,moment,dayStart,changeEvents,normal};
if(typeof module!=="undefined"&&module.exports)module.exports=root.RasiCore;
})(typeof window!=="undefined"?window:globalThis);
