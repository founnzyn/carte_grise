'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConnexionPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: show error for now
    setError('Identifiants invalides. Veuillez réessayer.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-600 to-primary-900">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
              Connexion
            </h1>
            <p className="text-dark-500 text-center mb-8">
              Accédez à votre espace personnel
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="input-label">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="vous@exemple.fr"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="password" className="input-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-dark-600">
                    Se souvenir de moi
                  </label>
                </div>
                <Link href="/mot-de-passe-oublie" className="text-sm text-primary-500 hover:text-primary-600">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-500">
                Pas encore de compte ?{' '}
                <Link href="/inscription" className="text-primary-500 hover:text-primary-600 font-medium">
                  Créer un compte
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
