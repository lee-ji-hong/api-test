import { useState } from "react";
import { Divider, Typography } from "@mui/material";
import Axios from "@/api/axios";
import classNames from "classnames/bind";
import styles from "./DetailFooter.module.scss";
import Spacing from "@/components/shared/Spacing";

const cx = classNames.bind(styles);

interface WriteFooterProps {
  postId: number;
  author: string | undefined;
  onCommentAdded: () => void;
}

const DetailFooter: React.FC<WriteFooterProps> = ({ postId, author, onCommentAdded }) => {
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
      <Divider sx={{ borderBottomWidth: "1px" }} />
      <Spacing size={16} />

      <div className={cx("containerSubFooter")}>
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
    </div>
  );
};

export default DetailFooter;
