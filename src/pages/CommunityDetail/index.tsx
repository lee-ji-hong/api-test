import { Button, Divider, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityDetail.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { useNavigate } from "react-router-dom";
import Profile from "../CommunityPage/CommunityContents/Profile";
import Spacing from "@/components/shared/Spacing";
import LoanCard from "../CommunityCommonComponent/LoanCard";
import Heart from "../CommunityCommonComponent/Heart/index";
import Comment from "../CommunityCommonComponent/Comment";

const cx = classNames.bind(styles);

const CommunityDetail = () => {
  return (
    <div className={cx("container")}>
      <WriteHeader />
      <WriteBody />

      {/* 좋아요, 댓글 */}
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

      <button onClick={() => alert("더보기 클릭")}>
        <Image className={cx("btn-write-back")} imageInfo={IMAGES?.MoreButton} />
      </button>
    </div>
  );
};

const WriteBody = () => {
  return (
    <div className={cx("container-body")}>
      <Profile />
      <Spacing size={12} />
      <Typography className={cx("txt-title")}>전세대출 보고입니다. 어떤 은행이 유리한가요?</Typography>

      <Spacing size={8} />
      <Typography className={cx("txt-content")}>
        안녕하세요, 전세대출 처음 알아보는 30대 직장인입니다. 지금 살고 있는 집 전세 만기가 다가오고 있어서 대출을
        알아보고 있는데, 어떤 은행이 조건이 좋을지 모르겠어요. 연소득은 4천만원 정도 되고, 신용점수는 800점대
        중반입니다. 금리나 대출 한도에서 유리한 은행 추천해주실 수 있을까요? 그리고 대출 받을 때 꼭 챙겨야 할 서류나
        준비물도 알려주시면 감사하겠습니다. 참고로 하우스핏에서는 하단 대출을 추천해줬습니다.
      </Typography>

      <Spacing size={16} />

      <LoanCard onClick={() => alert("ㅇㅇ")} />
      <div className={cx("container-heart-comment")}>
        {/* <Image className={cx("img-like")} imageInfo={IMAGES?.HeartIcon} /> */}
        <Heart
          commentCnt={12}
          onClick={() => {
            alert("heart");
          }}
        />

        <SpacingWidth size={15} />
        {/*  */}

        <Comment
          commentCnt={12}
          onClick={() => {
            alert("comment");
          }}
        />
      </div>
    </div>
  );
};

const WriteFooter = () => {
  return (
    <div className={cx("container-footer")}>
      <div className={cx("container-inputbox")}>
        <input type="text" placeholder="김*니님의 생각을 댓글로 남겨주세요." className={cx("input-comment")} />
      </div>
    </div>
  );
};

export default CommunityDetail;
