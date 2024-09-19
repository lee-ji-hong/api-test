export interface InfoItem {
  id: number;
  label: string;
  value: string;
}

export type MaritalStatus = "SINGLE" | "NEWLY_MARRIED" | "MARRIED" | "ENGAGED";
export type ChildStatus = "NO_CHILD" | "ONE_CHILD" | "TWO_CHILD" | "THREE_OR_MORE_CHILDREN";
export type HouseType = "APARTMENT" | "OFFICETEL" | "HOUSEHOLD_HOUSE" | "FAMILY_HOUSE";
export type HouseOwnershipType = "NO_HOUSE" | "SINGLE_HOUSE" | "MULTI_HOUSE";

export interface sendLoanAdviceReportRequest {
  rentalDeposit: number | undefined; // 임차보증금: 숫자형
  monthlyRent: number | undefined; //월세
  cashOnHand: number | undefined; // 보유현금: 숫자형
  age: number | undefined; // 만 나이: 숫자형
  maritalStatus: MaritalStatus | undefined; // 혼인상태: 문자열 (미혼, 기혼 등)
  annualIncome: number | undefined; // 연소득: 숫자형
  spouseAnnualIncome: number | undefined; // 배우자 연소득: 숫자형
  childStatus: ChildStatus | undefined; // 자녀유무: 논리형
  hasNewborn: boolean | undefined; //신생아 여부: 논리형
  isSMEEmployee: boolean | undefined; // 중소기업 재직 여부: 논리형
  houseOwnershipType: HouseOwnershipType | undefined; // 주택 소유 상태 ("NO_HOUSE","SINGLE_HOUSE", "MULTI_HOUSE")
  isNetAssetOver345M: boolean | undefined; // 순자산 3.45억 초과 여부: 논리형
  rentHousingType: HouseType | undefined; // 주택정보: 문자열
  exclusiveArea: number | undefined; //전용면적
  buildingName: string | undefined; //건물명
  districtCode: string | undefined; //법정동 코드
  dongName: string | undefined; //읍명동이름
  jibun: string | undefined; //지번
}

export interface SendSimpleRentalProductRequest {
  rentalDeposit: number;
}
export interface sendSpecificLoanAdviceRequest {
  userInputInfoId: number;
  productCode: string;
}

export interface sendaddressSearchRequest {
  keyword: string;
}

export interface BaseLoanProduct {
  loanProductName: string; // 대출 상품 이름
  loanProductCode: string; // 대출 상품 코드
  possibleLoanLimit: number; // 가능한 대출 한도
  expectedLoanRate: number; // 예상 대출 금리
}

export interface SimpleRentalProduct extends BaseLoanProduct {
  loanAdviceResultId: number; // 대출 상담 결과 ID
}

export interface RecommendedProduct extends BaseLoanProduct {
  notEligibleReasons: string[]; // 적격하지 않은 이유
}

export interface SpecificLoanAdvice {
  loanAdviceResultId: number; // 대출 결과 ID
  userInputInfoId: number; // 사용자가 입력한 정보의 ID
  hasEligibleProduct: boolean; // 적격 상품이 있는지 여부
  loanProductName: string; // 대출 상품 이름
  loanProductCode: string; // 대출 상품 코드
  possibleLoanLimit: number; // 가능한 대출 한도
  expectedLoanRate: number; // 예상 대출 금리
  totalRentalDeposit: number; // 총 임차보증금
  loanAmount: number; // 대출 금액
  ownFunds: number; // 자가 자금
  monthlyInterestCost: number; // 월 이자 비용
  monthlyRent: number; // 월세
  totalLivingCost: number; // 총 생활비
  opportunityCostOwnFunds: number; // 자가 자금의 기회 비용
  depositInterestRate: number; // 예금 금리
  guaranteeInsuranceFee: number; // 보증 보험료
  stampDuty: number; // 인지세
  recommendationReason: string; // 추천 이유
  recommendedProducts: RecommendedProduct[]; // 추천 상품 리스트
  availableBanks: string[]; // 사용 가능한 은행 리스트
  rentalLoanGuide: string; // 전세 대출 안내
}

export interface LoanAdviceReport {
  loanAdviceResultId: number; // 대출 상담 결과 ID
  userInputInfoId: number; // 사용자 입력 정보 ID
  hasEligibleProduct: boolean; // 적합한 상품이 있는지 여부
  loanProductName: string; // 대출 상품명
  loanProductCode: string; // 대출 상품 코드
  possibleLoanLimit: number; // 가능한 대출 한도
  expectedLoanRate: number; // 예상 대출 금리
  totalRentalDeposit: number; // 총 임차 보증금
  loanAmount: number; // 대출 금액
  ownFunds: number; // 자가 자금
  monthlyInterestCost: number; // 월 이자 비용
  monthlyRent: number; // 월세
  totalLivingCost: number; // 총 생활비
  opportunityCostOwnFunds: number; // 자가 자금의 기회 비용
  depositInterestRate: number; // 예금 금리
  guaranteeInsuranceFee: number; // 보증 보험료
  stampDuty: number; // 인지세
  recommendationReason: string; // 추천 이유
  recommendedProducts: RecommendedProduct[]; // 추천 상품 리스트
  availableBanks: string[]; // 이용 가능한 은행 리스트
  rentalLoanGuide: string; // 전세 대출 안내 사항
}
export interface Address {
  apiResultCode: string;
  apiResultMessage: string;
  addressInfos: AddressInfo[];
}

export interface AddressInfo {
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  buildingName: string; // 건물명
  districtCode: string; // 법정동 코드
  dongName: string; // 동명
  jibun: string; // 지번
}
