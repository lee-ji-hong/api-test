import Profile from "./Profile";
import Contents from "./Contents";
import Spacing from "@/components/shared/Spacing";
import styles from "./CommunityContents.module.scss";
import classNames from "classnames/bind";
import React from "react";
import { Post } from "@/api/model/CommunityResponse";

const cx = classNames.bind(styles);

const CommunityContents: React.FC<Post> = (props) => {
  return (
    <div className={cx("container")}>
      <Profile {...props} />
      <Spacing size={12} />
      <Contents {...props} />
      <Spacing size={16} />
      <Spacing size={50} />
    </div>
  );
};

export default CommunityContents;
