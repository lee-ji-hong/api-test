import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./Heart.module.scss";

interface HeartProps {
  commentCnt: number;
  onClick: () => void;
}

const Heart: React.FC<HeartProps> = (props) => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")} onClick={props.onClick}>
      <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} />
      <Typography className={cx("txt-like")}>{props.commentCnt}</Typography>
    </div>
  );
};

export default Heart;
