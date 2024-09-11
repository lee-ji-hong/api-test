import { Typography } from "@mui/material";
import styles from "./Contents.module.scss";
import classNames from "classnames/bind";
import SpacingWidth from "@/components/shared/SpacingWidth";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import Comment from "@/pages/CommunityCommonComponent/Comment";
import Heart from "@/pages/CommunityCommonComponent/Heart/iindex";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";

const cx = classNames.bind(styles);

const Contents = () => {
  return (
    <div className={cx("container")}>
      {/* 글제목 및 내용 */}
      <div onClick={() => alert("게시글")}>
        <Typography className={cx("txt-title")}>전세대출 초보입니다. 어떤 은행이 유리한가요?</Typography>
        <Typography className={cx("txt-contents")}>
          안녕하세요, 전세대출 처음 알아보는 30대 직장인입니다. 지금 살고 있는 집 전세 만기가 다가오고 있어서 대출을
          알아보..
        </Typography>
      </div>
      <Spacing size={12} />

      {/* 대출 정보 */}
      <LoanCard onClick={() => alert("LoanCard")} />

      <Spacing size={18} />

      {/* 좋아요, 댓글 */}
      <div className={cx("container-like-comment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={12}
          onClick={() => {
            alert("heart");
          }}
        />

        <SpacingWidth size={15} />

        <Comment
          commentCnt={12}
          onClick={() => {
            alert("comment");
          }}
        />
      </div>
    </div>
  );
};

export default Contents;
