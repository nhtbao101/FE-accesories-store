import { ProductService } from '@/core/service/product.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const product = new ProductService();

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
};

export const getProduct = createAsyncThunk(
  'product/getProductById',
  async (slug: string) => {
    try {
      const res = await product.getProduct(slug);
      console.log('res', res);
      return res;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductList: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { clearProductList } = productSlice.actions;

export default productSlice.reducer;
