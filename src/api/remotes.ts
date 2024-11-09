import Axios from "@/api/axios";

import {
  RentalProductResponse,
  AddressResponse,
  CommunityDetailResponse,
  HousingInfoResponse,
  getLoanAdviceResponse,
  LoanAdviceReportResponse,
  TransferUserResponse,
  LtvCalcResponse,
  DtiCalcResponse,
  SpecificLoanAdvice,
  SendSimpleRentalProductRequest,
  sendLoanAdviceReportRequest,
  sendSpecificLoanAdviceRequest,
  sendaddressSearchRequest,
  sendHousingInfoRequest,
  sendLtvCalcRequest,
  sendDtiCalcRequest,
  sendRepaymentCalcRequest,
  RepaymentCalculationResult,
  RepaymentCalcResponse,
} from "@/models";
import { getOrCreateUuid } from "@/utils/localStorage";

/*************
 * User API
 ************/
export function sendLogout() {
  return Axios.post<void>("/api/v1/user/logout", null, true);
}

export function sendTransferUser(requestBody: string) {
  return Axios.post<TransferUserResponse>(
    "/api/v1/user/transfer",
    requestBody,
    true,
    //   {
    //   tempUserId: `temp_${getOrCreateUuid()}`,
    // }
  );
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

// 최근 대출추천 보고서 목록 조회
export function getLoanAdvice() {
  return Axios.get<getLoanAdviceResponse>("/api/v1/loanAdvice ", true).then((response) => response.data);
}

//전세대출상품 추천 보고서 산출 - 최초 유입 유저
export function sendLoanAdviceReportWithTempUser(requestBody: sendLoanAdviceReportRequest) {
  return Axios.post<LoanAdviceReportResponse>("/api/v1/loanAdvice", requestBody, false, {
    tempUserId: `temp_${getOrCreateUuid()}`,
  });
}

//전세대출상품 추천 보고서 산출 - 최초 유입 유저
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
export function sendaddressSearch(param: number, requestBody: sendaddressSearchRequest) {
  return Axios.post<AddressResponse>(`/api/v1/addressSearch?page=${param}`, requestBody, false).then(
    (response) => response.data,
  );
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

/*************
 * Calculator API
 ************/

// LTV 계산기
export function sendLtvCalc(requestBody: sendLtvCalcRequest) {
  return Axios.post<LtvCalcResponse>("/api/v1/ltvCalc", requestBody, false).then((response) => response.data);
}

// DTI 계산기
export function sendDtiCalc(requestBody: sendDtiCalcRequest) {
  return Axios.post<DtiCalcResponse>("/api/v1/dtiCalc", requestBody, false).then((response) => response.data);
}

// 원리금 계산기
export function sendRepaymentCalc(requestBody: sendRepaymentCalcRequest) {
  return Axios.post<RepaymentCalcResponse>("/api/v1/repaymentCalc", requestBody, false).then(
    (response) => response.data,
  );
}
