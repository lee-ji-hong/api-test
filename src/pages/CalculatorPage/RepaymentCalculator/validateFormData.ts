import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */

export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const { annualIncome, loanAmount, interestRate, loanTerm, repaymentType, yearlyLoanInterestRepayment } = data;

  if (!annualIncome) {
    alert("연소득을 입력해주세요.");
    setFocus("annualIncome");
    return false;
  }
  if (!loanAmount) {
    alert("주택 담보 대출 금액을 입력해주세요.");
    setFocus("loanAmount");
    return false;
  }
  if (!interestRate) {
    alert("이자율를 입력해주세요.");
    setFocus("interestRate");
    return false;
  }
  if (!loanTerm) {
    alert("주택 담보 대출 기간를 입력해주세요.");
    setFocus("loanTerm");
    return false;
  }
  if (!repaymentType) {
    alert("주택 담보 대출 상환방법를 입력해주세요.");
    setFocus("repaymentType");
    return false;
  }
  if (!yearlyLoanInterestRepayment) {
    alert("보유대출 연이자 상환액를 입력해주세요.");
    setFocus("yearlyLoanInterestRepayment");
    return false;
  }

  return true;
};
