import SelectController from "@/components/sections/Calculator/SelectController";
import InputController from "@/components/sections/Calculator/InputController";
import HouseTypeController from "@/components/sections/Calculator/HouseTypeController";

import { loanPurposeOptions, houseOwnershipTypeOptions, regionTypeOptions } from "./ltvOptions";

export const INPUTS = [
  {
    id: 1,
    label: "대출 목적",
    name: "loanPurpose",
    value: "",
    options: loanPurposeOptions,
    component: SelectController,
  },
  {
    id: 2,
    label: "주택 소유 유형",
    name: "houseOwnershipType",
    value: "",
    options: houseOwnershipTypeOptions,
    component: HouseTypeController,
  },
  {
    id: 3,
    label: "담보대출 주택 대상 지역",
    name: "regionType",
    value: "",
    options: regionTypeOptions,
    component: SelectController,
  },
  {
    id: 4,
    label: "담보가치",
    name: "collateralValue",
    value: "",
    limit: {
      min: { value: -1, ment: "금액을 입력해주세요" },
      max: { value: 10000000, ment: "1,000억원 이하로 입력이 가능합니다." },
    },
    options: [
      { label: "+1000만", value: 1000 },
      { label: "+1억", value: 10000 },
      { label: "+10억", value: 100000 },
    ],
    component: InputController,
  },
];
