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
    buildingName: "청라 큐브시그니처 1차 오피스텔",
    districtCode: "2826012200",
    dongName: "청라동",
    jibun: "95-1",
    // buildingName: "",
    // districtCode: "",
    // dongName: "",
    // jibun: "",
  },
});
