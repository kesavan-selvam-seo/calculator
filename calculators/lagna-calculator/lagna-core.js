/* CalcuPortal Lagna Calculator core.
   Astronomy Engine 2.1.19 apparent sidereal time, true ecliptic obliquity.
   Astronomical horizon/ecliptic intersection -> rising eastern tropical longitude.
   Approximate Lahiri sidereal correction from CalcuPortal RasiCore.
   Not a certified Swiss Ephemeris calculation; user must verify near boundaries.
   All calculations are local with no transmission of birth details.
*/
(function(root){
'use strict';
const R=root.RasiCore,A=root.Astronomy,RAD=Math.PI/180;
const wrap=deg=>(deg%360+360)%360;
const SIGN_WIDTH=30,NAK_WIDTH=360/27,PADA_WIDTH=360/108;
const PLACES=[
["Bengaluru, India",12.9716,77.5946,"Asia/Kolkata"],
["Chennai, India",13.0827,80.2707,"Asia/Kolkata"],
["New Delhi, India",28.6139,77.209,"Asia/Kolkata"],
["Mumbai, India",19.0760,72.8777,"Asia/Kolkata"],
["Hyderabad, India",17.3850,78.4867,"Asia/Kolkata"],
["Kolkata, India",22.5726,88.3639,"Asia/Kolkata"],
["Coimbatore, India",11.0168,76.9558,"Asia/Kolkata"],
["Madurai, India",9.9252,78.1198,"Asia/Kolkata"],
["Pune, India",18.5204,73.8567,"Asia/Kolkata"],
["Ahmedabad, India",23.0225,72.5714,"Asia/Kolkata"],
["Jaipur, India",26.9124,75.7873,"Asia/Kolkata"],
["Kochi, India",9.9312,76.2673,"Asia/Kolkata"],
["Thiruvananthapuram, India",8.5241,76.9366,"Asia/Kolkata"],
["Kathmandu, Nepal",27.7172,85.3240,"Asia/Kathmandu"],
["Colombo, Sri Lanka",6.9271,79.8612,"Asia/Colombo"],
["Dubai, UAE",25.2048,55.2708,"Asia/Dubai"],
["Singapore",1.3521,103.8198,"Asia/Singapore"],
["London, UK",51.5074,-0.1278,"Europe/London"],
["New York, USA",40.7128,-74.006,"America/New_York"],
["Los Angeles, USA",34.0522,-118.2437,"America/Los_Angeles"],
["Sydney, Australia",-33.8688,151.2093,"Australia/Sydney"],
["Toronto, Canada",43.6532,-79.3832,"America/Toronto"]
].map((a,i)=>({id:String(i),label:a[0],lat:a[1],lon:a[2],zone:a[3]}));
function calcAt(ms,lat,lon){
 if(!A||!R||typeof A.SiderealTime!=="function"||typeof A.e_tilt!=="function")
   throw new Error("Astronomy Engine could not load. Refresh the page and try again.");
 const theta=wrap(15*A.SiderealTime(new Date(ms))+lon);
 const tilt=A.e_tilt(A.MakeTime(new Date(ms)));
 const epsilon=tilt.tobl;
 const th=theta*RAD,ph=lat*RAD,ep=epsilon*RAD;
 // atan2(y,x) formulation selects the EASTERN intersection, not the descendant.
 const tropical=wrap(Math.atan2(Math.cos(th),-(Math.sin(th)*Math.cos(ep)+Math.tan(ph)*Math.sin(ep)))/RAD);
 const ayan=R.ayanamsa(ms),sidereal=wrap(tropical-ayan);
 const sign=Math.floor(sidereal/SIGN_WIDTH),nak=Math.floor(sidereal/NAK_WIDTH);
 const pada=Math.floor((sidereal%NAK_WIDTH)/PADA_WIDTH)+1;
 const inSign=sidereal%30,inNak=sidereal%NAK_WIDTH,dist=Math.min(inSign,30-inSign);
 return {ms,tropical,ayan,sidereal,sign,nak,pada,degree:inSign,degreeNak:inNak,
   boundaryDistance:dist,greenwichSidereal:15*A.SiderealTime(new Date(ms)),
   localSidereal:theta,obliquity:epsilon};
}
function calculate(o){
 const opt={fold:"",zone:"Asia/Kolkata",offset:330,...o};
 const {y,m,d,h,min,lat,lon,zone,offset,fold}=opt;
 if(!R||!R.validDate(y,m,d))throw new Error("Enter a valid birth date from 1900 through the present.");
 if(!Number.isInteger(h)||h<0||h>23||!Number.isInteger(min)||min<0||min>59)
   throw new Error("Enter a valid birth time in HH:MM (24-hour) format.");
 if(!Number.isFinite(lat)||lat<=-66||lat>=66)
   throw new Error("Enter a birth latitude strictly between −66° and +66°. Polar latitudes require a specialist ephemeris.");
 if(!Number.isFinite(lon)||lon< -180||lon>180)
   throw new Error("Enter a birthplace longitude between −180° and +180° (east positive).");
 if(zone==="manual"&&(!Number.isInteger(offset)||offset< -720||offset>840))
   throw new Error("Select a valid recorded UTC offset from −12:00 to +14:00.");
 if(zone!=="manual"){
   try{new Intl.DateTimeFormat("en",{timeZone:zone});}catch(_){throw new Error("Select a valid IANA time zone, or use a manual UTC offset.");}
 }
 const ms=R.moment(y,m,d,h,min,zone,offset,fold);
 if(ms>Date.now())throw new Error("Birth moment cannot be in the future.");
 const birth=calcAt(ms,lat,lon);
 const checks=[-30,-15,-5,5,15,30].map(delta=>({delta,view:calcAt(ms+delta*60000,lat,lon)}));
 const signChanges=checks.filter(x=>x.view.sign!==birth.sign).map(x=>x.delta);
 const near=signChanges.length>0||birth.boundaryDistance<1.0;
 // Determine approximate nearest sign change in a +/- 6h window.
 // 5-minute sampling finds boundaries at supported non-polar latitudes.
 const transitions=[];
 let previous=calcAt(ms-6*3600000,lat,lon);
 for(let t=ms-6*3600000+5*60000;t<=ms+6*3600000;t+=5*60000){
   const now=calcAt(t,lat,lon);
   if(now.sign!==previous.sign){
     let low=t-5*60000,high=t,old=previous.sign;
     for(let iteration=0;iteration<22&&high-low>1000;iteration++){
       const middle=(low+high)/2;
       if(calcAt(middle,lat,lon).sign===old)low=middle;else high=middle;
     }
     transitions.push({ms:high,before:old,after:calcAt(high,lat,lon).sign});
   }
   previous=now;
 }
 const earlier=transitions.filter(x=>x.ms<=ms).sort((a,b)=>b.ms-a.ms)[0]||null;
 const later=transitions.filter(x=>x.ms>ms).sort((a,b)=>a.ms-b.ms)[0]||null;
 return {input:opt,ms,birth,checks,near,signChanges,earlier,later};
}
root.LagnaCore={places:PLACES,signs:R?R.signs:[],nakshatras:R?R.nakshatras:[],calcAt,calculate,wrap};
if(typeof module!=="undefined"&&module.exports)module.exports=root.LagnaCore;
})(typeof window!=="undefined"?window:globalThis);
