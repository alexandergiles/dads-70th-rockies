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
  `;
  flightCards.appendChild(c);
});

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

// ===== Pack =====
document.getElementById("packNote").textContent = TRIP.pack.note;
document.getElementById("packGroups").innerHTML = TRIP.pack.groups.map(g => `
  <div class="pack-group">
    <h3>${g.name}</h3>
    <ul>${g.items.map(i => `<li>${i}</li>`).join("")}</ul>
  </div>
`).join("");

// ===== Weather =====
const wmoIcon = c => {
  if (c === 0) return "☀️";
  if (c <= 2) return "🌤️";
  if (c === 3) return "☁️";
  if (c === 45 || c === 48) return "🌫️";
  if (c >= 51 && c <= 67) return "🌧️";
  if (c >= 71 && c <= 77) return "❄️";
  if (c >= 80 && c <= 82) return "🌦️";
  if (c >= 85 && c <= 86) return "🌨️";
  if (c >= 95) return "⛈️";
  return "·";
};
const wmoLabel = c => {
  if (c === 0) return "Clear";
  if (c === 1) return "Mostly clear";
  if (c === 2) return "Partly cloudy";
  if (c === 3) return "Overcast";
  if (c === 45 || c === 48) return "Fog";
  if (c >= 51 && c <= 57) return "Drizzle";
  if (c >= 61 && c <= 67) return "Rain";
  if (c >= 71 && c <= 77) return "Snow";
  if (c >= 80 && c <= 82) return "Showers";
  if (c >= 85 && c <= 86) return "Snow showers";
  if (c >= 95) return "Thunderstorm";
  return "—";
};
const dayLabel = iso => {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const weatherUrl = "https://api.open-meteo.com/v1/forecast"
  + "?latitude=51.178&longitude=-115.571"
  + "&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,snowfall_sum"
  + "&timezone=America%2FEdmonton"
  + "&temperature_unit=fahrenheit&precipitation_unit=inch"
  + "&start_date=2026-05-16&end_date=2026-05-18";

const statusEl = document.getElementById("weatherStatus");
const daysEl = document.getElementById("weatherDays");

fetch(weatherUrl)
  .then(r => r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)))
  .then(d => {
    const days = d.daily;
    if (!days || !days.time || !days.time.length) throw new Error("no data");
    const html = days.time.map((iso, i) => {
      const code = days.weathercode[i];
      const hi = Math.round(days.temperature_2m_max[i]);
      const lo = Math.round(days.temperature_2m_min[i]);
      const precip = days.precipitation_sum[i];
      const snow = days.snowfall_sum[i];
      const precipBit = snow > 0
        ? `${snow.toFixed(1)}" snow`
        : precip > 0 ? `${precip.toFixed(2)}" rain` : "";
      return `<div class="weather-day">
        <div class="wd-date">${dayLabel(iso)}</div>
        <div class="wd-icon" title="${wmoLabel(code)}">${wmoIcon(code)}</div>
        <div class="wd-cond">${wmoLabel(code)}</div>
        <div class="wd-temp">${hi}° / ${lo}°F</div>
        ${precipBit ? `<div class="wd-precip">${precipBit}</div>` : ""}
      </div>`;
    }).join("");
    daysEl.innerHTML = html;
    statusEl.textContent = "live";
    statusEl.classList.add("live");
  })
  .catch(() => {
    statusEl.textContent = "unavailable";
    daysEl.innerHTML = `<div class="weather-empty">Couldn't load the live forecast right now.</div>`;
  });

// ===== Lodging =====
const b = TRIP.booking;
document.getElementById("lodgingTitle").textContent = `${b.name} · ${b.area}`;
document.getElementById("lodgingMeta").textContent = `Check in ${b.checkIn} · Check out ${b.checkOut} · ${b.nights} nights`;
document.getElementById("lodgingBooked").innerHTML = `
  <div class="booked-images">
    ${b.images.map(im => `<figure class="booked-img"><img src="${im.src}" alt="${im.alt}" loading="lazy"></figure>`).join("")}
  </div>
  <div class="booked-meta">
    <div class="booked-row"><span class="lbl">Address</span><span>${b.address}</span></div>
    <div class="booked-row"><span class="lbl">Check in</span><span>${b.checkIn}</span></div>
    <div class="booked-row"><span class="lbl">Check out</span><span>${b.checkOut}</span></div>
    <div class="booked-row"><span class="lbl">Nights</span><span>${b.nights}</span></div>
    <div class="booked-row"><span class="lbl">Booked via</span><span>${b.platform}</span></div>
  </div>
`;
