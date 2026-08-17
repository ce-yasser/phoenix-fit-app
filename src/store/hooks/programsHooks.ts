import { useSelector } from "react-redux";
import type { RootState } from "@store/store";

export const useProgramsLoading = () =>
  useSelector((state: RootState) => state.programs.loading);
export const useProgramsError = () =>
  useSelector((state: RootState) => state.programs.error);
export const useProgramsData = () =>
  useSelector((state: RootState) => state.programs.data);
