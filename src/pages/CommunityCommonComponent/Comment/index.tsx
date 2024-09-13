import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./Comment.module.scss";

interface CommentProps {
  commentCnt: number;
  onClick: () => void;
}

const Comment: React.FC<CommentProps> = (props) => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")} onClick={props.onClick}>
      <Image className={cx("img-comment")} imageInfo={IMAGES?.CommentIcon} />
      <Typography className={cx("txt-comment")}>{props.commentCnt}</Typography>
    </div>
  );
};

export default Comment;
