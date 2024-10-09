import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { RecoilRoot } from "recoil";

import AppLayout from "../layout/AppLayout";
import LoginPage from "./LoginPage";
import { GlobalPortal } from "@/components/shared/GlobalPortal";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
import CommunityWirtePage from "./CommunityWirtePage";
import CommunityDetail from "./CommunityDetail";
import CommunityModifyPage from "./CommunityModify";
import CommunityRecentReportPage from "./CommunityRecentReport";
import CommunityModifyCommentPage from "./CommunityModifyComment";

const HomePage = lazy(() => import("./HomePage"));
const DepositEntryPage = lazy(() => import("./DepositEntryPage"));
const DepositResultPage = lazy(() => import("./DepositResultPage"));
const ApiPage = lazy(() => import("./ApiPage"));
const SettingPage = lazy(() => import("./SettingPage"));
const LoginSuccessPage = lazy(() => import("./LoginPage/LoginResultPage"));
const CommunityPage = lazy(() => import("./CommunityPage"));
const LoanInfoEntryPage = lazy(() => import("./LoanInfoEntryPage"));
const ReportPage = lazy(() => import("./ReportPage"));
const NoReportPage = lazy(() => import("./NoReportPage"));
const TermsOfServicePage = lazy(() => import("./TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicyPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalPortal.Provider>
          <Suspense fallback={<FullScreenMessage type="loading" />}>
            <Helmet>
              <title>뱅칼 | 전월세대출조회</title>
              <meta name="description" content="당신을 위한 최적의 전세 대출을 찾아드릴게요 - 전세대출, 신혼, 청년" />
              <meta name="keywords" content="내집플랜,전세대출,신혼,청년,대출" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta property="og:title" content="Readme Monster" />
              <meta property="og:type" content="website" />
              <meta property="og:image" content="/metaThum.png" />
              <meta property="og:article:author" content="내집플랜" />
              <meta property="og:url" content="https://myzipplan.com/" />
            </Helmet>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login-page" element={<LoginPage />} />
                <Route path="deposit-entry" element={<DepositEntryPage />} />
                <Route path="deposit-result" element={<DepositResultPage />} />
                <Route path="test" element={<ApiPage />} />
                <Route path="settings" element={<SettingPage />} />
                <Route path="login-result" element={<LoginSuccessPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="community/write" element={<CommunityWirtePage />} />
                <Route path="community/detail" element={<CommunityDetail />} />
                <Route path="community/detail/modify-comment" element={<CommunityModifyCommentPage />} />
                <Route path="community/modify" element={<CommunityModifyPage />} />
                <Route path="loan-info-entry" element={<LoanInfoEntryPage />} />
                <Route path="terms-of-service" element={<TermsOfServicePage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="community/recent-report" element={<CommunityRecentReportPage />} />
                <Route path="report" element={<ReportPage />} />
                <Route path="no-report" element={<NoReportPage />} />
                <Route path="login-success" element={<LoginSuccessPage />} />
              </Route>
            </Routes>
          </Suspense>
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
