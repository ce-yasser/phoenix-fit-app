import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { ProgramsResponse } from "@interfaces";
import { getProgramsData } from "@services/dataService";

interface ProgramsState {
  data: ProgramsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgramsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPrograms = createAsyncThunk<
  ProgramsResponse,
  void,
  { rejectValue: string }
>("programs/fetchPrograms", async (_, { rejectWithValue }) => {
  try {
    const data = await getProgramsData();
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch programs";
    return rejectWithValue(message);
  }
});

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch programs";
      });
  },
});

export default programsSlice.reducer;
