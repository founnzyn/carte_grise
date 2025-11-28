import { Injectable } from '@nestjs/common';

export interface SimulationRequest {
  region: string;
  puissance: number;
  co2: number;
  importType: 'none' | 'ue' | 'hors_ue';
}

export interface SimulationResult {
  total: number;
  breakdown: {
    taxeRegionale: number;
    taxeCo2: number;
    fraisImport: number;
    fraisDossier: number;
  };
}

@Injectable()
export class SimulatorService {
  estimate(payload: SimulationRequest): SimulationResult {
    const baseRegion = payload.region === 'idf' ? 46.15 : 42;
    const taxeRegionale = payload.puissance * baseRegion;
    const taxeCo2 = Math.max(0, payload.co2 - 95) * 2;
    const fraisImport = payload.importType === 'ue' ? 45 : payload.importType === 'hors_ue' ? 85 : 0;
    const fraisDossier = 39;

    return {
      total: Math.round(taxeRegionale + taxeCo2 + fraisImport + fraisDossier),
      breakdown: { taxeRegionale, taxeCo2, fraisImport, fraisDossier }
    };
  }
}
