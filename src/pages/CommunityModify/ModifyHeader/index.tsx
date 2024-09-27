import classNames from "classnames/bind";
import styles from "./CommunityModifyHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityDetail } from "@/models";

interface ModifyHeaderProps {
  inputValue: string;
  textareaValue: string;
  communityDetail: CommunityDetail;
}

const cx = classNames.bind(styles);
const ModifyHeader: React.FC<ModifyHeaderProps> = ({ inputValue, textareaValue, communityDetail }) => {
  const navigate = useNavigate();

  // inputValue나 textareaValue에 값이 있으면 true, 없으면 false
  const isButtonActive = inputValue.trim() !== "" && textareaValue.trim() !== "";

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate("/community/detail", { state: { postId: communityDetail.id } })}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      {/* 완료 버튼을 활성/비활성화 */}
      <button
        className={cx("btnWriteComplete", { active: isButtonActive, inactive: !isButtonActive })}
        onClick={async () => {
          if (isButtonActive) {
            const formData = new FormData();
            const postId = communityDetail.id;
            const loanAdviceId = communityDetail?.loanAdviceSummaryReport?.loanAdviceResultId;
            const imageUrl = communityDetail.imageUrl;
            const imageFile = communityDetail.imageFile;

            formData.append("title", inputValue);
            formData.append("content", textareaValue);
            loanAdviceId && formData.append("loanAdviceResultId", loanAdviceId?.toString() || "");
            imageFile && formData.append("imageFile", imageFile);
            !imageFile && imageUrl && formData.append("existingImageUrl", imageUrl);

            try {
              await Axios.putMultipart(`/api/v1/post/${postId}`, formData);
              navigate(-1);
            } catch (error) {
              alert(`글 작성에 실패했습니다. ${error}`);
            }
          }
        }}
        disabled={!isButtonActive} // 버튼 비활성화
      >
        완료
      </button>
    </div>
  );
};

export default ModifyHeader;
