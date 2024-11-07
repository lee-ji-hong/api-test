import { CommunityDetail } from "@/models";

export function createCommunityDetail(): CommunityDetail {
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
    loginUserName: "", // 로그인한 사용자 이름은 빈 문자열
  };
}
