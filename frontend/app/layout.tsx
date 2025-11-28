import type { Metadata } from "next";
import { UserMenu } from "@/components/UserMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carte Grise Premium",
  description: "Simulez et pilotez vos démarches carte grise en toute sérénité.",
  metadataBase: new URL("https://carte-grise.example")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-midnight text-white antialiased">
        <UserMenu />
        {children}
      </body>
    </html>
  );
}
