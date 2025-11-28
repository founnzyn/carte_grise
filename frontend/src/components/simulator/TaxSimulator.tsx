'use client';

import { useState } from 'react';

type FuelType = 'ESSENCE' | 'DIESEL' | 'HYBRIDE' | 'ELECTRIQUE' | 'GPL' | 'HYDROGENE' | 'AUTRE';
type TransactionType = 'ACHAT_NEUF' | 'ACHAT_OCCASION' | 'CHANGEMENT_ADRESSE' | 'DUPLICATA' | 'CESSION' | 'HERITAGE';

interface TaxResult {
  regionalTax: number;
  managementFee: number;
  deliveryFee: number;
  ecoMalus: number;
  totalAmount: number;
  details: {
    departmentName: string;
    ratePerHp: number;
    exonerationApplied: boolean;
    exonerationRate?: number;
    vehicleAge?: number;
    ageReduction?: number;
  };
}

const fuelTypes: { value: FuelType; label: string }[] = [
  { value: 'ESSENCE', label: 'Essence' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'HYBRIDE', label: 'Hybride' },
  { value: 'ELECTRIQUE', label: 'Électrique' },
  { value: 'GPL', label: 'GPL' },
  { value: 'HYDROGENE', label: 'Hydrogène' },
  { value: 'AUTRE', label: 'Autre' },
];

const transactionTypes: { value: TransactionType; label: string }[] = [
  { value: 'ACHAT_NEUF', label: 'Achat véhicule neuf' },
  { value: 'ACHAT_OCCASION', label: 'Achat véhicule d\'occasion' },
  { value: 'CHANGEMENT_ADRESSE', label: 'Changement d\'adresse' },
  { value: 'DUPLICATA', label: 'Duplicata' },
  { value: 'CESSION', label: 'Cession' },
  { value: 'HERITAGE', label: 'Héritage' },
];

// Simplified department list (subset for demo)
const departments = [
  { code: '75', name: 'Paris' },
  { code: '69', name: 'Rhône' },
  { code: '13', name: 'Bouches-du-Rhône' },
  { code: '33', name: 'Gironde' },
  { code: '59', name: 'Nord' },
  { code: '31', name: 'Haute-Garonne' },
  { code: '06', name: 'Alpes-Maritimes' },
  { code: '44', name: 'Loire-Atlantique' },
  { code: '67', name: 'Bas-Rhin' },
  { code: '34', name: 'Hérault' },
];

