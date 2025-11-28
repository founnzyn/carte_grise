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
  // Tarifs régionaux 2024 (prix au cheval fiscal)
  private readonly tarifRegionaux: Record<string, number> = {
    'auvergne-rhone-alpes': 43,
    'bourgogne-franche-comte': 51,
    'bretagne': 51,
    'centre-val-de-loire': 46.15,
    'corse': 27,
    'grand-est': 44,
    'hauts-de-france': 36.20,
    'ile-de-france': 46.15,
    'normandie': 41.40,
    'nouvelle-aquitaine': 41,
    'occitanie': 44,
    'pays-de-la-loire': 51,
    "provence-alpes-cote-d-azur": 51.20,
    'guadeloupe': 41,
    'martinique': 42.50,
    'guyane': 42.50,
    'reunion': 46,
    'mayotte': 30,
  };

  estimate(payload: SimulationRequest): SimulationResult {
    const tarifRegional = this.tarifRegionaux[payload.region] || 43;
    const taxeRegionale = payload.puissance * tarifRegional;
    const taxeCo2 = Math.max(0, payload.co2 - 95) * 2;
    const fraisImport = payload.importType === 'ue' ? 45 : payload.importType === 'hors_ue' ? 85 : 0;
    const fraisDossier = 39;

    return {
      total: Math.round(taxeRegionale + taxeCo2 + fraisImport + fraisDossier),
      breakdown: { taxeRegionale, taxeCo2, fraisImport, fraisDossier }
    };
  }
}
