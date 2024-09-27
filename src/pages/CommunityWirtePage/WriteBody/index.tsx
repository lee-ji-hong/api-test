import classNames from "classnames/bind";
import styles from "./CommunityWriteBody.module.scss";
import Spacing from "@/components/shared/Spacing";
import React, { useRef, useEffect } from "react";
import { CommunityDetail, LoanAdviceSummaryReport } from "@/models";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";

const cx = classNames.bind(styles);

interface WriteBodyProps {
  inputValue: string;
  textareaValue: string;
  selectedImage: File | null;
  imagePreview: string | null;
  loanAdviceReport: LoanAdviceSummaryReport;
  contentDetail: CommunityDetail;
  setInputValue: (value: string) => void;
  setTextareaValue: (value: string) => void;
  changeImage: (imgUrl: string, imgFile: File | null) => void;
  clearLoanAdviceReport: () => void;
  setLoanAdviceReport: (value: LoanAdviceSummaryReport | null) => void;
}

interface TextAreaProps {
  textareaValue: string;
  setTextareaValue: (value: string) => void;
  maxLines: number;
}

const WriteBody: React.FC<WriteBodyProps> = ({
  inputValue,
  textareaValue,
  loanAdviceReport,
  changeImage,
  clearLoanAdviceReport,
  setInputValue,
  setTextareaValue,
  contentDetail,
}) => {
  return (
    <div className={cx("containerWriteBody")}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        className={cx("inputTitle", {
          gray: !inputValue,
          black: inputValue,
        })}
        type="text"
        placeholder="제목을 입력해주세요"
      />
      <Spacing size={4} />

      {/* 텍스트 영역과 이미지 미리보기를 Flex로 관리 */}
      <div className={cx("contentArea")}>
        <TextArea textareaValue={textareaValue} setTextareaValue={setTextareaValue} maxLines={15} />

        <div className={cx("imagePreviewContainer")}>
          {contentDetail.loanAdviceSummaryReport && (
            <div>
              <LoanCard {...loanAdviceReport} />
              <button className={cx("btn-remove-image")} onClick={clearLoanAdviceReport}>
                ✕
              </button>
            </div>
          )}
        </div>

        <Spacing size={16} />
        {contentDetail.imageUrl && (
          <div className={cx("imagePreviewContainer")}>
            <img src={contentDetail.imageUrl} alt="미리보기 이미지" className={cx("imagePreview")} />
            <button className={cx("btn-remove-image")} onClick={() => changeImage("", null)}>
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 글자 수 표시 */}
      <div className={cx("txtLimitNumber")}>
        {textareaValue.length}/{`1,000`}
      </div>
    </div>
  );
};

const TextArea: React.FC<TextAreaProps> = ({ textareaValue, setTextareaValue, maxLines }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 입력된 줄 수 계산
  const getLineCount = (value: string) => {
    return value.split("\n").length;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lineCount = getLineCount(newValue);

    // 줄 수가 최대 라인을 넘지 않을 때만 값 업데이트
    if (lineCount <= maxLines) {
      setTextareaValue(newValue);
    }
  };

  // 텍스트가 입력될 때마다 textarea의 높이를 자동으로 조정
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
  };

  useEffect(() => {
    autoResize();
  }, [textareaValue]);

  return (
    <textarea
      ref={textareaRef}
      onChange={handleInputChange}
      value={textareaValue}
      className={cx("inputArea", {
        gray: !textareaValue,
        black: textareaValue,
      })}
      placeholder="내용을 입력해주세요."
    />
  );
};

export default WriteBody;
