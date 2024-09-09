import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "../layout/AppLayout";
import LoginPage from "./LoginPage";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
import CommunityWirtePage from "./CommunityWirtePage";
import CommunityDetail from "./CommunityDetail";

const HomePage = lazy(() => import("./HomePage"));
const DepositEntryPage = lazy(() => import("./DepositEntryPage"));
const DepositResultPage = lazy(() => import("./DepositResultPage"));
const ApiPage = lazy(() => import("./ApiPage"));
const ScssExample = lazy(() => import("./scss-example"));
const LoginSuccessPage = lazy(() => import("./LoginPage/LoginResultPage"));
const CommunityPage = lazy(() => import("./CommunityPage"));
const LoanInfoEntryPage = lazy(() => import("./LoanInfoEntryPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullScreenMessage type="loading" />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="deposit-entry" element={<DepositEntryPage />} />
            <Route path="deposit-result" element={<DepositResultPage />} />
            <Route path="test" element={<ApiPage />} />
            <Route path="scss-example" element={<ScssExample />} />
            <Route path="login-result" element={<LoginSuccessPage />} />
            <Route path="login-page" element={<LoginPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="community/write" element={<CommunityWirtePage />} />
            <Route path="community/detail" element={<CommunityDetail />} />
            <Route path="loan-info-entry" element={<LoanInfoEntryPage />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
