import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import ScssExample from "./scss-example";

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
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scss-example" element={<ScssExample />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
