import { Header, Footer } from '@/components/layout';
import { TaxSimulator } from '@/components/simulator';

export default function SimulateurPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark-900 mb-4">
              Simulateur de Carte Grise
            </h1>
            <p className="text-lg text-dark-500 max-w-2xl mx-auto">
              Calculez gratuitement le coût de votre carte grise en quelques clics. 
              Notre simulateur utilise les taux officiels en vigueur.
            </p>
          </div>

          <TaxSimulator />

          {/* Additional information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dark-900 mb-2">Calcul officiel</h3>
              <p className="text-dark-500 text-sm">
                Nos tarifs sont basés sur les taux officiels publiés par les conseils régionaux.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dark-900 mb-2">Aucun frais caché</h3>
              <p className="text-dark-500 text-sm">
                Le prix affiché comprend toutes les taxes et frais de service.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-dark-900 mb-2">Mise à jour régulière</h3>
              <p className="text-dark-500 text-sm">
                Les taux sont automatiquement mis à jour lors des changements réglementaires.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-dark-900 mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <details className="card group">
                <summary className="font-semibold text-dark-900 cursor-pointer list-none flex justify-between items-center">
                  Comment est calculé le prix de la carte grise ?
                  <svg className="w-5 h-5 text-dark-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-dark-600">
                  Le prix d&apos;une carte grise dépend de plusieurs facteurs : la puissance fiscale du véhicule, 
                  le taux de taxe régionale de votre département, le type de carburant, l&apos;âge du véhicule, 
                  et éventuellement le malus écologique pour les véhicules neufs.
                </p>
              </details>

              <details className="card group">
                <summary className="font-semibold text-dark-900 cursor-pointer list-none flex justify-between items-center">
                  Les véhicules électriques sont-ils exonérés ?
                  <svg className="w-5 h-5 text-dark-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-dark-600">
                  Oui, dans la plupart des régions françaises, les véhicules électriques et à hydrogène 
                  bénéficient d&apos;une exonération totale (100%) de la taxe régionale. Les véhicules hybrides 
                  peuvent bénéficier d&apos;une exonération partielle de 50%.
                </p>
              </details>

              <details className="card group">
                <summary className="font-semibold text-dark-900 cursor-pointer list-none flex justify-between items-center">
                  Comment fonctionne la réduction pour ancienneté ?
                  <svg className="w-5 h-5 text-dark-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-dark-600">
                  Pour les véhicules d&apos;occasion, une réduction de 10% par année d&apos;ancienneté est appliquée 
                  sur la taxe régionale, jusqu&apos;à un maximum de 50% pour les véhicules de plus de 10 ans.
                </p>
              </details>

              <details className="card group">
                <summary className="font-semibold text-dark-900 cursor-pointer list-none flex justify-between items-center">
                  Qu&apos;est-ce que le malus écologique ?
                  <svg className="w-5 h-5 text-dark-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-dark-600">
                  Le malus écologique est une taxe additionnelle applicable aux véhicules neufs dont les 
                  émissions de CO2 dépassent un certain seuil (118 g/km en 2024). Le montant augmente 
                  progressivement avec le niveau d&apos;émissions, pouvant atteindre 60 000 € pour les 
                  véhicules les plus polluants.
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
