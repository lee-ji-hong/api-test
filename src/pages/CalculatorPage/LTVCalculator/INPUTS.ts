import SelectController from "@/components/sections/Calculator/SelectController";
import InputController from "@/components/sections/Calculator/InputController";

export const INPUTS = [
  {
    id: 1,
    label: "대출 목적",
    name: "loanPurpose",
    value: "",
    options: [
      { label: "주택구입자금", value: "HOME_PURCHASE" },
      { label: "생활안정자금", value: "LIVING_STABILITY" },
    ],
    component: SelectController,
  },
  {
    id: 2,
    label: "주택 소유 유형",
    name: "houseOwnershipType",
    value: "",
    options: [
      { label: "생애최초", value: "LIFETIME_FIRST" },
      { label: "서민실수요자", value: "ORDINARY_DEMAND" },
      { label: "무주택", value: "NO_HOUSE" },
      { label: "1주택 처분", value: "SINGLE_HOUSE_DISPOSAL" },
      { label: "1주택 이상", value: "MORE_THAN_ONE_HOUSE" },
      { label: "1주택", value: "SINGLE_HOUSE" },
      { label: " 2주택 이상", value: "MORE_THAN_TWO_HOUSE" },
    ],
    component: SelectController,
  },
  {
    id: 3,
    label: "담보대출 주택 대상 지역",
    name: "regionType",
    value: "",
    options: [
      { label: "규제지역", value: "REGULATED_AREA" },
      { label: "규제지역 외 수도권", value: "NON_REGULATED_CAPITAL_AREA" },
      { label: "기타", value: "OTHER_AREAS" },
    ],
    component: SelectController,
  },
  {
    id: 4,
    label: "담보가치",
    name: "collateralValue",
    value: "",
    limit: {
      min: { value: -1, ment: "보증금은 100만원 이상이어야 합니다." },
      max: { value: 200000, ment: "보증금은 100만원 이상이어야 합니다." },
    },
    component: InputController,
  },
];
