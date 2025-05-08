import UserInfo from "@/components/sections/LoanInfoEntryTypeB/UserInfo";
import InputController from "@/components/sections/LoanInfoEntryTypeB/InputController";
import isSelectController from "@/components/sections/LoanInfoEntryTypeB/isSelectController";
import WheelContrller from "@/components/sections/LoanInfoEntryTypeB/WheelContrller";

export const INPUTS = [
  {
    id: 1,
    label: "월세",
    name: "monthlyRent",
    value: "",
    isValue: false,
    modalTitle: "월세가 있다면 입력해주세요",
    modalButton: "다음",
    unit: "만원",
    limit: {
      // min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
      max: { value: 10000000, ment: "1,000억원 이하로 입력이 가능합니다." },
    },
    component: InputController,
  },
  {
    id: 2,
    label: "보유현금",
    name: "cashOnHand",
    value: "",
    isValue: false,
    modalTitle: "보유현금을 입력해주세요",
    modalButton: "다음",
    unit: "만원",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },
  {
    id: 3,
    label: "만 나이",
    name: "age",
    value: "",
    modalTitle: "만 나이를 입력해주세요",
    modalButton: "다음",
    isValue: true,
    unit: "세",
    limit: {
      min: { value: 19, ment: "만 19세이상이여야합니다" },
      max: { value: 100, ment: "만 100세이하로 입력이 가능합니다." },
    },
    component: WheelContrller,
  },
  {
    id: 4,
    label: "혼인상태",
    name: "maritalStatus",
    value: "",
    modalTitle: "혼인상태를 입력해주세요",
    options: [
      { label: "미혼", value: "SINGLE" },
      { label: "신혼", value: "NEWLY_MARRIED" },
      { label: "기혼", value: "MARRIED" },
      { label: "결혼 예정", value: "ENGAGED" },
    ],
    component: isSelectController,
  },
  {
    id: 5,
    label: "연소득",
    name: "annualIncome",
    value: "",
    isValue: true,
    modalTitle: "나의 연소득을 입력해주세요",
    modalButton: "다음",
    unit: "만원",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },
  {
    id: 6,
    label: "배우자 연소득",
    name: "spouseAnnualIncome",
    value: "",
    isValue: true,
    modalTitle: "배우자 연소득을 입력해주세요",
    modalButton: "다음",
    unit: "만원",
    // limit: {
    //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
    //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    // },
    component: InputController,
  },
  {
    id: 7,
    label: "자녀유무",
    name: "childStatus",
    value: "",
    modalTitle: "자녀유무를 선택해주세요",
    modalButton: "다음",
    options: [
      // { label: "자녀 없음", value: "NOssss_CHILD" },
      { label: "무자녀", value: "NO_CHILD" },
      { label: "1명", value: "ONE_CHILD" },
      { label: "2명", value: "TWO_CHILD" },
      { label: "3명 이상", value: "THREE_OR_MORE_CHILDREN" },
    ],

    component: UserInfo,
  },
  {
    id: 8,
    label: "중소기업재직여부",
    name: "isSMEEmployee",
    value: "",
    modalTitle: "중소기업 재직여부를 선택해주세요",
    modalSubTitle: "중소기업 기준은 직원 수 300명 이하, 연매출 1천억원 이하로 자세한 기준은 링크를 통해 확인해주세요.",
    options: [
      { label: "예", value: true },
      { label: "아니요", value: false },
    ],
    component: isSelectController,
  },

  // {
  //   id: 11,
  //   label: "주택 소유 상태",
  //   name: "houseOwnershipType",
  //   value: "",
  //   modalTitle: "주택 소유 상태를 선택해주세요",
  //   options: [
  //     { label: "무주택", value: "NO_HOUSE" },
  //     { label: "1주택", value: "SINGLE_HOUSE" },
  //     { label: "다주택", value: "MULTI_HOUSE" },
  //   ],
  //   component: isSelectController,
  // },
  // {
  //   id: 12,
  //   label: "임차주택 유형",
  //   name: "rentHousingType",
  //   value: "",
  //   modalTitle: "임차주택 유형을 선택하세요",
  //   options: [
  //     { label: "아파트", value: "APARTMENT" },
  //     { label: "오피스텔", value: "OFFICETEL" },
  //     { label: "연립다세대", value: "HOUSEHOLD_HOUSE" },
  //     { label: "단독/다가구", value: "FAMILY_HOUSE" },
  //   ],
  //   component: isSelectController,
  // },
  // {
  //   id: 13,
  //   label: "임차주택 주소",
  //   name: "jibun",
  //   value: "",
  //   modalTitle: "임차주택 주소를 찾아주세요",
  //   component: AddressSearchInputControllter,
  // },
];

export const SpouseAnnualIncome = {
  id: 1,
  label: "배우자 연소득",
  name: "spouseAnnualIncome",
  value: "",
  isValue: true,
  modalTitle: "배우자 연소득을 입력해주세요",
  modalButton: "다음",
  unit: "만원",
  // limit: {
  //   min: { value: 100, ment: "보증금은 100만원 이상이어야 합니다." },
  //   max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
  // },
  component: InputController,
};

export const OptionInputs = [
  {
    id: 1,
    label: "순자산 3.45억 초과여부",
    name: "isNetAssetOver345M",
    value: "",
    modalTitle: "순자산 3.45억원/n초과여부를 알려주세요",
    options: [
      { label: "순 자산 3.45억원 미만", value: false },
      { label: "순 자산 3.45억원 초과", value: true },
    ],
    component: isSelectController,
  },
  {
    id: 2,
    label: "주택의 지역을 선택해주세요",
    name: "rentHousingType",
    value: "",
    modalTitle: "주택의 지역을 선택해주세요",
    options: [
      { label: "서울", value: "OFFICETEL" },
      { label: "경기", value: "APARTMENT" },
      { label: "그 외", value: "HOUSEHOLD_HOUSE" },
    ],
    component: isSelectController,
  },
];

export const RENT_HOUSING_DATA = {
  OFFICETEL: {
    exclusiveArea: 84.5,
    buildingName: "행복아파트",
    districtCode: "1111011700",
    dongName: "역삼동",
    jibun: "649-5",
  },
  APARTMENT: {
    exclusiveArea: 59.0,
    buildingName: "송도 더샵 퍼스트월드",
    districtCode: "2818510600",
    dongName: "송도동",
    jibun: "4-1",
  },
  HOUSEHOLD_HOUSE: {
    exclusiveArea: 59.0,
    buildingName: "용산면사무소",
    districtCode: "4374031021",
    dongName: "용산면",
    jibun: "381-1",
  },
};
