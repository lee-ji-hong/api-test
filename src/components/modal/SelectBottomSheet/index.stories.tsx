import { Meta, StoryObj } from "@storybook/react";
import SelectBottomSheet from ".";

import classNames from "classnames/bind";
import styles from "./SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

const meta: Meta<typeof SelectBottomSheet> = {
  title: "Modal/SelectBottomSheet/Select",
  component: SelectBottomSheet,
};

export default meta;

export const Basic: StoryObj<typeof SelectBottomSheet> = {
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
