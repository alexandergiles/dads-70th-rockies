// All trip data lives here. Edit this file and push to update the site.

const TRIP = {
  title: "Dad's 70th",
  subtitle: "Canadian Rockies",
  dates: "May 16–19, 2026",
  travelers: "Dad, Jeremy & Alex",
  oneLiner: "A long weekend of skiing, hot springs, and mountain miles for Dad's 70th.",
  quote: "Three airports. One mountain. One very important birthday.",

  glance: [
    { value: "4", label: "days" },
    { value: "3", label: "travelers" },
    { value: "1–2", label: "ski days" },
    { value: "70", label: "candles" },
  ],

  arcSummary: "Three flights land at YYC within 12 minutes Sat afternoon → rental SUV → Bella Crusta sandwiches → Bow River picnic → Banff hotel → birthday dinner. Sunday: ski Sunshine all day. Monday: pick your own adventure (ski closing day, hike, or hot springs), dinner in town, sleep in Banff. Tuesday: relaxed morning, optional hot springs, drive to YYC for afternoon flights home.",

  mapPoints: [
    { name: "YYC · Calgary airport", lat: 51.1139, lng: -114.0203, kind: "airport" },
    { name: "Canmore · sandwich + picnic", lat: 51.0884, lng: -115.3574, kind: "stop" },
    { name: "Banff · home base", lat: 51.1784, lng: -115.5708, kind: "base" },
    { name: "Sunshine Village · ski", lat: 51.0850, lng: -115.7700, kind: "ski" },
    { name: "Johnston Canyon", lat: 51.2458, lng: -115.8397, kind: "hike" },
    { name: "Tunnel Mountain", lat: 51.1857, lng: -115.5528, kind: "hike" },
    { name: "Upper Hot Springs", lat: 51.1500, lng: -115.5590, kind: "springs" },
  ],

  days: [
    {
      label: "Day 1 · Arrival",
      title: "Saturday, May 16",
      accent: "teal",
      emoji: "✈️",
      items: [
        { time: "~12:45 PM", text: "All three flights land at YYC within 12 minutes (Dad 12:54, Jeremy 12:43, Alex 12:43). Meet at baggage claim." },
        { time: "~2:00 PM", text: "SUV pickup. On the road to Canmore." },
        { time: "~3:00 PM", text: "🥪 Bella Crusta (Canmore). Call ahead: 403-707-6164. Focaccia sandwiches to-go." },
        { time: "~3:30 PM", text: "🌉 Picnic at Engine Bridge. Three Sisters views over the Bow River." },
        { time: "~4:30 PM", text: "📸 Quick stop at the Mt. Norquay lookout. Watch for bighorn sheep on the switchbacks." },
        { time: "~5:15 PM", text: "Hotel check-in, Banff." },
        { time: "Evening", text: "🎂 70th birthday dinner. The Bison (first pick) — Chuck's Steakhouse or 1888 Chop House at the Fairmont as backups." },
      ],
    },
    {
      label: "Day 2 · Ski Day",
      title: "Sunday, May 17",
      accent: "teal",
      emoji: "🎿",
      items: [
        { time: "All day", text: "Ski Sunshine Village — 3,358 acres across three mountains. Gondola base is ~20 min from Banff; free shuttle runs from town." },
        { time: "Afternoon", text: "Après at Banff Ave Brewing Co. or Rose & Crown." },
        { time: "Evening", text: "Dinner at Grizzly House (fondue), Saltlik, or Chuck's Steakhouse." },
      ],
    },
    {
      label: "Day 3 · Flex Day",
      title: "Monday, May 18",
      accent: "teal",
      emoji: "🗺️",
      items: [
        { time: "Morning + afternoon", text: "Pick one of the four options below (or combo them). Sunshine's closing day with the Slush Cup is the headline." },
        { time: "Evening", text: "Farewell dinner in Banff — Bear Street Tavern or Magpie & Stump." },
        { time: "Night", text: "Chill in Banff. No rush tomorrow — flights are all afternoon." },
      ],
    },
    {
      label: "Day 4 · Departure",
      title: "Tuesday, May 19",
      accent: "teal",
      emoji: "🛫",
      items: [
        { time: "Morning", text: "Coffee + breakfast in Banff. Final walk around town, no rush." },
        { time: "~10 AM", text: "Check out of the hotel." },
        { time: "Optional", text: "One more Upper Hot Springs soak or short hike before the drive." },
        { time: "~11 AM", text: "Drive to YYC (~1.5 hr)." },
        { time: "Afternoon", text: "Return the rental and fly home. Dad 12:34 PM → BUF. Jeremy & Alex 1:45 PM." },
      ],
    },
  ],

  mondayOptions: [
    {
      title: "Ski Sunshine — closing day",
      emoji: "🎿",
      tag: "Full day · $170 · your level",
      body: "Sunshine's last day of the season. Spring corn snow, bluebird vibes, and the legendary Slush Cup pond-skim at ~1 PM where skiers cross a freezing pond in costume. The most 'Banff' way to close out the trip.",
      logistics: "20 min drive from Banff. Free shuttle. Off the mountain by 3:30 PM leaves plenty of time for dinner in town.",
    },
    {
      title: "Johnston Canyon → Ink Pots",
      emoji: "🥾",
      tag: "4–5 hours · free · moderate",
      body: "Iconic spring hike. Catwalks built into canyon walls past Lower & Upper Falls, then beyond into a quieter valley with the Ink Pots — turquoise spring-fed pools in an open meadow. 11 km round trip.",
      logistics: "30 min from Banff via Bow Valley Pkwy. Bring microspikes (icy), bear spray, layers. Parking + washrooms at trailhead.",
    },
    {
      title: "Tunnel Mountain summit",
      emoji: "⛰️",
      tag: "2 hours · free · easy–moderate",
      body: "Quick summit hike from town. 4.3 km RT, 300m gain, switchbacks. South-facing, usually thaws early. Big Bow Valley views from the top. Low commitment — leaves time for hot springs / brunch later.",
      logistics: "Trailhead in Banff townsite — no driving needed.",
    },
    {
      title: "Banff Upper Hot Springs",
      emoji: "♨️",
      tag: "1.5–2 hours · $12 · recovery",
      body: "40°C mineral pools with mountain views. Perfect après-ski / post-hike combo. Plan ~$12/pp plus small rental fees for towel + locker.",
      logistics: "5 min from Banff townsite. Pairs well with Tunnel Mountain in the morning.",
    },
  ],

  mondayCombos: [
    { name: "🏔️ Ski it out", body: "Ski Sunshine all day → farewell dinner in Banff. Most ski-focused. Best for the closing-day experience." },
    { name: "🌲 Big nature day", body: "Johnston Canyon hike (AM) → lunch in Banff → Upper Hot Springs (PM) → dinner in town. Best mix of hike + recovery." },
    { name: "🥾 Easy & relaxed", body: "Tunnel Mountain hike (AM) → coffee on Banff Ave → Upper Hot Springs → farewell dinner. Lowest effort, most flexible." },
  ],

  flights: [
    {
      who: "Dad",
      from: "RSW · Fort Myers",
      out: "Sat 6:45 AM → 12:54 PM (1 stop IAH)",
      back: "Tue 12:34 PM → 9:01 PM (1 stop ORD) → BUF",
      airline: "United / Air Canada",
      cost: "$724 USD",
      badge: "multi-city",
    },
    {
      who: "Jeremy",
      from: "LGA · New York",
      out: "Sat 7:25 AM → 12:43 PM (1 stop YYZ)",
      back: "Tue 1:45 PM → 10:36 PM",
      airline: "Air Canada / United",
      cost: "$528 USD",
    },
    {
      who: "Alex",
      from: "DCA · Washington",
      out: "Sat 6:59 AM → 12:43 PM (1 stop YYZ)",
      back: "Tue 1:45 PM → 10:28 PM",
      airline: "Air Canada / United",
      cost: "$505 USD",
    },
  ],

  flightCallouts: [
    { emoji: "🛬", text: "All three flights land at YYC within 12 minutes (12:43–12:54 PM). Easy to meet at baggage claim and pick up the rental together." },
    { emoji: "🛫", text: "Tuesday flights are all afternoon (Dad 12:34 PM → BUF · Jeremy & Alex 1:45 PM). No pre-dawn drive — sleep in Banff Mon night, relaxed morning, leave for YYC ~11 AM." },
  ],

  lodging: {
    budget: [
      { name: "Banff Boundary Lodge", stars: 2.5, rate: 120, vibe: "Cozy, no-frills", note: "Great value, close to town. Adventure-oriented." },
      { name: "Irwin's Mountain Inn", stars: 3, rate: 130, vibe: "Classic mountain", note: "Walking distance to downtown. Hot tub. Reliable." },
      { name: "Canalta Lodge", stars: 3, rate: 140, vibe: "Comfortable", note: "Pool, fitness center, on the Bow River." },
    ],
    mid: [
      { name: "Elk + Avenue Hotel", stars: 3.5, rate: 180, vibe: "Modern, central", note: "Heart of downtown. Farm & Fire restaurant on-site." },
      { name: "Moose Hotel & Suites", stars: 3.5, rate: 200, vibe: "Upscale-casual", note: "Rooftop hot pools with mountain views. 9.6 on Expedia." },
      { name: "Banff Caribou Lodge & Spa", stars: 3.5, rate: 190, vibe: "Lodge + spa", note: "Spa, pool, sauna. Great after ski days." },
      { name: "Peaks Hotel & Suites", stars: 3, rate: 175, vibe: "Family-friendly", note: "Steam room, hot tub. Solid value." },
    ],
    splurge: [
      { name: "Fairmont Banff Springs", stars: 5, rate: 450, vibe: "Iconic castle", note: "\"Castle in the Rockies.\" Once-in-a-lifetime for Dad's 70th." },
      { name: "Rimrock Resort Hotel", stars: 4.5, rate: 300, vibe: "Elegant, quiet", note: "Near Banff Gondola. (Eden restaurant closed for renovation until July 2026.)" },
      { name: "Sunshine Mountain Lodge", stars: 4, rate: 250, vibe: "Ski-in / ski-out", note: "Only on-mountain lodge at Sunshine. Remote from town." },
    ],
  },

  costs: {
    note: "CAD unless noted. Split costs are split across 3 travelers. All 3 nights in Banff — no Calgary airport hotel needed.",
    sections: [
      {
        name: "Ground transport",
        rows: [
          { label: "Rental SUV (3 days, total)", amount: "C$350" },
          { label: "Gas (~400 km)", amount: "C$75" },
          { label: "Parks Canada pass (3 days, group)", amount: "C$171" },
        ],
      },
      {
        name: "Skiing",
        rows: [
          { label: "Sunshine lift ticket — Sunday (per person)", amount: "C$170" },
          { label: "Sunshine lift ticket — Monday (closing day, pp)", amount: "C$170" },
          { label: "Ski rental (2 days, per person, optional)", amount: "C$150" },
        ],
      },
      {
        name: "Lodging",
        rows: [
          { label: "Banff hotel — 3 nights, 2 rooms (mid-range)", amount: "C$900" },
        ],
      },
      {
        name: "Food & drink",
        rows: [
          { label: "Sat · 70th birthday dinner (pp)", amount: "C$100" },
          { label: "Sun · lunch + après + dinner (pp)", amount: "C$115" },
          { label: "Mon · lunch + dinner + hot springs snack (pp)", amount: "C$92" },
        ],
      },
      {
        name: "Activities",
        rows: [
          { label: "Banff Upper Hot Springs (pp)", amount: "C$12" },
          { label: "Bear spray (shared, 1–2 cans)", amount: "C$50" },
        ],
      },
      {
        name: "Flights (USD)",
        rows: [
          { label: "Dad · RSW → YYC → BUF", amount: "US$724" },
          { label: "Jeremy · LGA", amount: "US$528" },
          { label: "Alex · DCA", amount: "US$505" },
        ],
      },
    ],
    summary: "Ground total (CAD): ≈ C$3,973 ≈ US$2,900 at $0.73/CAD · Flights: US$1,757 · Grand total: ≈ US$4,657 · Per person: ≈ US$1,552. Splurge at the Fairmont adds ≈ US$400/pp.",
  },

  tips: [
    { emoji: "🎂", title: "Dad turns 70", text: "Saturday dinner at The Bison is THE moment. Book well in advance. Consider a small surprise — cake, toast, photo." },
    { emoji: "🎿", title: "Sunshine closes May 18", text: "You're arriving for Sunshine's last two days. Monday is closing day — Slush Cup pond-skim in costume, iconic Banff tradition." },
    { emoji: "🅿️", title: "Lift tickets", text: "~C$140–170/day. Buy online in advance. Senior (65+) discount applies — save Dad some cash." },
    { emoji: "🏔️", title: "Delirium Dive", text: "Sunshine's famous freeride zone. Requires avalanche transceiver, probe, shovel. Guided access available." },
    { emoji: "🥾", title: "Hiking in May", text: "Lower trails (Tunnel Mtn, Johnston Canyon) are good. Higher alpine still snowbound. Bring microspikes." },
    { emoji: "🐻", title: "Bear safety", text: "Bears active in May. Buy bear spray in Banff (~C$40–50/can). Make noise on trails." },
    { emoji: "💵", title: "Currency", text: "Banff prices in CAD. C$1 ≈ US$0.73. Your USD goes ~30% further. Use a no-foreign-fee card." },
    { emoji: "🚗", title: "Rental car", text: "SUV recommended. AWD helpful for spring mountain roads. Book early." },
    { emoji: "🌡️", title: "Weather", text: "Highs ~14°C (58°F), lows near 0°C (32°F). Pack layers. Snow at elevation is normal in May." },
    { emoji: "📱", title: "Cell service", text: "Spotty in mountains. Download offline Google Maps for the area. AT&T / Verizon have international day passes." },
    { emoji: "☎️", title: "Reservations to book now", text: "Saturday birthday dinner · hotel rooms · rental car · Sunshine lift tickets (cheaper online)." },
  ],

  nextSteps: [
    { number: 1, title: "Book the Saturday birthday dinner (The Bison)" },
    { number: 2, title: "Lock the Banff hotel (3 nights)" },
    { number: 3, title: "Reserve the SUV" },
    { number: 4, title: "Buy Sunshine lift tickets (senior discount for Dad)" },
  ],
};
