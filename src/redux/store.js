import { configureStore } from '@reduxjs/toolkit';
import {
  bankDetailsReducer,
  skuReducer,
  salesReducer,
  stockReducer,
  purchasesReducer,
  warehouseLocationReducer,
} from './slice';

export const store = configureStore({
  reducer: {
    bankDetails: bankDetailsReducer,
    sku: skuReducer,
    sales: salesReducer,
    stocks: stockReducer,
    purchases: purchasesReducer,
    warehouseLocation: warehouseLocationReducer,
  },
});

export default store;
