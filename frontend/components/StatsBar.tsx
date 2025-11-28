const stats = [
  { label: "Dossiers traités", value: "15 200+" },
  { label: "Temps moyen", value: "48h" },
  { label: "Satisfaction", value: "4.9/5" }
];

export function StatsBar() {
  return (
    <section className="grid gap-4 rounded-2xl border border-steel bg-steel/60 p-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl font-display text-accent">{stat.value}</p>
          <p className="text-sm text-slate-300">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
