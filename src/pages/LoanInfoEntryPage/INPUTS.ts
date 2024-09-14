import UserInfo from "@/components/sections/LoanInfoEntry/UserInfo";
import InputContrller from "@/components/sections/LoanInfoEntry/InputContrller";
import maritalStatusContrller from "@/components/sections/LoanInfoEntry/maritalStatusContrller";
// import WheelContrller from "@/components/sections/LoanInfoEntry/WheelContrller";
// import SelectContrller from "@/components/sections/LoanInfoEntry/SelectContrller";

export const INPUTS = [
  {
    id: 1,
    label: "임차보증금",
    name: "rentalDeposit",
    value: "",
    modalTitle: "보증금을 입력해주세요",
    modalButton: "다음",
    component: InputContrller,
  },
  {
    id: 2,
    label: "월세",
    name: "monthlyRent",
    value: "",
    modalTitle: "월세가 있다면 월세를 입력해주세요",
    modalButton: "다음",
    component: InputContrller,
  },
  {
    id: 3,
    label: "보유현금",
    name: "cashOnHand",
    value: "",
    modalTitle: "보유현금을 입력해주세요",
    modalButton: "다음",
    component: InputContrller,
  },
  {
    id: 4,
    label: "만 나이",
    name: "age",
    value: "",
    modalTitle: "만 나이를 선택해주세요",
    modalButton: "다음",
    component: InputContrller,
    // component: WheelContrller,
  },
  {
    id: 5,
    label: "혼인상태",
    name: "maritalStatus",
    value: "",
    modalTitle: "혼인상태를 알려주세요",
    component: maritalStatusContrller,
  },
  {
    id: 6,
    label: "배우자 연소득",
    name: "annualIncome",
    value: "",
    modalTitle: "배우자 연소득을 입력해주세요",
    modalButton: "다음",
    component: InputContrller,
  },
  { id: 7, label: "자녀유무", name: "childStatus", value: "", component: UserInfo },
  { id: 8, label: "중소기업재직여부", name: "isSMEEmployee", value: "", component: UserInfo },
  { id: 9, label: "순자산 3.45억 초과여부", name: "isNetAssetOver345M", value: "", component: UserInfo },
  { id: 10, label: "주택정보", name: "rentHousingType", value: "", component: UserInfo },
];
