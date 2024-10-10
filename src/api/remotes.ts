import Axios from "@/api/axios";

import {
  RentalProductResponse,
  AddressResponse,
  CommunityDetailResponse,
  HousingInfoResponse,
  LoanAdviceReportResponse,
  SpecificLoanAdvice,
  SendSimpleRentalProductRequest,
  sendLoanAdviceReportRequest,
  sendSpecificLoanAdviceRequest,
  sendaddressSearchRequest,
  sendHousingInfoRequest,
} from "@/models";

/*************
 * User API
 ************/
export function sendLogout() {
  return Axios.post<void>("/api/v1/user/logout", null, true);
}

/*************
 * LoanAdvice API
 ************/

// 전세상품 간단 조회
export function sendSimpleRentalProduct(requestBody: SendSimpleRentalProductRequest) {
  return Axios.post<RentalProductResponse>("/api/v1/loanAdvice/simple", requestBody, false).then(
    (response) => response.data,
  );
}

//전세대출상품 추천 보고서 산출
export function sendLoanAdviceReport(requestBody: sendLoanAdviceReportRequest) {
  return Axios.post<LoanAdviceReportResponse>("/api/v1/loanAdvice", requestBody, true);
}

// 특정 전세대출상품 추천 보고서 산출
export function sendSpecificLoanAdvice(requestBody: sendSpecificLoanAdviceRequest) {
  return Axios.post<SpecificLoanAdvice>("/api/v1/loanAdvice/specific", requestBody, true);
}

/*************
 * HousingInfo API
 ************/

// 주소 검색
export function sendaddressSearch(requestBody: sendaddressSearchRequest) {
  return Axios.post<AddressResponse>("/api/v1/addressSearch", requestBody, false).then((response) => response.data);
}

// 주택 거래정보 조회
export function sendHousingInfo(requestBody: sendHousingInfoRequest) {
  return Axios.post<HousingInfoResponse>("/api/v1/housingInfo", requestBody, false).then((response) => response.data);
}

/*************
 * Community API
 ************/

// 게시글 상세 조회
export function getCommunityDetail({ postId }: { postId: number }) {
  return Axios.get<CommunityDetailResponse>(`/api/v1/post/${postId}`, true).then((response) => response.data);
}

export const reqLogin = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
};
