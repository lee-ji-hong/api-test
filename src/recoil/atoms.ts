import { atom } from "recoil";
import { sendLoanAdviceReportRequest } from "@/models";

export const formData = atom<sendLoanAdviceReportRequest>({
  key: "formState",
  default: {
    rentalDeposit: 0,
    monthlyRent: 0,
    cashOnHand: 0,
    age: 0,
    hasNewborn: false,
    maritalStatus: "SINGLE",
    annualIncome: 0,
    spouseAnnualIncome: 0,
    childStatus: "NO_CHILD",
    isSMEEmployee: false,
    houseOwnershipType: "NO_HOUSE",
    isNetAssetOver345M: false,
    rentHousingType: "APARTMENT",
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
