import { Hero } from "@/components/Hero";
import { SimulatorCard } from "@/components/SimulatorCard";
import { StatsBar } from "@/components/StatsBar";
import { Steps } from "@/components/Steps";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
      <Hero />
      <StatsBar />
      <Steps />
      <SimulatorCard />
    </main>
  );
}
