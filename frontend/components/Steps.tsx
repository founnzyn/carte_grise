const steps = [
  {
    title: "Simulation instantanée",
    desc: "Calcul précis des taxes régionales, bonus/malus et frais administratifs.",
    tag: "Étape 1"
  },
  {
    title: "Dossier numérique sécurisé",
    desc: "Formulaire guidé, upload des pièces, validations automatiques.",
    tag: "Étape 2"
  },
  {
    title: "Suivi pro",
    desc: "Notifications email/SMS, export ANTS interne, traçabilité complète.",
    tag: "Étape 3"
  }
];

export function Steps() {
  return (
    <section className="grid gap-6 md:grid-cols-3" aria-label="Processus Carte Grise Premium">
      {steps.map((step) => (
        <article key={step.title} className="rounded-3xl border border-steel bg-white/5 p-6 shadow-inner">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accentSoft">{step.tag}</span>
          <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm text-slate-200">{step.desc}</p>
        </article>
      ))}
    </section>
  );
}
