import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiService } from '@/core/service/api.service';
import { ENDPOINT } from '@/config/endpoint';
import { ICategory } from '@/core/interface/category';

const api = new ApiService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
};

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
  initialState,
  reducers: {
    clearCategoryState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategory.fulfilled, (state, { payload }: any) => {
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
