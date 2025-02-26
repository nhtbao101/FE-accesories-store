import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthService } from '@/core/service/auth.service';
import { LoginData } from '@/core/interface/auth';
import { getLS, removeLS } from '@/core/helpers/storageHelper';

const auth = new AuthService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  token: getLS('token') || null,
  data: getLS('userInfo') ? JSON.parse(getLS('userInfo') as string) : null,
  error: null
};

export interface User {
  id: string;
  name: string;
  token: string;
}

export const userLogin = createAsyncThunk(
  'authSlide/userLogin',
  async (account: LoginData, { rejectWithValue }) => {
    try {
      const res = await auth.UserSignIn(account);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    clearUserState: () => initialState,
    logoutUser: () => {
      removeLS('userInfo');
      removeLS('token');
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(userLogin.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.data = payload.user;
      state.token = payload.token;
      state.isSuccess = true;
      removeLS('adminInfo');
    });

    builder.addCase(userLogin.rejected, (state: any, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  }
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
