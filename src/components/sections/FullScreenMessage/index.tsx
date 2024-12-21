import Image from "@/components/shared/Image";
import { LinearProgress } from "@mui/material";
import { IMAGES } from "@/constants/images";

import classNames from "classnames/bind";
import styles from "./FullScreenMessage.module.scss";
const cx = classNames.bind(styles);

interface FullScreenMessageProps {
  type: "loading" | "error";
}

function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <>
      {type === "loading" ? (
        <Loading />
      ) : (
        <>
          <Error />
          에러가 발생했어요 잠시 후 다시 시도해주세요.
        </>
      )}
    </>
  );
}

function Error() {
  return (
    <div className={cx("container")}>
      <Image className={cx("ico-heart")} imageInfo={IMAGES?.LoadingHeart} />
    </div>
  );
}

function Loading() {
  return <LinearProgress />;
}

export default FullScreenMessage;
