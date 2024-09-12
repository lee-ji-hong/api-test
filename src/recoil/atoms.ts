import { atom } from "recoil";
import { FormValues } from "@/models";

export const formData = atom<FormValues>({
  key: "formState",
  default: {
    rentalDeposit: undefined,
    monthlyRent: undefined,
    cashOnHand: undefined,
    age: undefined,
    maritalStatus: undefined,
    annualIncome: undefined,
    childStatus: undefined,
    isSMEEmployee: undefined,
    isNetAssetOver345M: undefined,
    rentHousingType: undefined,
    exclusiveArea: undefined,
    buildingName: undefined,
    districtCode: undefined,
    dongName: undefined,
    jibun: undefined,
  },
});
