import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CalculateTaxDto, TaxCalculationResult, FuelType } from './dto/tax-calculator.dto';

// Default regional tax rates per department (2024 rates)
const DEFAULT_REGIONAL_RATES: Record<string, { name: string; rate: number; exonerationClean: boolean }> = {
  '01': { name: 'Ain', rate: 43.00, exonerationClean: true },
  '02': { name: 'Aisne', rate: 53.00, exonerationClean: false },
  '03': { name: 'Allier', rate: 43.00, exonerationClean: true },
  '04': { name: 'Alpes-de-Haute-Provence', rate: 51.20, exonerationClean: false },
  '05': { name: 'Hautes-Alpes', rate: 51.20, exonerationClean: false },
  '06': { name: 'Alpes-Maritimes', rate: 51.20, exonerationClean: false },
  '07': { name: 'Ardèche', rate: 43.00, exonerationClean: true },
  '08': { name: 'Ardennes', rate: 51.00, exonerationClean: false },
  '09': { name: 'Ariège', rate: 44.00, exonerationClean: true },
  '10': { name: 'Aube', rate: 51.00, exonerationClean: false },
  '11': { name: 'Aude', rate: 44.00, exonerationClean: true },
  '12': { name: 'Aveyron', rate: 44.00, exonerationClean: true },
  '13': { name: 'Bouches-du-Rhône', rate: 51.20, exonerationClean: false },
  '14': { name: 'Calvados', rate: 46.15, exonerationClean: true },
  '15': { name: 'Cantal', rate: 43.00, exonerationClean: true },
  '16': { name: 'Charente', rate: 45.00, exonerationClean: true },
  '17': { name: 'Charente-Maritime', rate: 45.00, exonerationClean: true },
  '18': { name: 'Cher', rate: 49.80, exonerationClean: true },
  '19': { name: 'Corrèze', rate: 45.00, exonerationClean: true },
  '21': { name: 'Côte-d\'Or', rate: 51.00, exonerationClean: true },
  '22': { name: 'Côtes-d\'Armor', rate: 55.00, exonerationClean: true },
  '23': { name: 'Creuse', rate: 45.00, exonerationClean: true },
  '24': { name: 'Dordogne', rate: 45.00, exonerationClean: true },
  '25': { name: 'Doubs', rate: 51.00, exonerationClean: true },
  '26': { name: 'Drôme', rate: 43.00, exonerationClean: true },
  '27': { name: 'Eure', rate: 46.15, exonerationClean: true },
  '28': { name: 'Eure-et-Loir', rate: 49.80, exonerationClean: true },
  '29': { name: 'Finistère', rate: 55.00, exonerationClean: true },
  '30': { name: 'Gard', rate: 44.00, exonerationClean: true },
  '31': { name: 'Haute-Garonne', rate: 44.00, exonerationClean: true },
  '32': { name: 'Gers', rate: 44.00, exonerationClean: true },
  '33': { name: 'Gironde', rate: 45.00, exonerationClean: true },
  '34': { name: 'Hérault', rate: 44.00, exonerationClean: true },
  '35': { name: 'Ille-et-Vilaine', rate: 55.00, exonerationClean: true },
  '36': { name: 'Indre', rate: 49.80, exonerationClean: true },
  '37': { name: 'Indre-et-Loire', rate: 49.80, exonerationClean: true },
  '38': { name: 'Isère', rate: 43.00, exonerationClean: true },
  '39': { name: 'Jura', rate: 51.00, exonerationClean: true },
  '40': { name: 'Landes', rate: 45.00, exonerationClean: true },
  '41': { name: 'Loir-et-Cher', rate: 49.80, exonerationClean: true },
  '42': { name: 'Loire', rate: 43.00, exonerationClean: true },
  '43': { name: 'Haute-Loire', rate: 43.00, exonerationClean: true },
  '44': { name: 'Loire-Atlantique', rate: 51.00, exonerationClean: true },
  '45': { name: 'Loiret', rate: 49.80, exonerationClean: true },
  '46': { name: 'Lot', rate: 44.00, exonerationClean: true },
  '47': { name: 'Lot-et-Garonne', rate: 45.00, exonerationClean: true },
  '48': { name: 'Lozère', rate: 44.00, exonerationClean: true },
  '49': { name: 'Maine-et-Loire', rate: 51.00, exonerationClean: true },
  '50': { name: 'Manche', rate: 46.15, exonerationClean: true },
  '51': { name: 'Marne', rate: 51.00, exonerationClean: false },
  '52': { name: 'Haute-Marne', rate: 51.00, exonerationClean: false },
  '53': { name: 'Mayenne', rate: 51.00, exonerationClean: true },
  '54': { name: 'Meurthe-et-Moselle', rate: 48.00, exonerationClean: false },
  '55': { name: 'Meuse', rate: 48.00, exonerationClean: false },
  '56': { name: 'Morbihan', rate: 55.00, exonerationClean: true },
  '57': { name: 'Moselle', rate: 48.00, exonerationClean: false },
  '58': { name: 'Nièvre', rate: 51.00, exonerationClean: true },
  '59': { name: 'Nord', rate: 53.00, exonerationClean: false },
  '60': { name: 'Oise', rate: 53.00, exonerationClean: false },
  '61': { name: 'Orne', rate: 46.15, exonerationClean: true },
  '62': { name: 'Pas-de-Calais', rate: 53.00, exonerationClean: false },
  '63': { name: 'Puy-de-Dôme', rate: 43.00, exonerationClean: true },
  '64': { name: 'Pyrénées-Atlantiques', rate: 45.00, exonerationClean: true },
  '65': { name: 'Hautes-Pyrénées', rate: 44.00, exonerationClean: true },
  '66': { name: 'Pyrénées-Orientales', rate: 44.00, exonerationClean: true },
  '67': { name: 'Bas-Rhin', rate: 48.00, exonerationClean: false },
  '68': { name: 'Haut-Rhin', rate: 48.00, exonerationClean: false },
  '69': { name: 'Rhône', rate: 43.00, exonerationClean: true },
  '70': { name: 'Haute-Saône', rate: 51.00, exonerationClean: true },
  '71': { name: 'Saône-et-Loire', rate: 51.00, exonerationClean: true },
  '72': { name: 'Sarthe', rate: 51.00, exonerationClean: true },
  '73': { name: 'Savoie', rate: 43.00, exonerationClean: true },
  '74': { name: 'Haute-Savoie', rate: 43.00, exonerationClean: true },
  '75': { name: 'Paris', rate: 54.95, exonerationClean: true },
  '76': { name: 'Seine-Maritime', rate: 46.15, exonerationClean: true },
  '77': { name: 'Seine-et-Marne', rate: 54.95, exonerationClean: true },
  '78': { name: 'Yvelines', rate: 54.95, exonerationClean: true },
  '79': { name: 'Deux-Sèvres', rate: 45.00, exonerationClean: true },
  '80': { name: 'Somme', rate: 53.00, exonerationClean: false },
  '81': { name: 'Tarn', rate: 44.00, exonerationClean: true },
  '82': { name: 'Tarn-et-Garonne', rate: 44.00, exonerationClean: true },
  '83': { name: 'Var', rate: 51.20, exonerationClean: false },
  '84': { name: 'Vaucluse', rate: 51.20, exonerationClean: false },
  '85': { name: 'Vendée', rate: 51.00, exonerationClean: true },
  '86': { name: 'Vienne', rate: 45.00, exonerationClean: true },
  '87': { name: 'Haute-Vienne', rate: 45.00, exonerationClean: true },
  '88': { name: 'Vosges', rate: 48.00, exonerationClean: false },
  '89': { name: 'Yonne', rate: 51.00, exonerationClean: true },
  '90': { name: 'Territoire de Belfort', rate: 51.00, exonerationClean: true },
  '91': { name: 'Essonne', rate: 54.95, exonerationClean: true },
  '92': { name: 'Hauts-de-Seine', rate: 54.95, exonerationClean: true },
  '93': { name: 'Seine-Saint-Denis', rate: 54.95, exonerationClean: true },
  '94': { name: 'Val-de-Marne', rate: 54.95, exonerationClean: true },
  '95': { name: 'Val-d\'Oise', rate: 54.95, exonerationClean: true },
  '971': { name: 'Guadeloupe', rate: 41.00, exonerationClean: false },
  '972': { name: 'Martinique', rate: 30.00, exonerationClean: false },
  '973': { name: 'Guyane', rate: 42.50, exonerationClean: false },
  '974': { name: 'La Réunion', rate: 51.00, exonerationClean: false },
  '976': { name: 'Mayotte', rate: 30.00, exonerationClean: false },
};

