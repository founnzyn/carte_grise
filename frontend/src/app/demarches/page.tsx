'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';

type FuelType = 'ESSENCE' | 'DIESEL' | 'HYBRIDE' | 'ELECTRIQUE' | 'GPL' | 'HYDROGENE' | 'AUTRE';
type TransactionType = 'ACHAT_NEUF' | 'ACHAT_OCCASION' | 'CHANGEMENT_ADRESSE' | 'DUPLICATA' | 'CESSION' | 'HERITAGE';

interface FormData {
  // Step 1 - Transaction Type
  transactionType: TransactionType | '';
  
  // Step 2 - Vehicle Info
  registrationNumber: string;
  vin: string;
  brand: string;
  model: string;
  fiscalPower: string;
  fuelType: FuelType | '';
  co2Emissions: string;
  firstRegistrationDate: string;
  isNew: boolean;
  
  // Step 3 - Owner Info
  ownerFirstName: string;
  ownerLastName: string;
  ownerBirthDate: string;
  ownerBirthPlace: string;
  ownerAddress: string;
  ownerPostalCode: string;
  ownerCity: string;
  
  // Step 4 - Documents
  identityDocument: File | null;
  addressProof: File | null;
  vehicleTitle: File | null;
  cessionCertificate: File | null;
}

const initialFormData: FormData = {
  transactionType: '',
  registrationNumber: '',
  vin: '',
  brand: '',
  model: '',
  fiscalPower: '',
  fuelType: '',
  co2Emissions: '',
  firstRegistrationDate: '',
  isNew: false,
  ownerFirstName: '',
  ownerLastName: '',
  ownerBirthDate: '',
  ownerBirthPlace: '',
  ownerAddress: '',
  ownerPostalCode: '',
  ownerCity: '',
  identityDocument: null,
  addressProof: null,
  vehicleTitle: null,
  cessionCertificate: null,
};

const steps = [
  { id: 1, name: 'Type de démarche' },
  { id: 2, name: 'Véhicule' },
  { id: 3, name: 'Propriétaire' },
  { id: 4, name: 'Documents' },
  { id: 5, name: 'Récapitulatif' },
];

const transactionTypes = [
  { value: 'ACHAT_NEUF', label: 'Achat véhicule neuf', icon: '🚗', description: 'Première immatriculation d\'un véhicule neuf' },
  { value: 'ACHAT_OCCASION', label: 'Achat véhicule d\'occasion', icon: '🔄', description: 'Changement de propriétaire pour un véhicule d\'occasion' },
  { value: 'CHANGEMENT_ADRESSE', label: 'Changement d\'adresse', icon: '📍', description: 'Mise à jour de l\'adresse sur votre carte grise' },
  { value: 'DUPLICATA', label: 'Duplicata', icon: '📋', description: 'Demande d\'un duplicata de carte grise' },
  { value: 'CESSION', label: 'Cession', icon: '🤝', description: 'Déclaration de vente de votre véhicule' },
  { value: 'HERITAGE', label: 'Héritage', icon: '📜', description: 'Transmission suite à succession' },
];

const fuelTypes = [
  { value: 'ESSENCE', label: 'Essence' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'HYBRIDE', label: 'Hybride' },
  { value: 'ELECTRIQUE', label: 'Électrique' },
  { value: 'GPL', label: 'GPL' },
  { value: 'HYDROGENE', label: 'Hydrogène' },
  { value: 'AUTRE', label: 'Autre' },
];

