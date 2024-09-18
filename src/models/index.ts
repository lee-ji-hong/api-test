export type MaritalStatus = "SINGLE" | "NEWLY_MARRIED" | "MARRIED" | "ENGAGED";
export type HouseType =
  | "APARTMENT" // 아파트
  | "OFFICETEL" // 오피스텔
  | "HOUSEHOLD_HOUSE" // 연립다세대
  | "FAMILY_HOUSE"; // 단독/다가구

export interface InfoItem {
  id: number;
  label: string;
  value: string;
}

export interface FormValues {
  rentalDeposit: number | undefined; // 임차보증금: 숫자형
  monthlyRent: number | undefined;
  cashOnHand: number | undefined; // 보유현금: 숫자형
  age: number | undefined; // 만 나이: 숫자형
  maritalStatus: MaritalStatus | undefined; // 혼인상태: 문자열 (미혼, 기혼 등)
  annualIncome: number | undefined; // 배우자 연소득: 숫자형
  childStatus: boolean | undefined; // 자녀유무: 논리형
  hasNewborn: boolean | undefined; //신생아 여부: 논리형
  isSMEEmployee: boolean | undefined; // 중소기업 재직 여부: 논리형
  isNetAssetOver345M: boolean | undefined; // 순자산 3.45억 초과 여부: 논리형
  rentHousingType: HouseType | undefined; // 주택정보: 문자열
  exclusiveArea: number | undefined; //전용면적
  buildingName: string | undefined; //건물명
  districtCode: string | undefined; //법정동 코드
  dongName: string | undefined; //읍명동이름
  jibun: string | undefined; //지번
}
