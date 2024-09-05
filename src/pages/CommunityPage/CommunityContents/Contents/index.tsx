import { Typography } from "@mui/material";
import styles from "./Contents.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Contents = () => {
  return (
    <div className={cx("container")}>
      <Typography className={cx("txt-title")}>전세대출 초보입니다. 어떤 은행이 유리한가요?</Typography>
      <Typography className={cx("txt-contents")}>
        안녕하세요, 전세대출 처음 알아보는 30대 직장인입니다. 지금 살고 있는 집 전세 만기가 다가오고 있어서 대출을
        알아보..
      </Typography>
    </div>
  );
};

export default Contents;
