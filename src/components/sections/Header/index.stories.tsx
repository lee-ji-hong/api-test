import { Meta, StoryObj } from "@storybook/react";
import Header from ".";

const meta: Meta<typeof Header> = {
  title: "shared/Header",
  component: Header,
};

export default meta;

export const Basic: StoryObj<typeof Header> = {
  args: {
    onRightClick: () => alert("닫힘 버튼"),
    onLeftClick: () => alert("닫힘 버튼"),
    title: "제목",
    right: "Setting_btn",
    left: "Back_btn",
    className: "header-with-margin",
  },
  render: (args) => <Header {...args}></Header>,
};
