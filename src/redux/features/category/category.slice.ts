import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiService } from '@/core/service/api.service';
import { ENDPOINT } from '@/config/endpoint';
import { ICategory } from '@/core/interface/category';
import { defaultInitialState } from '@/constant';

const api = new ApiService();

export const getCategory = createAsyncThunk(
  'manage/getCategory',
  async (_, { rejectWithValue }) => {
    try {
      return (await api.get([ENDPOINT.category.index])) as ICategory[];
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || error.response.data.message[0]
      );
    }
  }
);

const categorySlice = createSlice({
  name: 'getCategory',
  initialState: defaultInitialState,
  reducers: {
    clearCategoryState: () => defaultInitialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      // console.log('get category pending');
      state.isLoading = true;
    });

    builder.addCase(getCategory.fulfilled, (state, { payload }: any) => {
      // console.log('get category fulfill');
      state.isLoading = false;
      state.data = payload;
      state.isSuccess = true;
      state.error = null;
    });

    builder.addCase(getCategory.rejected, (state: any, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
