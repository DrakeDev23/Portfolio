const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function fetchJson(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) {
    throw new Error(`${path} failed (${res.status})`)
  }
  return res.json()
}

export const portfolioApi = {
  health: () => fetchJson('/api/health'),
  profile: () => fetchJson('/api/profile'),
  projects: () => fetchJson('/api/projects'),
  skills: () => fetchJson('/api/skills'),
  events: () => fetchJson('/api/events'),
  experience: () => fetchJson('/api/experience'),
  certifications: () => fetchJson('/api/certifications'),
}

export { API }
