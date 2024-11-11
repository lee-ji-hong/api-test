import InputController from "@/components/sections/Calculator/InputController";
export const INPUTS = [
  {
    id: 1,
    label: "연소득",
    name: "annualIncome",
    value: "",
    isPeriod: false,
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
];
