const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://comet-web-1.onrender.com';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}/api${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'The request could not be completed.');
  return payload;
}