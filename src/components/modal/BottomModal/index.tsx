import React, { useState, useRef, useEffect } from "react";
import styles from "./BottomModal.module.scss"; // SCSS 파일 import

interface BottomModalProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const BottomModal: React.FC<BottomModalProps> = ({ onClose, onEdit, onDelete }) => {
  const [dragging, setDragging] = useState(false);
  const [offsetY, setOffsetY] = useState(0); // Y축으로 이동한 거리
  const [isClosing, setIsClosing] = useState(false); // 닫기 애니메이션 여부
  const [isVisible, setIsVisible] = useState(false); // 모달이 열릴 때 애니메이션 처리
  const startYRef = useRef<number | null>(null); // 드래그 시작 Y 좌표

  // 모달이 렌더링될 때 열리는 애니메이션 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // 모달이 렌더링된 후에 애니메이션 적용
    }, 10); // 짧은 딜레이를 두어 모달이 처음 렌더링된 후에 애니메이션 적용
    return () => clearTimeout(timer);
  }, []);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = "hidden"; // body 스크롤 막기
    return () => {
      document.body.style.overflow = "auto"; // 모달이 닫히면 스크롤 다시 허용
    };
  }, []);

  // 모달 닫기 처리
  const handleClose = () => {
    setIsClosing(true); // 닫기 애니메이션 시작
    setTimeout(() => {
      onClose(); // 300ms 후에 모달을 닫음 (애니메이션 시간이 지난 후)
    }, 10); // 애니메이션 시간이 300ms이므로 타이머를 맞춤
  };

  // 드래그 시작
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 차단
    e.preventDefault(); // 기본 스크롤 동작 방지
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    setDragging(true);
  };

  // 드래그 중
  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging || startYRef.current === null) return;

    e.stopPropagation(); // 이벤트 전파 차단
    e.preventDefault(); // 기본 스크롤 동작 방지

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const distanceY = clientY - startYRef.current;
    if (distanceY > 0) {
      setOffsetY(distanceY); // 아래로만 이동 가능
    }
  };

  // 드래그 끝
  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 차단
    setDragging(false);

    // 특정 거리 이상 드래그하면 모달을 닫음
    if (offsetY > 100) {
      handleClose(); // 모달 닫기
    } else {
      setOffsetY(0); // 원래 위치로 복귀
    }
  };

  // 스크롤 이벤트 차단
  const preventScrollPropagation = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation(); // 이벤트 전파 차단
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleClose}>
      <div
        className={`${styles["modal-content"]} ${isClosing ? styles["closing"] : isVisible ? styles["opening"] : ""}`}
        style={{ transform: `translateY(${offsetY}px)` }} // 드래그에 따라 모달 이동
        onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onWheel={preventScrollPropagation} // 스크롤 이벤트 차단
        // onTouchStart={preventScrollPropagation} // 터치 이벤트 차단
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}>
        {/* 드래그 가능한 handle-bar, 클릭 시 모달 닫기 */}
        <div
          className={styles["handle-bar"]}
          onClick={handleClose} // 핸들바 클릭 시 모달 닫기
        ></div>{" "}
        <button className={styles["edit-button"]} onClick={onEdit}>
          수정하기
        </button>
        <button className={styles["delete-button"]} onClick={onDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default BottomModal;
