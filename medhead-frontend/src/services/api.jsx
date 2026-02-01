const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const TOKEN_KEY = "mh_token";

// =========================
// Token helpers
// =========================

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem("mh_token");
}


// =========================
// Fetch JSON sécurisé
// =========================

async function httpJson(url, options = {}) {
  const token = getToken();

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? " - " + text : ""}`);
  }

  return res.json();
}

// =========================
// Auth
// =========================

/**
 * POST /auth/login
 * body: { email, password }
 * resp: { token }
 */
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? " - " + text : ""}`);
  }

  const data = await res.json();
  saveToken(data.token);
  return data.token;
}


// =========================
// Data API
// =========================

/**
 * GET /specialities
 */
export async function fetchSpecialities() {
  const data = await httpJson(`${API_BASE}/specialities`);
  return data.map(x => x.name);
}

/**
 * GET /zones
 */
export async function fetchOriginZones() {
  const zones = await httpJson(`${API_BASE}/zones`);

  return (zones || []).map(z => ({
    value: z.code,
    label: z.code
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())
  }));
}

/**
 * POST /recommendations
 */
export async function recommendHospital(payload) {
  return httpJson(`${API_BASE}/recommendations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /reservations
 */
export async function reserveBed(hospitalId) {
  return httpJson(`${API_BASE}/reservations`, {
    method: "POST",
    body: JSON.stringify({ hospitalId }),
  });
}
