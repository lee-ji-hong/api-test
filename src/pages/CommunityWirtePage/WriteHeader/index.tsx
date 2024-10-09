import classNames from "classnames/bind";
import styles from "./WriteHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityDetail } from "@/models";
import { compressImage, isFileSizeExceeding1MB } from "@/utils/imageCompressor";

interface WriteHeaderProps {
  inputValue: string;
  textareaValue: string;
  communityDetail: CommunityDetail;
}

const cx = classNames.bind(styles);
const WriteHeader: React.FC<WriteHeaderProps> = ({ inputValue, textareaValue, communityDetail }) => {
  const navigate = useNavigate();

  // inputValue나 textareaValue에 값이 있으면 true, 없으면 false
  const isButtonActive = inputValue.trim() !== "" && textareaValue.trim() !== "";

  return (
    <div className={cx("containerWriteHeader")}>
      <button onClick={() => navigate("/community", { replace: true })}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      {/* 완료 버튼을 활성/비활성화 */}
      <button
        className={cx("btnWriteComplete", { active: isButtonActive, inactive: !isButtonActive })}
        onClick={async () => {
          if (isButtonActive) {
            const formData = new FormData();
            const loanAdviceId = communityDetail?.loanAdviceSummaryReport?.loanAdviceResultId;
            console.log("제목:", inputValue);
            console.log("내용:", textareaValue);
            formData.append("title", inputValue);
            formData.append("content", textareaValue);
            formData.append("loanAdviceResultId", loanAdviceId?.toString() || "");

            // 이미지 파일 압축 처리
            let imageFile = communityDetail.imageFile;
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

            // communityDetail.imageFile && formData.append("imageFile", communityDetail.imageFile);

            try {
              await Axios.postMultipart("/api/v1/post", formData);
              navigate("/community");
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

export default WriteHeader;
