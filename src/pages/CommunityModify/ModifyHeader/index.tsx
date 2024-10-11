import classNames from "classnames/bind";
import styles from "./ModifyHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityDetail } from "@/models";
import { compressImage, isFileSizeExceeding1MB } from "@/utils/imageCompressor";

interface ModifyHeaderProps {
  inputValue: string;
  textareaValue: string;
  communityDetail: CommunityDetail;
  onBackPressed: () => void;
}

const cx = classNames.bind(styles);
const ModifyHeader: React.FC<ModifyHeaderProps> = ({ inputValue, textareaValue, communityDetail, onBackPressed }) => {
  const navigate = useNavigate();

  // inputValue나 textareaValue에 값이 있으면 true, 없으면 false
  const isButtonActive = inputValue.trim() !== "" && textareaValue.trim() !== "";

  return (
    <div className={cx("containerWriteHeader")}>
      <button onClick={onBackPressed}>
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
            let imageFile = communityDetail.imageFile;

            formData.append("title", inputValue);
            formData.append("content", textareaValue);
            loanAdviceId && formData.append("loanAdviceResultId", loanAdviceId?.toString() || "");

            // 이미지 파일 압축 처리
            if (imageFile && isFileSizeExceeding1MB(imageFile)) {
              console.log("이미지 파일 용량이 1MB를 초과합니다. 압축을 진행합니다.");
              try {
                imageFile = await compressImage(imageFile);
              } catch (error) {
                console.error("이미지 압축에 실패했습니다:", error);
                alert("이미지 압축에 실패했습니다.");
                return;
              }
            } else {
              console.log("이미지 파일 용량이 1MB 이하입니다.");
            }

            // 압축된 이미지 파일을 FormData에 추가
            if (imageFile) {
              formData.append("imageFile", imageFile);
            }

            !imageFile && imageUrl && formData.append("existingImageUrl", imageUrl);

            try {
              await Axios.putMultipart(`/api/v1/post/${postId}`, formData);
              navigate("/community/detail", { state: { postId } });
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
