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
import { useState } from "react";
import CommunityService from "@/api/service/CommunityService";
import Axios from "@/api/axios";
import CenterModal from "@/components/modal/CenterModal";
import { LikeResponse } from "@/models";
import { reqLogin } from "@/api/remotes";

const cx = classNames.bind(styles);

const Contents: React.FC<Post> = (props) => {
  const navigator = useNavigate();
  const [isLiked, setIsLiked] = useState(props.like);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  return (
    <div
      onClick={async () => {
        try {
          const response = await Axios.get<LikeResponse>(`/login/oauth2/kakao/health-check`, true);
          console.log("코드?", response.code);
          navigator("/community/detail", { state: { postId: props.id } });
        } catch (error) {
          console.log("이게 왜나와");
          setIsShowLoginModal(true);
        }
      }}
      className={cx("container")}>
      {/* 글제목 및 내용 */}
      <div className={cx("textContainer")}>
        <div>
          <Typography className={cx("txt-title")}>{props.title}</Typography>
          <Typography className={cx("txtContent")}>{props.content}</Typography>
        </div>
        {props.imageUrl && <img src={props.imageUrl} alt="post" className={cx("imgPost")} />}
      </div>

      <Spacing size={12} />

      {/* 대출 정보 */}
      {props.loanAdviceSummaryReport && <LoanCard {...props.loanAdviceSummaryReport} />}

      <Spacing size={18} />

      {/* 좋아요, 댓글 */}
      <div className={cx("container-like-comment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={likeCount}
          isActive={isLiked}
          onClick={async () => {
            switch (isLiked) {
              case true:
                try {
                  const res = await CommunityService.requestUnlike(props.id);
                  if (res.code === 200) {
                    setIsLiked(!isLiked);
                    setLikeCount(likeCount - 1);
                  } else {
                    console.log("Failed to unlike post:", res);
                  }
                } catch (error) {
                  console.error("Failed to like post:", error);
                }
                break;
              default:
                try {
                  const res = await CommunityService.requestLike(props.id);
                  if (res.code === 200) {
                    setIsLiked(!isLiked);
                    setLikeCount(likeCount + 1);
                  } else {
                    console.log("Failed to like post:", res);
                  }
                } catch (error) {
                  console.error("Failed to like post:", error);
                }
                break;
            }
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

      {isShowLoginModal && (
        <CenterModal
          message={`로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?`}
          subMessage=""
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => {
            setIsShowLoginModal(false);
          }}
          onConfirm={() => {
            reqLogin();
          }}
        />
      )}
    </div>
  );
};

export default Contents;
