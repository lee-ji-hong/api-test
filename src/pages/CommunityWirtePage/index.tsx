import { Button, Divider } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./CommunityWritePage.module.scss";
import Spacing from "@/components/shared/Spacing";
import { useState } from "react";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import SpacingWidth from "@/components/shared/SpacingWidth";

const cx = classNames.bind(styles);

const CommunityWirtePage = () => {
  return (
    <div className={cx("container")}>
      <WirteHeader />
      <WriteBody />
      <Divider />
      <WriteFooter />
    </div>
  );
};

const WirteHeader = () => {
  return (
    <div className={cx("container-write-header")}>
      <Button>
        <ChevronLeft className={cx("btn-write-back")} />
      </Button>
      <Button
        className={cx("btn-write-complete", { active: true, inactive: false })}
        onClick={() => console.log("텍스트 버튼 클릭!")}>
        완료
      </Button>
    </div>
  );
};

const WriteBody = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const maxLength = 1000; // 최대 글자 수

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
      {/* 글자 수 표시 */}
      <div className={cx("txt-limit-number")}>
        {textareaValue.length}/{`1,000`}
      </div>
    </div>
  );
};

const WriteFooter = () => {
  return (
    <div className={cx("container-write-footer")}>
      <div className={cx("container-img-footer")}>
        <Image className={cx("img-picture")} imageInfo={IMAGES?.PictureIcon} />
        <SpacingWidth size={10} />
        <Image className={cx("img-doc")} imageInfo={IMAGES?.DocumentIcon} />
      </div>

      <Image className={cx("img-keyboard")} imageInfo={IMAGES?.KeyboardIcon} />
    </div>
  );
};

export default CommunityWirtePage;
