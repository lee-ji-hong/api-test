import React from "react";
import Back_btn from "@/assets/images/back.svg";
import Cancel_btn from "@/assets/images/cancel_btn.svg";
import CommunityHeartIcon from "@/assets/images/community/ico_heart.png";
import CommunityHeartActiveIcon from "@/assets/images/community/ico_heart_active.png";
import CommunityCommentIcon from "@/assets/images/community/ico_comment.png";
import CommunityLoanBankDummyIcon from "@/assets/images/community/ico_loan_bank_dummy.png";
import CommunityProfileDummyIcon from "@/assets/images/community/ico_profile_dummy.png";
import PictureIcon from "@/assets/images/community/ico_community_picture.png";
import DocumentIcon from "@/assets/images/community/ico_community_doc.png";
import KeyboardIcon from "@/assets/images/community/ico_community_keyboard.png";
import BackButton from "@/assets/images/community/ico_back.png";
import MoreButton from "@/assets/images/community/ico_more.png";
import Logo from "@/assets/images/logo.svg";
import Onboarding_1 from "@/assets/images/onboarding_1.png";
import Onboarding_2 from "@/assets/images/onboarding_2.png";
import Onboarding_3 from "@/assets/images/onboarding_3.png";
import Onboarding_4 from "@/assets/images/onboarding_4.png";
import Report_1 from "@/assets/images/report_1.png";
import Setting_btn from "@/assets/images/setting.svg";
import TabBarHomeIcon from "@/assets/images/TabBarHomeIcon";
import TabBarBoardIcon from "@/assets/images/TabBarBoardIcon";
import TabBarCalculatorIcon from "@/assets/images/TabBarCalculatorIcon";

export type ImageType = {
  src?: string;
  alt: string;
  SVGComponent?: React.ReactNode;
};

export const IMAGES: Record<string, ImageType> = {
  Onboarding_1: {
    src: Onboarding_1,
    alt: "집",
  },
  Onboarding_2: {
    src: Onboarding_2,
    alt: "전구",
  },
  Onboarding_3: {
    src: Onboarding_3,
    alt: "문서",
  },
  Onboarding_4: {
    src: Onboarding_4,
    alt: "말풍선",
  },
  Cancel_btn: {
    src: Cancel_btn,
    alt: "취소",
  },
  TabBarCalculatorIcon: {
    SVGComponent: TabBarCalculatorIcon,
    alt: "계산기 아이콘",
  },
  TabBarHomeIcon: {
    SVGComponent: TabBarHomeIcon,
    alt: "홈 아이콘",
  },
  TabBarBoardIcon: {
    SVGComponent: TabBarBoardIcon,
    alt: "게시판 아이콘",
  },
  HeartIcon: {
    src: CommunityHeartIcon,
    alt: "하트",
  },
  HeartIconActive: {
    src: CommunityHeartActiveIcon,
    alt: "하트",
  },
  CommentIcon: {
    src: CommunityCommentIcon,
    alt: "댓글",
  },
  PictureIcon: {
    src: PictureIcon,
    alt: "사진 아이콘",
  },
  DocumentIcon: {
    src: DocumentIcon,
    alt: "문서 아이콘",
  },
  KeyboardIcon: {
    src: KeyboardIcon,
    alt: "키보드 아이콘",
  },

  BackButton: {
    src: BackButton,
    alt: "뒤로가기",
  },
  MoreButton: {
    src: MoreButton,
    alt: "더보기",
  },
  Report_1: {
    src: Report_1,
    alt: "리포트 사용 이미지1",
  },

  // 더미 이미지 모음
  LoanBankDummyIcon: {
    src: CommunityLoanBankDummyIcon,
    alt: "은행 아이콘",
  },
  ProfileDummyIcon: {
    src: CommunityProfileDummyIcon,
    alt: "프로필 이미지",
  },
  Back_btn: {
    src: Back_btn,
    alt: "뒤로가기",
  },
  Setting_btn: {
    src: Setting_btn,
    alt: "설정",
  },
  Logo: {
    src: Logo,
    alt: "로고",
  },
};
