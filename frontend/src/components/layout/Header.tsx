'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Simulateur', href: '/simulateur' },
  { name: 'Démarches', href: '/demarches' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-dark-900">Carte Grise</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-dark-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/connexion" className="text-dark-600 hover:text-primary-500 font-medium">
              Connexion
            </Link>
            <Link href="/inscription" className="btn-primary text-sm py-2">
              Créer un compte
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-dark-500 hover:text-dark-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-100 animate-slide-down">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-dark-600 hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-dark-100 mt-4 space-y-2">
                <Link
                  href="/connexion"
                  className="block px-4 py-2 text-dark-600 hover:bg-primary-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className="block mx-4 text-center btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
