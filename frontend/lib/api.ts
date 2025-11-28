const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface SimulationPayload {
  region: string;
  puissance: number;
  co2: number;
  importType: 'none' | 'ue' | 'hors_ue';
}

export interface SimulationResponse {
  total: number;
  breakdown: {
    taxeRegionale: number;
    taxeCo2: number;
    fraisImport: number;
    fraisDossier: number;
  };
}

export async function simulateCarteGrise(payload: SimulationPayload): Promise<SimulationResponse> {
  const response = await fetch(`${API_BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  return response.json() as Promise<SimulationResponse>;
}
