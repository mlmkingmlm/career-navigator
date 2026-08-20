import type { Meta, StoryObj } from "@storybook/react-vite";
import LearnerProgressBadge from "./LearnerProgressBadge";

const meta = {
  title: "Components/LearnerProgressBadge",
  component: LearnerProgressBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LearnerProgressBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: "default",
  },
};

export const InProgress: Story = {
  args: {
    state: "in-progress",
  },
};

export const Completed: Story = {
  args: {
    state: "completed",
  },
};

export const Disabled: Story = {
  args: {
    state: "disabled",
  },
};