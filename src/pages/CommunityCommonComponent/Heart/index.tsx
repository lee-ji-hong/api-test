import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./Heart.module.scss";

interface HeartProps {
  commentCnt: number;
  isActive: boolean;
  onClick: () => void;
}

const Heart: React.FC<HeartProps> = (props) => {
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx("container")}
      onClick={(event) => {
        event.stopPropagation();
        props.onClick();
      }}>
      {props.isActive ? (
        <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIconActive} />
      ) : (
        <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} />
      )}

      <Typography className={cx("txt-like")}>{props.commentCnt}</Typography>
    </div>
  );
};

export default Heart;
