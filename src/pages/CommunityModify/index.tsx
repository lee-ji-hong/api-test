import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityModifyPage.module.scss";
import { useState } from "react";
import ModifyHeader from "./ModifyHeader";
import ModifyBody from "./ModifyBody";
import ModifyFooter from "./ModifyFooter";
import { useLocation } from "react-router-dom";
import { CommunityDetail, LoanAdviceSummaryReport } from "@/models";

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

  // Function to clear image preview
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
        <ModifyHeader inputValue={inputValue} textareaValue={textareaValue} communityDetail={communityDetail} />
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
      <div className={cx("containerFooter")}></div>
      <ModifyFooter
        setSelectedImage={setSelectedImage}
        setImagePreview={setImagePreview}
        inputValue={inputValue}
        textAreaValue={textareaValue}
        contentDetail={communityDetail}
        setContentDetail={setCommunityDetail}
      />
    </div>
  );
};

export default CommunityModifyPage;
