import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthService } from '@/core/service/auth.service';
import { LoginData } from '@/core/interface/auth';

const auth = new AuthService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
};

export interface User {
  id: string;
  name: string;
  token: string;
}

export const adminLogin = createAsyncThunk<User, LoginData>(
  'authSlide/adminLogin',
  async (account: LoginData) => {
    try {
      const res = await auth.AdminSignIn(account);
      console.log('res', res);
      return res;
    } catch (error) {
      return error;
    }
  }
) as any;

const adminSlide = createSlice({
  name: 'adminLogin',
  initialState,
  reducers: {
    clearAdminState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log('payload fullfill', payload);
      state.data = payload;
      state.isSuccess = true;
    });

    builder.addCase(adminLogin.rejected, (state) => {
      state.error = true;
    });
  }
});

export const { clearAdminState } = adminSlide.actions;

export default adminSlide.reducer;
