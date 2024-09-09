import { IMAGES } from "@/constants/images";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

type ImageKeys = keyof typeof IMAGES;

interface HeaderProps {
  className?: string;
  onClick?: () => void;
  title?: string;
  right?: ImageKeys;
  left?: ImageKeys;
}

export const Header = ({ className, onClick, title, right, left }: HeaderProps) => {
  const rightImage = right ? IMAGES?.[right] : null;
  const leftImage = left ? IMAGES?.[left] : null;
  return (
    <header className={cx(["header", className])}>
      <button className={cx("backButton")} onClick={onClick}>
        {rightImage ? <Image className={cx("Icon")} imageInfo={rightImage} /> : null}
      </button>
      {title && <Text className={cx("txt-title")} text={title} />}
      <button className={cx("backButton")} onClick={onClick}>
        {leftImage ? <Image className={cx("Icon")} imageInfo={leftImage} /> : null}
      </button>
    </header>
  );
};

export default Header;
