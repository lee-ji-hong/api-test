import { useRecoilValue } from "recoil";
import { logEvent } from "firebase/analytics";
import { analyticsState } from "@/recoil/atoms";

// 이벤트 매개변수 타입 정의
type EventParams = Record<string, string | number | boolean>;

// 커스텀 Hook: logEvent 호출을 쉽게
export const useLogEvent = () => {
  const analytics = useRecoilValue(analyticsState);

  // 이벤트 로깅 함수
  const logCustomEvent = (eventName: string, eventParams?: EventParams): void => {
    console.log(eventName);
    if (!analytics) {
      console.error("Analytics instance is not available.");
      return;
    }
    logEvent(analytics, eventName, eventParams || {});
  };

  return logCustomEvent;
};
