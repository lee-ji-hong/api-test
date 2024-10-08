import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityModifyPage.module.scss";
import { useState, useEffect } from "react";
import ModifyHeader from "./ModifyHeader";
import ModifyBody from "./ModifyBody";
import ModifyFooter from "./ModifyFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { CommunityDetail, LoanAdviceSummaryReport } from "@/models";
import CenterModal from "@/components/modal/CenterModal";

const cx = classNames.bind(styles);

const CommunityModifyPage = () => {
  const location = useLocation();
  const recvCommunityDetail = location.state as { communityDetail: CommunityDetail };
  const [communityDetail, setCommunityDetail] = useState<CommunityDetail>(recvCommunityDetail.communityDetail);
  const [inputValue, setInputValue] = useState(communityDetail.title);
  const [textareaValue, setTextareaValue] = useState(communityDetail.content);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(communityDetail.imageUrl);
  const [loanAdviceReport, setLoanAdviceReport] = useState<LoanAdviceSummaryReport | null>(
    communityDetail.loanAdviceSummaryReport,
  );
  const [isModified, setIsModified] = useState(false); // 수정 여부를 추적할 상태
  const [showExitModal, setShowExitModal] = useState(false); // 모달 표시 여부
  const navigator = useNavigate();

  // 수정 상태 감지
  useEffect(() => {
    const hasChanges =
      inputValue !== recvCommunityDetail.communityDetail.title ||
      textareaValue !== recvCommunityDetail.communityDetail.content ||
      selectedImage !== null;
    setIsModified(hasChanges);
    console.log("수정 상태 감지 : ", hasChanges);
  }, [inputValue, textareaValue, selectedImage, recvCommunityDetail]);

  // 페이지 벗어나려고 할 때 모달 띄우기
  const onBackPressed = () => {
    if (isModified) {
      setShowExitModal(true);
    } else {
      navigator("/community/detail", { state: { postId: communityDetail.id } });
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigator(-1); // 페이지 벗어나기
  };

  const changeImage = (imgUrl: string, imgFile: File | null) => {
    setSelectedImage(imgFile);
    setImagePreview(imgUrl);

    const updatedCommunityDetail = {
      ...communityDetail,
      imageUrl: imgFile ? "" : imgUrl,
    };

    setCommunityDetail(updatedCommunityDetail);

    console.log("이미지 미리보기 삭제");
  };

  const clearLoanAdviceReport = () => {
    setLoanAdviceReport(null);
    const updatedCommunityDetail = {
      ...communityDetail,
      loanAdviceSummaryReport: null,
    };

    setCommunityDetail(updatedCommunityDetail);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <ModifyHeader
          inputValue={inputValue}
          textareaValue={textareaValue}
          communityDetail={communityDetail}
          onBackPressed={onBackPressed}
        />
      </div>
      <div className={cx("containerBody")}>
        <ModifyBody
          inputValue={inputValue}
          setInputValue={setInputValue}
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          selectedImage={selectedImage}
          changeImage={changeImage}
          imagePreview={imagePreview}
          loanAdviceReport={loanAdviceReport!}
          setLoanAdviceReport={setLoanAdviceReport}
          clearLoanAdviceReport={clearLoanAdviceReport}
          communityDetail={communityDetail}
        />
      </div>

      <Divider />
      <div className={cx("containerFooter")}>
        <ModifyFooter
          setSelectedImage={setSelectedImage}
          setImagePreview={setImagePreview}
          inputValue={inputValue}
          textAreaValue={textareaValue}
          contentDetail={communityDetail}
          setContentDetail={setCommunityDetail}
        />
      </div>

      {showExitModal && (
        <CenterModal
          message={`뒤로 갈까요?\n작성 중인 내용은 저장되지 않아요.`}
          subMessage=""
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => setShowExitModal(false)}
          onConfirm={handleConfirmExit}
        />
      )}
    </div>
  );
};

export default CommunityModifyPage;
