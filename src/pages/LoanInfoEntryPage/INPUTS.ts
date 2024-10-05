import UserInfo from "@/components/sections/LoanInfoEntry/UserInfo";
import InputController from "@/components/sections/LoanInfoEntry/InputController";
import isSMEEmployeeController from "@/components/sections/LoanInfoEntry/isSMEEmployeeController";
import AddressSearchInputControllter from "@/components/sections/LoanInfoEntry/AddressSearchInputControllter";
// import maritalStatusController from "@/components/sections/LoanInfoEntry/maritalStatusController";
// import rentHousingTypeController from "@/components/sections/LoanInfoEntry/rentHousingTypeController";
// import WheelContrller from "@/components/sections/LoanInfoEntry/WheelContrller";

export const INPUTS = [
  {
    id: 1,
    label: "임차보증금",
    name: "rentalDeposit",
    value: "",
    modalTitle: "보증금을 입력해주세요",
    modalButton: "다음",
    limit: {
      min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
      max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    },
    component: InputController,
  },
  {
    id: 2,
    label: "월세",
    name: "monthlyRent",
    value: "",
    modalTitle: "월세가 있다면 월세를 입력해주세요",
    modalButton: "다음",
    limit: {
      // min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
      max: { value: 10000000, ment: "1,000억원 이하로 입력이 가능합니다." },
    },
    component: InputController,
  },
  {
    id: 3,
    label: "보유현금",
    name: "cashOnHand",
    value: "",
    modalTitle: "보유현금을 입력해주세요",
    modalButton: "다음",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },
  {
    id: 4,
    label: "만 나이",
    name: "age",
    value: "",
    modalTitle: "만 나이를 선택해주세요",
    modalButton: "다음",
    limit: {
      min: { value: 19, ment: "19세 이상만 대출 가능합니다" },
      max: { value: 99, ment: "장수하잖아 한잔해~~" },
    },
    component: InputController,
    // component: WheelContrller,
  },
  {
    id: 5,
    label: "혼인상태",
    name: "maritalStatus",
    value: "",
    modalTitle: "혼인상태를 알려주세요",
    options: [
      { label: "미혼", value: "SINGLE" },
      { label: "신혼", value: "NEWLY_MARRIED" },
      { label: "기혼", value: "MARRIED" },
      { label: "결혼 예정", value: "ENGAGED" },
    ],
    component: isSMEEmployeeController,
    // component: maritalStatusController,
  },
  {
    id: 6,
    label: "연소득",
    name: "annualIncome",
    value: "",
    modalTitle: "연소득을 입력해주세요",
    modalButton: "다음",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },

  {
    id: 7,
    label: "배우자 연소득",
    name: "spouseAnnualIncome",
    value: "",
    modalTitle: "배우자 연소득을 입력해주세요",
    modalButton: "다음",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },
  {
    id: 8,
    label: "자녀유무",
    name: "childStatus",
    value: "",
    modalTitle: "자녀 유무 여부를 확인해주세요",
    modalButton: "다음",
    component: UserInfo,
  },
  {
    id: 9,
    label: "중소기업재직여부",
    name: "isSMEEmployee",
    value: "",
    modalTitle: "중소기업에 다니고 계신가요?",
    modalSubTitle: "중소기업 기준은 직원 수 300명 이하, 연매출 1천억원 이하로 자세한 기준은 링크를 통해 확인해주세요.",
    options: [
      { label: "예", value: true },
      { label: "아니요", value: false },
    ],
    component: isSMEEmployeeController,
  },
  {
    id: 10,
    label: "순자산 3.45억 초과여부",
    name: "isNetAssetOver345M",
    value: "",
    modalTitle: "순자산 3.45억원 초과여부를 알려주세요",
    options: [
      { label: "순 자산 3.45억원 미만", value: false },
      { label: "순 자산 3.45억원 초과", value: true },
    ],
    component: isSMEEmployeeController,
  },
  {
    id: 11,
    label: "주택 소유 형태",
    name: "houseOwnershipType",
    value: "",
    modalTitle: "주택 소유 형태를 선택해주세요",
    options: [
      { label: "무주택", value: "NO_HOUSE" },
      { label: "1주택", value: "SINGLE_HOUSE" },
      { label: "다주택", value: "MULTI_HOUSE" },
    ],
    component: isSMEEmployeeController,
  },
  {
    id: 12,
    label: "주택유형",
    name: "rentHousingType",
    value: "",
    modalTitle: "주택유형을 선택하세요",
    options: [
      { label: "아파트", value: "APARTMENT" },
      { label: "오피스텔", value: "OFFICETEL" },
      { label: "연립다세대", value: "HOUSEHOLD_HOUSE" },
      { label: "단독/다가구", value: "FAMILY_HOUSE" },
    ],
    component: isSMEEmployeeController,
    // component: rentHousingTypeController,
  },
  {
    id: 13,
    label: "주택정보",
    name: "jibun",
    value: "",
    modalTitle: "주택정보를 찾아주세요",
    component: AddressSearchInputControllter,
  },
];
