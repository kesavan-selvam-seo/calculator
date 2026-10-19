/* CalcuPortal tropical Sun-sign calculation. No personal data is transmitted. */
(function(root){
'use strict';
const DAY=86400000;
const SIGN_DATA=[
 ['Aries','♈','Mar 21 – Apr 19','Fire','Cardinal','Mars','The Ram','Initiative, courage and directness','Taking a pause can balance the traditional Aries impulse to act quickly.'],
 ['Taurus','♉','Apr 20 – May 20','Earth','Fixed','Venus','The Bull','Patience, steadiness and appreciation','Flexibility can balance the traditional Taurus preference for familiarity.'],
 ['Gemini','♊','May 21 – Jun 20','Air','Mutable','Mercury','The Twins','Curiosity, conversation and adaptability','Following through can complement the traditional Gemini love of new ideas.'],
 ['Cancer','♋','Jun 21 – Jul 22','Water','Cardinal','Moon','The Crab','Care, sensitivity and belonging','Clear boundaries can complement the traditional Cancer focus on caring for others.'],
 ['Leo','♌','Jul 23 – Aug 22','Fire','Fixed','Sun','The Lion','Warmth, creativity and expression','Sharing the spotlight can balance the traditional Leo wish to be seen.'],
 ['Virgo','♍','Aug 23 – Sep 22','Earth','Mutable','Mercury','The Maiden','Observation, craft and practicality','Allowing imperfection can balance the traditional Virgo attention to detail.'],
 ['Libra','♎','Sep 23 – Oct 22','Air','Cardinal','Venus','The Scales','Fairness, partnership and harmony','Making a clear choice can complement the traditional Libra ability to see both sides.'],
 ['Scorpio','♏','Oct 23 – Nov 21','Water','Fixed','Mars (traditional); Pluto (modern)','The Scorpion','Depth, persistence and privacy','Openness can balance the traditional Scorpio preference for keeping things private.'],
 ['Sagittarius','♐','Nov 22 – Dec 21','Fire','Mutable','Jupiter','The Archer','Exploration, optimism and candour','Attention to detail can complement the traditional Sagittarius focus on the big picture.'],
 ['Capricorn','♑','Dec 22 – Jan 19','Earth','Cardinal','Saturn','The Sea-Goat','Structure, responsibility and patience','Rest can balance the traditional Capricorn focus on long-term goals.'],
 ['Aquarius','♒','Jan 20 – Feb 18','Air','Fixed','Saturn (traditional); Uranus (modern)','The Water-Bearer','Originality, independence and community','Personal connection can complement the traditional Aquarius focus on wider ideas.'],
 ['Pisces','♓','Feb 19 – Mar 20','Water','Mutable','Jupiter (traditional); Neptune (modern)','The Fish','Imagination, empathy and receptivity','Practical boundaries can complement the traditional Pisces sensitivity to others.']
].map((s,i)=>({index:i,name:s[0],glyph:s[1],dates:s[2],element:s[3],modality:s[4],ruler:s[5],symbol:s[6],themes:s[7],reflection:s[8]}));
const formatters=new Map();
function formatter(zone){if(!formatters.has(zone))formatters.set(zone,new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}));return formatters.get(zone);}
function parts(ms,zone){const o={};formatter(zone).formatToParts(new Date(ms)).forEach(p=>{if(p.type!=='literal')o[p.type]=Number(p.value);});return o;}
function candidates(y,m,d,h,min,zone){
 const local=Date.UTC(y,m-1,d,h,min),offsets=new Set();
 for(let delta=-36;delta<=36;delta+=6){const stamp=local+delta*3600000,p=parts(stamp,zone);offsets.add(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-stamp);}
 return [...offsets].map(offset=>local-offset).filter(ms=>{const p=parts(ms,zone);return p.year===y&&p.month===m&&p.day===d&&p.hour===h&&p.minute===min;}).sort((a,b)=>a-b);
}
function validDate(y,m,d){const x=new Date(Date.UTC(y,m-1,d));return Number.isInteger(y)&&y>=1900&&y<=new Date().getUTCFullYear()&&x.getUTCFullYear()===y&&x.getUTCMonth()===m-1&&x.getUTCDate()===d;}
function utcAt(y,m,d,h,min,zone,offset,fold){
 if(zone==='manual')return Date.UTC(y,m-1,d,h,min)-offset*60000;
 const c=candidates(y,m,d,h,min,zone);
 if(!c.length)throw new Error('This local time did not occur in the selected time zone, usually because the clocks moved forward. Check your birth record or choose a manual UTC offset.');
 if(c.length>1&&!fold)throw new Error('This local time happened twice when clocks moved back. Choose the first or second occurrence below, or enter the recorded UTC offset.');
 return c[fold==='later'?c.length-1:0];
}
function dayStart(y,m,d,zone,offset){
 if(zone==='manual')return Date.UTC(y,m-1,d)-offset*60000;
 // A few zones historically advanced clocks at midnight: find the day's first real minute.
 for(let minute=0;minute<1440;minute++){const c=candidates(y,m,d,Math.floor(minute/60),minute%60,zone);if(c.length)return c[0];}
 throw new Error('This calendar date did not occur in the selected time zone. Check the date or use a recorded UTC offset.');
}
function longitude(ms){return root.Astronomy.SunPosition(new Date(ms)).elon;}
function indexAt(ms){return Math.floor(longitude(ms)/30)%12;}
function transition(start,end){const first=indexAt(start);let lo=start,hi=end;for(let i=0;i<40&&hi-lo>500;i++){const mid=(lo+hi)/2;if(indexAt(mid)===first)lo=mid;else hi=mid;}return (lo+hi)/2;}
function calculate(o){
 if(!root.Astronomy)throw new Error('The calculation library could not load. Please refresh the page and try again.');
 const {y,m,d,zone='Asia/Kolkata',offset=330,known=false,h=0,min=0,fold=''}=o;
 if(!validDate(y,m,d))throw new Error('Enter a valid birth date from 1900 to the current year.');
 if(zone==='manual'&&(!Number.isFinite(offset)||offset<-720||offset>840))throw new Error('Choose a UTC offset from −12:00 to +14:00.');
 if(known&&(!Number.isInteger(h)||h<0||h>23||!Number.isInteger(min)||min<0||min>59))throw new Error('Enter a valid birth time.');
 const next=new Date(Date.UTC(y,m-1,d+1)),start=dayStart(y,m,d,zone,offset),end=dayStart(next.getUTCFullYear(),next.getUTCMonth()+1,next.getUTCDate(),zone,offset);
 if(start>Date.now())throw new Error('Your birth date cannot be in the future.');
 const a=indexAt(start),b=indexAt(end-1),cross=a!==b?transition(start,end-1):null;
 const moment=known?utcAt(y,m,d,h,min,zone,offset,fold):start+(end-start)/2;
 if(known&&moment>Date.now())throw new Error('Your birth time cannot be in the future.');
 const lon=longitude(moment),index=Math.floor(lon/30)%12,uncertain=!known&&a!==b;
 return {input:o,start,end,moment,longitude:lon,index,first:a,last:b,cross,uncertain,degree:lon%30,nearBoundary:known&&Math.min(lon%30,30-lon%30)<0.02};
}
root.ZodiacCore={signs:SIGN_DATA,calculate,longitude,indexAt,candidates,utcAt,validDate};
if(typeof module!=='undefined'&&module.exports)module.exports=root.ZodiacCore;
})(typeof window!=='undefined'?window:globalThis);
