from pathlib import Path
from html import escape, unescape
import re
import json
ROOT=Path(__file__).resolve().parent; BASE='https://www.calcuportal.com'; CATEGORY=ROOT/'blog/travel/index.html'
D={
'ooty':('Ooty','Tamil Nadu','October to June',['Ooty Lake','Government Botanical Garden','Doddabetta Peak','Ooty Rose Garden','Nilgiri Mountain Railway','tea estates']),
'kodaikanal':('Kodaikanal','Tamil Nadu','April to June and September to October',['Kodaikanal Lake',"Coaker's Walk",'Bryant Park','Pillar Rocks','Moir Point','Pine Forest']),
'goa':('Goa','Goa','November to February',['Baga Beach','Calangute Beach','Fort Aguada','Basilica of Bom Jesus','Anjuna','Palolem']),
'munnar':('Munnar','Kerala','September to May',['Mattupetty Dam','Echo Point','Tea Museum','Top Station','Kundala Lake','tea plantations']),
'kerala':('Kerala','Kerala','October to March',['Munnar','Alappuzha','Kumarakom','Fort Kochi','Varkala','Thekkady'])}
BLOGS=[
('best-places-to-visit-in-ooty','Best Places to Visit in Ooty','places to visit in Ooty','ooty','Explore the best places to visit in Ooty, including lakes, gardens, viewpoints, tea estates and family-friendly attractions.','places'),
('best-time-to-visit-ooty','Best Time to Visit Ooty','best time to visit Ooty','ooty','Find the best time to visit Ooty by season, with practical tips for weather, sightseeing and trip planning.','season'),
('ooty-trip-cost','Ooty Trip Cost: Complete Budget Guide','Ooty trip cost','ooty','Estimate an Ooty trip budget for transport, hotels, food, sightseeing and local travel for different travel styles.','cost'),
('ooty-2-day-itinerary','Ooty 2-Day Itinerary: Places, Timings & Travel Tips','Ooty 2 day itinerary','ooty','Plan a practical 2-day Ooty itinerary covering major attractions without rushing between distant places.','itinerary'),
('places-to-visit-in-kodaikanal','Best Places to Visit in Kodaikanal','places to visit in Kodaikanal','kodaikanal','Explore the best places to visit in Kodaikanal, from the lake and viewpoints to parks, forests and family attractions.','places'),
('best-time-to-visit-kodaikanal','Best Time to Visit Kodaikanal','best time to visit Kodaikanal','kodaikanal','Compare Kodaikanal seasons and choose a suitable time for sightseeing, weather and outdoor activities.','season'),
('kodaikanal-trip-cost','Kodaikanal Trip Cost: Complete Budget Guide','Kodaikanal trip cost','kodaikanal','Plan a Kodaikanal travel budget with practical estimates for transport, accommodation, food and sightseeing.','cost'),
('kodaikanal-2-day-itinerary','Kodaikanal 2-Day Itinerary: A Practical Travel Plan','Kodaikanal 2 day itinerary','kodaikanal','Use this practical 2-day Kodaikanal itinerary to organise sightseeing, travel time, food breaks and viewpoints.','itinerary'),
('best-places-to-visit-in-goa','Best Places to Visit in Goa','places to visit in Goa','goa','Discover popular places to visit in Goa, including beaches, forts, heritage sites and areas for a relaxed holiday.','places'),
('best-time-to-visit-goa','Best Time to Visit Goa','best time to visit Goa','goa','Learn when to visit Goa for beaches, sightseeing, weather and different travel preferences.','season'),
('goa-trip-cost','Goa Trip Cost: Budget for 3, 5 & 7 Days','Goa trip cost','goa','Estimate Goa trip costs for 3, 5 and 7 days, including stays, food, transport and sightseeing.','cost'),
('goa-3-day-itinerary','Goa 3-Day Itinerary: Beaches, Forts & Local Travel','Goa 3 day itinerary','goa','Plan a balanced 3-day Goa itinerary with beaches, heritage attractions, food breaks and practical travel tips.','itinerary'),
('places-to-visit-in-munnar','Best Places to Visit in Munnar','places to visit in Munnar','munnar','Explore the best places to visit in Munnar, including tea plantations, lakes, dams, viewpoints and nature spots.','places'),
('best-time-to-visit-munnar','Best Time to Visit Munnar','best time to visit Munnar','munnar','Choose the best time to visit Munnar based on weather, sightseeing, greenery and road conditions.','season'),
('munnar-trip-cost','Munnar Trip Cost: Complete Budget Guide','Munnar trip cost','munnar','Estimate a Munnar trip budget for accommodation, transport, food, sightseeing and local travel.','cost'),
('kerala-trip-cost','Kerala Trip Cost: Complete Budget Guide','Kerala trip cost','kerala','Plan a Kerala trip budget with practical guidance on transport, stays, food, sightseeing and trip duration.','kerala-cost'),
('best-places-to-visit-in-kerala','Best Places to Visit in Kerala','places to visit in Kerala','kerala','Explore popular Kerala destinations and learn how to combine hill stations, beaches, backwaters and heritage stops.','kerala-places'),
('chennai-to-pondicherry-distance','Chennai to Pondicherry Distance, Route & Travel Time','Chennai to Pondicherry distance','ooty','Check the practical Chennai to Pondicherry travel distance, route options, approximate journey time and planning tips.','chennai-pondicherry'),
('bangalore-to-ooty-distance','Bangalore to Ooty Distance, Route & Travel Time','Bangalore to Ooty distance','ooty','Plan a Bangalore to Ooty road trip with route guidance, approximate travel time, stops and fuel-budget considerations.','bangalore-ooty'),
('bangalore-to-goa-distance','Bangalore to Goa Distance, Route & Travel Time','Bangalore to Goa distance','goa','Plan a Bangalore to Goa journey with route options, approximate travel time, breaks and travel-budget considerations.','bangalore-goa')]


