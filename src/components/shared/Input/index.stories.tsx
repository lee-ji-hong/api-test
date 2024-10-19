import { Meta, StoryObj } from "@storybook/react";
import Input from ".";

const meta: Meta<typeof Input> = {
  title: "shared/Input",
  component: Input,
};

export default meta;

export const Basic: StoryObj<typeof Input> = {
  args: {},
  render: (args) => <Input {...args}></Input>,
};
