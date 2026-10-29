import { BrushGrid } from "../../src/components/brush-grid.tsx";
import { FolderSheet } from "../../src/components/folder-sheet.tsx";
import { Folder } from "../../src/components/folder.tsx";
import { Note } from "../../src/components/note.tsx";
import { RuledList } from "../../src/components/ruled-list.tsx";
import { Stack } from "../../src/layout/stack.tsx";
import { Heading } from "../../src/typography/heading.tsx";
import { Text } from "../../src/typography/text.tsx";

/* Sample folders and sheets shared by the folder stories. */

export const bricks = [
  { kicker: "Brique 1", label: "Relances" },
  { kicker: "Brique 2", label: "Pièces comptables" },
  { kicker: "Brique 3", label: "Planning" },
  { kicker: "Brique 4", label: "Tableau de bord" },
];

export function SplitSheet() {
  return (
    <FolderSheet kanji="見" aria-labelledby="sample-immersion">
      <Stack gap="md">
        <Text size="sm" tone="muted">
          5 jours dans votre entreprise
        </Text>
        <Heading level={3} size="title-lg" id="sample-immersion">
          Immersion
        </Heading>
        <Text size="lg">On observe les postes et on priorise ce qui vous rendra du temps.</Text>
      </Stack>
      <Stack gap="md">
        <RuledList>
          <li>La carte de vos process</li>
          <li>Vos heures perdues, chiffrées</li>
        </RuledList>
        <Note>À partir de 5 000 € HT.</Note>
      </Stack>
    </FolderSheet>
  );
}

export function FeatureSheet() {
  return (
    <FolderSheet kanji="築" layout="feature" aria-labelledby="sample-construction">
      <Stack gap="md">
        <Heading level={3} size="title-lg" id="sample-construction">
          Construction
        </Heading>
        <Text size="lg">On commence par le processus qui coûte le plus.</Text>
      </Stack>
      <BrushGrid bricks={bricks} stamp="Livré" caption="Exemple · données fictives" />
    </FolderSheet>
  );
}

export function SampleFolders() {
  return (
    <>
      <Folder tab="Étape 1 · Voir" kanji="見" title="Immersion" caption="5 jours sur le terrain">
        <SplitSheet />
      </Folder>
      <Folder
        tab="Étape 2 · Construire"
        kanji="築"
        title="Construction"
        caption="Brique par brique"
        tone="sand"
      >
        <FeatureSheet />
      </Folder>
      <Folder
        tab="Étape 3 · Avancer"
        kanji="進"
        title="Évolution"
        caption="Chaque mois"
        tone="mist"
      >
        <FolderSheet kanji="進" aria-labelledby="sample-evolution">
          <Heading level={3} size="title-lg" id="sample-evolution">
            Évolution
          </Heading>
          <Text size="lg">On maintient, on supervise et on fait évoluer.</Text>
        </FolderSheet>
      </Folder>
    </>
  );
}
