import styles from "./RoundButton.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface RoundButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({ text, onClick, isActive }) => (
  <button onClick={onClick} className={cx("roundButton", { active: isActive })}>
    <div className={cx("text", { active: isActive })}>{text}</div>
  </button>
);

export default RoundButton;
