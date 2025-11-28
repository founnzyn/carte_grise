const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface CreateDossierPayload {
  userId: string;
  region: string;
  marque: string;
  modele: string;
  vin?: string;
  puissanceFiscale: number;
  co2: number;
  origine: string;
  importType: 'NONE' | 'UE' | 'HORS_UE';
}

export async function createDossier(payload: CreateDossierPayload) {
  const response = await fetch(`${API_BASE}/dossiers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  return response.json();
}
