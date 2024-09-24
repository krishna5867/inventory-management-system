import { configureStore } from '@reduxjs/toolkit';
import { bankDetailsReducer, skuReducer, salesReducer, stockReducer, purchasesReducer } from './slice';

export const store = configureStore({
  reducer: {
    bankDetails: bankDetailsReducer,
    sku: skuReducer,
    sales: salesReducer,
    stocks: stockReducer,
    purchases: purchasesReducer
  },
});

export default store;
