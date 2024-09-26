import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWarehouseLocationDetails = createAsyncThunk(
  'bankDetails/fetchWarehouseLocationDetails',
  async () => {
    const response = await fetch('/api/purchases/addwarehouse');
    const data = await response.json();
    return data;
  }
);

const locationDetailsSlice = createSlice({
  name: 'locationDetails',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouseLocationDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWarehouseLocationDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWarehouseLocationDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default locationDetailsSlice.reducer;
