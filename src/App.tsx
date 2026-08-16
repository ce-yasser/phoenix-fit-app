import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "@pages/AuthPage";
import HomePage from "@pages/HomePage";
import CompetitionPage from "@pages/CompetitionPage";
import HeaderComponent from "@components/HeaderComponent";
import FooterComponent from "@components/FooterComponent";

function AppLayout() {
  const { pathname } = useLocation();
  const routeClass = pathname === "/"
    ? "main--home"
    : `main--${pathname.replace(/^\/+/, "").replace(/\//g, "-")}`;

  return (
    <>
      <HeaderComponent />
      <div id="main" className={routeClass}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/competition" element={<CompetitionPage />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
