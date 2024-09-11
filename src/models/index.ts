export interface InfoItem {
  id: number;
  label: string;
  value: string;
}

export interface FormValues {
  deposit: number; // 임차보증금: 숫자형
  rent: number; // 월세: 숫자형
  savings: number; // 보유현금: 숫자형
  age: number; // 만 나이: 숫자형
  maritalStatus: string; // 혼인상태: 문자열 (미혼, 기혼 등)
  spouseIncome: number; // 배우자 연소득: 숫자형
  child: boolean; // 자녀유무: 논리형
  company: boolean; // 중소기업 재직 여부: 논리형
  asset: boolean; // 순자산 3.45억 초과 여부: 논리형
  houseInfo: string; // 주택정보: 문자열
}
