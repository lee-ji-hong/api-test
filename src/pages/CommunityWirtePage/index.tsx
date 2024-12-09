import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityWritePage.module.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import WriteHeader from "./WriteHeader";
import WriteBody from "./WriteBody";
import WriteFooter from "./WriteFooter";
import { CommunityDetail, LoanAdviceSummaryReport } from "@/models";
import { useRef } from "react";
import { useEffect } from "react";
import { useLogEvent } from "@/utils/firebaseLogEvent";

const cx = classNames.bind(styles);

const CommunityWirtePage = () => {
  const location = useLocation();
  const recvCommunityDetail = location.state as { communityDetail: CommunityDetail };
  const defaultCommunityDetail: CommunityDetail = {
    id: 0, // 기본값 0
    title: "", // 빈 문자열
    content: "", // 빈 문자열
    author: "", // 빈 문자열
    imageUrl: "", // 빈 문자열
    imageFile: null, // null로 초기화 (파일이 없을 때)
    likes: 0, // 기본값 0
    comments: [], // 빈 배열
    commentCount: 0, // 기본값 0
    createdDate: [], // 빈 배열
    lastModifiedDate: [], // 빈 배열
    avatarUrl: "", // 빈 문자열
    timeAgo: "", // 빈 문자열
    loanAdviceSummaryReport: null, // null로 초기화
    like: false, // 기본값 false
    updateDeleteAuthority: "", // 빈 문자열
    loginUserName: "", // 빈 문자열
  };
  const [communityDetail, setCommunityDetail] = useState<CommunityDetail>(
    recvCommunityDetail.communityDetail ?? defaultCommunityDetail,
  );

  const [inputValue, setInputValue] = useState(communityDetail.title);
  const [textareaValue, setTextareaValue] = useState(communityDetail.content);
  const [selectedImage, setSelectedImage] = useState<File | null>(communityDetail.imageFile || null);
  const [imagePreview, setImagePreview] = useState<string | null>(communityDetail.imageUrl);
  const [loanAdviceReport, setLoanAdviceReport] = useState<LoanAdviceSummaryReport | null>(
    communityDetail.loanAdviceSummaryReport,
  );
  const logEvent = useLogEvent();
  useEffect(() => {
    logEvent("CommunityWirtePage", {
      page_title: "./CommunityWirtePage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  // Function to clear image preview
  const changeImage = (imgUrl: string, imgFile: File | null) => {
    setSelectedImage(imgFile);
    setImagePreview(imgUrl);

    const updatedCommunityDetail = {
      ...communityDetail,
      imageUrl: imgUrl,
      imgFile: imgFile,
    };

    setCommunityDetail(updatedCommunityDetail);

    console.log("이미지 삭제");
  };

  const clearLoanAdviceReport = () => {
    setLoanAdviceReport(null);
    const updatedCommunityDetail = {
      ...communityDetail,
      loanAdviceSummaryReport: null,
    };

    setCommunityDetail(updatedCommunityDetail);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={cx("container")}
      onClick={() => {
        textareaRef.current?.focus();
      }}>
      <div className={cx("containerHeader")}>
        <WriteHeader inputValue={inputValue} textareaValue={textareaValue} communityDetail={communityDetail} />
      </div>
      <div className={cx("containerBody")}>
        <WriteBody
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
          contentDetail={communityDetail}
          textareaRef={textareaRef}
        />
      </div>

      <Divider />
      <div className={cx("containerFooter")}>
        <WriteFooter
          setSelectedImage={setSelectedImage}
          setImagePreview={setImagePreview}
          inputValue={inputValue}
          textAreaValue={textareaValue}
          contentDetail={communityDetail}
          setContentDetail={setCommunityDetail}
        />
      </div>
    </div>
  );
};

export default CommunityWirtePage;
