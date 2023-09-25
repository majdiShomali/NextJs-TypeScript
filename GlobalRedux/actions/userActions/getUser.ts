"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const NEXT_PUBLIC_API_URL= process.env.NEXT_PUBLIC_API_URL

export const fetchUser = createAsyncThunk(
  "User/fetchUser",
  async () => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/users/65106ce2b43620771c943455`);
    return response.data.user;
  }
);

interface UserState {
    loading: boolean;
    data: any; 
    error: string | null; 
  }
const fetchUserSlice = createSlice({
  name: "User",
  initialState: {
    loading: true,
    data: {},
    error: null as null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error";
      })

  },
});
export default fetchUserSlice.reducer;


