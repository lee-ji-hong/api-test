import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import BottomModal from "@/components/modal/BottomModal";
import { useState } from "react";
import CenterModal from "@/components/modal/CenterModal";
import Axios from "@/api/axios";
import { Comment, LikeResponse } from "@/models";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
interface ProfileProps {
  avatarUrl: string;
  author: string;
  timeAgo: string;
  updateDeleteAuthority?: string;
  comment?: Comment;
  onCommentDeleteSuccess?: () => void;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthor = props.updateDeleteAuthority === "ALL";

  // URL 유효성 검증 함수
  const checkValidUrl = (url: string): boolean => {
    try {
      // URL 형식 검증
      if (!url) return false;
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isVaildUrl: boolean = checkValidUrl(props.avatarUrl);
  IMAGES?.ProfileDummyIcon || "";

  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      <div style={{ display: "flex" }}>
        {isVaildUrl ? (
          <img alt="profile" src={props.avatarUrl} className={cx("img-profile")} />
        ) : (
          <Image className={cx("img-profile")} imageInfo={IMAGES?.ProfileDummyIcon} />
        )}

        <div style={{ marginLeft: "10px" }}>
          <Typography className={cx("txt-name")}>{props.author}</Typography>
          <Typography className={cx("txt-time")}>{props.timeAgo}</Typography>
        </div>
      </div>

      {isAuthor && (
        <button
          onClick={() => {
            setIsBottomModalOpen(!isBottomModalOpen);
          }}>
          <Image className={cx("btnMore")} imageInfo={IMAGES?.MoreButton} />
        </button>
      )}

      {isBottomModalOpen && (
        <BottomModal
          onClose={() => setIsBottomModalOpen(false)}
          onEdit={() => {
            navigate("/community/detail/modify-comment", { state: { comment: props.comment } });
          }}
          onDelete={() => {
            setIsBottomModalOpen(false);
            setIsCenterModalOpen(true);
          }}
        />
      )}

      {isCenterModalOpen && (
        <CenterModal
          message={`댓글을 삭제할까요?\n댓글을 삭제하면 모든 데이터가 삭제되고\n다시 볼 수 없어요.`}
          subMessage="댓글을 삭제하면 모든 데이터가 삭제되고 다시 볼 수 없어요."
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => setIsCenterModalOpen(false)}
          onConfirm={async () => {
            try {
              const res: LikeResponse = await Axios.delete(`/api/v1/comment/${props.comment?.id}`, true);
              if (res.code === 200) {
                console.log("댓글 삭제 성공");
                props.onCommentDeleteSuccess && props.onCommentDeleteSuccess();
              } else {
                console.error("댓글 삭제 실패");
              }
            } catch (error) {
              console.error("댓글 삭제 실패", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default Profile;
