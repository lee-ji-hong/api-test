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
import BottomModal from "@/components/modal/BottomModal";
import Modal from "@/components/modal/CenterModal";

const cx = classNames.bind(styles);

const CommunityDetailPage = () => {
  const location = useLocation();
  const { postId } = location.state as { postId: number };
  const [post, setPost] = useState<CommunityDetail>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(false); // 댓글 업데이트 여부 상태 추가
  const { communityDetail, isCommunityDetailLoading } = useGetCommunityDetail(postId);
  const navigate = useNavigate();

  // 댓글 작성 후 업데이트 트리거 함수
  const handleCommentUpdate = () => {
    setCommentUpdated((prev) => !prev);
  };

  /*=============== 버텀모달 이벤트 =================== */
  // 모달 열기
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 수정하기 버튼 핸들러
  const handleEdit = (communityDetail: CommunityDetail | undefined) => {
    handleCloseModal(); // 수정 후 모달 닫기
    navigate("/community/modify", { state: { communityDetail: communityDetail } });
  };

  // 삭제하기 버튼 핸들러
  const handleDelete = () => {
    handleCloseModal(); // 삭제 후 모달 닫기
    setIsCenterModalOpen(true); // 센터 모달 열기
  };

  /*=============== 센터모달 이벤트 =================== */
  // 모달 닫기 (취소 시)
  const handleCancel = () => {
    setIsCenterModalOpen(false); // 모달 닫기
  };

  // 모달 확인 (삭제 시)
  const handleConfirm = async () => {
    // 여기에 게시글 삭제 로직을 추가할 수 있습니다
    try {
      const res = await Axios.delete<LikeResponse>(`/api/v1/post/${postId}`, true);
      if (res.code === 200) {
        navigate("/community", { replace: true });
      } else {
        console.log("Failed to delete post:", res);
        alert(`${res.message}`);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert(`자신의 게시글만 삭제할 수 있습니다.`);
    }

    // 모달 닫기
    setIsCenterModalOpen(false);
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

  return (
    <div className={cx("container")}>
      <Spacing size={9} />
      <WriteHeader isModal={isModalOpen} setIsModal={setIsModalOpen} />
      <div className={cx("containerContents")}>
        <Spacing size={9} />
        <Spacing size={12} />

        {post && <WriteBody {...post} />}

        {/* 좋아요, 댓글 */}
        <WriteFooter postId={postId} author={post?.author} onCommentAdded={handleCommentUpdate} />

        {isModalOpen && (
          <BottomModal onClose={handleCloseModal} onEdit={() => handleEdit(communityDetail)} onDelete={handleDelete} />
        )}

        {isCenterModalOpen && (
          <Modal
            message={`게시글을 삭제할까요?\n게시글을 삭제하면 모든 데이터가 삭제되고\n다시 볼 수 없어요.`}
            subMessage="게시글을 삭제하면 모든 데이터가 삭제되고 다시 볼 수 없어요."
            confirmLabel="확인"
            cancelLabel="취소"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};

interface WriteHeaderProps {
  isModal: boolean; // 모달 상태
  setIsModal: (value: boolean) => void; // 모달 상태를 설정하는 함수
}

const WriteHeader: React.FC<WriteHeaderProps> = ({ isModal, setIsModal }) => {
  const navigate = useNavigate();

  // 모달 상태를 on/off 토글하는 함수
  const toggleModal = () => {
    setIsModal(!isModal); // 현재 모달 상태의 반대값으로 설정
  };

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate("/community")}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.BackButton} />
      </button>

      <button onClick={toggleModal}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.MoreButton} />
      </button>
    </div>
  );
};

const WriteBody: React.FC<CommunityDetail> = (props) => {
  const [isLiked, setIsLiked] = useState(props.like);
  const [likeCount, setLikeCount] = useState(props.likes);

  return (
    <div className={cx("container-body")}>
      <Profile author={props.author} timeAgo={props.timeAgo} avatarUrl={props.avatarUrl} />
      <Spacing size={12} />
      <Typography className={cx("txt-title")}>{props.title}</Typography>

      <Spacing size={8} />
      <Typography className={cx("txt-content")}>{props.content}</Typography>

      {/* 대출 정보 */}
      <Spacing size={16} />
      {props.loanAdviceSummaryReport && <LoanCard {...props.loanAdviceSummaryReport} />}

      <Spacing size={16} />
      {/* 이미지 */}
      {props.imageUrl && <img src={props.imageUrl} alt="post" className={cx("imgPost")} />}

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
