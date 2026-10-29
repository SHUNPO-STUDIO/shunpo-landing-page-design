import { Folder } from "@repo/ui/components/folder";
import { FolderList } from "@repo/ui/components/folder-list";
import { FolderSceneOpening } from "@repo/ui/components/folder-scene-opening";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { FolderScene } from "@repo/ui/motion/folder-scene";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

import { construction, evolution, immersion, methodIntro, methodTitle } from "./method-content";
import { ConstructionSheet, EvolutionSheet, ImmersionSheet } from "./method-sheets";

/* « Comment se passe votre projet avec nous ? »: three washi folders, 見 築 進. On stage, each sheet comes
   out of its folder in turn; the 築 sheet paints its brush grid and stamps its four bricks. */
export function MethodSection() {
  return (
    <Section id="methode" aria-labelledby="methode-titre" spacing="xs">
      <Container>
        <FolderScene>
          <FolderSceneOpening>
            <Heading level={2} size="display" align="center" id="methode-titre">
              {methodTitle}
            </Heading>
            <Text size="lg" tone="muted" align="center" measure="prose">
              {methodIntro}
            </Text>
          </FolderSceneOpening>
          <FolderList>
            <Folder {...immersion.folder}>
              <ImmersionSheet />
            </Folder>
            <Folder {...construction.folder}>
              <ConstructionSheet />
            </Folder>
            <Folder {...evolution.folder}>
              <EvolutionSheet />
            </Folder>
          </FolderList>
        </FolderScene>
      </Container>
    </Section>
  );
}
