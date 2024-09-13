import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "../layout/AppLayout";
import CommunityWirtePage from "./CommunityWirtePage";
import CommunityDetail from "./CommunityDetail";
import FullScreenMessage from "@/components/sections/FullScreenMessage";
const HomePage = lazy(() => import("./HomePage"));
const DepositEntryPage = lazy(() => import("./DepositEntryPage"));
const DepositResultPage = lazy(() => import("./DepositResultPage"));
const ApiPage = lazy(() => import("./ApiPage"));
const ScssExample = lazy(() => import("./scss-example"));
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
      <Suspense fallback={<FullScreenMessage type="loading" />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="deposit-entry" element={<DepositEntryPage />} />
            <Route path="deposit-result" element={<DepositResultPage />} />
            <Route path="test" element={<ApiPage />} />
            <Route path="scss-example" element={<ScssExample />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="community/write" element={<CommunityWirtePage />} />
            <Route path="community/detail" element={<CommunityDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
