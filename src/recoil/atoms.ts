import { atom } from "recoil";
import {
  sendLoanAdviceReportRequest,
  sendLtvCalcRequest,
  sendDtiCalcRequest,
  sendRepaymentCalcRequest,
  LoanStatus,
} from "@/models";
import { analytics } from "../utils/firebase";
import { Analytics } from "firebase/analytics";

export const loanInfoStepState = atom<number>({
  key: "loanInfoStepState",
  default: 1,
});

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
    houseOwnershipType: "NO_HOUSE",
    isNetAssetOver345M: false,
    rentHousingType: "APARTMENT",
    exclusiveArea: 55.0,
    buildingName: "청담2차 e편한세상아파트",
    districtCode: "1168010400",
    dongName: "청담동",
    jibun: "서울특별시 강남구 청담동 14 청담2차 e편한세상아파트",
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

export const authState = atom<boolean>({
  key: "authState",
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
    principal: 0,
    interestRatePercentage: 0,
    term: 0,
    gracePeriod: 0,
    repaymentType: "",
    maturityPaymentAmount: 0,
  },
});

export const periodState = atom<string>({
  key: "periodState",
  default: "년",
});

export interface DSRData {
  gracePeriod: number;
  interestRatePercentage: number;
  interestRateType: string;
  isMetroArea: boolean;
  loanType: string;
  maturityPaymentAmount: number;
  principal: number;
  repaymentType: string;
  term: number;
}

export const arrDSRDatasState = atom<LoanStatus[]>({
  key: "arrDSRDatasState", // 고유 키
  default: [], // 초기값
});

export const annualIncomeState = atom<number>({
  key: "annualIncome", // 고유 키
  default: 0, // 초기값
});

// Firebase Analytics 전역 상태
export const analyticsState = atom<Analytics | null>({
  key: "analyticsState", // 고유한 키
  default: analytics, // 초기화된 Analytics 인스턴스
});
