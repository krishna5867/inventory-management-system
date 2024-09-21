import { configureStore } from '@reduxjs/toolkit';
import bankDetailsReducer from './slice/bankDetailsSlice';

export const store = configureStore({
  reducer: {
    bankDetails: bankDetailsReducer,
  },
});

export default store;
