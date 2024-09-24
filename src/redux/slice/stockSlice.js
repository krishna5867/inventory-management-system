import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStock = createAsyncThunk('stocks/fetchStock', async () => {
  const response = await fetch('/api/stock');
  const data = await response.json();
  return data;
});

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
