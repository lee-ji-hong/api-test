import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */
export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const {
    rentalDeposit,
    age,
    maritalStatus,
    childStatus,
    isSMEEmployee,
    isNetAssetOver345M,
    houseOwnershipType,
    rentHousingType,
    jibun,
  } = data;

  if (!rentalDeposit) {
    alert("보증금을 입력해주세요.");
    setFocus("rentalDeposit");
    return false;
  }
  if (!age) {
    alert("나이를 입력해주세요.");
    setFocus("age");
    return false;
  }
  if (!maritalStatus) {
    alert("혼인 여부를 입력해주세요.");
    setFocus("maritalStatus");
    return false;
  }
  if (!childStatus) {
    alert("자녀 유무를 입력해주세요.");
    setFocus("childStatus");
    return false;
  }
  if (!isSMEEmployee) {
    alert("중소기업재직여부를 입력해주세요.");
    setFocus("isSMEEmployee");
    return false;
  }
  if (!isNetAssetOver345M) {
    alert("순자산3.45억초과여부를 입력해주세요.");
    setFocus("isNetAssetOver345M");
    return false;
  }
  if (!houseOwnershipType) {
    alert("주택 소유 형태를 입력해주세요.");
    setFocus("houseOwnershipType");
    return false;
  }
  if (!rentHousingType) {
    alert("주택 유형을 입력해주세요.");
    setFocus("rentHousingType");
    return false;
  }
  if (!jibun) {
    alert("주택 정보를 입력해주세요.");
    setFocus("jibun");
    return false;
  }

  return true;
};
