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

const HomePage = lazy(() => import("./HomePage"));
const DepositEntryPage = lazy(() => import("./DepositEntryPage"));
const DepositResultPage = lazy(() => import("./DepositResultPage"));
const ApiPage = lazy(() => import("./ApiPage"));
const ScssExample = lazy(() => import("./scss-example"));
const LoginSuccessPage = lazy(() => import("./LoginPage/LoginResultPage"));
const CommunityPage = lazy(() => import("./CommunityPage"));
const LoanInfoEntryPage = lazy(() => import("./LoanInfoEntryPage"));
const ReportPage = lazy(() => import("./ReportPage"));

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
                <Route path="scss-example" element={<ScssExample />} />
                <Route path="login-result" element={<LoginSuccessPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="community/write" element={<CommunityWirtePage />} />
                <Route path="community/detail" element={<CommunityDetail />} />
                <Route path="community/modify" element={<CommunityModifyPage />} />
                <Route path="loan-info-entry" element={<LoanInfoEntryPage />} />
                <Route path="report" element={<ReportPage />} />
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