def body(kind,d):
    n,state,best,places=d
    destination_notes={
        "ooty":"Ooty is a Nilgiri hill destination known for its lake, gardens, tea landscapes and the Nilgiri Mountain Railway. Because attractions are spread around the hills, grouping nearby stops makes a short trip easier to manage.",
        "kodaikanal":"Kodaikanal is a hill station in Tamil Nadu centred around its lake, wooded slopes, viewpoints and walking areas. A good plan balances the town attractions with scenic stops rather than trying to cover every viewpoint in one day.",
        "goa":"Goa combines beaches, heritage, forts, churches, food and neighbourhoods with very different travel experiences. North Goa and South Goa should be treated as separate sightseeing zones when planning a short stay.",
        "munnar":"Munnar is a highland destination in Kerala known for tea plantations, misty hills, viewpoints, waterfalls and protected natural areas. Travel between attractions can take longer than the map distance suggests because of winding hill roads."
    }
    common_tip=f"""<div class="callout"><strong>Planning note:</strong> Travel conditions, attraction timings, entry rules and prices can change. Verify current details with the relevant official tourism or attraction website before departure.</div>"""
    if kind=='places':
        intro=destination_notes.get(n.lower(),"")
        if n=="Kerala":
            return f"""<h2>Best Places to Visit in Kerala</h2><p>Kerala is a diverse travel destination rather than a single sightseeing circuit. The state combines hill stations, backwaters, beaches, wildlife, heritage areas and food experiences. Kerala Tourism lists destinations across these different landscapes, so the best itinerary depends on how many days you have and how much time you want to spend travelling between regions.</p>{common_tip}<h2>Top Places to Include in a Kerala Trip</h2>
<h3>Munnar</h3><p>Munnar is a strong choice for tea plantations, mountain scenery, viewpoints and cooler hill-country weather. Kerala Tourism identifies attractions such as Eravikulam National Park, Mattupetty, Top Station and Anamudi around the Munnar region.</p>
<h3>Alappuzha</h3><p>Alappuzha is associated with Kerala's backwaters and houseboat experiences. It works particularly well when you want a slower day built around waterways, village scenery and local food.</p>
<h3>Kumarakom</h3><p>Kumarakom sits around the Vembanad Lake backwater landscape and can suit travellers looking for a quieter lakeside stay, birdlife and boat experiences.</p>
<h3>Fort Kochi</h3><p>Fort Kochi adds a heritage and urban dimension to a Kerala itinerary, with historic streets, architecture, cultural attractions, cafés and access to nearby Kochi experiences.</p>
<h3>Varkala</h3><p>Varkala combines a beach with the distinctive cliff landscape, making it useful for travellers who want coastal sightseeing without limiting the trip to a resort stay.</p>
<h3>Thekkady</h3><p>Thekkady and the Periyar region suit travellers interested in forests, wildlife-oriented experiences and outdoor activities.</p>
<h2>How to Choose Kerala Destinations</h2><div class="table-wrap"><table><thead><tr><th>Travel interest</th><th>Destinations to consider</th><th>Typical focus</th></tr></thead><tbody><tr><td>Hill scenery</td><td>Munnar, Wayanad, Vagamon</td><td>Tea landscapes, viewpoints and nature</td></tr><tr><td>Backwaters</td><td>Alappuzha, Kumarakom, Kollam</td><td>Boat trips, lakes and village scenery</td></tr><tr><td>Beach holiday</td><td>Varkala, Kovalam, Marari</td><td>Coastal relaxation and sunsets</td></tr><tr><td>Wildlife</td><td>Thekkady, Wayanad</td><td>Forests, wildlife and outdoor activities</td></tr><tr><td>Heritage</td><td>Fort Kochi, Bekal</td><td>Historic buildings, forts and culture</td></tr></tbody></table></div>
<h2>How Many Days Do You Need?</h2><p>For a short Kerala holiday, choose one or two regions rather than attempting the entire state. Five to seven days gives more flexibility for combining a hill destination with backwaters or the coast. Longer trips can add wildlife or heritage stops without making every day a transfer day.</p>
<h2>Kerala Travel Planning Tips</h2><ul><li>Choose destinations by region to reduce road-transfer time.</li><li>Leave buffer time for hill roads and weather.</li><li>Book popular stays and experiences ahead during busy periods.</li><li>Check current attraction, boating and park rules before travelling.</li><li>Keep one flexible day when your itinerary includes outdoor activities.</li></ul>"""
        return f"""<h2>Best Places to Visit in {n}</h2><p>{intro}</p>{common_tip}<h2>Top {n} Attractions</h2>""" + "".join(f"""<h3>{i}. {p}</h3><p><strong>{p}</strong> can fit naturally into a {n} sightseeing plan. The best way to visit is to consider its location, the time you want to spend there and the other attractions on the same route. Check current opening information and local conditions before you travel.</p>""" for i,p in enumerate(places,1)) + f"""<h2>How to Group Places for a Short Trip</h2><p>Instead of choosing attractions only by popularity, group them geographically. This reduces repeated travel on hill roads and leaves more time for the destination itself. For a two-day trip, select a few major attractions and keep the remaining time flexible.</p><div class="table-wrap"><table><thead><tr><th>Trip style</th><th>Planning approach</th><th>Useful for</th></tr></thead><tbody><tr><td>First visit</td><td>Major landmark + nature spot + local experience</td><td>Travellers wanting a broad introduction</td></tr><tr><td>Family trip</td><td>Short transfers and comfortable sightseeing</td><td>Families and mixed-age groups</td></tr><tr><td>Photography trip</td><td>Viewpoints, gardens, lakes and early starts</td><td>Scenic and landscape-focused travel</td></tr><tr><td>Slow holiday</td><td>Fewer attractions with longer stays</td><td>Travellers prioritising relaxation</td></tr></tbody></table></div><h2>Practical Tips</h2><ul><li>Check the route before leaving your hotel.</li><li>Start outdoor sightseeing early where practical.</li><li>Carry comfortable footwear and a light layer.</li><li>Keep rain protection available in hill destinations.</li><li>Do not add distant attractions simply to increase the number of places visited.</li></ul>"""
    if kind=='season':
        if n=="Goa":
            seasonal=[("November to February","Generally popular for beach holidays, sightseeing and outdoor plans. Demand can be higher during holidays, so accommodation and transport should be planned early."),("March to May","Hotter conditions can make midday sightseeing less comfortable. Early-morning and evening plans may be easier for travellers who do not mind warmer weather."),("June to September","The monsoon changes the character of Goa, with greener landscapes and rain-dependent travel conditions. Beach and water-activity plans can be affected by weather and sea conditions."),("October","A transition period can work for travellers who want a quieter atmosphere, but conditions can vary as the monsoon season changes.")]
        elif n=="Ooty":
            seasonal=[("October to February","Cooler weather can suit travellers who enjoy chilly mornings and evenings. Pack layers and check visibility before planning viewpoints."),("March to May","A popular period for hill-station travel, with comfortable daytime sightseeing compared with many warmer plains destinations."),("June to September","Rain can make the hills lush but may affect visibility and road travel. Keep outdoor plans flexible.")]
        elif n=="Kodaikanal":
            seasonal=[("April to June","A commonly preferred period for a cooler hill-station break, with good scope for lake, viewpoint and town sightseeing."),("July to September","Rain can create greener landscapes but may affect outdoor plans and road conditions. Build weather buffers into the itinerary."),("October to March","Cooler conditions can suit travellers who prefer a quieter hill-station experience. Evenings can feel noticeably colder.")]
        else:
            seasonal=[("September to May","A commonly chosen window for Munnar sightseeing, with opportunities for tea landscapes, viewpoints and outdoor activities."),("June to August","The monsoon can make the landscape especially green, but heavy rain may affect road conditions and outdoor activities."),("December to February","Cooler conditions can be pleasant for sightseeing. Carry layers for early mornings and evenings.")]
        rows="".join(f"<tr><td>{m}</td><td>{x}</td></tr>" for m,x in seasonal)
        return f"""<h2>Best Time to Visit {n}</h2><p>The best time depends on what you want from the trip: comfortable sightseeing, greenery, fewer crowds, beach time or outdoor activities. There is no single month that is ideal for every traveller.</p>{common_tip}<h2>{n} Weather and Seasons</h2><div class="table-wrap"><table><thead><tr><th>Period</th><th>What to expect</th></tr></thead><tbody>{rows}</tbody></table></div><h2>Best Time for Different Travel Plans</h2><h3>For Sightseeing</h3><p>Choose a period when daytime conditions are comfortable for spending several hours outdoors. Start early for popular viewpoints and keep a flexible afternoon plan.</p><h3>For Nature and Greenery</h3><p>Rain-influenced periods can transform hill and forest landscapes, but outdoor activities become more dependent on local weather and road conditions.</p><h3>For Families</h3><p>Families may prefer predictable weather and shorter transfers. Check school-holiday demand before booking accommodation.</p><h3>For Budget Travel</h3><p>Compare weekday and off-peak dates rather than assuming every month has the same price. Accommodation rates can change with holidays, weekends and local events.</p><h2>What to Pack</h2><ul><li>Comfortable walking shoes</li><li>Light layers or a jacket for hill destinations</li><li>Rain protection when travelling during wetter months</li><li>Sun protection for coastal destinations</li><li>Power bank and essential medicines</li></ul>"""
    if kind=='cost':
        if n=="Goa":
            duration_rows=[("3 days","Transport + accommodation + food + local travel + sightseeing","Short beach and heritage break"),("5 days","Same categories with more local travel and activities","Balanced holiday"),("7 days","More accommodation and local transport","Slower multi-area trip")]
        elif n=="Ooty":
            duration_rows=[("2 days","Transport + stay + food + local sightseeing","Short hill-station break"),("3 days","Adds more attractions and relaxed travel","First-time visit"),("4+ days","Allows slower sightseeing and nearby excursions","Leisure-focused trip")]
        elif n=="Kodaikanal":
            duration_rows=[("2 days","Transport + stay + food + local travel","Compact sightseeing"),("3 days","Adds viewpoints and slower exploration","Balanced trip"),("4+ days","More flexibility for nature and nearby areas","Slow travel")]
        else:
            duration_rows=[("2–3 days","Transport + stay + food + local travel","Short Munnar break"),("4–5 days","More sightseeing and flexible weather buffers","Comfortable hill trip"),("6+ days","Adds nearby destinations or slower exploration","Extended Kerala holiday")]
        rows="".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>" for a,b,c in duration_rows)
        return f"""<h2>{n} Trip Cost: What Should You Budget?</h2><p>There is no single fixed {n} trip cost because the final amount changes with your starting city, number of travellers, travel dates, accommodation level, transport choice and sightseeing plan. A useful budget separates essential costs from optional spending.</p>{common_tip}<h2>Main {n} Trip Expenses</h2><h3>1. Travel to the Destination</h3><p>Compare bus, train, flight and private-car options using total journey cost and time. For a road trip, include fuel, tolls and parking rather than calculating fuel alone.</p><h3>2. Accommodation</h3><p>Hotel prices can vary by location, weekday, season and room type. A property closer to your main sightseeing area may reduce local transport costs even when its nightly rate is higher.</p><h3>3. Food</h3><p>Set a daily food allowance that includes breakfast, meals, snacks and drinks. Local restaurants and cafés can give you more flexibility than planning every meal around tourist areas.</p><h3>4. Local Transport</h3><p>Include taxis, buses, rental vehicles, fuel, parking or local transfers. Hill destinations can involve longer point-to-point travel than expected.</p><h3>5. Sightseeing and Activities</h3><p>Keep a separate allowance for entry tickets, boating, guided activities and other experiences. Verify current fees before finalising your budget.</p><h2>Budget by Trip Duration</h2><div class="table-wrap"><table><thead><tr><th>Duration</th><th>Main cost groups</th><th>Best suited for</th></tr></thead><tbody>{rows}</tbody></table></div><h2>How to Reduce the Total Cost</h2><ul><li>Compare the total transport cost, not only the ticket price.</li><li>Choose accommodation close to the attractions you plan to visit.</li><li>Travel on weekdays when your schedule allows.</li><li>Group nearby attractions to reduce local transport.</li><li>Keep an emergency buffer separate from the planned budget.</li></ul><h2>Simple Trip Budget Formula</h2><div class="callout"><strong>Total trip budget = intercity transport + accommodation + food + local transport + sightseeing + emergency buffer</strong></div>"""
    if kind=='itinerary':
        if n=="Goa":
            day1="North Goa beaches and nearby coastal attractions"; day2="Panaji and Old Goa heritage"; day3="South Goa or a slower beach-and-food day"
        elif n=="Ooty":
            day1="Ooty town, lake and gardens"; day2="Doddabetta, tea landscapes and the Nilgiri side of the destination"
        else:
            day1="Kodaikanal Lake, Coaker's Walk and nearby town attractions"; day2="Pillar Rocks, viewpoints, forest areas and a relaxed evening"
        if n=="Goa":
            plans=[("Day 1",day1,"Start with beaches in one zone and avoid crossing the entire state repeatedly. Keep the evening flexible for food and local exploration."),("Day 2",day2,"Use the second day for heritage and city sightseeing. Group Panaji and Old Goa attractions to reduce unnecessary transfers."),("Day 3",day3,"Keep the final day less packed. Choose a South Goa circuit or a relaxed beach-and-food plan based on where you are staying.")]
        else:
            plans=[("Day 1",day1,"Keep the first day close to your accommodation and allow time for check-in, meals and local traffic."),("Day 2",day2,"Start early for viewpoints and outdoor attractions, then return to town before the evening if road conditions make late travel inconvenient.")]
        rows="".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a,b,_ in plans)
        detail="".join(f"<h3>{a}: {b}</h3><p>{c}</p>" for a,b,c in plans)
        return f"""<h2>{n} Itinerary: A Practical Plan</h2><p>A good short-trip itinerary balances must-see attractions with realistic travel time. The aim is not to visit the maximum number of places, but to create a route that leaves time for meals, traffic, weather and unplanned stops.</p>{common_tip}<h2>At-a-Glance Plan</h2><div class="table-wrap"><table><thead><tr><th>Day</th><th>Focus</th></tr></thead><tbody>{rows}</tbody></table></div>{detail}<h2>How to Make the Itinerary Work</h2><ul><li>Stay close to the first day's sightseeing zone.</li><li>Group attractions by location rather than popularity alone.</li><li>Start early for viewpoints and popular attractions.</li><li>Keep at least one flexible block each day.</li><li>Do not depend on the fastest possible travel time.</li></ul><h2>What to Carry</h2><p>Carry comfortable footwear, water, a light layer, rain protection when required and a charged phone or power bank. For hill destinations, keep extra time for winding roads and changing weather.</p>"""
    routes={
      'chennai-pondicherry':('Chennai to Pondicherry','about 150 km','about 3–4 hours',['East Coast Road (ECR)','GST Road and connecting routes']),
      'bangalore-ooty':('Bangalore to Ooty','about 270 km','about 6–8 hours',['Bengaluru → Mysuru → Gundlupet → Bandipur → Gudalur → Ooty','Bengaluru → Mysuru → Masinagudi → Ooty']),
    }
    if kind in routes:
        name,dist,time,route_list=routes[kind]
        route_html="".join(f"<li>{r}</li>" for r in route_list)
        return f"""<h2>{name} Distance at a Glance</h2><p>The practical road distance depends on the exact starting point, final destination and route. For planning, use the approximate distance below and confirm the live route immediately before departure.</p><div class="table-wrap"><table><thead><tr><th>Planning factor</th><th>Approximate guidance</th></tr></thead><tbody><tr><td>Road distance</td><td>{dist}</td></tr><tr><td>Road travel time</td><td>{time}</td></tr><tr><td>Main variables</td><td>Traffic, stops, weather, road conditions and final destination</td></tr></tbody></table></div>{common_tip}<h2>Popular Routes</h2><ul>{route_html}</ul><h2>What Changes the Journey Time?</h2><p>City traffic at departure, meal and fuel breaks, road works, weather and sightseeing stops can all change the actual arrival time. Hill routes also require more caution and should not be planned around an aggressive driving schedule.</p><h2>Fuel Cost Calculation</h2><div class="callout"><strong>Fuel cost = distance ÷ vehicle mileage × current fuel price per litre</strong></div><p>For a complete road-trip budget, add tolls, parking, food and local travel after arrival. Use your vehicle's real-world mileage rather than the manufacturer's ideal figure when possible.</p><h2>One-Day or Two-Day Drive?</h2><p>A one-day drive may work for travellers who are comfortable with a long journey and have more than one driver. Families, single drivers and travellers who want sightseeing stops may prefer a slower plan with an overnight break.</p><h2>Road Trip Checklist</h2><ul><li>Check the live route and weather before departure.</li><li>Fuel up before long stretches with fewer services.</li><li>Plan regular rest and meal breaks.</li><li>Keep documents, charging cables and emergency contacts accessible.</li><li>Allow extra time rather than relying on the shortest navigation estimate.</li></ul>"""
    if kind=='bangalore-goa':
        return ''  # preserve the manually expanded version
    return "<h2>Plan Your Trip</h2><p>Build your itinerary around your travel dates, budget, route and preferred experiences. Check current official information before departure.</p>"

