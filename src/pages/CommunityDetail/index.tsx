import { Typography } from "@mui/material";
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
import CommunityService from "@/api/service/CommunityService";
import { useGetCommunityDetail } from "@/hooks/queries/useGetCommunityDetail";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
import CommentList from "./Comment";
import { CommunityDetail, CommunityDetailResponse, LikeResponse } from "@/models";

const cx = classNames.bind(styles);

const CommunityDetailPage = () => {
  const location = useLocation();
  const { postId } = location.state as { postId: number };
  const [post, setPost] = useState<CommunityDetail>();
  const [commentUpdated, setCommentUpdated] = useState(false); // 댓글 업데이트 여부 상태 추가
  const { communityDetail, isCommunityDetailLoading } = useGetCommunityDetail(postId);

  // 댓글 작성 후 업데이트 트리거 함수
  const handleCommentUpdate = () => {
    setCommentUpdated((prev) => !prev);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await Axios.get<CommunityDetailResponse>(`/api/v1/post/${postId}`, true);
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
      <WriteHeader {...post!} />
      <div className={cx("containerContents")}>
        <Spacing size={9} />
        <Spacing size={12} />

        {post && <WriteBody {...post} />}

        {/* 좋아요, 댓글 */}
        <WriteFooter postId={postId} author={post?.author} onCommentAdded={handleCommentUpdate} />
      </div>
    </div>
  );
};

const WriteHeader: React.FC<CommunityDetail> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate(-1)}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.BackButton} />
      </button>

      <button onClick={() => navigate("/community/modify", { state: { communityDetail: props } })}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.MoreButton} />
      </button>
    </div>
  );
};

const WriteBody: React.FC<CommunityDetail> = (props) => {
  const [isLiked, setIsLiked] = useState(props.like);
  const [likeCount, setLikeCount] = useState(props.likes);
  console.log("props:", props);
  return (
    <div className={cx("container-body")}>
      <Profile author={props.author} timeAgo={props.timeAgo} />
      <Spacing size={12} />
      <Typography className={cx("txt-title")}>{props.title}</Typography>

      <Spacing size={8} />
      <Typography className={cx("txt-content")}>{props.content}</Typography>
      <Spacing size={16} />

      {/* 이미지 */}
      {props.imageUrl && <img src={props.imageUrl} alt="post" className={cx("imgPost")} />}

      {/* 대출 정보 */}
      <Spacing size={16} />
      {props.loanAdviceSummaryReport && <LoanCard {...props.loanAdviceSummaryReport} />}

      <div className={cx("containerHeartComment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={likeCount}
          onClick={async () => {
            switch (isLiked) {
              case true:
                try {
                  const res: LikeResponse = await CommunityService.requestUnlike(props.id);
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
                  const res: LikeResponse = await CommunityService.requestLike(props.id);
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

        <Comment commentCnt={props.commentCount} onClick={() => {}} />
      </div>

      {/* 댓글 리스트 */}
      <CommentList {...props} />
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
      <div className={cx("containerInputbox")}>
        <input
          type="text"
          placeholder={`${author}님의 생각을 댓글로 남겨주세요.`}
          className={cx("inputComment")}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <div onClick={requestWriteComment}>
        <Typography className={cx("txtComment")}>등록</Typography>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
