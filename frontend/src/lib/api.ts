// lib/api.ts
export const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function predict(disease: string, file: File, explain=false){
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API}/predict/${disease}?explain=${explain?1:0}`, { method:'POST', body: form });
  const txt = await res.text();
  if(!res.ok){
    try { const j = JSON.parse(txt); throw new Error(j.detail || txt); }
    catch { throw new Error(txt); }
  }
  return JSON.parse(txt);
}
