import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Typography } from "@mui/material";

import Spacing from "@/components/shared/Spacing";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityContents from "./CommunityContents";
import FloatingButton from "./FloatingButton";
import Axios from "@/api/axios";
import { CommunityListResponse } from "@/api/model/CommunityResponse";
import { LikeResponse } from "@/models";
import RoundButton from "@/components/shared/RoundButton";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { createCommunityDetail } from "@/constants/communityDetailDummy";
import { useLogEvent } from "@/utils/firebaseLogEvent";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { getCookie } from "@/api/authUtils";

import { loginState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
const cx = classNames.bind(styles);

const CommunityPage = () => {
  const [, setIsLoginNeed] = useRecoilState(loginState);
  const [isLatest, setIsLatest] = useState(true);

  const router = useInternalRouter();
  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("CommunityPage", {
      page_title: "./CommunityPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

  const handleWriteButtonClick = async () => {
    const roleType = getCookie("roleType");
    if (roleType === "GUEST") {
      setIsLoginNeed(true);
    } else {
      try {
        await Axios.get<LikeResponse>(`/login/oauth2/kakao/health-check`, true);
        router.replace("/community/write", { communityDetail: createCommunityDetail() });
      } catch (error) {
        console.error("로그인이 필요합니다.", error);
        // 사용자에게 알림 추가
        alert("글을 작성하려면 로그인이 필요합니다.");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sticky-header")}>
        <Typography className={cx("txt-title")}>커뮤니티</Typography>
        <Spacing size={16} />
        <div className={cx("button-space")}>
          <RoundButton
            text="최신순"
            onClick={async () => {
              setIsLatest(true);
            }}
            isActive={isLatest}
          />
          <SpacingWidth size={4} />
          <RoundButton
            text="인기순"
            onClick={async () => {
              setIsLatest(false);
            }}
            isActive={!isLatest}
          />
        </div>
      </div>

      <Spacing size={34} />

      {InfiniteScrollComponent({ isLatest })}

      <Spacing size={86} />
      <FloatingButton onClick={handleWriteButtonClick}></FloatingButton>
    </div>
  );
};

export default CommunityPage;

const InfiniteScrollComponent = ({ isLatest }: { isLatest: boolean }) => {
  const [contentItems, setContentItems] = useState<CommunityListResponse | null>(null);
  const [hasMore, setHasMore] = useState(true); // 더 이상 추가로 로드하지 않음
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const tokenVaildation = false;

  useEffect(() => {
    setContentItems(null);
    loadInitialData();
    setPage(0);
  }, [isLatest]);

  // 데이터를 처음 불러오는 함수
  const loadInitialData = async () => {
    try {
      const endPoint = isLatest ? "/api/v1/post/sorted?sortType=LATEST&" : "/api/v1/post/sorted?sortType=POPULAR&";
      console.log("tokenVaildation", tokenVaildation);
      const res = await Axios.get<CommunityListResponse>(`${endPoint}page=0&size=5`, true);
      setContentItems(res); // 초기 데이터를 설정
      setHasMore(res.data.length > 0); // 데이터가 더 있는지 확인
    } catch (error) {
      console.error("커뮤니티 데이터를 불러오는데 실패했습니다.", error);
    }
  };

  // 더 많은 데이터를 불러오는 함수
  const fetchMoreData = async () => {
    try {
      const endPoint = isLatest ? "/api/v1/post/sorted?sortType=LATEST&" : "/api/v1/post/sorted?sortType=POPULAR&";
      console.log("tokenVaildation", tokenVaildation);
      const res = await Axios.get<CommunityListResponse>(`${endPoint}page=${page + 1}&size=5`, true);
      if (res.data.length > 0) {
        setContentItems((prevItems) => ({
          ...prevItems,
          data: [...(prevItems?.data || []), ...res.data], // 기존 데이터에 새 데이터 추가
        }));
        setPage(page + 1); // 페이지 증가
      } else {
        setHasMore(false); // 더 이상 불러올 데이터가 없음
      }
    } catch (error) {
      console.error("더 많은 데이터를 불러오는데 실패했습니다.", error);
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={contentItems ? contentItems.data.length : 0} // 현재 표시 중인 데이터 수
      next={fetchMoreData} // 더 가져오는 데이터가 없으므로 빈 함수
      hasMore={hasMore} // 더 불러올 데이터가 없으므로 false
      loader={<h4></h4>} // 로딩 상태, 필요 없으면 제거 가능
      endMessage={<p></p>} // 끝났을 때 메시지
    >
      {contentItems?.data.map((data, index) => <CommunityContents key={index} {...data} />)}
    </InfiniteScroll>
  );
};
