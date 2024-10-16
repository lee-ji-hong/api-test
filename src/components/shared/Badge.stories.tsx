import { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "shared/Badge",
  component: Badge,
};

export default meta;

export const Basic: StoryObj<typeof Badge> = {
  args: { title: "+100만" },
  render: (args) => <Badge {...args}></Badge>,
};
