import { initProcessState } from '@/core/interface/redux';
import { ProductService } from '@/core/service/product.service';
import { Product } from '@/core/types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const product = new ProductService();

const initialState = {
  detail: {
    isLoading: false,
    isSuccess: false,
    data: null,
    error: null
  },
  add: initProcessState,
  update: initProcessState
};

export const getProduct = createAsyncThunk(
  'product/getProductById',
  async (slug: string) => {
    try {
      const res = await product.getProduct(slug);
      // console.log('res', res);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data: Product, { rejectWithValue }) => {
    try {
      const res = await product.createProduct(data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data: { id: number; body: Product }, { rejectWithValue }) => {
    try {
      const res = await product.updateProduct(data.id, data.body);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (data: { id: number; body: Product }, { rejectWithValue }) => {
    try {
      const res = await product.deleteProduct(data.id);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductList: () => initialState,
    clearAddProduct: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        console.log('get product pending');
        state.detail.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state: any, { payload }) => {
        console.log('get product fulfill');
        state.detail.data = payload;
        state.detail.isSuccess = true;
        state.detail.isLoading = false;
      })
      .addCase(getProduct.rejected, (state: any, { payload }) => {
        state.detail.isLoading = false;
        state.detail.error = payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.add.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.add.isSuccess = true;
        state.add.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, { payload }: any) => {
        state.add.isLoading = false;
        state.add.error = payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.update.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.update.isSuccess = true;
        state.update.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, { payload }: any) => {
        state.update.isLoading = false;
        state.update.error = payload.message;
      });
  }
});

export const { clearProductList, clearAddProduct } = productSlice.actions;

export default productSlice.reducer;
