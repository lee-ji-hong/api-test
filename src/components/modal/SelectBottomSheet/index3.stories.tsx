import { Meta, StoryObj } from "@storybook/react";
import SelectBottomSheet from ".";

const meta: Meta<typeof SelectBottomSheet> = {
  title: "Modal/SelectBottomSheet/Children",
  component: SelectBottomSheet,
};

export default meta;

export const Basic: StoryObj<typeof SelectBottomSheet> = {
  args: {
    modalTitle: "월별 상환 금액",
    onClose: () => alert("닫힘 버튼"),
  },
  render: (args) => <SelectBottomSheet {...args}>컴포넌트 자리</SelectBottomSheet>,
};
