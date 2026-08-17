import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/store";
import { useCallback } from "react";
import { fetchPrograms } from "@store/slices/programsSlice";

export const useProgramsDispatch = () => useDispatch<AppDispatch>();

export const useProgramsLoading = () =>
  useSelector((state: RootState) => state.programs.loading);
export const useProgramsError = () =>
  useSelector((state: RootState) => state.programs.error);
export const useProgramsData = () =>
  useSelector((state: RootState) => state.programs.data);

export const useFetchPrograms = () => {
  const dispatch = useProgramsDispatch();
    return useCallback(
      () => dispatch(fetchPrograms()),
      [dispatch],
    );
}