import { Button } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityWriteHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";

interface WriteHeaderProps {
  inputValue: string;
  textareaValue: string;
}

const cx = classNames.bind(styles);
const WriteHeader: React.FC<WriteHeaderProps> = ({ inputValue, textareaValue }) => {
  const navigate = useNavigate();

  // inputValue나 textareaValue에 값이 있으면 true, 없으면 false
  const isButtonActive = inputValue.trim() !== "" && textareaValue.trim() !== "";

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate(-1)}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      {/* 완료 버튼을 활성/비활성화 */}
      <Button
        className={cx("btnWriteComplete", { active: isButtonActive, inactive: !isButtonActive })}
        onClick={async () => {
          if (isButtonActive) {
            const formData = new FormData();
            console.log("제목:", inputValue);
            console.log("내용:", textareaValue);
            formData.append("title", inputValue);
            formData.append("content", textareaValue);

            try {
              await Axios.postMultipart("/api/v1/post", formData);
            } catch (error) {
              alert(`글 작성에 실패했습니다. ${error}`);
            }
          }
        }}
        disabled={!isButtonActive} // 버튼 비활성화
      >
        완료
      </Button>
    </div>
  );
};

export default WriteHeader;
