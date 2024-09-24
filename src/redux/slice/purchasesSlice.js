import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPurchases = createAsyncThunk(
  'purchases/fetchPurchases',
  async () => {
    const response = await fetch('/api/purchases');
    const data = await response.json();
    return data;
  }
);

const salesSlice = createSlice({
  name: 'purchases',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
