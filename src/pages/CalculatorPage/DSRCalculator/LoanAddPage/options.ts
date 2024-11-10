export const resultState = {
  title: "DTI",
  ment: "연 원리금 상환액",
  description:
    "주택담보대출 3억원의 경우 연 원리금 상환액은 7억 2,721만 5,974원이고, 보유하고 계신대출의 연이자 상환액은 10만원입니다. 연소득 5,000만원이므로 DTI는 약 1454.63%로 예상됩니다.",
  details: {
    annualIncome: 0,
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 0,
    repaymentType: "",
    yearlyLoanInterestRepayment: 0,
  },
};

// repaymentOptions 정의
export const repaymentOptions = [
  { label: "원리금균등", value: "AMORTIZING" },
  { label: "원금균등", value: "EQUAL_PRINCIPAL" },
  { label: "만기일시", value: "BULLET" },
];

export const loanTypeOptions = [
  { label: "주택담보대출", value: "MORTGAGE" },
  { label: "전세대출", value: "JEONSE_LOAN" },
  { label: "신용대출", value: "PERSONAL_LOAN" },
  { label: "기타대출", value: "OTHER_LOAN" },
  { label: "장기카드대출", value: "LONG_TERM_CARD_LOAN" },
  { label: "기타담보 대출", value: "OTHER_COLLATERAL_LOAN" },
  { label: "중도금 및 이주비", value: "INTERIM_PAYMENT_AND_MOVING" },
  { label: "오피스텔담보대출", value: "OFFICETEL_MORTGAGE_LOAN" },
  { label: "전세보증금담보대출", value: "JEONSE_DEPOSIT_COLLATERAL_LOAN" },
  { label: "비주택 부동산 담보 대출", value: "NON_HOUSING_REAL_ESTATE_COLLATERAL_LOAN" },
  { label: "예적금 담보 및 보험계약 대출", value: "DEPOSIT_AND_INSURANCE_COLLATERAL_LOAN" },
  { label: "유가증권 담보대출", value: "SECURITIES_COLLATERAL_LOAN" },
];

export const metroAreaOptions = [
  { label: "수도권", value: true },
  { label: "비수도권", value: false },
];

export const interestRateTypeOptions = [
  { label: "변동형", value: "VARIABLE" },
  { label: "혼합형", value: "MIXED" },
  { label: "주기형", value: "PERIODIC" },
];
