import Spacing from "@/components/shared/Spacing";
import { Comment } from "@/models";
import classNames from "classnames/bind";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CommunityModifyPage.module.scss";
import ModifyBody from "./ModifyBody";
import ModifyHeader from "./ModifyHeader";
const cx = classNames.bind(styles);

const CommunityModifyCommentPage = () => {
  const location = useLocation().state as { comment: Comment };
  const comment = location.comment;
  const [textareaValue, setTextareaValue] = useState<string>(comment.content);
  const [isModified, setIsModified] = useState(false);

  return (
    <div className={cx("container")}>
      <ModifyHeader
        commentId={comment.id}
        inputValue={textareaValue}
        isModified={isModified}
        setIsModified={setIsModified}
      />
      <Spacing size={16} />
      <ModifyBody textareaValue={textareaValue} setTextareaValue={setTextareaValue} setIsModified={setIsModified} />
    </div>
  );
};

export default CommunityModifyCommentPage;
