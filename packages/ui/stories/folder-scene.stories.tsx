import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { FolderList } from "../src/components/folder-list.tsx";
import { FolderSceneOpening } from "../src/components/folder-scene-opening.tsx";
import { Container } from "../src/layout/container.tsx";
import { FolderScene } from "../src/motion/folder-scene.tsx";
import { Heading } from "../src/typography/heading.tsx";
import { Text } from "../src/typography/text.tsx";
import { SampleFolders } from "./support/folder-samples.tsx";

const meta = {
  title: "Motion/FolderScene",
  component: FolderScene,
  subcomponents: { FolderSceneOpening, FolderList },
  parameters: { layout: "fullscreen" },
  render: () => (
    <Container>
      <FolderScene>
        <FolderSceneOpening>
          <Heading level={2} size="display" align="center">
            Comment se passe votre projet avec nous ?
          </Heading>
          <Text size="lg" tone="muted" align="center" measure="prose">
            Scroll: each sheet comes out of its folder, then goes back.
          </Text>
        </FolderSceneOpening>
        <FolderList>
          <SampleFolders />
        </FolderList>
      </FolderScene>
      <Text tone="muted">After the scene</Text>
    </Container>
  ),
} satisfies Meta<typeof FolderScene>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeFolders: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(canvas.getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
    await expect(canvas.getByText("Étape 2 · Construire")).toBeVisible();
  },
};
