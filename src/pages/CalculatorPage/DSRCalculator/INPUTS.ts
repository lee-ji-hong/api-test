import SelectController from "@/components/sections/Calculator/SelectController";
import InputController from "@/components/sections/Calculator/InputController";
import PeriodController from "@/components/sections/Calculator/PeriodController";

import { repaymentOptions } from "./options";

export const INPUTS = [
  {
    id: 1,
    label: "대출금액",
    name: "principal",
    value: "",
    limit: {
      min: { value: -1, ment: "금액을 입력해주세요" },
      max: { value: 10000000, ment: "1,000억원 이하로 입력이 가능합니다." },
    },
    options: [
      { label: "+100만", value: 100 },
      { label: "+1000만", value: 1000 },
      { label: "+1억", value: 10000 },
    ],
    component: InputController,
  },
  {
    id: 2,
    label: "주택 담보 대출 금리",
    name: "interestRatePercentage",
    value: "",
    unit: "%",
    formattedAmount: false,
    limit: {
      min: { value: -1, ment: "이자율을 입력해주세요" },
      max: { value: 100, ment: "100 이하로 입력이 가능합니다." },
    },
    component: InputController,
  },
  {
    id: 3,
    label: "총 대출 기간",
    name: "term",
    value: "",
    isPeriod: true,
    formattedAmount: false,
    limit: {
      min: { value: -1, ment: "금액을 입력해주세요" },
      max: { value: 720, ment: "720 이하로 입력이 가능합니다." },
    },
    options: {
      year: [
        { label: "+1년", value: 1 },
        { label: "+5년", value: 5 },
        { label: "+10년", value: 10 },
      ],
      month: [
        { label: "+6개월", value: 6 },
        { label: "+12개월", value: 12 },
        { label: "+24개월", value: 24 },
      ],
    },
    component: PeriodController,
  },
  {
    id: 4,
    label: "대출 거치 기간",
    name: "gracePeriod",
    value: "",
    isPeriod: true,
    formattedAmount: false,
    limit: {
      min: { value: -1, ment: "금액을 입력해주세요" },
      max: { value: 720, ment: "720 이하로 입력이 가능합니다." },
    },
    options: {
      year: [
        { label: "+1년", value: 1 },
        { label: "+5년", value: 5 },
        { label: "+10년", value: 10 },
      ],
      month: [
        { label: "+6개월", value: 6 },
        { label: "+12개월", value: 12 },
        { label: "+24개월", value: 24 },
      ],
    },
    component: PeriodController,
  },
  {
    id: 5,
    label: "대출 상환방법",
    name: "repaymentType",
    value: "",
    options: repaymentOptions,
    component: SelectController,
  },
];
