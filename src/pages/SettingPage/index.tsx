import { useEffect, useState } from "react";
import { AlertModal } from "@/components/modal";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import List from "@/components/shared/List";

import { SETTINGS_MENU } from "@/constants/SettingsMenu";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { useSendLogout } from "@/hooks/queries/useSendLogout";
import { useAuth } from "@/hooks/useAuth";

import styles from "./settings.module.scss";
import classNames from "classnames/bind";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

export default function SettingPage() {
  const [isCenterModalOpen, setCenterModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const { Logout } = useSendLogout();
  const router = useInternalRouter();
  const { auth } = useAuth();

  const handleClick = (item: (typeof SETTINGS_MENU)[number]) => {
    if (item.isMailLink && item.mailTo) {
      window.location.href = item.mailTo;
    } else if (item.path) {
      router.push(item.path);
    } else if (item.name === "로그아웃" || item.name === "회원탈퇴") {
      setModalType(item.name);
      setCenterModalOpen(true);
    }
  };

  const handleCancel = () => {
    setCenterModalOpen(false);
  };

  const handleLogout = () => {
    setCenterModalOpen(false);
    Logout();
  };

  const handleConfirm = () => {
    setCenterModalOpen(false);
    alert("준비중입니다.😢");
  };

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("SettingPage", {
      page_title: "./SettingPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <Header className={cx("header")} title="설정" onLeftClick={() => router.goBack()} left="Back_btn" />
      <Spacing size={53} />
      <List className={cx("list-container")}>
        {SETTINGS_MENU.filter((item) => !(item.name === "로그아웃" || item.name === "회원탈퇴") || auth).map((item) => (
          <List.Row
            key={item.name}
            className={cx("list-content")}
            subClassName={cx("list-txt", { "alert-item": item.name === "회원탈퇴" })}
            onClick={() => handleClick(item)}
            topText={item.name}
            withArrow={item.path ? true : false}
          />
        ))}
      </List>
      {isCenterModalOpen && (
        <AlertModal
          message={modalType === "로그아웃" ? "로그아웃 하시겠어요?" : "정말 탈퇴 하시겠어요?"}
          subMessage={modalType === "회원탈퇴" ? "받은 리포트가 영구 삭제됩니다." : ""}
          confirmLabel="예"
          cancelLabel="아니요"
          onCancel={handleCancel}
          onConfirm={modalType === "로그아웃" ? handleLogout : handleConfirm}
        />
      )}
    </>
  );
}
