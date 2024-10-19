import { Meta, StoryObj } from "@storybook/react";
import SelectBottomSheet from ".";

const meta: Meta<typeof SelectBottomSheet> = {
  title: "Modal/SelectBottomSheet/Text",
  component: SelectBottomSheet,
};

export default meta;

export const Basic: StoryObj<typeof SelectBottomSheet> = {
  args: {
    modalTitle: "LTV란?",
    modalSubTitle:
      "LTV는 Loan to Value의 약자로, 대출금액과 부동산 가치의 비율을 나타냅니다. LTV는 대출 심사 시 중요한 지표로, 대출자가 얼마나 많은 자금을 담보로 제공하는지를 평가합니다. 일반적으로 LTV가 낮을수록 대출자의 신용 위험이 낮아지고, 더 유리한 대출 조건을 받을 가능성이 높습니다. 예를 들어, LTV가 80%라면, 부동산 가치의 80%를 대출받고 나머지 20%는 자본금으로 지불하는 구조입니다. LTV는 주택 구매, 투자 및 리파이낸싱 과정에서 필수적으로 고려되는 요소입니다.",
    onClose: () => alert("닫힘 버튼"),
  },
  render: (args) => <SelectBottomSheet {...args}></SelectBottomSheet>,
};
