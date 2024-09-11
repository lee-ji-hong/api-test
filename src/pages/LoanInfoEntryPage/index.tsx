import { InfoArray } from "./mock";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import List from "@/components/shared/List";

import { useInternalRouter } from "@/hooks/useInternalRouter";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryPage = () => {
  const router = useInternalRouter();

  return (
    <>
      <Header className={cx("cancel")} onRightClick={() => router.goBack()} right="Back_btn" />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text className={cx("txt-title")} text="당신에게 맞는 대출은?" />
        <Spacing size={20} />
        <List className={cx("list-wrap")}>
          {InfoArray?.map((item) => (
            <List.Row
              key={item.id}
              onClick={() => console.log("test")}
              topText={item.label}
              right={<Text className={cx("txt-right")} text={item.value === "" ? "선택하기" : item.value} />}
              withArrow={true}
            />
          ))}
        </List>
        <Spacing size={90} />
        <Button
          className={cx("fixed-button")}
          onClick={() => router.push("/loan-info-entry")}
          title="맞춤형 전월세대출 더 알아보기"
        />
      </div>
    </>
  );
};
export default LoanInfoEntryPage;
