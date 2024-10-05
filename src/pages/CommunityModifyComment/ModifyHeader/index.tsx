import classNames from "classnames/bind";
import styles from "./CommunityModifyHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Axios from "@/api/axios";
import { CommentResponse } from "@/models";
import CenterModal from "@/components/modal/CenterModal";
import React from "react";

const cx = classNames.bind(styles);

interface ModifyHeaderProps {
  commentId: number;
  inputValue: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
}
const ModifyHeader: React.FC<ModifyHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = React.useState(false);

  return (
    <div className={cx("containerModifyHeader")}>
      <button
        onClick={() => {
          if (props.isModified) {
            setIsShowModal(true);
          } else {
            navigate(-1);
          }
        }}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      <Typography className={cx("txtTitle")}>댓글 수정</Typography>

      <button
        className={cx("btnWriteComplete")}
        onClick={async () => {
          try {
            const res = await Axios.put<CommentResponse>(
              `/api/v1/comment/${props.commentId}`,
              {
                updatedContent: props.inputValue,
              },
              true,
            );
            if (res.code === 200) {
              navigate(-1);
            } else {
              alert(`댓글 수정에 실패했습니다. ${res.message}`);
            }
          } catch (error) {
            alert(`댓글 수정에 실패했습니다. ${error}`);
            console.error("Failed to modify comment:", error);
          }
        }}>
        완료
      </button>

      {isShowModal && (
        <CenterModal
          message={`댓글 수정을 그만할까요?\n변경된 내용은 저장되지 않아요.`}
          subMessage=""
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => setIsShowModal(false)}
          onConfirm={() => {
            props.setIsModified(false);
            setIsShowModal(false);
            navigate(-1);
          }}
        />
      )}
    </div>
  );
};

export default ModifyHeader;
