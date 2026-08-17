import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "@store/hooks/userHooks";

function ProtectedRoute() {
  const hasAccessToken = useIsLoggedIn();
  const isAuthPage = window.location.pathname === "/auth";
  // if current route is /auth and user is logged in, redirect to /me
  // if user is not logged in, redirect to /auth

  if (!hasAccessToken && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }

  if (hasAccessToken && isAuthPage) {
    return <Navigate to="/me" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
