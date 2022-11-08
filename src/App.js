import TwoColTable from "./TwoColTable";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/football"
        element={<TwoColTable navSelected="football" />}
      />
      <Route
        path="/basketball"
        element={<TwoColTable navSelected="basketball" />}
      />
      <Route path="/hockey" element={<TwoColTable navSelected="hockey" />} />
      <Route path="*" element={<TwoColTable navSelected="football" />} />
    </Routes>
  );
}

export default App;
