import { Meta, StoryObj } from "@storybook/react";
import BottomSheet from ".";

const meta: Meta<typeof BottomSheet> = {
  title: "Modal/BottomSheet",
  component: BottomSheet,
};

export default meta;

export const Basic: StoryObj<typeof BottomSheet> = {
  args: {
    modalTitle: "모달을 닫겠습니까?",
    buttonText: "확인",
    children: "컴포넌트 자리",
    onClose: () => alert("닫힘 버튼"),
  },
  render: (args) => <BottomSheet {...args}></BottomSheet>,
};
