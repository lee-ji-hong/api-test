import CommunityService from "@/api/service/CommunityService";
import Spacing from "@/components/shared/Spacing";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { CommunityDetail, LikeResponse } from "@/models";
import Comment from "@/pages/CommunityCommonComponent/Comment";
import Heart from "@/pages/CommunityCommonComponent/Heart";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";
import Profile from "@/pages/CommunityPage/CommunityContents/Profile";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import CommentList from "../Comment";
import styles from "./DetailBody.module.scss";
const cx = classNames.bind(styles);

interface WriteBodyProps {
  communityDetail: CommunityDetail;
  handleCommentUpdate: () => void;
}

const DetailBody: React.FC<WriteBodyProps> = (props) => {
  const communityDetail = props.communityDetail;
  const [isLiked, setIsLiked] = useState(communityDetail.like);
  const [likeCount, setLikeCount] = useState(communityDetail.likes);

  return (
    <div className={cx("container-body")}>
      <Profile
        author={communityDetail.author}
        timeAgo={communityDetail.timeAgo}
        avatarUrl={communityDetail.avatarUrl}
      />
      <Spacing size={12} />
      <Typography className={cx("txt-title")}>{communityDetail.title}</Typography>

      <Spacing size={8} />
      <Typography className={cx("txt-content")}>{communityDetail.content}</Typography>

      {/* 대출 정보 */}
      <Spacing size={16} />
      {communityDetail.loanAdviceSummaryReport && <LoanCard {...communityDetail.loanAdviceSummaryReport} />}

      <Spacing size={16} />
      {/* 이미지 */}
      {communityDetail.imageUrl && <img src={communityDetail.imageUrl} alt="post" className={cx("imgPost")} />}

      <div className={cx("containerHeartComment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={likeCount}
          onClick={async () => {
            switch (isLiked) {
              case true:
                try {
                  const res: LikeResponse = await CommunityService.requestUnlike(communityDetail.id);
                  if (res.code === 200) {
                    setIsLiked(!isLiked);
                    setLikeCount(likeCount - 1);
                  } else {
                    console.log("Failed to like post:", res);
                  }
                } catch (error) {
                  console.error("Failed to like post:", error);
                }
                break;
              default:
                try {
                  const res: LikeResponse = await CommunityService.requestLike(communityDetail.id);
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
          isActive={isLiked}
        />

        <SpacingWidth size={15} />
        {/*  */}

        <Comment commentCnt={communityDetail.commentCount} onClick={() => {}} />
      </div>

      {/* 댓글 리스트 */}
      <CommentList
        {...props}
        onCommentDeleteSuccess={() => {
          props.handleCommentUpdate();
        }}
      />
    </div>
  );
};

export default DetailBody;
