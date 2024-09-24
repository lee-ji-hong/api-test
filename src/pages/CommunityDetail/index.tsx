import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityDetail.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "../CommunityPage/CommunityContents/Profile";
import Spacing from "@/components/shared/Spacing";
import LoanCard from "../CommunityCommonComponent/LoanCard";
import Heart from "../CommunityCommonComponent/Heart/index";
import Comment from "../CommunityCommonComponent/Comment";
import React, { useEffect, useState } from "react";
import Axios from "@/api/axios";
import { Post } from "@/api/model/CommunityResponse";
import CommunityService from "@/api/service/CommunityService";
import { useGetCommunityDetail } from "@/hooks/queries/useGetCommunityDetail";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
const cx = classNames.bind(styles);

const CommunityDetail = () => {
  const location = useLocation();
  const { postId } = location.state as { postId: number };
  const [post, setPost] = useState<Post>();
  const [commentUpdated, setCommentUpdated] = useState(false); // 댓글 업데이트 여부 상태 추가
  const { communityDetail, isCommunityDetailLoading } = useGetCommunityDetail(postId);

  // 댓글 작성 후 업데이트 트리거 함수
  const handleCommentUpdate = () => {
    setCommentUpdated((prev) => !prev); // commentUpdated 상태 반전
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await Axios.get(`/api/v1/post/${postId}`, true);
        setPost(res.data); // 3. 상태 업데이트
        console.log("Fetched Post:", res.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPostData();
  }, [postId, commentUpdated]);

  if (isCommunityDetailLoading) return <FullScreenMessage type="loading" />;
  console.log(communityDetail);

  return (
    <div className={cx("container")}>
      <Spacing size={9} />
      <WriteHeader />
      <Spacing size={9} />
      <Spacing size={12} />

      {post && <WriteBody {...post} />}

      {/* 좋아요, 댓글 */}
      <WriteFooter postId={postId} author={post?.author} onCommentAdded={handleCommentUpdate} />
    </div>
  );
};

const WriteHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate(-1)}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.BackButton} />
      </button>

      <button onClick={() => alert("더보기 클릭")}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.MoreButton} />
      </button>
    </div>
  );
};

const WriteBody: React.FC<Post> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  console.log("props:", props);
  return (
    <div className={cx("container-body")}>
      <Profile {...props} />
      <Spacing size={12} />
      <Typography className={cx("txt-title")}>{props.title}</Typography>

      <Spacing size={8} />
      <Typography className={cx("txt-content")}>{props.content}</Typography>

      <Spacing size={16} />

      {props.loanAdviceSummaryReport && <LoanCard {...props} />}

      <div className={cx("container-heart-comment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={likeCount}
          onClick={async () => {
            switch (isLiked) {
              case true:
                try {
                  const res = await CommunityService.requestUnlike(props.id);
                  if (res.status === 200) {
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
                  const res = await CommunityService.requestLike(props.id);
                  if (res.status === 200) {
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

        <Comment commentCnt={props.commentCount} onClick={() => {}} />
      </div>

      {/* 댓글들 리스트 */}
      <div className={cx("containerComment")}>
        {props.comments &&
          props.comments.map((comment) => (
            <div key={comment.id}>
              <Spacing size={8} />
              <Profile {...props} />
              <Spacing size={8} />
              <div style={{ marginLeft: "40px" }}>
                <Typography className={cx("txtComment")}>{comment.content}</Typography>
                <Spacing size={8} />
                <Heart
                  commentCnt={props.likes}
                  onClick={() => {
                    alert("heart");
                  }}
                  isActive={true}
                />
              </div>

              <Spacing size={24} />
            </div>
          ))}
      </div>
    </div>
  );
};

interface WriteFooterProps {
  postId: number;
  author: string | undefined;
  onCommentAdded: () => void;
}

const WriteFooter: React.FC<WriteFooterProps> = ({ postId, author, onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState(""); // 댓글 내용을 저장할 상태

  const requestWriteComment = async () => {
    try {
      const res = await Axios.post(`/api/v1/comment/${postId}`, { postId: postId, content: commentContent }, true);
      console.log("댓글 작성 성공", res);
      onCommentAdded(); // 댓글 작성 후 부모 컴포넌트에게 알림
      setCommentContent(""); // 댓글 작성 후 입력창 초기화
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };
  return (
    <div className={cx("containerFooter")}>
      <div className={cx("container-inputbox")}>
        <input
          type="text"
          placeholder={`${author}님의 생각을 댓글로 남겨주세요.`}
          className={cx("input-comment")}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <Button onClick={async () => await requestWriteComment()} variant="contained">
        <Typography className={cx("txtComment")}>등록</Typography>
      </Button>
    </div>
  );
};

export default CommunityDetail;
