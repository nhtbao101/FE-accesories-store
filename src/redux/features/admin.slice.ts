import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthService } from '@/core/service/auth.service';
import { LoginData } from '@/core/interface/auth';
import { getLS, removeLS } from '@/core/helpers/storageHelper';

const auth = new AuthService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  token: getLS('token') || null,
  data: getLS('adminInfo') ? JSON.parse(getLS('adminInfo') as string) : null,
  error: null
};

export interface User {
  id: string;
  name: string;
  token: string;
}

export const adminLogin = createAsyncThunk(
  'authSlide/adminLogin',
  async (account: LoginData, { rejectWithValue }) => {
    try {
      const res = await auth.AdminSignIn(account);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || error.response.data.message[0]
      );
    }
  }
);

const adminSlice = createSlice({
  name: 'adminLogin',
  initialState,
  reducers: {
    clearAdminState: () => initialState,
    logoutUser: () => {
      removeLS('adminInfo');
      removeLS('token');
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(adminLogin.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.data = payload.admin;
      state.token = payload.token;
      state.isSuccess = true;
      state.error = null;
      removeLS('userInfo');
    });

    builder.addCase(adminLogin.rejected, (state: any, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export const { clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;
