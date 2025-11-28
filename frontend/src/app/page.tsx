import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { TaxSimulator } from '@/components/simulator';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Rapide',
    description: 'Obtenez votre carte grise en 24h. Service express disponible.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Sécurisé',
    description: 'Paiement sécurisé et données chiffrées. Conformité RGPD garantie.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Agréé',
    description: 'Service habilité par le Ministère de l\'Intérieur.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Support',
    description: 'Assistance disponible du lundi au vendredi de 9h à 18h.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Simulez',
    description: 'Calculez le prix de votre carte grise en quelques clics grâce à notre simulateur.',
  },
  {
    number: '02',
    title: 'Remplissez',
    description: 'Complétez le formulaire en ligne et téléchargez vos documents.',
  },
  {
    number: '03',
    title: 'Payez',
    description: 'Réglez en toute sécurité par carte bancaire ou virement.',
  },
  {
    number: '04',
    title: 'Recevez',
    description: 'Recevez votre carte grise directement chez vous par courrier sécurisé.',
  },
];

const testimonials = [
  {
    name: 'Marie D.',
    location: 'Paris',
    text: 'Service impeccable ! J\'ai reçu ma carte grise en 48h. Je recommande vivement.',
    rating: 5,
  },
  {
    name: 'Pierre L.',
    location: 'Lyon',
    text: 'Très simple et rapide. Le simulateur m\'a permis de connaître le prix exact avant de commander.',
    rating: 5,
  },
  {
    name: 'Sophie M.',
    location: 'Marseille',
    text: 'Excellent support client. Ils m\'ont aidé à résoudre un problème avec mes documents.',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-hero-pattern py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-900/90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                Votre carte grise<br />
                <span className="text-secondary-400">en toute simplicité</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8 animate-slide-up">
                Effectuez vos démarches d&apos;immatriculation en ligne, rapidement et en toute sécurité. 
                Service agréé par le Ministère de l&apos;Intérieur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link href="/simulateur" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Simuler le prix
                </Link>
                <Link href="/demarches" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                  Commencer ma démarche
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Pourquoi nous choisir ?</h2>
              <p className="section-subtitle">
                Une solution complète pour toutes vos démarches de carte grise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card text-center group">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 mb-2">{feature.title}</h3>
                  <p className="text-dark-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section className="py-20 bg-gradient-to-b from-dark-50 to-white" id="simulateur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TaxSimulator />
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Comment ça marche ?</h2>
              <p className="section-subtitle">
                4 étapes simples pour obtenir votre carte grise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary-100 mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold text-dark-900 mb-2">{step.title}</h3>
                    <p className="text-dark-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <svg className="w-full h-4 text-primary-200" viewBox="0 0 100 20">
                        <path d="M0 10 L90 10 L85 5 M90 10 L85 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Ce que disent nos clients</h2>
              <p className="section-subtitle">
                Plus de 50 000 clients satisfaits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-dark-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-dark-900">{testimonial.name}</p>
                      <p className="text-sm text-dark-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-hero-pattern relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/95 to-primary-800/95"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à obtenir votre carte grise ?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Commencez dès maintenant et recevez votre carte grise en 24 à 48h.
            </p>
            <Link href="/demarches" className="inline-block bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Commencer ma démarche
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
