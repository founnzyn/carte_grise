"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        const result = await login({ email: formData.email, password: formData.password });
        localStorage.setItem("auth_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        router.push("/");
      } else {
        const result = await register(formData);
        localStorage.setItem("auth_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        router.push("/");
      }
    } catch (err) {
      setError(mode === "login" ? "Identifiants invalides." : "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-12">
      <div className="w-full rounded-3xl border border-steel bg-white/5 p-8 shadow-xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-display text-white">
            {mode === "login" ? "Connexion" : "Inscription"}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            {mode === "login"
              ? "Accédez à votre espace personnel"
              : "Créez votre compte en quelques secondes"}
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <label className="block text-sm text-slate-200">
                Nom *
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                />
              </label>
              <label className="block text-sm text-slate-200">
                Prénom
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                />
              </label>
            </>
          )}

          <label className="block text-sm text-slate-200">
            Email *
            <input
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>

          <label className="block text-sm text-slate-200">
            Mot de passe *
            <input
              type="password"
              required
              minLength={6}
              className="mt-2 w-full rounded-xl border border-white/20 bg-steel/70 p-3 text-white"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-slate-300">
          {mode === "login" ? (
            <>
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-semibold text-accent hover:underline"
              >
                Inscrivez-vous
              </button>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-accent hover:underline"
              >
                Connectez-vous
              </button>
            </>
          )}
        </footer>
      </div>
    </main>
  );
}
