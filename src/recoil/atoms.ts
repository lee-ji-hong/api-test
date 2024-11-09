import { atom } from "recoil";
import {
  sendLoanAdviceReportRequest,
  sendLtvCalcRequest,
  sendDtiCalcRequest,
  sendRepaymentCalcRequest,
} from "@/models";

export const formData = atom<sendLoanAdviceReportRequest>({
  key: "formState",
  default: {
    rentalDeposit: undefined,
    monthlyRent: undefined,
    cashOnHand: undefined,
    age: undefined,
    hasNewborn: false,
    maritalStatus: undefined,
    annualIncome: undefined,
    spouseAnnualIncome: undefined,
    childStatus: undefined,
    isSMEEmployee: undefined,
    houseOwnershipType: undefined,
    isNetAssetOver345M: undefined,
    rentHousingType: undefined,
    exclusiveArea: undefined,
    buildingName: "",
    districtCode: "",
    dongName: "",
    jibun: undefined,
  },
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const ltvCalcState = atom<sendLtvCalcRequest>({
  key: "ltvCalcState",
  default: {
    loanPurpose: "",
    collateralValue: 0,
    regionType: "",
    houseOwnershipType: "",
  },
});

export const dtiCalcState = atom<sendDtiCalcRequest>({
  key: "dtiCalcState",
  default: {
    annualIncome: 0,
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 0,
    repaymentType: "",
    yearlyLoanInterestRepayment: 0,
  },
});

export const repaymentCalcState = atom<sendRepaymentCalcRequest>({
  key: "repaymentCalcState",
  default: {
    loanAmount: 0,
    mortgageInterestRate: 0,
    totalLoanTerm: 0,
    graceTerm: 0,
    repaymentType: "",
  },
});

export const periodState = atom<string>({
  key: "periodState",
  default: "년",
});
