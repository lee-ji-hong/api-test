import Axios from "@/api/axios";

import {
  SimpleRentalProduct,
  LoanAdviceReport,
  SpecificLoanAdvice,
  SendSimpleRentalProductRequest,
  sendLoanAdviceReportRequest,
  sendSpecificLoanAdviceRequest,
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
