import classNames from "classnames/bind";
import styles from "./ModifyBody.module.scss";
import Spacing from "@/components/shared/Spacing";
import React, { useRef, useEffect } from "react";
import { CommunityDetail, LoanAdviceSummaryReport } from "@/models";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";

const cx = classNames.bind(styles);

interface WriteBodyProps {
  setInputValue: (value: string) => void;
  setTextareaValue: (value: string) => void;
  inputValue: string;
  textareaValue: string;
  selectedImage: File | null;
  imagePreview: string | null;
  changeImage: (imgUrl: string, imgFile: File | null) => void;
  clearLoanAdviceReport: () => void;
  loanAdviceReport: LoanAdviceSummaryReport;
  setLoanAdviceReport: (value: LoanAdviceSummaryReport | null) => void;
  communityDetail: CommunityDetail;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

interface TextAreaProps {
  textareaValue: string;
  setTextareaValue: (value: string) => void;
  maxLines: number;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

const WriteBody: React.FC<WriteBodyProps> = ({
  setInputValue,
  setTextareaValue,
  inputValue,
  textareaValue,
  changeImage,
  loanAdviceReport,
  clearLoanAdviceReport,
  communityDetail,
  textareaRef,
}) => {
  return (
    <div className={cx("containerWriteBody")}>
      <TitleArea textareaValue={inputValue} setTextareaValue={setInputValue} maxLines={15} />
      <Spacing size={4} />
      {/* 텍스트 영역과 이미지 미리보기 */}
      <div className={cx("contentArea")}>
        <TextArea
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          maxLines={15}
          textareaRef={textareaRef}
        />

        <div className={cx("imagePreviewContainer")}>
          {communityDetail.loanAdviceSummaryReport && (
            <div>
              <LoanCard {...loanAdviceReport} />
              <button className={cx("btn-remove-image")} onClick={clearLoanAdviceReport}>
                ✕
              </button>
            </div>
          )}
        </div>

        <Spacing size={16} />
        {communityDetail.imageUrl && (
          <div className={cx("imagePreviewContainer")}>
            <img src={communityDetail.imageUrl} alt="미리보기 이미지" className={cx("imagePreview")} />
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

const TitleArea: React.FC<TextAreaProps> = ({ textareaValue, setTextareaValue, maxLines }) => {
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

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation(); // 이벤트 버블링 중단, 부모 클릭 이벤트로 전파되지 않음
  };

  return (
    <textarea
      ref={textareaRef}
      onClick={handleClick}
      onChange={handleInputChange}
      value={textareaValue}
      className={cx("inputTitle", {
        gray: !textareaValue,
        black: textareaValue,
      })}
      placeholder="제목을 입력해주세요."
    />
  );
};

const TextArea: React.FC<TextAreaProps> = ({ textareaValue, setTextareaValue, maxLines, textareaRef }) => {
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
    if (textareaRef?.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
  };

  useEffect(() => {
    autoResize();
  }, [textareaValue]);

  return (
    <textarea
      style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
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
