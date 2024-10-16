import { Meta, StoryObj } from "@storybook/react";
import { MONEY } from "@/constants/money";
import BadgeList from ".";

const meta: Meta<typeof BadgeList> = {
  title: "shared/BadgeList",
  component: BadgeList,
};

export default meta;

export const Basic: StoryObj<typeof BadgeList> = {
  args: { list: MONEY },
  render: (args) => <BadgeList {...args} />,
};