CARD_IMAGES={
    'bangalore-to-goa-distance':'/blog/images/bangalore-to-goa-distance-route-and-travel-time.jpeg',
    'bangalore-to-ooty-distance':'/blog/images/bangalore-to-ooty-distance-route-and-travel-time.jpeg',
    'best-places-to-visit-in-goa':'/blog/images/best-places-to-visit-in-goa.jpeg',
    'best-places-to-visit-in-kerala':'/blog/images/best-places-to-visit-in-kerala.jpeg',
    'best-places-to-visit-in-ooty':'/blog/images/best-places-to-visit-in-ooty.jpeg',
    'best-time-to-visit-goa':'/blog/images/best-time-to-visit-goa.jpeg',
    'best-time-to-visit-kodaikanal':'/blog/images/best-time-to-visit-kodaikanal.jpeg',
}

def display_text(value):
    return escape(unescape(value))

def page(slug,title,kw,d,desc,kind):
    url=f'{BASE}/blog/travel/{slug}/'
    if kind=='bangalore-goa':
        return None
    n=d[0]
    if kind=='season':
        qs=[(f'What is the best time to visit {n}?',f'The best time depends on weather, crowds and the activities you want to do. Compare seasons before booking.'),(f'Is {n} suitable for a short trip?','Yes. A short trip works best when attractions are grouped by location and the itinerary is not overloaded.'),(f'What should I check before travelling?','Check current weather, attraction timings, transport schedules, accommodation policies and local travel conditions.')]
    elif kind=='places' or kind=='kerala-places':
        qs=[(f'How many days are enough to visit {n}?','Two to three days can cover a focused short itinerary, while longer stays allow slower sightseeing and nearby destinations.'),(f'What should I consider when choosing places in {n}?','Choose attractions by location, travel time, opening information and your interests rather than trying to cover every popular place.'),(f'Can the itinerary change with weather?','Yes. Keep outdoor attractions flexible and maintain an indoor or nearby alternative when weather may affect travel.')]
    elif kind=='cost' or kind=='kerala-cost':
        qs=[(f'How much does a {n} trip cost?','There is no single fixed cost. Transport, accommodation, food, local travel, sightseeing and trip duration determine the final budget.'),(f'How can I reduce the trip cost?','Compare total transport costs, choose accommodation strategically, travel on suitable weekdays and group nearby attractions.'),(f'Should I keep an emergency buffer?','Yes. A separate buffer helps cover unexpected transport, weather-related changes or other travel expenses.')]
    elif kind=='itinerary':
        qs=[(f'Is {n} itinerary enough for a short trip?','It is designed as a practical short-trip framework. Adjust the number of stops according to your arrival time, hotel location and travel pace.'),(f'How can I avoid rushing?','Group nearby attractions, start early and leave a flexible block instead of filling every hour.'),(f'Can I change the itinerary?','Yes. The plan is a framework; change the order according to weather, opening information and your accommodation location.')]
    else:
        qs=[('How accurate is the travel distance?','Distance varies by your exact starting point, route and destination address.'),('Can travel time change?','Yes. Traffic, stops, road conditions and weather can change actual journey time.'),('How should I estimate fuel cost?','Use distance divided by vehicle mileage and multiply by the current fuel price, then add tolls and parking.')]
    faq={'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in qs]}
    breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':BASE+'/'},{'@type':'ListItem','position':2,'name':'Blog','item':BASE+'/blog/'},{'@type':'ListItem','position':3,'name':'Tours & Travel','item':BASE+'/blog/travel/'},{'@type':'ListItem','position':4,'name':title,'item':url}]}
    article={'@context':'https://schema.org','@type':'Article','headline':title,'description':desc,'mainEntityOfPage':{'@type':'WebPage','@id':url},'author':{'@type':'Organization','name':'CalcuPortal'},'publisher':{'@type':'Organization','name':'CalcuPortal'}}
    faqhtml='<h2>Frequently Asked Questions</h2>'+''.join(f'<details><summary>{escape(q)}</summary><p>{escape(a)}</p></details>' for q,a in qs)
    intro=f'<p class="lead">{escape(desc)} This guide focuses on practical planning information so you can build a realistic trip around your dates, budget and travel style.</p>'
    toc_titles=re.findall(r'<h2[^>]*>(.*?)</h2>',body(kind,d))
    toc='<div class="toc"><strong>On this page:</strong><ul>'+''.join(f'<li>{escape(re.sub("<[^>]+>","",x))}</li>' for x in toc_titles[:10])+'</ul></div>'
    return f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>{escape(title)} | CalcuPortal</title><meta name="description" content="{escape(desc)}"><link rel="canonical" href="{url}"><meta property="og:type" content="article"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{url}"><meta property="og:site_name" content="CalcuPortal"><link rel="icon" href="/favicon.png" type="image/png"><link rel="stylesheet" href="/styles.css"><script src="/script.js"></script><script type="application/ld+json">{json.dumps(article,separators=(",",":"))}</script><script type="application/ld+json">{json.dumps(breadcrumb,separators=(",",":"))}</script><script type="application/ld+json">{json.dumps(faq,separators=(",",":"))}</script></head><body><header><div class="nav-container"><a href="/" class="logo"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a><button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button><nav class="nav-links" id="nav-links"><a href="/" class="nav-link">Home</a><a href="/about/" class="nav-link">About</a><a href="/contact/" class="nav-link">Contact</a><a href="/blog/" class="nav-link active">Blog</a><button class="theme-btn" title="Toggle Theme"><span class="theme-btn-icon"></span></button></nav></div></header><main><div class="detail-container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › <a href="/blog/travel/">Tours &amp; Travel</a> › <span>{escape(title)}</span></nav><header class="detail-header"><h1>{escape(title)}</h1><p>{escape(desc)}</p></header><section class="article-section"><div class="article-content" style="text-align: justify;">{intro}{toc}{body(kind,d)}<h2>Related CalcuPortal Resources</h2><p>Explore our <a href="/blog/travel/">Tours &amp; Travel guides</a> for more destination and route planning ideas. Use the <a href="/calculators/fuel-cost-calculator/">fuel cost calculator</a> when you are estimating a road-trip budget.</p>{faqhtml}</div></section></div></main><footer><div class="copyright-bar">© <span id="year">2026</span> CalcuPortal. All rights reserved.</div></footer><script>document.getElementById('year').innerText=new Date().getFullYear();</script></body></html>'''


for slug,title,kw,key,desc,kind in BLOGS:
 if kind=='bangalore-goa':
  continue
 if slug=='best-time-to-visit-kodaikanal':
  continue  # preserve the manually curated, image-led seasonal guide
 out=ROOT/'blog/travel'/slug/'index.html'; out.parent.mkdir(parents=True,exist_ok=True)
 generated=page(slug,title,kw,D[key],desc,kind)
 if generated:
  out.write_text(generated,encoding='utf-8')
if CATEGORY.exists():
 text=CATEGORY.read_text(encoding='utf-8'); cards=''.join(
  f'<a class="calc-card blog-card" href="/blog/travel/{s}/" aria-label="Read {display_text(t)}">'
  + (f'<img class="article-card-image" src="{CARD_IMAGES[s]}" alt="{display_text(t)}" width="1200" height="675" loading="lazy">' if s in CARD_IMAGES else '')
  + f'<div class="blog-card-body"><h3 class="blog-card-title">{display_text(t)}</h3><p class="blog-card-excerpt">{display_text(d)}</p><span class="blog-card-link">Read Guide →</span></div></a>'
  for s,t,k,key,d,kind in BLOGS
)
 start=text.find('<div class="article-list">'); end=text.find('</div>',start)+6
 if start>=0 and end>start:
  text=text[:start]+'<div class="article-list">'+cards+text[end:]
 CATEGORY.write_text(text,encoding='utf-8')
print(f'Generated {len(BLOGS)} travel articles.')
