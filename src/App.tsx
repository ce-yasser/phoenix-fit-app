import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRouteComponent";
import AuthPage from "@pages/AuthPage";
import HomePage from "@pages/HomePage";
import CompetitionPage from "@pages/CompetitionPage";
import HeaderComponent from "@components/HeaderComponent";
import FooterComponent from "@components/FooterComponent";
import LoginComponent from "@components/LoginComponent";
import {
  useIsLoggedIn,
  useShowAuth,
  useUserData,
  useSetUserData,
} from "@store/hooks/userHooks";
import { getUserData } from "@services/userService";

function AppLayout() {
  const { pathname } = useLocation();
  const showAuth = useShowAuth();
  const routeClass =
    pathname === "/"
      ? "main--home"
      : `main--${pathname.replace(/^\/+/, "").replace(/\//g, "-")}`;
  const userData = useUserData();
  const setUserData = useSetUserData();
  const hasAccessToken = useIsLoggedIn();

  useEffect(() => {
    if (!hasAccessToken || userData) {
      return;
    }
    (async () => {
      const data = await getUserData();
      setUserData(data);
    })();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div id="main" className={routeClass}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/competition" element={<CompetitionPage />} />
          </Route>
        </Routes>
      </div>
      <FooterComponent />
      {showAuth && <LoginComponent />}
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
