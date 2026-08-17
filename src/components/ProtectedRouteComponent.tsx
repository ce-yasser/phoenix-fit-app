import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "@store/hooks/userHooks";

function ProtectedRoute() {
  const hasAccessToken = useIsLoggedIn();
  const currentPath = window.location.pathname + window.location.search;
  const isAuthPage = window.location.pathname === "/auth";

  if (!hasAccessToken && !isAuthPage) {
    return <Navigate to={`/auth?redirectTo=${currentPath}`} replace />;
  }

  if (hasAccessToken && isAuthPage) {
    return <Navigate to="/me" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
