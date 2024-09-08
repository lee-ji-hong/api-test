import { Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./CommunityWritePage.module.scss";
import Spacing from "@/components/shared/Spacing";
import { useState } from "react";

const cx = classNames.bind(styles);

const CommunityWirtePage = () => {
  return (
    <div className={cx("container")}>
      <WirteHeader />
      <WriteBody />
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
        onChange={(e) => setTextareaValue(e.target.value)}
        className={cx("input-area", {
          gray: !textareaValue,
          black: textareaValue,
        })}
        placeholder="내용을 입력해주세요."
      />
    </div>
  );
};

const WriteFooter = () => {
  return (
    <div className={cx("container-write-footer")}>
      <button className={cx("btn-save")}>저장</button>
    </div>
  );
};

export default CommunityWirtePage;
