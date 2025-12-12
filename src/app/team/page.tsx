import { Header, Footer, TeamHero, TeamGrid } from "@/components";

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <TeamHero />
        <TeamGrid />
      </main>
      <Footer />
    </>
  );
}

