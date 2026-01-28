const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function httpJson(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? " - " + text : ""}`);
  }

  // endpoints backend renvoient du JSON
  return res.json();
}

/**
 * GET /specialities
 * backend: ["Cardiologie", "Médecine d'urgence", ...]
 */
export async function fetchSpecialities() {
  const data = await httpJson(`${API_BASE}/specialities`);
  // data = [{name:"Cardiologie"}, ...]
  return data.map((x) => x.name);
}


/**
 * Zones d’origine PoC 
 */
export async function fetchOriginZones() {
  const zones = await httpJson(`${API_BASE}/zones`);

  // adapter format backend -> format attendu par le front
  return (zones || []).map(z => ({
    value: z.code,
    label: z.code.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  }));
}





/**
 * POST /recommendations
 * body: { speciality, originZone }
 * resp: { hospitalId, hospitalName, availableBeds, distanceKm, durationMin, reason }
 */
export async function recommendHospital(payload) {
  return httpJson(`${API_BASE}/recommendations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /reservations
 * body: { hospitalId }
 * resp: { hospitalId, hospitalName, remainingBeds, message }
 */
export async function reserveBed(hospitalId) {
  return httpJson(`${API_BASE}/reservations`, {
    method: "POST",
    body: JSON.stringify({ hospitalId }),
  });
}
