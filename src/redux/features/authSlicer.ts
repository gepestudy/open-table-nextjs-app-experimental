import { createSlice } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

export type AuthState = {
  data: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: null,
  error: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthState: (state: AuthState, action) => {
      const { data, error, loading } = action.payload;
      state.data = data;
      state.error = error;
      state.loading = loading;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
