import classNames from "classnames/bind";
import styles from "./CommunityWriteBody.module.scss";
import Spacing from "@/components/shared/Spacing";

const cx = classNames.bind(styles);

interface WriteBodyProps {
  setInputValue: (value: string) => void;
  setTextareaValue: (value: string) => void;
  inputValue: string;
  textareaValue: string;
  selectedImage: File | null;
  imagePreview: string | null;
  clearImagePreview: () => void;
}

const WriteBody: React.FC<WriteBodyProps> = ({
  setInputValue,
  setTextareaValue,
  inputValue,
  textareaValue,
  imagePreview,
  clearImagePreview,
}) => {
  // const maxLength = 1000; // 최대 글자 수

  return (
    <div className={cx("container-write-body")}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        className={cx("input-title", {
          gray: !inputValue,
          black: inputValue,
        })}
        type="text"
        placeholder="제목을 입력해주세요"
      />
      <Spacing size={4} />
      <textarea
        style={{
          // position: "absolute",
          bottom: "35px", // 밑에서부터 500px 위에 위치
          width: "100%", // 너비는 부모의 100%로 설정
          height: "calc(100% - 35px - 100px)", // textarea의 높이를 상대적으로 설정
        }}
        onChange={(e) => setTextareaValue(e.target.value)}
        className={cx("input-area", {
          gray: !textareaValue,
          black: textareaValue,
        })}
        placeholder="내용을 입력해주세요."
      />
      {/* 이미지 미리보기 (textarea 바로 밑에 배치) */}
      {imagePreview && (
        <div className={cx("image-preview-container")}>
          <img src={imagePreview} alt="미리보기 이미지" className={cx("image-preview")} />
          <button className={cx("btn-remove-image")} onClick={clearImagePreview}>
            ✕
          </button>
        </div>
      )}

      {/* 글자 수 표시 */}
      <div className={cx("txt-limit-number")}>
        {textareaValue.length}/{`1,000`}
      </div>
    </div>
  );
};

export default WriteBody;
