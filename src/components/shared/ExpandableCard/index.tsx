import { useState } from "react";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./ExpandableCard.module.scss";
const cx = classNames.bind(styles);

interface TextProps {
  title?: string;
  content: string;
  length?: number;
}

const ExpandableCard = ({ title, content, length = 100 }: TextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const recommendationReason =
    content ||
    "test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.test 컨텐츠입니다.";
  const shouldShowMore = recommendationReason.length > length;

  return (
    <div className={cx("reason-box")}>
      <Text className={cx("txt-title")} text={title} />
      <div>
        <span className={cx("txt-sub")}>
          {isExpanded || !shouldShowMore ? recommendationReason : `${recommendationReason.substring(0, length)}...`}
        </span>
        {shouldShowMore && (
          <button className={cx("show-more-btn")} onClick={toggleExpanded}>
            <Text
              className={cx("txt-sub")}
              text={isExpanded ? "\u00A0\u00A0\u00A0간략히" : "\u00A0\u00A0\u00A0더보기"}
              highlight={isExpanded ? "\u00A0\u00A0\u00A0간략히" : "\u00A0\u00A0\u00A0더보기"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpandableCard;
