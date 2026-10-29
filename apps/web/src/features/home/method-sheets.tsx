import { Badge } from "@repo/ui/components/badge";
import { BrushGrid } from "@repo/ui/components/brush-grid";
import { FolderSheet } from "@repo/ui/components/folder-sheet";
import { Note } from "@repo/ui/components/note";
import { TextLink } from "@repo/ui/components/text-link";
import { Stack } from "@repo/ui/layout/stack";

import { sectionHref } from "./links";
import { construction, evolution, immersion } from "./method-content";
import { SheetAside, SheetIntro } from "./method-sheet-parts";

export function ImmersionSheet() {
  return (
    <FolderSheet kanji={immersion.folder.kanji} aria-labelledby={immersion.sheet.id}>
      <SheetIntro sheet={immersion.sheet}>
        <TextLink href={sectionHref.faq}>{immersion.link}</TextLink>
      </SheetIntro>
      <SheetAside aside={immersion.aside}>
        <Note>{immersion.price}</Note>
      </SheetAside>
    </FolderSheet>
  );
}

export function ConstructionSheet() {
  return (
    <FolderSheet
      kanji={construction.folder.kanji}
      layout="feature"
      aria-labelledby={construction.sheet.id}
    >
      <SheetIntro sheet={construction.sheet}>
        <Stack as="ul" gap="xs" align="start">
          {construction.chips.map((chip) => (
            <li key={chip}>
              <Badge variant="outline">{chip}</Badge>
            </li>
          ))}
        </Stack>
      </SheetIntro>
      <BrushGrid
        bricks={construction.bricks}
        stamp={construction.stamp}
        caption={construction.caption}
      />
    </FolderSheet>
  );
}

export function EvolutionSheet() {
  return (
    <FolderSheet kanji={evolution.folder.kanji} aria-labelledby={evolution.sheet.id}>
      <SheetIntro sheet={evolution.sheet} />
      <SheetAside aside={evolution.aside} />
    </FolderSheet>
  );
}
