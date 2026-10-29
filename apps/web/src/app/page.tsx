import { ActionChapter } from "@/features/home/action-chapter";
import { MethodChapter } from "@/features/home/method-chapter";
import { OpeningChapter } from "@/features/home/opening-chapter";
import { OutcomeChapter } from "@/features/home/outcome-chapter";
import { ProblemChapter } from "@/features/home/problem-chapter";
import { SiteFooter } from "@/features/home/site-footer";
import { SiteHeader } from "@/features/home/site-header";
import { TrustChapter } from "@/features/home/trust-chapter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <OpeningChapter />
        <ProblemChapter />
        <OutcomeChapter />
        <MethodChapter />
        <TrustChapter />
        <ActionChapter />
      </main>
      <SiteFooter />
    </>
  );
}
