// LoanAdviceSummaryReport 모델 정의
export interface LoanAdviceSummaryReport {
  loanAdviceResultId: number; // 대출 상담 결과 ID
  loanProductName: string; // 대출 상품 이름
  loanProductCode: string; // 대출 상품 코드
  possibleLoanLimit: number; // 가능한 대출 한도
  expectedLoanRate: number; // 예상 대출 금리
}

// CommunityListResponse 모델 정의
export interface CommunityListResponse {
  data: LoanAdviceSummaryReport[]; // 여러 개의 대출 요약 보고서 리스트
}
