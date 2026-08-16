import { useEffect } from "react";
import { useSetShowAuth } from "@store/hooks/userHooks";

function AuthPage() {
  const setShowAuth = useSetShowAuth();

  useEffect(() => {
    setShowAuth(true);
  }, [setShowAuth]);

  return null;
}

export default AuthPage;
