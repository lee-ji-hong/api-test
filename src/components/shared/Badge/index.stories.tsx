import { Meta, StoryObj } from "@storybook/react";
import Badge from ".";

const meta: Meta<typeof Badge> = {
  title: "shared/Badge",
  component: Badge,
};

export default meta;

export const Basic: StoryObj<typeof Badge> = {
  args: { title: "+100만", theme: "primary" },
  render: (args) => <Badge {...args}></Badge>,
};
