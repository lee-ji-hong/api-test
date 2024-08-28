import { useNavigate } from "react-router-dom";
import Text from "@/components/shared/Text";
import DepositInput from "@/components/shared/DepositInput";
import Button from "@/components/shared/Button";
import Spacing from "@/components/shared/Spacing";

import classNames from "classnames/bind";
import styles from "./DepositEntryPage.module.scss";
const cx = classNames.bind(styles);

const DepositEntryPage = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <Spacing size={179} />
      <Text className={cx("txt-title")} text="전월세보증금은?" />
      <DepositInput id="standard-basic" variant="standard" placeholder="0만원" />
      <Button onClick={() => navigate("/deposit-entry")} title="전월세 대출 상품 확인하기" />
    </div>
  );
};

export default DepositEntryPage;
