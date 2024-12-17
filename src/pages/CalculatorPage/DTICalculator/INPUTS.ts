import SelectController from "@/components/sections/Calculator/SelectController";
import InputController from "@/components/sections/Calculator/InputController";
import DotInputController from "@/components/sections/Calculator/DotInputController";
import PeriodController from "@/components/sections/Calculator/PeriodController";

import { repaymentOptions } from "./options";

export const INPUTS = [
  {
    id: 1,
    label: "연소득",
    name: "annualIncome",
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
    label: "주택 담보 대출 금액",
    name: "loanAmount",
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
    id: 3,
    label: "이자율",
    name: "interestRate",
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
    id: 4,
    label: "주택 담보 대출 기간",
    name: "loanTerm",
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
    label: "주택 담보 대출 상환방법",
    name: "repaymentType",
    value: "",
    options: repaymentOptions,
    component: SelectController,
  },
  {
    id: 6,
    label: "보유대출 연이자 상환액",
    name: "yearlyLoanInterestRepayment",
    value: "",
    limit: {
      min: { value: -1, ment: "금액을 입력해주세요" },
      max: { value: 10000000, ment: "1,000억원 이하로 입력이 가능합니다." },
    },
    options: [
      { label: "+10만", value: 10 },
      { label: "+50만", value: 50 },
      { label: "+100만", value: 100 },
    ],
    component: InputController,
  },
];
