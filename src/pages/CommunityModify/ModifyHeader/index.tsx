import { Button } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityModifyHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";

interface ModifyHeaderProps {
  inputValue: string;
  textareaValue: string;
  selectedImage: File | null;
  postId: number;
}

const cx = classNames.bind(styles);
const ModifyHeader: React.FC<ModifyHeaderProps> = ({ inputValue, textareaValue, selectedImage, postId }) => {
  const navigate = useNavigate();

  // inputValue나 textareaValue에 값이 있으면 true, 없으면 false
  const isButtonActive = inputValue.trim() !== "" && textareaValue.trim() !== "";
  console.log(postId);

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
            formData.append("imageFile", selectedImage as File);

            try {
              await Axios.postMultipart("/api/v1/post", formData);
              navigate(-1);
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

export default ModifyHeader;
