import styles from "./Image.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

type ImageInfo = {
  src: string;
  alt: string;
};
type ObjectFit = "fill" | "contain" | "cover" | "scale-down" | "none";

interface ImageProps {
  imageInfo: ImageInfo;
  objectFit?: ObjectFit;
  className?: string;
}

const Image = ({ imageInfo, objectFit = "fill", className }: ImageProps) => {
  return <img className={cx("img", objectFit, className)} src={imageInfo.src} alt={imageInfo.alt} />;
};

export default Image;
