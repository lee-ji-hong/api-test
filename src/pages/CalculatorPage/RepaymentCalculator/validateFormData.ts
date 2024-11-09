import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */

export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const { principal, interestRatePercentage, term, gracePeriod, repaymentType } = data;

  if (!principal) {
    alert("대출금액을 입력해주세요.");
    setFocus("principal");
    return false;
  }
  if (!interestRatePercentage) {
    alert("주택 담보 대출 금리을 입력해주세요.");
    setFocus("interestRatePercentage");
    return false;
  }
  if (!term) {
    alert("총 대출 기간을 입력해주세요.");
    setFocus("term");
    return false;
  }
  if (!gracePeriod) {
    alert("대출 거치 기간를 입력해주세요.");
    setFocus("gracePeriod");
    return false;
  }
  if (!repaymentType) {
    alert("대출 상환방법를 입력해주세요.");
    setFocus("repaymentType");
    return false;
  }

  return true;
};