// Simple local tax calculation (matches backend logic)
const calculateTax = (
  departmentCode: string,
  fiscalPower: number,
  fuelType: FuelType,
  co2Emissions: number | null,
  transactionType: TransactionType,
  isNew: boolean,
  firstRegistrationDate: string | null
): TaxResult => {
  // Regional rates (simplified)
  const rates: Record<string, { rate: number; name: string; exoneration: boolean }> = {
    '75': { rate: 54.95, name: 'Paris', exoneration: true },
    '69': { rate: 43.00, name: 'Rhône', exoneration: true },
    '13': { rate: 51.20, name: 'Bouches-du-Rhône', exoneration: false },
    '33': { rate: 45.00, name: 'Gironde', exoneration: true },
    '59': { rate: 53.00, name: 'Nord', exoneration: false },
    '31': { rate: 44.00, name: 'Haute-Garonne', exoneration: true },
    '06': { rate: 51.20, name: 'Alpes-Maritimes', exoneration: false },
    '44': { rate: 51.00, name: 'Loire-Atlantique', exoneration: true },
    '67': { rate: 48.00, name: 'Bas-Rhin', exoneration: false },
    '34': { rate: 44.00, name: 'Hérault', exoneration: true },
  };

  const dept = rates[departmentCode] || { rate: 46.00, name: 'Département', exoneration: false };
  const isClean = ['ELECTRIQUE', 'HYDROGENE', 'HYBRIDE'].includes(fuelType);
  const exonerationApplied = isClean && dept.exoneration;
  
  let regionalTax = fiscalPower * dept.rate;
  let exonerationRate: number | undefined;

  if (exonerationApplied) {
    if (fuelType === 'ELECTRIQUE' || fuelType === 'HYDROGENE') {
      exonerationRate = 100;
      regionalTax = 0;
    } else if (fuelType === 'HYBRIDE') {
      exonerationRate = 50;
      regionalTax = regionalTax * 0.5;
    }
  }

  // Age reduction for used vehicles
  let vehicleAge: number | undefined;
  let ageReduction: number | undefined;

  if (!isNew && firstRegistrationDate) {
    const regDate = new Date(firstRegistrationDate);
    vehicleAge = Math.floor((Date.now() - regDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    ageReduction = Math.min(vehicleAge * 10, 50);
    regionalTax = regionalTax * (1 - ageReduction / 100);
  }

  // Eco malus (simplified)
  let ecoMalus = 0;
  if (isNew && co2Emissions && transactionType === 'ACHAT_NEUF') {
    if (co2Emissions >= 193) ecoMalus = 60000;
    else if (co2Emissions >= 170) ecoMalus = 7462;
    else if (co2Emissions >= 150) ecoMalus = 2205;
    else if (co2Emissions >= 130) ecoMalus = 310;
    else if (co2Emissions >= 118) ecoMalus = 50;
  }

  const managementFee = 11.00;
  const deliveryFee = 2.76;
  const totalAmount = Math.round((regionalTax + managementFee + deliveryFee + ecoMalus) * 100) / 100;

  return {
    regionalTax: Math.round(regionalTax * 100) / 100,
    managementFee,
    deliveryFee,
    ecoMalus,
    totalAmount,
    details: {
      departmentName: dept.name,
      ratePerHp: dept.rate,
      exonerationApplied,
      exonerationRate,
      vehicleAge,
      ageReduction,
    },
  };
};

export default function TaxSimulator() {
  const [formData, setFormData] = useState({
    departmentCode: '',
    fiscalPower: '',
    fuelType: '' as FuelType | '',
    co2Emissions: '',
    transactionType: '' as TransactionType | '',
    isNew: false,
    firstRegistrationDate: '',
  });
  const [result, setResult] = useState<TaxResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate API call delay
    setTimeout(() => {
      if (formData.departmentCode && formData.fiscalPower && formData.fuelType && formData.transactionType) {
        const taxResult = calculateTax(
          formData.departmentCode,
          parseInt(formData.fiscalPower),
          formData.fuelType,
          formData.co2Emissions ? parseInt(formData.co2Emissions) : null,
          formData.transactionType,
          formData.isNew,
          formData.firstRegistrationDate || null
        );
        setResult(taxResult);
      }
      setIsCalculating(false);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="card-premium max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-2">
          Simulateur de Carte Grise
        </h2>
        <p className="text-dark-500">
          Estimez gratuitement le coût de votre carte grise en quelques clics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <div>
            <label htmlFor="departmentCode" className="input-label">
              Département d&apos;immatriculation
            </label>
            <select
              id="departmentCode"
              name="departmentCode"
              value={formData.departmentCode}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Sélectionnez un département</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.code} - {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label htmlFor="transactionType" className="input-label">
              Type de démarche
            </label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Sélectionnez une démarche</option>
              {transactionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fiscal Power */}
          <div>
            <label htmlFor="fiscalPower" className="input-label">
              Puissance fiscale (CV)
            </label>
            <input
              type="number"
              id="fiscalPower"
              name="fiscalPower"
              value={formData.fiscalPower}
              onChange={handleChange}
              required
              min="1"
              max="100"
              placeholder="Ex: 7"
              className="input-field"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label htmlFor="fuelType" className="input-label">
              Type de carburant
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Sélectionnez un carburant</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel.value} value={fuel.value}>
                  {fuel.label}
                </option>
              ))}
            </select>
          </div>

          {/* CO2 Emissions */}
          <div>
            <label htmlFor="co2Emissions" className="input-label">
              Émissions CO2 (g/km) - Optionnel
            </label>
            <input
              type="number"
              id="co2Emissions"
              name="co2Emissions"
              value={formData.co2Emissions}
              onChange={handleChange}
              min="0"
              max="500"
              placeholder="Ex: 120"
              className="input-field"
            />
          </div>

          {/* First Registration Date */}
          <div>
            <label htmlFor="firstRegistrationDate" className="input-label">
              Date 1ère immatriculation
            </label>
            <input
              type="date"
              id="firstRegistrationDate"
              name="firstRegistrationDate"
              value={formData.firstRegistrationDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        {/* Is New Vehicle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isNew"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
            className="w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="isNew" className="ml-2 text-dark-700">
            Véhicule neuf
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isCalculating}
          className="w-full btn-primary flex items-center justify-center"
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calcul en cours...
            </>
          ) : (
            'Calculer le prix'
          )}
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl animate-fade-in">
          <h3 className="text-xl font-bold text-dark-900 mb-4">
            Estimation pour {result.details.departmentName}
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-primary-100">
              <span className="text-dark-600">Taxe régionale</span>
              <span className="font-semibold text-dark-900">{result.regionalTax.toFixed(2)} €</span>
            </div>
            
            {result.details.exonerationApplied && (
              <div className="flex justify-between items-center py-2 border-b border-primary-100 text-success">
                <span>Exonération véhicule propre ({result.details.exonerationRate}%)</span>
                <span className="font-semibold">Appliquée</span>
              </div>
            )}

            {result.details.ageReduction && (
              <div className="flex justify-between items-center py-2 border-b border-primary-100 text-info">
                <span>Réduction ancienneté ({result.details.vehicleAge} ans)</span>
                <span className="font-semibold">-{result.details.ageReduction}%</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-primary-100">
              <span className="text-dark-600">Frais de gestion</span>
              <span className="font-semibold text-dark-900">{result.managementFee.toFixed(2)} €</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-primary-100">
              <span className="text-dark-600">Frais d&apos;acheminement</span>
              <span className="font-semibold text-dark-900">{result.deliveryFee.toFixed(2)} €</span>
            </div>
            
            {result.ecoMalus > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-primary-100 text-warning">
                <span>Malus écologique</span>
                <span className="font-semibold">{result.ecoMalus.toFixed(2)} €</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-4 bg-primary-500 -mx-6 px-6 rounded-b-xl text-white mt-4">
              <span className="text-lg font-bold">TOTAL</span>
              <span className="text-2xl font-bold">{result.totalAmount.toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/demarches" className="btn-secondary inline-block">
              Commencer ma démarche
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
