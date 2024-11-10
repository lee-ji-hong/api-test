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
