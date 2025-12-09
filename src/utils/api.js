
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
}

/**
 * Helper to fetch with authentication
 */
export async function fetchWithAuth(url, options = {}) {
  const headers = { ...getAuthHeaders(), ...options.headers };
  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API request failed");
  return data;
}
