import { useState } from "react";
import { Divider, Typography } from "@mui/material";
import Axios from "@/api/axios";
import classNames from "classnames/bind";
import styles from "./DetailFooter.module.scss";
import Spacing from "@/components/shared/Spacing";
import { useRef } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles);

interface WriteFooterProps {
  postId: number;
  onCommentAdded: () => void;
  loginUserName: string;
}

const DetailFooter: React.FC<WriteFooterProps> = ({ postId, onCommentAdded, loginUserName }) => {
  const [commentContent, setCommentContent] = useState(""); // 댓글 내용을 저장할 상태
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // textarea의 높이를 조절하고, 최대 4줄까지만 늘어나도록 제한하는 함수
  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화

      // 한 줄의 높이와 최대 줄 수를 계산하여 최대 높이를 설정
      const lineHeight = 24; // 예: 한 줄 높이 (px)
      const maxRows = 4; // 최대 줄 수
      const maxHeight = lineHeight * maxRows;

      // 내용에 맞춰 높이를 조정하되, 최대 높이를 초과하지 않음
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;

      // 최대 높이에 도달한 경우에만 스크롤을 활성화
      textareaRef.current.style.overflowY = textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  useEffect(() => {
    handleResize(); // 초기 로드 시 호출
  }, [commentContent]); // commentContent가 변경될 때마다 호출

  return (
    <div className={cx("containerFooter")}>
      <Divider
        sx={{
          borderBottomWidth: "1px",
          backgroundColor: "##F7F7F7",
          height: "1px",
          marginLeft: "-20px",
          marginRight: "-20px",
        }}
      />

      <Spacing size={10} />
      <div className={cx("containerSubFooter")}>
        <div className={cx("containerInputbox")}>
          <textarea
            ref={textareaRef}
            placeholder={`${loginUserName}님의 생각을 댓글로 남겨주세요.`}
            className={cx("inputComment")}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={1} // 최소 줄 수
            style={{
              overflow: "hidden", // 스크롤 제거
              resize: "none", // 수동 크기 조절 비활성화
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
              scrollbarWidth: "none",
            }}
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
