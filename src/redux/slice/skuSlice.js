import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSku = createAsyncThunk(
  'sku/fetchSku',
  async () => {
    const response = await fetch('/api/stock/sku');
    if (!response.ok) {
      throw new Error('Failed to fetch SKUs');
    }
    const data = await response.json();
    return data;
  }
);

const skuSlice = createSlice({
  name: 'sku',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSku.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSku.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; 
      })
      .addCase(fetchSku.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
});

export default skuSlice.reducer;
