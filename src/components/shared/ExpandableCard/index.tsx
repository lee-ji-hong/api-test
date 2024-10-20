import { useState } from "react";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./ExpandableCard.module.scss";
const cx = classNames.bind(styles);

interface TextProps {
  title?: string;
  content: string;
}

const ExpandableCard = ({ title, content }: TextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const recommendationReason =
    content ||
    "test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.";
  const shouldShowMore = recommendationReason.length > MAX_LENGTH;

  return (
    <div className={cx("reason-box")}>
      <Text className={cx("txt-title")} text={title} />
      <Text
        className={cx("txt-sub")}
        text={
          isExpanded || !shouldShowMore ? recommendationReason : `${recommendationReason.substring(0, MAX_LENGTH)}...`
        }
      />
      {shouldShowMore && (
        <button className={cx("show-more-btn")} onClick={toggleExpanded}>
          <Text
            className={cx("txt-sub")}
            text={isExpanded ? "간략히" : "더보기"}
            highlight={isExpanded ? "간략히" : "더보기"}
          />
        </button>
      )}
    </div>
  );
};

export default ExpandableCard;
