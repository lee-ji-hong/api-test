import { Typography } from "@mui/material";
import styles from "./Contents.module.scss";
import classNames from "classnames/bind";
import SpacingWidth from "@/components/shared/SpacingWidth";
import Spacing from "@/components/shared/Spacing";

const cx = classNames.bind(styles);

const Contents = () => {
  return (
    <div className={cx("container")}>
      {/* 글제목 및 내용 */}
      <Typography className={cx("txt-title")}>전세대출 초보입니다. 어떤 은행이 유리한가요?</Typography>
      <Typography className={cx("txt-contents")}>
        안녕하세요, 전세대출 처음 알아보는 30대 직장인입니다. 지금 살고 있는 집 전세 만기가 다가오고 있어서 대출을
        알아보..
      </Typography>
      <Spacing size={12} />

      {/* 대출 정보 */}
      <div className={cx("container-loaninfo")}>
        <div className={cx("container-txt-loaninfo")}>
          <img
            className={cx("img-loaninfo")}
            src="https://images.unsplash.com/photo-1634142280675-9d6b8c3c9e7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fHx8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="img"
          />
          <Typography className={cx("txt-loaninfo")}>신한은행 전세자금 대출전세자금 대출</Typography>
          <Typography className={cx("txt-loaninfo")}>– 전세자금대출 금리우대형</Typography>
        </div>
        <div className={cx("container-loaninfo-money")}>
          <Typography className={cx("txt-percent")}>6.8%</Typography>
          <Typography className={cx("txt-loaninfo")}>3억8천만원</Typography>
        </div>
      </div>

      <Spacing size={18} />
      {/* 좋아요, 댓글 */}
      <div className={cx("container-like-comment")}>
        <img
          className={cx("img-like")}
          src="https://images.unsplash.com/photo-1634142280675-9d6b8c3c9e7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fHx8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
        <Typography className={cx("txt-like")}>12</Typography>

        <SpacingWidth size={15} />
        <img
          className={cx("img-commnet")}
          src="https://images.unsplash.com/photo-1634142280675-9d6b8c3c9e7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fHx8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
        <Typography className={cx("txt-comment")}>12</Typography>
      </div>
    </div>
  );
};

export default Contents;
