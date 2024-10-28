export const resultState = {
  title: "LTV",
  ment: "예상대출가능금액",
  description:
    "신규주택구입을 위한 대출 시 생애 최초인 경우 규제지역 LTV는 80%입니다. 담보대출시세가 10억원이면 LTV기준 최대 8억원을 대출 받을 수 있을것으로 예상됩니다.",
  details: {
    loanPurpose: "",
    houseOwnershipType: "",
    regionType: "",
    collateralValue: 0,
  },
};

// loanPurpose 정의
export const loanPurposeOptions = [
  { label: "주택구입자금", value: "HOME_PURCHASE" },
  { label: "생활안정자금", value: "LIVING_STABILITY" },
];

// houseOwnershipType 정의
export const houseOwnershipTypeOptions = [
  { label: "생애최초", value: "LIFETIME_FIRST" },
  { label: "서민실수요자", value: "ORDINARY_DEMAND" },
  { label: "무주택", value: "NO_HOUSE" },
  { label: "1주택 처분", value: "SINGLE_HOUSE_DISPOSAL" },
  { label: "1주택 이상", value: "MORE_THAN_ONE_HOUSE" },
  { label: "1주택", value: "SINGLE_HOUSE" },
  { label: " 2주택 이상", value: "MORE_THAN_TWO_HOUSE" },
];

// regionType 정의
export const regionTypeOptions = [
  { label: "규제지역", value: "REGULATED_AREA" },
  { label: "규제지역 외 수도권", value: "NON_REGULATED_CAPITAL_AREA" },
  { label: "기타", value: "OTHER_AREAS" },
];
