import Lottie from "@/components/shared/Lottie";
import classNames from "classnames/bind";
import styles from "./FullScreenMessage.module.scss";
const cx = classNames.bind(styles);

interface FullScreenMessageProps {
  type: "loading" | "error";
}

function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <div className={cx("container")}>
      {type === "loading" ? (
        <Loading />
      ) : (
        <>
          <Error />
          에러가 발생했어요 잠시 후 다시 시도해주세요.
        </>
      )}
    </div>
  );
}

function Error() {
  return <Lottie src="https://static.toss.im/tds/icon/png/4x/icn-warning-color.png" />;
}

function Loading() {
  return <Lottie src="https://static.toss.im/lotties/loading/circle-loading.json" />;
}

export default FullScreenMessage;
