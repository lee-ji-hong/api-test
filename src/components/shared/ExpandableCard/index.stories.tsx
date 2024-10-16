import { Meta, StoryObj } from "@storybook/react";
import ExpandableCard from ".";

const meta: Meta<typeof ExpandableCard> = {
  title: "shared/ExpandableCard",
  component: ExpandableCard,
};

export default meta;

export const Basic: StoryObj<typeof ExpandableCard> = {
  args: {
    content:
      "test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.",
  },
  render: (args) => <ExpandableCard {...args}></ExpandableCard>,
};
