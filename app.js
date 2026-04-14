// ===== Nav toggle =====
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
navToggle.addEventListener("click", () => navMobile.classList.toggle("open"));
navMobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMobile.classList.remove("open")));

// ===== Hero =====
document.getElementById("heroKicker").textContent = `${TRIP.dates} · ${TRIP.travelers}`;
document.getElementById("heroTitle").textContent = `${TRIP.title} — ${TRIP.subtitle}`;
const heroList = document.getElementById("heroList");
[
  "Sat May 16 · Arrive YYC, drive to Banff, birthday dinner",
  "Sun May 17 · Ski Sunshine Village",
  "Mon May 18 · Flex day (see options)",
  "Tue May 19 · Relaxed morning, afternoon flights home",
].forEach(t => { const li = document.createElement("li"); li.textContent = t; heroList.appendChild(li); });

// ===== Map =====
const map = L.map("map", { scrollWheelZoom: false });
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  subdomains: "abcd",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO',
  maxZoom: 19,
}).addTo(map);

const kindColor = {
  airport: "#6A93A8",
  stop: "#C78A3B",
  base: "#0E5C4B",
  ski: "#7A6F5A",
  hike: "#7A6F5A",
  springs: "#7A6F5A",
};
const kindSize = { base: 20, airport: 16, stop: 14, ski: 12, hike: 12, springs: 12 };

function mkIcon(color, size) {
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.2)"></div>`,
  });
}

const pts = [];
TRIP.mapPoints.forEach(p => {
  pts.push([p.lat, p.lng]);
  const m = L.marker([p.lat, p.lng], { icon: mkIcon(kindColor[p.kind], kindSize[p.kind]) }).addTo(map);
  const permanent = p.kind === "base" || p.kind === "airport";
  m.bindTooltip(p.name, {
    permanent,
    direction: p.lng > -115.4 ? "left" : "right",
    offset: permanent ? [12, 0] : [0, -6],
  });
});

map.fitBounds(pts, { padding: [40, 40] });

// Driving route YYC → Canmore → Banff via OSRM (falls back to straight line)
const routeStops = [
  TRIP.mapPoints.find(p => p.kind === "airport"),
  TRIP.mapPoints.find(p => p.kind === "stop"),
  TRIP.mapPoints.find(p => p.kind === "base"),
];
const coordStr = routeStops.map(p => `${p.lng},${p.lat}`).join(";");
const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;

let routeLayer = L.polyline(routeStops.map(p => [p.lat, p.lng]), {
  color: "#0E5C4B", weight: 2, dashArray: "8 6", opacity: 0.5,
}).addTo(map);

fetch(osrmUrl)
  .then(r => r.ok ? r.json() : null)
  .then(data => {
    if (!data || !data.routes || !data.routes[0]) return;
    const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    map.removeLayer(routeLayer);
    routeLayer = L.polyline(coords, {
      color: "#0E5C4B", weight: 3, opacity: 0.75,
    }).addTo(map);
    map.fitBounds(pts, { padding: [40, 40] });
  })
  .catch(() => { /* keep straight-line fallback */ });

// ===== Days =====
const dayList = document.getElementById("dayList");
TRIP.days.forEach(day => {
  const card = document.createElement("div");
  card.className = "day-card";
  const items = day.items.map(i => `<li><span class="t">${i.time}</span><span class="d">${i.text}</span></li>`).join("");
  card.innerHTML = `
    <div class="day-head">
      <span class="day-emoji">${day.emoji}</span>
      <div>
        <div class="day-eyebrow">${day.label}</div>
        <h3 class="day-title">${day.title}</h3>
      </div>
    </div>
    <div class="day-body">
      <ul class="timeline">${items}</ul>
    </div>
  `;
  dayList.appendChild(card);
});

// ===== Monday options =====
const monEl = document.getElementById("monOptions");
TRIP.mondayOptions.forEach(o => {
  const c = document.createElement("div");
  c.className = "mon-card";
  c.innerHTML = `
    <h4>${o.emoji} ${o.title}</h4>
    <div class="tag">${o.tag}</div>
    <p>${o.body}</p>
    <div class="logi">${o.logistics}</div>
  `;
  monEl.appendChild(c);
});

const comboEl = document.getElementById("monCombos");
TRIP.mondayCombos.forEach(c => {
  const d = document.createElement("div");
  d.className = "combo";
  d.innerHTML = `<strong>${c.name}</strong> — ${c.body}`;
  comboEl.appendChild(d);
});

// ===== Flights =====
const flightCards = document.getElementById("flightCards");
TRIP.flights.forEach(f => {
  const c = document.createElement("div");
  c.className = "flight-card";
  const badge = f.badge ? `<span class="flight-badge">${f.badge}</span>` : "";
  c.innerHTML = `
    <div class="who">${f.who}${badge}</div>
    <div class="where">${f.from}</div>
    <div class="flight-line"><span class="lbl">Out</span><span>${f.out}</span></div>
    <div class="flight-line"><span class="lbl">Back</span><span>${f.back}</span></div>
    <div class="flight-line"><span class="lbl">Airline</span><span>${f.airline}</span></div>
    <div class="flight-cost">${f.cost}</div>
  `;
  flightCards.appendChild(c);
});
const flightCallouts = document.getElementById("flightCallouts");
TRIP.flightCallouts.forEach(co => {
  const d = document.createElement("div");
  d.className = "flight-callout";
  d.innerHTML = `<strong>${co.emoji}</strong> &nbsp;${co.text}`;
  flightCallouts.appendChild(d);
});

// ===== Lodging =====
const tiersEl = document.getElementById("lodgingTiers");
const renderCard = (h) => {
  const stars = "★".repeat(Math.floor(h.stars)) + (h.stars % 1 ? "½" : "");
  return `<div class="lodging-card">
    <div class="name">${h.name}</div>
    <div class="meta">${stars} · C$${h.rate}/night · ${h.vibe}</div>
    <div class="note">${h.note}</div>
  </div>`;
};
const tierBlock = (label, eyebrow, hotels, fourCol) => `
  <div class="tier">
    <div class="eyebrow">${eyebrow}</div>
    <h3>${label}</h3>
    <div class="lodging-grid${fourCol ? " four" : ""}">${hotels.map(renderCard).join("")}</div>
  </div>`;
tiersEl.innerHTML = [
  tierBlock("Budget", "Tier 1", TRIP.lodging.budget),
  tierBlock("Mid-range", "Tier 2", TRIP.lodging.mid, true),
  tierBlock("Splurge", "Tier 3", TRIP.lodging.splurge),
].join("");
