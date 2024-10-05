import CommunityService from "@/api/service/CommunityService";
import Spacing from "@/components/shared/Spacing";
import Heart from "@/pages/CommunityCommonComponent/Heart";
import Profile from "@/pages/CommunityPage/CommunityContents/Profile";
import { Typography } from "@mui/material";
import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { Comment, CommunityDetail, LikeResponse } from "@/models";

const cx = classNames.bind(styles);

interface CommentListProps {
  communityDetail: CommunityDetail;
  onCommentDeleteSuccess: () => void;
}

const CommentList: React.FC<CommentListProps> = (props) => {
  return (
    <div className={cx("containerComment")}>
      {props.communityDetail.comments &&
        props.communityDetail.comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} onCommentDeleteSuccess={props.onCommentDeleteSuccess} />
        ))}
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
  onCommentDeleteSuccess: () => void;
}

const CommentListItem: React.FC<CommentItemProps> = ({ comment, onCommentDeleteSuccess }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.like);
  const [commentLikeCount, setCommentLikeCount] = useState(comment.likes);

  const handleLikeToggle = async () => {
    if (isCommentLiked) {
      // 좋아요 취소
      try {
        const res: LikeResponse = await CommunityService.requestCommentUnlike(comment.id);
        if (res.code === 200) {
          setIsCommentLiked(false);
          setCommentLikeCount(commentLikeCount - 1);
        } else {
          console.log("Failed to unlike comment:", res);
        }
      } catch (error) {
        console.error("Failed to unlike comment:", error);
      }
    } else {
      // 좋아요 등록
      try {
        const res = await CommunityService.requestCommentLike(comment.id);
        if (res.code === 200) {
          setIsCommentLiked(true);
          setCommentLikeCount(commentLikeCount + 1);
        } else {
          console.log("Failed to like comment:", res);
        }
      } catch (error) {
        console.error("Failed to like comment:", error);
      }
    }
  };

  return (
    <div>
      <Spacing size={8} />
      <Profile
        author={comment.author}
        timeAgo={comment.timeAgo}
        avatarUrl={comment.avatarUrl}
        updateDeleteAuthority={comment.updateDeleteAuthority}
        comment={comment}
        onCommentDeleteSuccess={() => onCommentDeleteSuccess()}
      />
      <Spacing size={8} />
      <div style={{ marginLeft: "40px" }}>
        <Typography className={cx("txtComment")}>{comment.content}</Typography>
        <Spacing size={8} />
        <Heart commentCnt={commentLikeCount} onClick={handleLikeToggle} isActive={isCommentLiked} />
      </div>
      <Spacing size={24} />
    </div>
  );
};

export default CommentList;
