import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cartSlice';
import compareSlice from './features/compareSlice';
import productModalSlice from './features/productModalSlice';
import shopFilterSlice from './features/shop-filter-slice';
import wishlistSlice from './features/wishlist-slice';
import couponSlice from './features/coupon/couponSlice';
import orderSlice from './features/order/orderSlice';
import productsSlice from './features/product/products.slice';
import productSlice from './features/product/product.slice';
import userSlice from './features/auth.slice';

const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice,
      productModal: productModalSlice,
      shopFilter: shopFilterSlice,
      cart: cartSlice,
      wishlist: wishlistSlice,
      compare: compareSlice,
      coupon: couponSlice,
      order: orderSlice,
      products: productsSlice,
      product: productSlice,
      user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default makeStore;
