import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Button, Typography } from "@mui/material";

import Spacing from "@/components/shared/Spacing";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityContents from "./CommunityContents";
import FloatingButton from "./FloatingButton";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityListResponse, Post } from "@/api/model/CommunityResponse";

const cx = classNames.bind(styles);
const CommunityPage = () => {
  const [isLatest, setIsLatest] = useState(true);
  const [contentItems, setContentItems] = useState<CommunityListResponse>();
  const [hasMore, setHasMore] = useState(true); // 더 이상 추가로 로드하지 않음
  const navigator = useNavigate();

  const InfiniteScrollComponent = () => {
    // 전체 데이터 배열 (30개)
    // const allItems = Array.from({ length: 0 }, (_, index) => `Community Content #${index + 1}`);

    useEffect(() => {
      try {
        Axios.get("/api/v1/post/sorted?sortType=POPULAR", true).then((res) => {
          const resData: CommunityListResponse = res.data;
          setContentItems(resData);
        });
      } catch (error) {
        console.error("커뮤니티 데이터를 불러오는데 실패했습니다.", error);
      }
    }, []);

    // 스크롤이 끝에 도달할 때 호출되는 함수 (5개씩 추가 로드)
    const fetchMoreData = async () => {
      const res = await Axios.get("/api/v1/post/sorted?sortType=POPULAR", true);
      const posts: Post[] = res.data;
      console.log(posts);
      setHasMore(false);
    };

    return (
      <InfiniteScroll
        dataLength={contentItems ? contentItems.data.length : 0} // 현재 표시 중인 데이터 수
        next={fetchMoreData} // 더 가져오는 데이터가 없으므로 빈 함수
        hasMore={hasMore} // 더 불러올 데이터가 없으므로 false
        loader={<h4>Loading...</h4>} // 로딩 상태, 필요 없으면 제거 가능
        endMessage={<p>모두 불러왔습니다.</p>} // 끝났을 때 메시지
      >
        {contentItems?.data.map((data) => <CommunityContents key={data.id} {...data} />)}
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
          onClick={async () => {
            console.log("최신순 클릭");
            setIsLatest(true);
            try {
              const res = await Axios.get("/api/v1/post/sorted?sortType=POPULAR", true);
              setContentItems(undefined);
              setContentItems(res.data);
            } catch (error) {
              console.error("최신순 데이터를 불러오는데 실패했습니다.", error);
            }
          }}
          isActive={isLatest}
        />
        <Spacing size={4} />
        <RoundButton
          text="인기순"
          onClick={async () => {
            console.log("인기순 클릭");
            setIsLatest(false);
            try {
              const res = await Axios.get("/api/v1/post", true);
              setContentItems(undefined);
              setContentItems(res.data);
            } catch (error) {
              console.error("인기순 데이터를 불러오는데 실패했습니다.", error);
            }
          }}
          isActive={!isLatest}
        />
      </div>

      <Spacing size={34} />

      {InfiniteScrollComponent()}

      <FloatingButton
        onClick={() => {
          console.log("플로팅 버튼 클릭");
          navigator("/community/write");
        }}></FloatingButton>
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
