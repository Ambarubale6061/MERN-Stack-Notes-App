const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000/api';
export async function register(data){
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  });
  return res.json();
}
export async function login(data){
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  });
  return res.json();
}
export function authHeader(){
  const token = localStorage.getItem('token');
  return token ? {'Authorization': 'Bearer ' + token, 'Content-Type':'application/json'} : {'Content-Type':'application/json'};
}
export async function getNotes(){ const res = await fetch(`${API_BASE}/notes`, { headers: authHeader() }); return res.json(); }
export async function createNote(data){ const res = await fetch(`${API_BASE}/notes`, { method:'POST', headers: authHeader(), body: JSON.stringify(data)}); return res.json(); }
export async function updateNote(id, data){ const res = await fetch(`${API_BASE}/notes/${id}`, { method:'PUT', headers: authHeader(), body: JSON.stringify(data)}); return res.json(); }
export async function deleteNote(id){ const res = await fetch(`${API_BASE}/notes/${id}`, { method:'DELETE', headers: authHeader() }); return res.json(); }
