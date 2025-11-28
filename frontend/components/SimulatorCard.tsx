"use client";

import { useState } from "react";
import { simulateCarteGrise, type SimulationResponse } from "@/lib/api";

type FormState = {
  region: string;
  puissance: number;
  co2: number;
  importType: "none" | "ue" | "hors_ue";
};

const initialState: FormState = {
  region: "idf",
  puissance: 7,
  co2: 110,
  importType: "none"
};

export function SimulatorCard() {
  const [form, setForm] = useState<FormState>(initialState);
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulateCarteGrise(form);
      setResult(data);
    } catch (err) {
      setError("Impossible de calculer l'estimation. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="simulateur" className="rounded-3xl border border-steel bg-white/10 p-6 shadow-xl">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Simulateur express</h2>
        <p className="text-sm text-slate-200">Résultat indicatif. Les taxes finales dépendront des barèmes officiels.</p>
      </header>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <label className="text-sm text-slate-200">
          Région
          <select
            className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
            value={form.region}
            onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
          >
            <option value="idf">Île-de-France</option>
            <option value="paca">Provence-Alpes-Côte d’Azur</option>
            <option value="na">Nouvelle-Aquitaine</option>
          </select>
        </label>
        <label className="text-sm text-slate-200">
          Puissance fiscale (CV)
          <input
            type="number"
            min={1}
            max={20}
            className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
            value={form.puissance}
            onChange={(e) => setForm((prev) => ({ ...prev, puissance: Number(e.target.value) }))}
          />
        </label>
        <label className="text-sm text-slate-200">
          CO₂ (g/km)
          <input
            type="number"
            min={0}
            className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
            value={form.co2}
            onChange={(e) => setForm((prev) => ({ ...prev, co2: Number(e.target.value) }))}
          />
        </label>
        <label className="text-sm text-slate-200">
          Import
          <select
            className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
            value={form.importType}
            onChange={(e) => setForm((prev) => ({ ...prev, importType: e.target.value as FormState["importType"] }))}
          >
            <option value="none">France</option>
            <option value="ue">Import UE</option>
            <option value="hors_ue">Import hors UE</option>
          </select>
        </label>
      </form>
      
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-white/20 bg-midnight/70 p-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Estimation TTC</p>
        <p className="mt-2 text-4xl font-display text-accent">
          {loading ? "..." : result ? `${result.total} €` : "—"}
        </p>
        {result && (
          <div className="mt-4 space-y-1 text-left text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Taxe régionale :</span>
              <span>{result.breakdown.taxeRegionale.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Taxe CO₂ :</span>
              <span>{result.breakdown.taxeCo2.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Frais import :</span>
              <span>{result.breakdown.fraisImport.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Frais dossier :</span>
              <span>{result.breakdown.fraisDossier.toFixed(2)} €</span>
            </div>
          </div>
        )}
        <p className="mt-3 text-xs text-slate-400">
          Frais dossier inclus. Les montants finaux seront calculés à partir des barèmes officiels synchronisés côté serveur.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={loading}
            className="flex-1 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Calcul..." : "Calculer"}
          </button>
          {result && (
            <a
              href="/dossier"
              className="flex-1 rounded-full border border-accent bg-transparent px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-accent transition hover:bg-accent hover:text-white"
            >
              Créer mon dossier
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