// Eco malus thresholds for 2024
const ECO_MALUS_2024: { min: number; max: number | null; amount: number }[] = [
  { min: 0, max: 117, amount: 0 },
  { min: 118, max: 118, amount: 50 },
  { min: 119, max: 119, amount: 75 },
  { min: 120, max: 120, amount: 100 },
  { min: 121, max: 121, amount: 125 },
  { min: 122, max: 122, amount: 150 },
  { min: 123, max: 123, amount: 170 },
  { min: 124, max: 124, amount: 190 },
  { min: 125, max: 125, amount: 210 },
  { min: 126, max: 126, amount: 230 },
  { min: 127, max: 127, amount: 240 },
  { min: 128, max: 128, amount: 260 },
  { min: 129, max: 129, amount: 280 },
  { min: 130, max: 130, amount: 310 },
  { min: 131, max: 131, amount: 330 },
  { min: 132, max: 132, amount: 360 },
  { min: 133, max: 133, amount: 400 },
  { min: 134, max: 134, amount: 450 },
  { min: 135, max: 135, amount: 540 },
  { min: 136, max: 136, amount: 650 },
  { min: 137, max: 137, amount: 740 },
  { min: 138, max: 138, amount: 818 },
  { min: 139, max: 139, amount: 898 },
  { min: 140, max: 140, amount: 983 },
  { min: 141, max: 141, amount: 1074 },
  { min: 142, max: 142, amount: 1172 },
  { min: 143, max: 143, amount: 1276 },
  { min: 144, max: 144, amount: 1386 },
  { min: 145, max: 145, amount: 1504 },
  { min: 146, max: 146, amount: 1629 },
  { min: 147, max: 147, amount: 1761 },
  { min: 148, max: 148, amount: 1901 },
  { min: 149, max: 149, amount: 2049 },
  { min: 150, max: 150, amount: 2205 },
  { min: 151, max: 151, amount: 2370 },
  { min: 152, max: 152, amount: 2544 },
  { min: 153, max: 153, amount: 2726 },
  { min: 154, max: 154, amount: 2918 },
  { min: 155, max: 155, amount: 3119 },
  { min: 156, max: 156, amount: 3331 },
  { min: 157, max: 157, amount: 3552 },
  { min: 158, max: 158, amount: 3784 },
  { min: 159, max: 159, amount: 4026 },
  { min: 160, max: 160, amount: 4279 },
  { min: 161, max: 161, amount: 4543 },
  { min: 162, max: 162, amount: 4818 },
  { min: 163, max: 163, amount: 5105 },
  { min: 164, max: 164, amount: 5404 },
  { min: 165, max: 165, amount: 5715 },
  { min: 166, max: 166, amount: 6039 },
  { min: 167, max: 167, amount: 6375 },
  { min: 168, max: 168, amount: 6724 },
  { min: 169, max: 169, amount: 7086 },
  { min: 170, max: 170, amount: 7462 },
  { min: 171, max: 171, amount: 7851 },
  { min: 172, max: 172, amount: 8254 },
  { min: 173, max: 173, amount: 8671 },
  { min: 174, max: 174, amount: 9103 },
  { min: 175, max: 175, amount: 9550 },
  { min: 176, max: 176, amount: 10011 },
  { min: 177, max: 177, amount: 10488 },
  { min: 178, max: 178, amount: 10980 },
  { min: 179, max: 179, amount: 11488 },
  { min: 180, max: 180, amount: 12012 },
  { min: 181, max: 181, amount: 12552 },
  { min: 182, max: 182, amount: 13109 },
  { min: 183, max: 183, amount: 13682 },
  { min: 184, max: 184, amount: 14273 },
  { min: 185, max: 185, amount: 14881 },
  { min: 186, max: 186, amount: 15506 },
  { min: 187, max: 187, amount: 16149 },
  { min: 188, max: 188, amount: 16810 },
  { min: 189, max: 189, amount: 17490 },
  { min: 190, max: 190, amount: 18188 },
  { min: 191, max: 191, amount: 18905 },
  { min: 192, max: 192, amount: 19641 },
  { min: 193, max: null, amount: 60000 },
];

