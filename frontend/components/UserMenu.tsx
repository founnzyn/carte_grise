"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth";

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 rounded-full border border-white/20 bg-steel/90 px-4 py-2 text-sm text-white backdrop-blur">
      {isAdmin && (
        <span className="rounded-full bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-300">
          👑 ADMIN
        </span>
      )}
      <span>
        {user.prenom} {user.nom}
      </span>
      {isAdmin && (
        <button
          onClick={() => router.push("/admin")}
          className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold uppercase transition hover:bg-blue-500"
        >
          Administration
        </button>
      )}
      <button
        onClick={logout}
        className="rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase transition hover:bg-orange-500"
      >
        Déconnexion
      </button>
    </div>
  );
}
