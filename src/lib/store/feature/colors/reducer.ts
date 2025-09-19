import { createSlice } from '@reduxjs/toolkit';

import { fetchColors } from './actions';
import { ColorData } from 'types/picker.type';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IColorsSliceState {
  items: ColorData[];
  fetchingStatus: RequestStatus;
}

const initialState: IColorsSliceState = {
  items: [],
  fetchingStatus: 'idle'
};

export const colorsSlice = createSlice({
  name: 'colorsSlice',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.fetchingStatus = 'loading';
        state.items = [];
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.items = action.payload;
        state.fetchingStatus = 'succeeded';
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.fetchingStatus = 'failed';
        state.items = [];
      });
  },
});

// export const {  } = colorsSlice.actions;

export default colorsSlice.reducer;