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

export interface sendHousingInfoRequest {
  districtCode: string;
  jibun: string;
  dongName: string;
}
export interface BaseLoanProduct {
  loanProductName: string; // 대출 상품 이름
  loanProductCode: string; // 대출 상품 코드
  possibleLoanLimit: number; // 가능한 대출 한도
  expectedLoanRate: number; // 예상 대출 금리
}

export interface TransferUserResponse {
  code: number;
  status: string;
  message: string;
  data: null;
}

export interface RentalProductResponse {
  code: number;
  status: string;
  message: SimpleRentalProduct;
  data: SimpleRentalProduct[];
}
export interface SimpleRentalProduct extends BaseLoanProduct {
  loanAdviceResultId: number; // 대출 상담 결과 ID
}

export interface RecommendedProduct extends BaseLoanProduct {
  notEligibleReasons: string[]; // 적격하지 않은 이유
}

export interface SpecificLoanAdviceResponse {
  code: number;
  status: string;
  message: string;
  data: SpecificLoanAdvice;
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

// 게스트유저 토큰 발급 응답
export interface GuestTokenResponse {
  code: number;
  status: string;
  message: string;
  data: GuestToken;
}

export interface GuestToken {
  accessToken: string;
  refreshToken: string;
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

export interface HousingInfoResponse {
  code: number;
  status: string;
  message: string;
  data: HousingInfo;
}

export interface HousingInfo {
  apiResultMessage: string;
  housingInfoList: HousingInfoItem[];
  apiResultCode: string;
}

export interface HousingInfoItem {
  rentHousingTypeName: string;
  exclusiveArea: number;
  exclusiveAreaPy: number;
  averageDeposit: number;
  averageMonthlyRent: number;
  transactionCount: number;
}

export interface AddressResponse {
  code: number;
  status: string;
  message: string;
  data: Address;
}

export interface Address {
  apiResultCode: string;
  apiResultMessage: string;
  addressInfoList: AddressInfo[];
}

export interface AddressInfo {
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  buildingName: string; // 건물명
  districtCode: string; // 법정동 코드
  dongName: string; // 동명
  jibun: string; // 지번
}

/*************
 * Community
 ************/

export interface CommunityDetailResponse {
  code: number;
  status: string;
  message: string;
  data: CommunityDetail;
}
export interface CommunityDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  imageFile: File | null;
  likes: number;
  comments: Comment[];
  commentCount: number;
  createdDate: number[];
  lastModifiedDate: number[];
  avatarUrl: string;
  timeAgo: string;
  loanAdviceSummaryReport: LoanAdviceSummaryReport | null;
  like: boolean;
  updateDeleteAuthority: string;
  loginUserName: string;
}

export interface CommentResponse {
  code: number;
  status: string;
  message: string;
  data: Comment;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdDate: number[];
  lastModifiedDate: number[];
  like: boolean;
  likes: number;
  timeAgo: string;
  avatarUrl: string;
  updateDeleteAuthority: string;
}

export interface LoanAdviceSummaryReport {
  loanAdviceResultId: number;
  loanProductName: string;
  loanProductCode: string;
  possibleLoanLimit: number;
  expectedLoanRate: number;
}

export interface LikeResponse {
  code: number;
  status: string;
  message: string;
  data: string;
}
export interface getLoanAdviceResponse {
  code: number;
  status: string;
  message: string;
  data: DepositLists[];
}
export interface LoanAdviceReportResponse {
  code: number;
  status: string;
  message: string;
  data: LoanAdviceReport[];
}
export interface DepositLists {
  expectedLoanRate: number; // 숫자형 대출 금리
  loanProductCode: string; // 문자열 대출 상품 코드
  loanProductName: string; // 문자열 대출 상품 이름
  loanAdviceResultId?: number;
  notEligibleReasons?: string[]; // 문자열 배열 - 대출 불가 사유
  possibleLoanLimit: number; // 숫자형 대출 한도
}

/*************
UserInputInfo API
 ************/

export interface SpecificUserInputInfoResponse {
  code: number;
  status: string;
  message: string;
  data: UserInputInfo;
}

export interface UserInputInfo {
  rentalDeposit: number; // 임차보증금: 숫자형
  monthlyRent: number; //월세
  cashOnHand: number; // 보유현금: 숫자형
  age: number; // 만 나이: 숫자형
  maritalStatus: MaritalStatus; // 혼인상태: 문자열 (미혼, 기혼 등)
  annualIncome: number; // 연소득: 숫자형
  spouseAnnualIncome: number; // 배우자 연소득: 숫자형
  childStatus: ChildStatus; // 자녀유무: 논리형
  hasNewborn: boolean; //신생아 여부: 논리형
  isSMEEmployee: boolean; // 중소기업 재직 여부: 논리형
  houseOwnershipType: HouseOwnershipType; // 주택 소유 상태 ("NO_HOUSE","SINGLE_HOUSE", "MULTI_HOUSE")
  isNetAssetOver345M: boolean; // 순자산 3.45억 초과 여부: 논리형
  rentHousingType: HouseType; // 주택정보: 문자열
  exclusiveArea: number; //전용면적
  buildingName: string; //건물명
  districtCode: string; //법정동 코드
  dongName: string; //읍명동이름
  jibun: string; //지번
}

/*************
 * Calculator
 ************/

export interface OptionItem {
  label: string;
  value: string | number | boolean;
}

export interface OptionsType {
  year: OptionItem[];
  month: OptionItem[];
}

export interface sendLtvCalcRequest {
  loanPurpose: string;
  collateralValue: number;
  regionType: string;
  houseOwnershipType: string;
}

export interface LtvCalcResponse {
  code: number;
  status: string;
  message: string;
  data: LtvCalculationResult;
}

export interface LtvCalculationResult {
  ltvRatio: number;
  collateralValue: number;
  possibleLoanAmount: number;
}

export interface sendDtiCalcRequest {
  annualIncome: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  repaymentType: string;
  yearlyLoanInterestRepayment: number;
}
export interface sendRepaymentCalcRequest {
  principal: number;
  interestRatePercentage: number;
  term: number;
  gracePeriod: number;
  repaymentType: string;
  maturityPaymentAmount: number;
}

export interface sendDSRCalcRequest {
  loanStatuses: LoanStatus[];
  annualIncome: number;
}

export interface LoanStatus {
  repaymentType: string;
  loanType: string;
  principal: number;
  maturityPaymentAmount: number;
  term: number;
  gracePeriod: number;
  interestRatePercentage: number;
  isMetroArea: number;
  interestRateType: string;
}

export interface DtiCalcResponse {
  code: number;
  status: string;
  message: string;
  data: DtiCalculationResult;
}

export interface DSRCalcResponse {
  code: number;
  status: string;
  message: string;
  data: DSRCalculationResult;
}

export interface RepaymentCalcResponse {
  code: number;
  status: string;
  message: string;
  data: RepaymentCalculationResult;
}

export interface DtiCalculationResult {
  dtiRatio: number;
  annualIncome: number;
  annualRepaymentAmount: number;
  annualRepaymentPrincipal: number;
  annualRepaymentInterest: number;
  yearlyLoanInterestRepayment: number;
}

export interface DSRCalculationResult {
  annualIncome: number;
  totalAnnualRepayment: number;
  totalLoanCount: number;
  finalDsrRatio: number;
  dsrCalcResults: DSRCalculationResultDetail[];
}

export interface DSRCalculationResultDetail {
  serial: number;
  loanDescription: string;
  principal: number;
  balance: number;
  term: number;
  annualPrincipalRepayment: number;
  annualInterestRepayment: number;
}

export interface RepaymentCalculationResult {
  repaymentSchedules: RepaymentCalculationResultDetail[];
  totalPrincipal: number;
  totalInterest: number;
  totalInstallments: number;
}

export interface RepaymentCalculationResultDetail {
  installmentNumber: number;
  totalPayment: number;
  principalPayment: number;
  interestPayment: number;
  remainingPrincipal: number;
}
