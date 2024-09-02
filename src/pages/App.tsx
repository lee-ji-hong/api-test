import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "../layout/AppLayout";
import LoginPage from "./LoginPage";
import LoginPage from "./LoginTest/loginPage";
// import CommunityPage from "./CommunityPage";

const HomePage = lazy(() => import("./HomePage"));
const DepositEntryPage = lazy(() => import("./DepositEntryPage"));
const ApiPage = lazy(() => import("./ApiPage"));
const ScssExample = lazy(() => import("./scss-example"));
const LoginSuccessPage = lazy(() => import("./LoginPage/LoginResultPage"));
const LoginSuccessPage = lazy(() => import("./LoginTest/LoginSuccessPage"));
const CommunityPage = lazy(() => import("./CommunityPage"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="deposit-entry" element={<DepositEntryPage />} />
            <Route path="test" element={<ApiPage />} />
            <Route path="scss-example" element={<ScssExample />} />
            <Route path="login-page" element={<LoginPage />} />
            <Route path="login-result" element={<LoginSuccessPage />} />
            <Route path="login-success" element={<LoginSuccessPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
