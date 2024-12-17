export const formatNumber = (number: number): string => {
  return `${new Intl.NumberFormat().format(number)}`;
};

export const modalformatNumber = (value: number | string): string => {
  if (typeof value === "string" && value.includes(".")) {
    return value; // 온점 포함 문자열 그대로 반환
  }
  if (!isNaN(Number(value))) {
    return `${new Intl.NumberFormat().format(Number(value))}`; // 숫자 포맷
  }
  return "";
};

export const formatNumberWithUnits = (number: number): string => {
  if (number === undefined || isNaN(number)) {
    return "";
  }
  if (number >= 10000) {
    const billion = Math.floor(number / 10000); // 억 단위 계산
    const million = number % 10000; // 만 단위 계산
    if (million > 0) {
      const thousand = Math.floor(million / 1000); // 천 단위 계산
      const remainder = million % 1000; // 천 단위 이하 남은 금액 계산
      if (thousand > 0 && remainder === 0) {
        return `${billion}억 ${thousand}천만원`; // 억 + 천
      } else if (thousand > 0 && remainder > 0) {
        return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`; // 억 + 만원
      } else {
        return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`; // 만원만 있는 경우
      }
    }
    return `${billion}억`; // 천 이하 없음
  }
  return `${new Intl.NumberFormat().format(number)}만원`; // 억 단위 미만
};

// export const formatNumberWithUnits2 = (number: number): string => {
//   if (number >= 100000000) {
//     const billion = Math.floor(number / 100000000); // 억 단위 계산
//     const million = number % 100000000; // 만 단위 계산
//     if (million > 0) {
//       const thousand = Math.floor(million / 10000000); // 천 단위 계산
//       const remainder = million % 10000000; // 천 단위 이하 남은 금액 계산
//       if (thousand > 0 && remainder === 0) {
//         return `${billion}억 ${thousand}천만원`; // 억 + 천
//       } else if (thousand > 0 && remainder > 0) {
//         return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`; // 억 + 만원
//       } else {
//         return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`; // 만원만 있는 경우
//       }
//     }
//     return `${billion}억`; // 천 이하 없음
//   }
//   return `${new Intl.NumberFormat().format(number)}만원`; // 억 단위 미만
// };

export const formatNumberWithUnits2 = (number: number): string => {
  if (number >= 100000000) {
    const billion = Math.floor(number / 100000000); // 억 단위 계산
    const million = number % 100000000; // 만 단위 이하 계산
    const thousand = Math.floor(million / 10000000); // 천만 단위 계산
    const tenThousand = Math.floor((million % 10000000) / 10000); // 만 단위 계산
    const remainder = million % 10000; // 만원 이하 계산

    if (thousand > 0 && tenThousand === 0 && remainder === 0) {
      return `${billion}억 ${thousand}천만원`;
    } else if (thousand > 0 && remainder === 0) {
      return `${billion}억 ${thousand}천 ${tenThousand}만원`;
    } else if (thousand > 0) {
      return `${billion}억 ${thousand}천 ${tenThousand}만 ${remainder.toLocaleString()}원`;
    } else if (tenThousand > 0) {
      return `${billion}억 ${tenThousand}만 ${remainder !== 0 ? ` ${remainder.toLocaleString()}원` : ""}`;
    }
    return `${billion}억${remainder !== 0 ? ` ${remainder.toLocaleString()}원` : "원"}`;
  } else if (number >= 10000) {
    const tenThousand = Math.floor(number / 10000);
    const remainder = number % 10000;
    if (remainder === 0) {
      return `${tenThousand}만원`;
    }
    return `${number.toLocaleString()}원`;
  }
  return `${number.toLocaleString()}원`;
};
