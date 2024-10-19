import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */

export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const { loanPurpose, collateralValue, regionType, houseOwnershipType } = data;

  if (!loanPurpose) {
    alert("보증금을 입력해주세요.");
    setFocus("loanPurpose");
    return false;
  }
  if (!collateralValue) {
    alert("주택 소유 유형을 입력해주세요.");
    setFocus("collateralValue");
    return false;
  }

  if (!regionType) {
    alert("담보대출 주택 대상 지역를 입력해주세요.");
    setFocus("regionType");
    return false;
  }

  if (!houseOwnershipType) {
    alert("담보가치를 입력해주세요.");
    setFocus("houseOwnershipType");
    return false;
  }

  return true;
};
