import UserInfo from "@/components/sections/LoanInfoEntry/UserInfo";

export const INPUTS = [
  { id: 1, label: "임차보증금", name: "rentalDeposit", value: "", component: UserInfo },
  { id: 2, label: "월세", name: "monthlyRent", value: "", component: UserInfo },
  { id: 3, label: "보유현금", name: "cashOnHand", value: "", component: UserInfo },
  { id: 4, label: "만 나이", name: "age", value: "", component: UserInfo },
  { id: 5, label: "혼인상태", name: "maritalStatus", value: "", component: UserInfo },
  { id: 6, label: "배우자 연소득", name: "annualIncome", value: "", component: UserInfo },
  { id: 7, label: "자녀유무", name: "childStatus", value: "", component: UserInfo },
  { id: 8, label: "중소기업재직여부", name: "isSMEEmployee", value: "", component: UserInfo },
  { id: 9, label: "순자산 3.45억 초과여부", name: "isNetAssetOver345M", value: "", component: UserInfo },
  { id: 10, label: "주택정보", name: "rentHousingType", value: "", component: UserInfo },
];
