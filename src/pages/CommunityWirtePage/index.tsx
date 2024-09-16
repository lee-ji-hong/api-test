import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityWritePage.module.scss";
import { useState, useEffect } from "react";
import WriteHeader from "./WriteHeader";
import WriteBody from "./WriteBody";
import WriteFooter from "./WriteFooter";

const cx = classNames.bind(styles);

const CommunityWirtePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        <WriteHeader inputValue={inputValue} textareaValue={textareaValue} />
      </div>
      <div className={cx("containerBody")}>
        <WriteBody
          setInputValue={setInputValue}
          setTextareaValue={setTextareaValue}
          inputValue={inputValue}
          textareaValue={textareaValue}
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          clearImagePreview={clearImagePreview}
        />
      </div>

      <Divider />
      <div className={cx("containerFooter")}></div>
      <WriteFooter setSelectedImage={setSelectedImage} setImagePreview={setImagePreview} />
    </div>
  );
};

export default CommunityWirtePage;