// Fixed fees
const MANAGEMENT_FEE = 11.00; // Frais de gestion
const DELIVERY_FEE = 2.76; // Frais d'acheminement

@Injectable()
export class TaxCalculatorService {
  constructor(private prisma: PrismaService) {}

  async calculateTax(dto: CalculateTaxDto): Promise<TaxCalculationResult> {
    const { departmentCode, fiscalPower, fuelType, co2Emissions, transactionType, isNew, firstRegistrationDate } = dto;

    // Get regional rate
    let regionalRate = DEFAULT_REGIONAL_RATES[departmentCode];
    
    // Try to get from database first
    const dbRate = await this.prisma.regionalTaxRate.findFirst({
      where: {
        departmentCode,
        validFrom: { lte: new Date() },
        OR: [
          { validTo: null },
          { validTo: { gte: new Date() } },
        ],
      },
    });

    if (dbRate) {
      regionalRate = {
        name: dbRate.departmentName,
        rate: dbRate.ratePerHp,
        exonerationClean: dbRate.exonerationClean,
      };
    }

    if (!regionalRate) {
      throw new NotFoundException(`Département ${departmentCode} non trouvé`);
    }

    // Check if clean vehicle (electric, hydrogen, or hybrid)
    const isCleanVehicle = [FuelType.ELECTRIQUE, FuelType.HYDROGENE, FuelType.HYBRIDE].includes(fuelType);
    const exonerationApplied = isCleanVehicle && regionalRate.exonerationClean;

    // Calculate regional tax
    let regionalTax = fiscalPower * regionalRate.rate;
    let exonerationRate: number | undefined;

    if (exonerationApplied) {
      if (fuelType === FuelType.ELECTRIQUE || fuelType === FuelType.HYDROGENE) {
        exonerationRate = 100;
        regionalTax = 0;
      } else if (fuelType === FuelType.HYBRIDE) {
        exonerationRate = 50;
        regionalTax = regionalTax * 0.5;
      }
    }

    // Calculate age reduction for used vehicles
    let vehicleAge: number | undefined;
    let ageReduction: number | undefined;

    if (!isNew && firstRegistrationDate) {
      const registrationDate = new Date(firstRegistrationDate);
      const now = new Date();
      vehicleAge = Math.floor((now.getTime() - registrationDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      
      // Age coefficient reduction (10% per year, minimum 50%)
      if (vehicleAge >= 10) {
        ageReduction = 50;
      } else {
        ageReduction = Math.min(vehicleAge * 10, 50);
      }
      
      regionalTax = regionalTax * (1 - ageReduction / 100);
    }

    // Calculate eco malus (only for new vehicles with CO2 emissions)
    let ecoMalus = 0;
    if (isNew && co2Emissions && transactionType === 'ACHAT_NEUF') {
      const malusThreshold = ECO_MALUS_2024.find(
        (t) => co2Emissions >= t.min && (t.max === null || co2Emissions <= t.max)
      );
      ecoMalus = malusThreshold?.amount || 0;
    }

    // Management fee and delivery fee
    const managementFee = MANAGEMENT_FEE;
    const deliveryFee = DELIVERY_FEE;

    // Calculate total
    const totalAmount = regionalTax + managementFee + deliveryFee + ecoMalus;

    return {
      regionalTax: Math.round(regionalTax * 100) / 100,
      managementFee,
      deliveryFee,
      ecoMalus,
      totalAmount: Math.round(totalAmount * 100) / 100,
      details: {
        departmentName: regionalRate.name,
        ratePerHp: regionalRate.rate,
        exonerationApplied,
        exonerationRate,
        vehicleAge,
        ageReduction,
      },
    };
  }

  async getDepartments() {
    return Object.entries(DEFAULT_REGIONAL_RATES).map(([code, data]) => ({
      code,
      name: data.name,
      ratePerHp: data.rate,
      exonerationClean: data.exonerationClean,
    }));
  }

  async getEcoMalusThresholds() {
    return ECO_MALUS_2024;
  }
}
