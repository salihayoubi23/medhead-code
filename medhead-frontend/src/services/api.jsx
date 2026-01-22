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
  return httpJson(`${API_BASE}/specialities`);
}

/**
 * Zones d’origine PoC (front-only).
 * (Si un jour tu ajoutes GET /zones côté backend, on remplacera.)
 */
export async function fetchOriginZones() {
  return [
    { value: "LONDON_CENTRAL", label: "London Central" },
    { value: "LONDON_EAST", label: "London East" },
    { value: "LONDON_SOUTH", label: "London South" },
  ];
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
