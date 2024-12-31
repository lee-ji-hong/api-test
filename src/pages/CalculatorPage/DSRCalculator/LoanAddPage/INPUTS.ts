import DotInputController from "@/components/sections/Calculator/DotInputController";
import SelectController from "@/components/sections/Calculator/SelectController";
import InputController from "@/components/sections/Calculator/InputController";
import PeriodController from "@/components/sections/Calculator/PeriodController";

import { interestRateTypeOptions, loanTypeOptions, metroAreaOptions, repaymentOptions } from "./options";

export const INPUTS = [
  {
    id: 1,
    label: "대출 유형",
    name: "loanType",
    value: "",
    options: loanTypeOptions,
    component: SelectController,
  },

  {
    id: 2,
    label: "주택 담보 대출 상환방법",
    name: "repaymentType",
    value: "",
    options: repaymentOptions,
    component: SelectController,
  },

  {
    id: 3,
    label: "대출 금액",
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
    id: 4,
    label: "만기상환금",
    name: "maturityPaymentAmount",
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
    id: 5,
    label: "대출기간",
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
    id: 6,
    label: "거치기간",
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
    id: 7,
    label: "대출 이자율",
    name: "interestRatePercentage",
    value: "",
    unit: "%",
    formattedAmount: false,
    limit: {
      min: { value: -1, ment: "이자율을 입력해주세요" },
      max: { value: 100, ment: "100 이하로 입력이 가능합니다." },
    },
    component: DotInputController,
  },

  {
    id: 8,
    label: "대상주택 수도권여부",
    name: "isMetroArea",
    value: "",
    options: metroAreaOptions,
    component: SelectController,
  },

  {
    id: 9,
    label: "스트레스 DSR 2단계 적용",
    name: "interestRateType",
    value: "",
    options: interestRateTypeOptions,
    component: SelectController,
  },
];