export default function DemarchesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleTransactionTypeSelect = (type: TransactionType) => {
    setFormData(prev => ({ ...prev, transactionType: type }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Redirect to success page or dashboard
    alert('Dossier soumis avec succès! Vous recevrez un email de confirmation.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">
              Quel type de démarche souhaitez-vous effectuer ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transactionTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTransactionTypeSelect(type.value as TransactionType)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    formData.transactionType === type.value
                      ? 'border-primary-500 bg-primary-50 shadow-lg'
                      : 'border-dark-200 hover:border-primary-300 hover:bg-dark-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <h3 className="font-semibold text-dark-900 mb-1">{type.label}</h3>
                  <p className="text-sm text-dark-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">
              Informations sur le véhicule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="registrationNumber" className="input-label">
                  Numéro d&apos;immatriculation (optionnel)
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="AB-123-CD"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="vin" className="input-label">
                  Numéro VIN (optionnel)
                </label>
                <input
                  type="text"
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="VF1..."
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="brand" className="input-label">
                  Marque *
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Renault"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="model" className="input-label">
                  Modèle *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Clio"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="fiscalPower" className="input-label">
                  Puissance fiscale (CV) *
                </label>
                <input
                  type="number"
                  id="fiscalPower"
                  name="fiscalPower"
                  value={formData.fiscalPower}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="100"
                  placeholder="Ex: 7"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="fuelType" className="input-label">
                  Type de carburant *
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">Sélectionnez</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="co2Emissions" className="input-label">
                  Émissions CO2 (g/km)
                </label>
                <input
                  type="number"
                  id="co2Emissions"
                  name="co2Emissions"
                  value={formData.co2Emissions}
                  onChange={handleInputChange}
                  min="0"
                  max="500"
                  placeholder="Ex: 120"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="firstRegistrationDate" className="input-label">
                  Date 1ère immatriculation
                </label>
                <input
                  type="date"
                  id="firstRegistrationDate"
                  name="firstRegistrationDate"
                  value={formData.firstRegistrationDate}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isNew"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isNew" className="ml-2 text-dark-700">
                Véhicule neuf
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">
              Informations sur le propriétaire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ownerFirstName" className="input-label">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="ownerFirstName"
                  name="ownerFirstName"
                  value={formData.ownerFirstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Jean"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="ownerLastName" className="input-label">
                  Nom *
                </label>
                <input
                  type="text"
                  id="ownerLastName"
                  name="ownerLastName"
                  value={formData.ownerLastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Dupont"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="ownerBirthDate" className="input-label">
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="ownerBirthDate"
                  name="ownerBirthDate"
                  value={formData.ownerBirthDate}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="ownerBirthPlace" className="input-label">
                  Lieu de naissance
                </label>
                <input
                  type="text"
                  id="ownerBirthPlace"
                  name="ownerBirthPlace"
                  value={formData.ownerBirthPlace}
                  onChange={handleInputChange}
                  placeholder="Paris"
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="ownerAddress" className="input-label">
                  Adresse *
                </label>
                <input
                  type="text"
                  id="ownerAddress"
                  name="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="12 rue de la Paix"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="ownerPostalCode" className="input-label">
                  Code postal *
                </label>
                <input
                  type="text"
                  id="ownerPostalCode"
                  name="ownerPostalCode"
                  value={formData.ownerPostalCode}
                  onChange={handleInputChange}
                  required
                  placeholder="75001"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="ownerCity" className="input-label">
                  Ville *
                </label>
                <input
                  type="text"
                  id="ownerCity"
                  name="ownerCity"
                  value={formData.ownerCity}
                  onChange={handleInputChange}
                  required
                  placeholder="Paris"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">
              Documents justificatifs
            </h2>
            <p className="text-dark-500 mb-6">
              Veuillez télécharger les documents requis pour votre démarche. 
              Formats acceptés: PDF, JPG, PNG (max 10 Mo par fichier).
            </p>
            <div className="space-y-6">
              <div className="card">
                <label htmlFor="identityDocument" className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-dark-900">Pièce d&apos;identité *</h3>
                    <p className="text-sm text-dark-500">Carte d&apos;identité ou passeport en cours de validité</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${formData.identityDocument ? 'bg-success text-white' : 'bg-primary-100 text-primary-600'}`}>
                    {formData.identityDocument ? '✓ Téléchargé' : 'Parcourir'}
                  </div>
                </label>
                <input
                  type="file"
                  id="identityDocument"
                  name="identityDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>

              <div className="card">
                <label htmlFor="addressProof" className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-dark-900">Justificatif de domicile *</h3>
                    <p className="text-sm text-dark-500">Facture de moins de 6 mois (électricité, gaz, téléphone...)</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${formData.addressProof ? 'bg-success text-white' : 'bg-primary-100 text-primary-600'}`}>
                    {formData.addressProof ? '✓ Téléchargé' : 'Parcourir'}
                  </div>
                </label>
                <input
                  type="file"
                  id="addressProof"
                  name="addressProof"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>

              <div className="card">
                <label htmlFor="vehicleTitle" className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-dark-900">Carte grise du véhicule</h3>
                    <p className="text-sm text-dark-500">Ancien certificat d&apos;immatriculation (si applicable)</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${formData.vehicleTitle ? 'bg-success text-white' : 'bg-primary-100 text-primary-600'}`}>
                    {formData.vehicleTitle ? '✓ Téléchargé' : 'Parcourir'}
                  </div>
                </label>
                <input
                  type="file"
                  id="vehicleTitle"
                  name="vehicleTitle"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>

              <div className="card">
                <label htmlFor="cessionCertificate" className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-dark-900">Certificat de cession</h3>
                    <p className="text-sm text-dark-500">Document de vente signé par l&apos;ancien propriétaire</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${formData.cessionCertificate ? 'bg-success text-white' : 'bg-primary-100 text-primary-600'}`}>
                    {formData.cessionCertificate ? '✓ Téléchargé' : 'Parcourir'}
                  </div>
                </label>
                <input
                  type="file"
                  id="cessionCertificate"
                  name="cessionCertificate"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">
              Récapitulatif de votre demande
            </h2>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-dark-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Type de démarche
                </h3>
                <p className="text-dark-600 ml-11">
                  {transactionTypes.find(t => t.value === formData.transactionType)?.label || 'Non renseigné'}
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Véhicule
                </h3>
                <div className="ml-11 grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-dark-500">Marque:</span> {formData.brand || 'Non renseigné'}</div>
                  <div><span className="text-dark-500">Modèle:</span> {formData.model || 'Non renseigné'}</div>
                  <div><span className="text-dark-500">Puissance:</span> {formData.fiscalPower || 'Non renseigné'} CV</div>
                  <div><span className="text-dark-500">Carburant:</span> {fuelTypes.find(f => f.value === formData.fuelType)?.label || 'Non renseigné'}</div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Propriétaire
                </h3>
                <div className="ml-11 text-sm">
                  <p className="text-dark-600">{formData.ownerFirstName} {formData.ownerLastName}</p>
                  <p className="text-dark-500">{formData.ownerAddress}</p>
                  <p className="text-dark-500">{formData.ownerPostalCode} {formData.ownerCity}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Documents
                </h3>
                <div className="ml-11 space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className={formData.identityDocument ? 'text-success' : 'text-warning'}>
                      {formData.identityDocument ? '✓' : '○'}
                    </span>
                    <span className="ml-2">Pièce d&apos;identité</span>
                  </div>
                  <div className="flex items-center">
                    <span className={formData.addressProof ? 'text-success' : 'text-warning'}>
                      {formData.addressProof ? '✓' : '○'}
                    </span>
                    <span className="ml-2">Justificatif de domicile</span>
                  </div>
                  <div className="flex items-center">
                    <span className={formData.vehicleTitle ? 'text-success' : 'text-dark-300'}>
                      {formData.vehicleTitle ? '✓' : '○'}
                    </span>
                    <span className="ml-2">Carte grise</span>
                  </div>
                  <div className="flex items-center">
                    <span className={formData.cessionCertificate ? 'text-success' : 'text-dark-300'}>
                      {formData.cessionCertificate ? '✓' : '○'}
                    </span>
                    <span className="ml-2">Certificat de cession</span>
                  </div>
                </div>
              </div>

              {/* Price estimation */}
              <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
                <h3 className="font-semibold text-dark-900 mb-4">Estimation du prix</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-dark-600">Taxe régionale</span>
                    <span className="font-medium">~ 300,00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-600">Frais de gestion</span>
                    <span className="font-medium">11,00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-600">Frais d&apos;acheminement</span>
                    <span className="font-medium">2,76 €</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-primary-200 text-lg">
                    <span className="font-bold text-dark-900">Total estimé</span>
                    <span className="font-bold text-primary-600">~ 313,76 €</span>
                  </div>
                </div>
                <p className="text-xs text-dark-500 mt-4">
                  * Le prix final sera calculé après vérification de vos informations
                </p>
              </div>

              {/* RGPD consent */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="rgpdConsent"
                  className="mt-1 w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
                  required
                />
                <label htmlFor="rgpdConsent" className="ml-2 text-sm text-dark-600">
                  J&apos;accepte que mes données personnelles soient traitées conformément à la{' '}
                  <Link href="/confidentialite" className="text-primary-500 hover:underline">
                    politique de confidentialité
                  </Link>
                  . Ces données sont nécessaires au traitement de ma demande et seront conservées pendant 3 ans conformément à la réglementation.
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`stepper-circle ${
                        currentStep > step.id
                          ? 'stepper-circle-completed'
                          : currentStep === step.id
                          ? 'stepper-circle-active'
                          : 'stepper-circle-pending'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium hidden sm:block ${
                      currentStep >= step.id ? 'text-primary-600' : 'text-dark-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`stepper-line ${
                        currentStep > step.id ? 'stepper-line-completed' : 'stepper-line-pending'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="card-premium">
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-dark-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`btn-outline ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Précédent
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === 1 && !formData.transactionType}
                  className="btn-primary"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </>
                  ) : (
                    'Soumettre ma demande'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
