const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  nom: string;
  prenom?: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    nom: string;
    prenom?: string;
    role: string;
  };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  return response.json();
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  return response.json();
}

export async function getProfile() {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Non authentifié');

  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  return response.json();
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  window.location.href = '/auth';
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('auth_token');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
