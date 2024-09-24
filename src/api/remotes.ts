import Axios from "@/api/axios";

import {
  SimpleRentalProduct,
  LoanAdviceReport,
  SpecificLoanAdvice,
  AddressResponse,
  CommunityDetailResponse,
  SendSimpleRentalProductRequest,
  sendLoanAdviceReportRequest,
  sendSpecificLoanAdviceRequest,
  sendaddressSearchRequest,
} from "@/models";

/*************
 * LoanAdvice API
 ************/

// 전세상품 간단 조회
export function sendSimpleRentalProduct(requestBody: SendSimpleRentalProductRequest) {
  return Axios.post<SimpleRentalProduct[]>("/api/v1/loanAdvice/simple", requestBody, false);
}

//전세대출상품 추천 보고서 산출
export function sendLoanAdviceReport(requestBody: sendLoanAdviceReportRequest) {
  return Axios.post<LoanAdviceReport>("/api/v1/loanAdvice", requestBody, true);
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

/*************
 * Community API
 ************/

// 게시글 상세 조회
export function getCommunityDetail({ postId }: { postId: number }) {
  return Axios.get<CommunityDetailResponse>(`/api/v1/post/${postId}`, true).then((response) => response.data);
}
