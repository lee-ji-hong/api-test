import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";

import { useInternalRouter } from "@/hooks/useInternalRouter";

import styles from "./settings.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function SettingPage() {
  const router = useInternalRouter();
  return (
    <>
      <Header className={cx("header")} title="설정" onLeftClick={() => router.goBack()} left="Back_btn" />
      <Spacing size={53} />
      <div>세팅페이지</div>
    </>
  );
}
