import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DetailHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);
interface WriteHeaderProps {
  isAuthor: boolean; // 모달 상태
  isModal: boolean; // 모달 상태
  setIsModal: (value: boolean) => void; // 모달 상태를 설정하는 함수
}

const DetailHeader: React.FC<WriteHeaderProps> = ({ isAuthor, isModal, setIsModal }) => {
  const navigate = useNavigate();

  // 모달 상태를 on/off 토글하는 함수
  const toggleModal = () => {
    setIsModal(!isModal); // 현재 모달 상태의 반대값으로 설정
  };

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate("/community")}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.BackButton} />
      </button>

      {isAuthor && (
        <button onClick={toggleModal}>
          <Image className={cx("btn-write-back")} imageInfo={IMAGES?.MoreButton} />
        </button>
      )}
    </div>
  );
};

export default DetailHeader;
