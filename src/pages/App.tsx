import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import ScssExample from "./scss-example";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="scss-example" element={<ScssExample />} />
      </Route>
    </Routes>
  );
}

export default App;
