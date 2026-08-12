import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@components/LoginPage";
import HomePage from "@components/HomePage";
import CompetitionPage from "@components/CompetitionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
