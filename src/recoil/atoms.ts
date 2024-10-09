import { atom } from "recoil";
import { sendLoanAdviceReportRequest } from "@/models";

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
    exclusiveArea: 85.0,
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
