import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import HomePage from "@pages/HomePage";
import CompetitionPage from "@pages/CompetitionPage";
import HeaderComponent from "@components/HeaderComponent";
import FooterComponent from "@components/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div id="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
      </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
