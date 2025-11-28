"use client";

import { useState } from "react";
import { createDossier } from "@/lib/dossiers";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

type FormData = {
  // Étape 1 : Véhicule
  marque: string;
  modele: string;
  vin: string;
  puissanceFiscale: number;
  co2: number;
  origine: string;
  importType: "NONE" | "UE" | "HORS_UE";
  // Étape 2 : Propriétaire
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  // Étape 3 : Documents
  documentIds: string[];
};

const initialData: FormData = {
  marque: "",
  modele: "",
  vin: "",
  puissanceFiscale: 7,
  co2: 110,
  origine: "FR",
  importType: "NONE",
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  adresse: "",
  codePostal: "",
  ville: "",
  documentIds: []
};

export function DossierForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep((step + 1) as Step);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/auth');
        return;
      }
      const userId = JSON.parse(user).id;
      
      await createDossier({
        userId,
        region: "idf",
        marque: formData.marque,
        modele: formData.modele,
        vin: formData.vin || undefined,
        puissanceFiscale: formData.puissanceFiscale,
        co2: formData.co2,
        origine: formData.origine,
        importType: formData.importType
      });
      router.push("/");
    } catch (err) {
      setError("Erreur lors de la création du dossier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-steel bg-white/5 p-8 shadow-xl">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white">Nouveau dossier carte grise</h2>
        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                s <= step ? "bg-accent" : "bg-steel"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Étape {step} / 3 :{" "}
          {step === 1 ? "Véhicule" : step === 2 ? "Propriétaire" : "Documents"}
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {step === 1 && (
          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Marque *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.marque}
                  onChange={(e) => updateField("marque", e.target.value)}
                />
              </label>
              <label className="text-sm text-slate-200">
                Modèle *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.modele}
                  onChange={(e) => updateField("modele", e.target.value)}
                />
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Numéro VIN (optionnel)
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                value={formData.vin}
                onChange={(e) => updateField("vin", e.target.value)}
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Puissance fiscale (CV) *
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.puissanceFiscale}
                  onChange={(e) => updateField("puissanceFiscale", Number(e.target.value))}
                />
              </label>
              <label className="text-sm text-slate-200">
                Émissions CO₂ (g/km) *
                <input
                  type="number"
                  min={0}
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.co2}
                  onChange={(e) => updateField("co2", Number(e.target.value))}
                />
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Type de véhicule *
              <select
                className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                value={formData.importType}
                onChange={(e) => updateField("importType", e.target.value)}
              >
                <option value="NONE">France</option>
                <option value="UE">Import UE</option>
                <option value="HORS_UE">Import hors UE</option>
              </select>
            </label>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Nom *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.nom}
                  onChange={(e) => updateField("nom", e.target.value)}
                />
              </label>
              <label className="text-sm text-slate-200">
                Prénom *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.prenom}
                  onChange={(e) => updateField("prenom", e.target.value)}
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Email *
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </label>
              <label className="text-sm text-slate-200">
                Téléphone *
                <input
                  type="tel"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.telephone}
                  onChange={(e) => updateField("telephone", e.target.value)}
                />
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Adresse *
              <input
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                value={formData.adresse}
                onChange={(e) => updateField("adresse", e.target.value)}
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Code postal *
                <input
                  type="text"
                  required
                  pattern="[0-9]{5}"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.codePostal}
                  onChange={(e) => updateField("codePostal", e.target.value)}
                />
              </label>
              <label className="text-sm text-slate-200">
                Ville *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.ville}
                  onChange={(e) => updateField("ville", e.target.value)}
                />
              </label>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-4">
            <div className="rounded-xl border border-white/20 bg-midnight/50 p-6">
              <h3 className="text-lg font-semibold text-white">Documents requis</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>✓ Justificatif d'identité (CNI, Passeport)</li>
                <li>✓ Justificatif de domicile (-3 mois)</li>
                <li>✓ Certificat de cession ou facture d'achat</li>
                <li>✓ Contrôle technique (si &gt; 4 ans)</li>
                {formData.importType !== "NONE" && <li>✓ Quitus fiscal (import)</li>}
              </ul>
              <div className="mt-6">
                <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/30 bg-white/5 p-8 transition hover:border-accent">
                  <span className="text-sm font-semibold text-slate-200">
                    📎 Cliquez pour ajouter vos documents
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      // TODO: gérer upload documents
                      console.log(e.target.files);
                    }}
                  />
                </label>
                <p className="mt-2 text-center text-xs text-slate-400">
                  Formats acceptés : PDF, JPG, PNG. Maximum 10 Mo par fichier.
                </p>
              </div>
            </div>
          </section>
        )}

        <footer className="flex items-center justify-between border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Précédent
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-500"
            >
              Suivant →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer le dossier"}
            </button>
          )}
        </footer>
      </form>
    </div>
  );
}
