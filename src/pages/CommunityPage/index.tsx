import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Button, Typography } from "@mui/material";

import Spacing from "@/components/shared/Spacing";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityContents from "./CommunityContents";

const cx = classNames.bind(styles);
const CommunityPage = () => {
  const [isLatest, setIsLatest] = useState(true);

  const InfiniteScrollComponent = () => {
    // 전체 데이터 배열 (30개)
    const allItems = Array.from({ length: 30 }, (_, index) => `Community Content #${index + 1}`);

    // 처음엔 5개만 표시되도록 설정
    const [visibleItems, setVisibleItems] = useState(allItems.slice(0, 5));
    const [hasMore, setHasMore] = useState(true); // 더 이상 추가로 로드하지 않음

    // 스크롤이 끝에 도달할 때 호출되는 함수 (5개씩 추가 로드)
    const fetchMoreData = () => {
      if (visibleItems.length >= allItems.length) {
        setHasMore(false); // 모든 데이터를 다 로드하면 더 이상 로드하지 않도록 설정
        return;
      }

      // 5개의 새로운 데이터를 추가로 가져옴
      setTimeout(() => {
        setVisibleItems((prevItems) => [...prevItems, ...allItems.slice(prevItems.length, prevItems.length + 5)]);
      }, 500); // 로딩 시간 시뮬레이션 (선택 사항)
    };

    return (
      <InfiniteScroll
        dataLength={visibleItems.length} // 현재 표시 중인 데이터 수
        next={fetchMoreData} // 더 가져오는 데이터가 없으므로 빈 함수
        hasMore={hasMore} // 더 불러올 데이터가 없으므로 false
        loader={<h4>Loading...</h4>} // 로딩 상태, 필요 없으면 제거 가능
        endMessage={<p>모두 불러왔습니다.</p>} // 끝났을 때 메시지
      >
        {visibleItems.map((item, index) => (
          <CommunityContents key={index} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div className={cx("container")}>
      <Typography className={cx("txt-title")}>커뮤니티</Typography>
      <Spacing size={16} />
      <div className={cx("button-space")}>
        <RoundButton
          text="최신순"
          onClick={() => {
            console.log("최신순 클릭");
            setIsLatest(true);
          }}
          isActive={isLatest}
        />
        <Spacing size={4} />
        <RoundButton
          text="인기순"
          onClick={() => {
            console.log("인기순 클릭");
            setIsLatest(false);
          }}
          isActive={!isLatest}
        />
      </div>

      <Spacing size={34} />

      {InfiniteScrollComponent()}
    </div>
  );
};

interface RoundButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const RoundButton = (props: RoundButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={{
        fontSize: "15px",
        letterSpacing: "-0.5px",
        width: "66px",
        height: "35px",
        borderRadius: "100px",
        color: props.isActive ? "white" : "#333347", // 텍스트 색상을 강제 적용
        padding: "6px 14px",
        backgroundColor: props.isActive ? "#333347 !important" : "transparent !important", // 배경을 투명하게
        border: "none",
        boxShadow: "none",
        ":hover": {
          backgroundColor: "white",
        },
      }}>
      {props.text}
    </Button>
  );
};

export default CommunityPage;
