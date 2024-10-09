import { IMAGES } from "@/constants/images";

type ImageInfo = {
  src: string;
  alt: string;
};

export function getBankImage(loanProductCode: string): ImageInfo {
  const bankCode = loanProductCode.split("-")[0]; // 'HF-01'에서 'HF' 추출

  switch (bankCode) {
    case "HF":
      return IMAGES?.LoanBankHFIcon;
    case "NHUF":
      return IMAGES?.LoanBankNHUFIcon;
    case "SGI":
      return IMAGES?.LoanBankSGIIcon;
    case "HUG":
      return IMAGES?.LoanBankHUGIcon;
    default:
      return IMAGES?.LoanBankDummyIcon;
  }
}
