import classNames from "classnames/bind";
import styles from "./CommunityWriteHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityDetail } from "@/models";

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
    <div className={cx("container-write-header")}>
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
            communityDetail.imageFile && formData.append("imageFile", communityDetail.imageFile);

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
