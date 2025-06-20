import { ProductService } from '@/core/service/product.service';
import { productQuery } from '@/core/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const productService = new ProductService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
};

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (query?: productQuery) => {
    console.log('query', query);
    try {
      const res = await productService.getProducts(query);
      return res;
    } catch (error) {
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductList: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state: any, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { clearProductList } = productsSlice.actions;

export default productsSlice.reducer;
