import { configureStore } from '@reduxjs/toolkit';
import { bankDetailsReducer, skuReducer } from './slice';

export const store = configureStore({
  reducer: {
    bankDetails: bankDetailsReducer,
    sku: skuReducer,
  },
});

export default store;
