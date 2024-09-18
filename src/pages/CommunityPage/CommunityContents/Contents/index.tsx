import { Typography } from "@mui/material";
import styles from "./Contents.module.scss";
import classNames from "classnames/bind";
import SpacingWidth from "@/components/shared/SpacingWidth";
import Spacing from "@/components/shared/Spacing";
import Comment from "@/pages/CommunityCommonComponent/Comment";
import Heart from "@/pages/CommunityCommonComponent/Heart/index";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";
import { useNavigate } from "react-router-dom";
import { Post } from "@/api/model/CommunityResponse";

const cx = classNames.bind(styles);

const Contents: React.FC<Post> = (props) => {
  const navigator = useNavigate();
  return (
    <div className={cx("container")}>
      {/* 글제목 및 내용 */}
      <div onClick={() => navigator("/community/detail", { state: { postId: props.id } })}>
        <Typography className={cx("txt-title")}>{props.title}</Typography>
        <Typography className={cx("txt-contents")}>{props.content}</Typography>
      </div>
      <Spacing size={12} />

      {/* 대출 정보 */}
      {props.loanAdviceSummaryReport && <LoanCard onClick={() => alert("LoanCard")} />}

      <Spacing size={18} />

      {/* 좋아요, 댓글 */}
      <div className={cx("container-like-comment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={props.likes}
          isActive={true}
          onClick={() => {
            alert("heart");
          }}
        />

        <SpacingWidth size={15} />

        <Comment
          commentCnt={props.commentCount}
          onClick={() => {
            alert("comment");
          }}
        />
      </div>
    </div>
  );
};

export default Contents;
