import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBankDetails = createAsyncThunk(
  'bankDetails/fetchBankDetails',
  async () => {
    const response = await fetch('/api/purchases/addbank');
    const data = await response.json();
    return data;
  }
);

const bankDetailsSlice = createSlice({
  name: 'bankDetails',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bankDetailsSlice.reducer;
