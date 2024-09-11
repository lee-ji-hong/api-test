import { atom } from "recoil";
import { FormValues } from "@/models";

export const formData = atom<FormValues>({
  key: "formState",
  default: {
    deposit: "",
    rent: "",
    savings: "",
    age: "",
    maritalStatus: "",
    spouseIncome: "",
    child: "",
    company: "",
    asset: "",
    houseInfo: "",
  },
});
