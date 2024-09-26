import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityModifyPage.module.scss";
import { useState, useEffect } from "react";
import ModifyHeader from "./ModifyHeader";
import ModifyBody from "./ModifyBody";
import ModifyFooter from "./ModifyFooter";
import { useLocation } from "react-router-dom";
import { CommunityDetail } from "@/models";
import { LoanAdviceSummaryReport } from "@/api/model/CommunityResponse";

const cx = classNames.bind(styles);

const CommunityModifyPage = () => {
  const location = useLocation();
  const recvCommunityDetail = location.state as { communityDetail: CommunityDetail };
  const [communityDetail, setCommunityDetail] = useState<CommunityDetail>(recvCommunityDetail.communityDetail);
  const [inputValue, setInputValue] = useState(communityDetail.title);
  const [textareaValue, setTextareaValue] = useState(communityDetail.content);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loanAdviceReport, setLoanAdviceReport] = useState<LoanAdviceSummaryReport | null>(
    communityDetail.loanAdviceSummaryReport,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(communityDetail.imageUrl);

  // Function to clear image preview
  const clearImagePreview = () => {
    setSelectedImage(null);
    setImagePreview(null);

    const updatedCommunityDetail = {
      ...communityDetail,
      imageUrl: "",
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

  useEffect(() => {
    console.log("inputValue:", inputValue);
    console.log("textareaValue:", textareaValue);
    console.log("communityDetail:", communityDetail);
  }, [textareaValue, inputValue, communityDetail]);

  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <ModifyHeader
          inputValue={inputValue}
          textareaValue={textareaValue}
          selectedImage={selectedImage}
          postId={communityDetail.id}
        />
      </div>
      <div className={cx("containerBody")}>
        <ModifyBody
          inputValue={inputValue}
          setInputValue={setInputValue}
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          selectedImage={selectedImage}
          clearImagePreview={clearImagePreview}
          imagePreview={imagePreview}
          loanAdviceReport={loanAdviceReport!}
          setLoanAdviceReport={setLoanAdviceReport}
          clearLoanAdviceReport={clearLoanAdviceReport}
        />
      </div>

      <Divider />
      <div className={cx("containerFooter")}></div>
      <ModifyFooter
        communityDetail={communityDetail}
        setSelectedImage={setSelectedImage}
        setImagePreview={setImagePreview}
      />
    </div>
  );
};

export default CommunityModifyPage;
