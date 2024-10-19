import { Meta, StoryObj } from "@storybook/react";
import SelectBottomSheet from ".";

import classNames from "classnames/bind";
import styles from "./SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

const meta: Meta<typeof SelectBottomSheet> = {
  title: "Modal/SelectBottomSheet",
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

export const Select: StoryObj<typeof SelectBottomSheet> = {
  args: {
    modalTitle: "중소기업에 다니고 계신가요?",
    modalSubTitle: "중소기업 기준은 직원 수 300명 이하, 연매출 1천억원 이하로 자세한 기준은 링크를 통해 확인해주세요.",
    onClose: () => alert("닫힘 버튼"),
  },
  render: (args) => (
    <SelectBottomSheet {...args}>
      {["select", "select"].map((ment, index) => (
        <li
          key={ment}
          className={cx("option-button")}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          {ment}
          {index}
        </li>
      ))}
    </SelectBottomSheet>
  ),
};

export const Text: StoryObj<typeof SelectBottomSheet> = {
  args: {
    modalTitle: "LTV란?",
    modalSubTitle:
      "LTV는 Loan to Value의 약자로, 대출금액과 부동산 가치의 비율을 나타냅니다. LTV는 대출 심사 시 중요한 지표로, 대출자가 얼마나 많은 자금을 담보로 제공하는지를 평가합니다. 일반적으로 LTV가 낮을수록 대출자의 신용 위험이 낮아지고, 더 유리한 대출 조건을 받을 가능성이 높습니다. 예를 들어, LTV가 80%라면, 부동산 가치의 80%를 대출받고 나머지 20%는 자본금으로 지불하는 구조입니다. LTV는 주택 구매, 투자 및 리파이낸싱 과정에서 필수적으로 고려되는 요소입니다.",
    onClose: () => alert("닫힘 버튼"),
  },
  render: (args) => <SelectBottomSheet {...args}></SelectBottomSheet>,
};
