import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Typography } from "@mui/material";

import Spacing from "@/components/shared/Spacing";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityContents from "./CommunityContents";
import FloatingButton from "./FloatingButton";
import { useNavigate } from "react-router-dom";
import Axios from "@/api/axios";
import { CommunityListResponse } from "@/api/model/CommunityResponse";
import { CommunityDetail, LikeResponse } from "@/models";
import CenterModal from "@/components/modal/CenterModal";
import RoundButton from "@/components/shared/RoundButton";
import SpacingWidth from "@/components/shared/SpacingWidth";
import { reqLogin } from "@/api/remotes";
const cx = classNames.bind(styles);

const CommunityPage = () => {
  const [isLatest, setIsLatest] = useState(true);
  const [contentItems, setContentItems] = useState<CommunityListResponse | null>(null);
  const [hasMore, setHasMore] = useState(true); // 더 이상 추가로 로드하지 않음
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  let tokenVaildation = false;

  const navigator = useNavigate();

  function createCommunityDetail(): CommunityDetail {
    return {
      id: 0, // 고유 ID를 생성하는 간단한 방법
      title: "", // 기본 값으로 설정
      content: "", // 매개변수로 받은 내용
      author: "", // 매개변수로 받은 작성자
      imageUrl: "", // 매개변수로 받은 이미지 URL
      imageFile: null,
      likes: 0, // 초기 좋아요 수
      comments: [], // 초기 댓글 목록은 빈 배열
      commentCount: 0, // 초기 댓글 수
      createdDate: new Date().toISOString().split("T")[0].split("-").map(Number), // 현재 날짜를 배열로 변환
      lastModifiedDate: new Date().toISOString().split("T")[0].split("-").map(Number), // 마지막 수정 날짜는 생성 시 동일
      avatarUrl: "", // 기본 아바타 URL
      timeAgo: "", // 생성 시에는 "방금 전"으로 설정
      loanAdviceSummaryReport: null, // 초기값은 null
      like: false, // 초기값은 좋아요 미선택
      updateDeleteAuthority: "", // 수정 및 삭제 권한은 빈 문자열
    };
  }

  async function requestCheckTokenValidation() {
    try {
      await Axios.get<LikeResponse>(`/login/oauth2/kakao/health-check`, true);
      tokenVaildation = true;
    } catch (error) {
      tokenVaildation = false;
    }
  }

  const InfiniteScrollComponent = () => {
    useEffect(() => {
      setContentItems(null);
      loadInitialData();
      setPage(0);
    }, [isLatest]);

    // 데이터를 처음 불러오는 함수
    const loadInitialData = async () => {
      await requestCheckTokenValidation();
      try {
        const endPoint = isLatest ? "/api/v1/post/sorted?sortType=LATEST&" : "/api/v1/post/sorted?sortType=POPULAR&";
        console.log("tokenVaildation", tokenVaildation);
        const res = await Axios.get<CommunityListResponse>(`${endPoint}page=0&size=5`, tokenVaildation);
        setContentItems(res); // 초기 데이터를 설정
        setHasMore(res.data.length > 0); // 데이터가 더 있는지 확인
      } catch (error) {
        console.error("커뮤니티 데이터를 불러오는데 실패했습니다.", error);

        // 임시 로그인 처리
        // const kakaoAuthUrl = `http://52.78.180.147:8080/oauth2/authorization/kakao`;
        // window.location.href = kakaoAuthUrl;
      }
    };

    // 더 많은 데이터를 불러오는 함수
    const fetchMoreData = async () => {
      await requestCheckTokenValidation();
      try {
        const endPoint = isLatest ? "/api/v1/post/sorted?sortType=LATEST&" : "/api/v1/post/sorted?sortType=POPULAR&";
        console.log("tokenVaildation", tokenVaildation);
        const res = await Axios.get<CommunityListResponse>(`${endPoint}page=${page + 1}&size=5`, tokenVaildation);
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
        loader={<h4>Loading...</h4>} // 로딩 상태, 필요 없으면 제거 가능
        endMessage={<p>모두 불러왔습니다.</p>} // 끝났을 때 메시지
      >
        {contentItems?.data.map((data, index) => (
          <CommunityContents key={index} {...data} />
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

      <Spacing size={34} />

      {InfiniteScrollComponent()}

      <FloatingButton
        onClick={async () => {
          try {
            await Axios.get<LikeResponse>(`/login/oauth2/kakao/health-check`, true);
            navigator("/community/write", { state: { communityDetail: createCommunityDetail() }, replace: true });
          } catch (error) {
            setIsShowLoginModal(true);
          }
        }}></FloatingButton>

      {isShowLoginModal && (
        <CenterModal
          message={`로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?`}
          subMessage=""
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => {
            setIsShowLoginModal(false);
          }}
          onConfirm={() => {
            reqLogin();
          }}
        />
      )}
    </div>
  );
};

export default CommunityPage;
