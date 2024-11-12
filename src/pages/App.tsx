import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
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
import RepaymentCalcDetail from "./CalculatorPage/RepaymentCalculator/RepaymentDetail";
import LoanAddPage from "./CalculatorPage/DSRCalculator/LoanAddPage";

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
const CalculatorPage = lazy(() => import("./CalculatorPage"));

// 로딩 테스트용 페이지
const ReportPageLoading = lazy(() => import("./ReportPage/ReportPageLoading"));
const DepositEntryPageLoading = lazy(() => import("./DepositEntryPage/DepositEntryPageLoading"));
const DepositResultPageLoading = lazy(() => import("./DepositResultPage/DepositResultPageLoading"));
const LoanInfoEntryPageLoading = lazy(() => import("./LoanInfoEntryPage/LoanInfoEntryPageLoading"));

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
                <Route path="calculator" element={<CalculatorPage />} />
                <Route path="calculator/dsrLoanAddPage" element={<LoanAddPage />} />

                {/* 로딩 화면 테스트용 */}
                <Route path="loading/report" element={<ReportPageLoading />} />
                <Route path="loading/deposit-entry" element={<DepositEntryPageLoading />} />
                <Route path="loading/deposit-result" element={<DepositResultPageLoading />} />
                <Route path="loading/loan-info-entry" element={<LoanInfoEntryPageLoading />} />
              </Route>
            </Routes>
          </Suspense>
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
