import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@components/LoginPage";
import HomePage from "@components/HomePage";
import CompetitionPage from "@components/CompetitionPage";
import HeaderComponent from "@components/HeaderComponent";
import FooterComponent from "@components/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
