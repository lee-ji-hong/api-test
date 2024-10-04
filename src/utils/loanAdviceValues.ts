import { formatNumberWithUnits } from "@/utils/formatters";
import { MaritalStatus, ChildStatus, HouseType, HouseOwnershipType } from "@/models";

const MaritalStatusLabels: Record<MaritalStatus, string> = {
  SINGLE: "미혼",
  NEWLY_MARRIED: "신혼",
  MARRIED: "기혼",
  ENGAGED: "결혼 예정",
};

const HouseTypeLabels: Record<HouseType, string> = {
  APARTMENT: "아파트",
  OFFICETEL: "오피스텔",
  HOUSEHOLD_HOUSE: "연립다세대",
  FAMILY_HOUSE: "단독/다가구",
};

const ChildStatusLabels: Record<ChildStatus, string> = {
  NO_CHILD: "무자녀",
  ONE_CHILD: "1자녀",
  TWO_CHILD: "2자녀",
  THREE_OR_MORE_CHILDREN: "3자녀 이상",
};

const HouseOwnershipTypeLabel: Record<HouseOwnershipType, string> = {
  NO_HOUSE: "무주택",
  SINGLE_HOUSE: "1주택",
  MULTI_HOUSE: "다주택",
};

type FieldValues = number | boolean | MaritalStatus | ChildStatus | HouseType | HouseOwnershipType | string;

export const getUnitForField = (fieldName: string, fieldValue: FieldValues) => {
  if (fieldValue === undefined) {
    return "선택하기"; // 기본 처리
  }

  switch (fieldName) {
    case "rentalDeposit":
    case "monthlyRent":
    case "cashOnHand":
    case "annualIncome":
    case "spouseAnnualIncome":
      return `${formatNumberWithUnits(Number(fieldValue))}`;
    case "age":
      return `${fieldValue}살`;
    case "maritalStatus":
      return `${MaritalStatusLabels[fieldValue as MaritalStatus]}`;
    case "childStatus":
      return `${ChildStatusLabels[fieldValue as ChildStatus]}`;
    case "isSMEEmployee":
      return fieldValue === true ? "예" : "아니요";
    case "isNetAssetOver345M":
      return fieldValue === true ? "해당" : "비해당";
    case "houseOwnershipType":
      return `${HouseOwnershipTypeLabel[fieldValue as HouseOwnershipType]}`;
    case "rentHousingType":
      return `${HouseTypeLabels[fieldValue as HouseType]}`;
    case "jibun":
      return fieldValue;
    default:
      return "선택하기";
  }
};
