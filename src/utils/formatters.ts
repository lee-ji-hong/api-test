export const formatNumber = (number: number): string => {
  return `${new Intl.NumberFormat().format(number)}만원`;
};

export const formatNumberWithUnits = (number: number): string => {
  if (number >= 10000) {
    const billion = Math.floor(number / 10000); // 억 단위 계산
    const million = number % 10000; // 만 단위 계산
    if (million > 0) {
      return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`;
    }
    return `${billion}억`;
  }
  return formatNumber(number); // 억 단위 미만
};
