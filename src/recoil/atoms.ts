import { atom } from "recoil";
import { FormValues } from "@/models";

export const formData = atom<FormValues>({
  key: "formState",
  default: {
    deposit: 0, // 숫자형 기본값
    rent: 0, // 숫자형 기본값
    savings: 0, // 숫자형 기본값
    age: 0, // 숫자형 기본값
    maritalStatus: "", // 문자열 기본값
    spouseIncome: 0, // 숫자형 기본값
    child: false, // 논리형 기본값
    company: false, // 논리형 기본값
    asset: false, // 논리형 기본값
    houseInfo: "", // 문자열 기본값
  },
});
