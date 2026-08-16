import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowAuth } from "@store/slices/userSlice";
import type { AppDispatch, RootState } from "@store/store";

export const useAuthStateDispatch = () => useDispatch<AppDispatch>();
export const useAuthStateSelector = () =>
	useSelector((state: RootState) => state.user);
export const useShowAuth = () =>
	useSelector((state: RootState) => state.user.showAuth);

export const useSetShowAuth = () => {
  const dispatch = useAuthStateDispatch();
  return useCallback((value: boolean) => dispatch(setShowAuth(value)), [dispatch]);
};
