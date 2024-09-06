import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, fetchCurrentUser } from "../../api/authApi";
import { AuthState } from "../types/authTypes";

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

// Async Thunk to handle login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }, thunkAPI) => {
    try {
      const data = await login(payload);
      thunkAPI.dispatch(fetchUser()); // Fetch user data after login
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// Async Thunk to fetch current user
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    try {
      const data = await fetchCurrentUser(state.auth.token || "");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Fetching user failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Handle fetching user
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
