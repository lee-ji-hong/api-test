import React, { useEffect, useState } from "react";

interface DelayedFallbackProps {
  delay?: number; // 딜레이 시간 (ms)
  children: React.ReactNode; // 표시할 컴포넌트
}

const DelayedFallback: React.FC<DelayedFallbackProps> = ({ delay = 500, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay); // 딜레이 후 show 상태를 true로 변경

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [delay]);

  if (!show) return null; // 딜레이 시간 전에는 아무것도 렌더링하지 않음

  return <>{children}</>; // 딜레이 이후에 자식 컴포넌트를 렌더링
};

export default DelayedFallback;
