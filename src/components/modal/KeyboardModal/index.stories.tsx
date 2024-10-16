import { Meta, StoryObj } from "@storybook/react";
import KeyboardModal from ".";

const meta: Meta<typeof KeyboardModal> = {
  title: "shared/KeyboardModal",
  component: KeyboardModal,
};

export default meta;

export const Basic: StoryObj<typeof KeyboardModal> = {
  args: {
    keyboardHeight: 10,
  },
  render: (args) => <KeyboardModal {...args} />,
};
