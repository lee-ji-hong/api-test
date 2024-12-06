import Axios from "@/api/axios";
import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import styles from "./CommunityDetail.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCommunityDetail } from "@/hooks/queries/useGetCommunityDetail";
import { CommunityDetail, CommunityDetailResponse, LikeResponse } from "@/models";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
import DetailFooter from "./DetailFooter";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import BottomModal from "@/components/modal/BottomModal";
import CenterModal from "@/components/modal/CenterModal";
import { useLogEvent } from "@/utils/firebaseLogEvent";

const cx = classNames.bind(styles);

const CommunityDetailPage = () => {
  const location = useLocation();
  const { postId } = location.state as { postId: number };
  const [post, setPost] = useState<CommunityDetail>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(false); // 댓글 업데이트 여부 상태 추가
  const { communityDetail, isCommunityDetailLoading } = useGetCommunityDetail(postId);
  const navigate = useNavigate();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("CommunityDetail", {
      page_title: "./CommunityDetail",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

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

  // 댓글삭제모달 취소
  const handleCommentModalClose = () => {
    setIsCommentModalOpen(false);
  };

  // 댓글삭제모달 확인
  const handleCommentModalConfirm = async () => {
    const res = await Axios.delete<LikeResponse>(`/api/v1/comment/${postId}`, true);
    if (res.code === 200) {
      setCommentUpdated((prev) => !prev);
    }
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
      <DetailHeader
        isAuthor={communityDetail?.updateDeleteAuthority === "ALL"}
        isModal={isModalOpen}
        setIsModal={setIsModalOpen}
      />
      <div className={cx("containerContents")}>
        <Spacing size={9} />
        <Spacing size={12} />

        {post && <DetailBody communityDetail={post} handleCommentUpdate={handleCommentUpdate} />}

        {/* 좋아요, 댓글 */}
        <DetailFooter
          postId={postId}
          onCommentAdded={handleCommentUpdate}
          loginUserName={communityDetail?.loginUserName || ""}
        />

        <Spacing size={24} />
        {isModalOpen && (
          <BottomModal onClose={handleCloseModal} onEdit={() => handleEdit(communityDetail)} onDelete={handleDelete} />
        )}

        {isCenterModalOpen && (
          <CenterModal
            message={`게시글을 삭제할까요?\n게시글을 삭제하면 모든 데이터가 삭제되고\n다시 볼 수 없어요.`}
            subMessage="게시글을 삭제하면 모든 데이터가 삭제되고 다시 볼 수 없어요."
            confirmLabel="확인"
            cancelLabel="취소"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        )}

        {isCommentModalOpen && (
          <CenterModal
            message={`댓글을 삭제할까요?\n댓글을 삭제하면 모든 데이터가 삭제되고\n다시 볼 수 없어요.`}
            subMessage="댓글을 삭제하면 모든 데이터가 삭제되고 다시 볼 수 없어요."
            confirmLabel="확인"
            cancelLabel="취소"
            onCancel={handleCommentModalClose}
            onConfirm={handleCommentModalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityDetailPage;
