import { Button, Divider, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityWriteDetail.module.scss";
import { useState, useRef } from "react";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { useNavigate } from "react-router-dom";
import CommunityContents from "../CommunityPage/CommunityContents";
import Profile from "../CommunityPage/CommunityContents/Profile";
import Spacing from "@/components/shared/Spacing";

const cx = classNames.bind(styles);

const CommunityWirtePage = () => {
  return (
    <div className={cx("container")}>
      <WriteHeader />
      <WriteBody />
      <Divider />
      <WriteFooter />
    </div>
  );
};

const WriteHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container-write-header")}>
      <button onClick={() => navigate(-1)}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.BackButton} />
      </button>

      {/* 완료 버튼을 활성/비활성화 */}
      <Button
        className={cx("btn-write-complete")}
        onClick={() => {
          alert("완료버튼 클릭");
        }}>
        완료
      </Button>
    </div>
  );
};

const WriteBody = () => {
  return (
    <div>
      <Profile />
      <Spacing size={12} />
      <Typography>전세대출 보고입니다. 어떤 은행이 유리한가요?</Typography>
      <Spacing size={8} />
      <Typography>
        안녕하세요, 전세대출 처음 알아보는 30대 직장인입니다. 지금 살고 있는 집 전세 만기가 다가오고 있어서 대출을
        알아보고 있는데, 어떤 은행이 조건이 좋을지 모르겠어요. 연소득은 4천만원 정도 되고, 신용점수는 800점대
        중반입니다. 금리나 대출 한도에서 유리한 은행 추천해주실 수 있을까요? 그리고 대출 받을 때 꼭 챙겨야 할 서류나
        준비물도 알려주시면 감사하겠습니다. 참고로 하우스핏에서는 하단 대출을 추천해줬습니다.
      </Typography>
    </div>
  );
};

const WriteFooter = () => {
  // 각 input 태그에 접근하기 위한 ref 생성
  const imagePickerRef = useRef(null);
  // const docPickerRef = useRef(null);
  // const keyboardPickerRef = useRef(null);

  // 파일 선택 처리 함수
  const handleImagePick = (ref: any) => {
    if (ref && ref.current) {
      ref.current.click(); // input 클릭을 트리거
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("선택한 파일:", file); // 여기에서 파일을 처리하거나 상태로 저장할 수 있음
    }
  };

  return (
    <div className={cx("container-write-footer")}>
      <div className={cx("container-img-footer")}>
        {/* <Image className={cx("img-picture")} imageInfo={IMAGES?.PictureIcon} /> */}
        <div onClick={() => handleImagePick(imagePickerRef)}>
          <Image className={cx("img-picture")} imageInfo={IMAGES?.PictureIcon} />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={imagePickerRef}
          style={{ display: "none" }} // 파일 선택창을 숨김
          onChange={handleFileChange}
        />
        <SpacingWidth size={24} />
        <Image className={cx("img-doc")} imageInfo={IMAGES?.DocumentIcon} />
      </div>

      <Image className={cx("img-keyboard")} imageInfo={IMAGES?.KeyboardIcon} />
    </div>
  );
};

export default CommunityWirtePage;
