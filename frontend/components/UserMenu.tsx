"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/lib/auth";

export function UserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 rounded-full border border-white/20 bg-steel/90 px-4 py-2 text-sm text-white backdrop-blur">
      <span>
        {user.prenom} {user.nom}
      </span>
      <button
        onClick={logout}
        className="rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase transition hover:bg-orange-500"
      >
        Déconnexion
      </button>
    </div>
  );
}
