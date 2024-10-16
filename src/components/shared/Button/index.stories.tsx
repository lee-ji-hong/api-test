import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
};

export default meta;

export const Basic: StoryObj<typeof Button> = {
  args: { title: "확인" },
  render: (args) => <Button {...args} />,
};
