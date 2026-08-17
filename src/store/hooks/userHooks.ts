import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  setShowAuth,
  setUserData,
} from "@store/slices/userSlice";
import type { AppDispatch, RootState } from "@store/store";
import type { UserData } from "@interfaces";

export const useAuthStateDispatch = () => useDispatch<AppDispatch>();
export const useAuthStateSelector = () =>
  useSelector((state: RootState) => state.user);
export const useShowAuth = () =>
  useSelector((state: RootState) => state.user.showAuth);
export const useIsLoggedIn = () =>
  useSelector((state: RootState) => Boolean(state.user.accessToken));
export const useUserData = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  return userData;
};

export const useSetShowAuth = () => {
  const dispatch = useAuthStateDispatch();
  return useCallback(
    (value: boolean) => dispatch(setShowAuth(value)),
    [dispatch],
  );
};

export const useLogout = () => {
  const dispatch = useAuthStateDispatch();
  return useCallback(() => dispatch(logout()), [dispatch]);
};

export const useLogin = () => {
  const dispatch = useAuthStateDispatch();
  return useCallback(
    (accessToken: string) => dispatch(login(accessToken)),
    [dispatch],
  );
};

export const useSetUserData = () => {
  const dispatch = useAuthStateDispatch();
  return useCallback(
    (userData: UserData) => dispatch(setUserData(userData)),
    [dispatch],
  );
};
