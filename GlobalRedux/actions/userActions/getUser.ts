"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType } from "@/models/user";
const NEXT_PUBLIC_API_URL= process.env.NEXT_PUBLIC_API_URL

type dataType = {
  users: IUserType[];
};

interface initialStateType {
  loading: boolean;
  data: dataType;
  error: string | null;
}
const initialState = {
  loading: true,
  data: { users: [] },
  error: null,
} as initialStateType;

export const fetchUsers = createAsyncThunk("users/fetch", async (token:string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    // return thunkAPI.rejectWithValue("Failed to fetch users data");
  }
});

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error";
      })

  },
});

export default UsersSlice.reducer;
