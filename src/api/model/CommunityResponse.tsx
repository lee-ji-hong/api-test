// API 응답 데이터 모델 정의
interface CommunityListResponse {
  data: Post[]; // 여러 개의 포스트 리스트
}

// 대출 요약 보고서(LoanAdviceSummaryReport) 모델 정의
interface LoanAdviceSummaryReport {
  loanAdviceResultId: number;
  loanProductName: string;
  loanProductCode: string;
  possibleLoanLimit: number;
  expectedLoanRate: number;
}

// 포스트(Post) 모델 정의
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string | null;
  likes: number;
  comments: Comment[]; // 댓글 리스트
  commentCount: number;
  createdDate: [number, number, number, number, number, number, number]; // 연, 월, 일, 시, 분, 초, 밀리초 배열
  lastModifiedDate: [number, number, number, number, number, number, number];
  avatarUrl: string | null;
  timeAgo: string;
  loanAdviceSummaryReport: LoanAdviceSummaryReport; // 대출 요약 보고서
  like: boolean;
}

// 댓글(Comment) 모델 정의
interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdDate: [number, number, number, number, number, number, number]; // 연, 월, 일, 시, 분, 초, 밀리초 배열
  lastModifiedDate: [number, number, number, number, number, number, number];
  like: boolean;
  likes: number;
  timeAgo: string;
}

export type { CommunityListResponse, Post, Comment, LoanAdviceSummaryReport };
