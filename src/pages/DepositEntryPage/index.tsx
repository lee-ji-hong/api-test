import { useNavigate } from "react-router-dom";
import Text from "@/components/shared/Text";
import DepositInput from "@/components/shared/DepositInput";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import BadgeList from "@/components/shared/BadgeList";

import classNames from "classnames/bind";
import styles from "./DepositEntryPage.module.scss";
const cx = classNames.bind(styles);

const DepositEntryPage = () => {
  const navigate = useNavigate();
  const money = ["+10만", "+100만", "+1000만", "+1억"];
  return (
    <div className={cx("container")}>
      <Spacing size={179} />
      <Text className={cx("txt-title")} text="전월세보증금은?" />
      <DepositInput id="standard-basic" variant="standard" placeholder="0만원" />
      <Spacing size={58} />
      <BadgeList list={money} />
      <Button onClick={() => navigate("/deposit-entry")} title="전월세 대출 상품 확인하기" />
    </div>
  );
};

export default DepositEntryPage;
