import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityModifyPage.module.scss";
import { useState, useEffect } from "react";
import ModifyHeader from "./ModifyHeader";
import ModifyBody from "./ModifyBody";
import ModifyFooter from "./ModifyFooter";
import { useLocation } from "react-router-dom";
import { CommunityDetail } from "@/models";

const cx = classNames.bind(styles);

const CommunityModifyPage = () => {
  const location = useLocation();
  const { communityDetail } = location.state as { communityDetail: CommunityDetail };

  const [inputValue, setInputValue] = useState(communityDetail.title);
  const [textareaValue, setTextareaValue] = useState(communityDetail.content);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(communityDetail.imageUrl);

  // Function to clear image preview
  const clearImagePreview = () => {
    setSelectedImage(null);
    setImagePreview(null);
    console.log("이미지 미리보기 삭제");
  };

  useEffect(() => {
    console.log("inputValue:", inputValue);
    console.log("textareaValue:", textareaValue);
  }, [textareaValue, inputValue]);

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
          setInputValue={setInputValue}
          setTextareaValue={setTextareaValue}
          inputValue={inputValue}
          textareaValue={textareaValue}
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          clearImagePreview={clearImagePreview}
          loanAdviceReport={communityDetail.loanAdviceSummaryReport}
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
