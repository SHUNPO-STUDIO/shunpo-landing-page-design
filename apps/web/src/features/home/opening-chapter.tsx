import { ClientsSection } from "./clients-section";
import { FilmSection } from "./film-section";
import { HeroSection } from "./hero-section";

export function OpeningChapter() {
  return (
    <>
      <HeroSection />
      <FilmSection />
      <ClientsSection />
    </>
  );
}
