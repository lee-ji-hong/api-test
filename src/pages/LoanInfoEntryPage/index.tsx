import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import List from "@/components/shared/List";

import { useInternalRouter } from "@/hooks/useInternalRouter";
import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryPage = () => {
  const router = useInternalRouter();

  const infoArray = [
    { id: 1, label: "입력 보증금", value: "" },
    { id: 2, label: "월세", value: "" },
    { id: 3, label: "보유 현금", value: "" },
    { id: 4, label: "만 나이", value: "" },
    { id: 5, label: "혼인 상태", value: "" },
    { id: 6, label: "배우자 연소득", value: "" },
    { id: 7, label: "자녀 상태", value: "" },
    { id: 8, label: "중소기업 재직 여부", value: "" },
    { id: 9, label: "순자산 3.45억 초과 여부", value: "" },
    { id: 10, label: "주택 정보", value: "" },
  ];

  return (
    <>
      <Header className={cx("cancel")} onRightClick={() => router.goBack()} right="Back_btn" />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text className={cx("txt-title")} text="당신에게 맞는 대출은?" />
        <Spacing size={20} />
        <List className={cx("list-wrap")}>
          {infoArray?.map((item) => (
            <List.Row
              key={item.id}
              onClick={() => console.log("test")}
              iconName="icon-document-lines"
              topText={item.label}
              right={<Text text="테스트" />}
              withArrow={true}
            />
          ))}
        </List>
      </div>
    </>
  );
};
export default LoanInfoEntryPage;
