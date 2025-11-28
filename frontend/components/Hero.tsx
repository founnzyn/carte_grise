"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-steel bg-gradient-to-br from-steel to-midnight p-10 shadow-lg">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.4em] text-accentSoft">Carte grise premium</p>
        <h1 className="mt-4 text-4xl font-display leading-tight text-white md:text-5xl">
          Simulez, déposez et suivez vos démarches carte grise en un seul espace sécurisé.
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          Prise en charge complète sur le territoire français, import UE/hors UE, notifications pro à chaque étape.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#simulateur"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-500"
          >
            Lancer une simulation
          </Link>
          <Link
            href="/auth"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-accent"
          >
            Se connecter
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 top-1/2 hidden translate-y-[-50%] rotate-6 blur-[2px] md:block">
        <div className="h-48 w-96 rounded-full border border-accent/30 bg-white/5 backdrop-blur" />
      </div>
    </section>
  );
}
