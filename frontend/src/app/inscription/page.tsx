'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InscriptionPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    isProfessional: false,
    companyName: '',
    siretNumber: '',
    rgpdConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email invalide';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!formData.rgpdConsent) {
      newErrors.rgpdConsent = 'Vous devez accepter la politique de confidentialité';
    }
    if (formData.isProfessional) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Le nom de l\'entreprise est requis';
      }
      if (!/^\d{14}$/.test(formData.siretNumber)) {
        newErrors.siretNumber = 'Le numéro SIRET doit contenir 14 chiffres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: redirect to success
    alert('Compte créé avec succès ! Vous allez recevoir un email de confirmation.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-600 to-primary-900">
      <div className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">Carte Grise</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-dark-900 text-center mb-2">
              Créer un compte
            </h1>
            <p className="text-dark-500 text-center mb-8">
              Rejoignez-nous pour gérer vos démarches
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Account type toggle */}
              <div className="flex bg-dark-100 rounded-lg p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isProfessional: false }))}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    !formData.isProfessional
                      ? 'bg-white text-dark-900 shadow'
                      : 'text-dark-500 hover:text-dark-700'
                  }`}
                >
                  Particulier
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isProfessional: true }))}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.isProfessional
                      ? 'bg-white text-dark-900 shadow'
                      : 'text-dark-500 hover:text-dark-700'
                  }`}
                >
                  Professionnel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="input-label">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jean"
                    className={`input-field ${errors.firstName ? 'input-error' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-error text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="input-label">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Dupont"
                    className={`input-field ${errors.lastName ? 'input-error' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-error text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="input-label">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="vous@exemple.fr"
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="input-label">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33 6 12 34 56 78"
                  className="input-field"
                />
              </div>

              {formData.isProfessional && (
                <>
                  <div>
                    <label htmlFor="companyName" className="input-label">
                      Nom de l&apos;entreprise *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Ma Société SARL"
                      className={`input-field ${errors.companyName ? 'input-error' : ''}`}
                    />
                    {errors.companyName && (
                      <p className="text-error text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="siretNumber" className="input-label">
                      Numéro SIRET *
                    </label>
                    <input
                      type="text"
                      id="siretNumber"
                      name="siretNumber"
                      value={formData.siretNumber}
                      onChange={handleChange}
                      required
                      placeholder="12345678901234"
                      maxLength={14}
                      className={`input-field ${errors.siretNumber ? 'input-error' : ''}`}
                    />
                    {errors.siretNumber && (
                      <p className="text-error text-sm mt-1">{errors.siretNumber}</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="input-label">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-dark-400 text-xs mt-1">
                  Au moins 8 caractères avec majuscule, chiffre et caractère spécial
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="input-label">
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                />
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  id="rgpdConsent"
                  name="rgpdConsent"
                  checked={formData.rgpdConsent}
                  onChange={handleChange}
                  className={`mt-1 w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500 ${
                    errors.rgpdConsent ? 'border-error' : ''
                  }`}
                />
                <label htmlFor="rgpdConsent" className="ml-2 text-sm text-dark-600">
                  J&apos;accepte la{' '}
                  <Link href="/confidentialite" className="text-primary-500 hover:underline">
                    politique de confidentialité
                  </Link>{' '}
                  et les{' '}
                  <Link href="/cgv" className="text-primary-500 hover:underline">
                    conditions générales
                  </Link>
                  {' '}*
                </label>
              </div>
              {errors.rgpdConsent && (
                <p className="text-error text-sm -mt-3">{errors.rgpdConsent}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-500">
                Déjà un compte ?{' '}
                <Link href="/connexion" className="text-primary-500 hover:text-primary-600 font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-white/80 hover:text-white text-sm">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
