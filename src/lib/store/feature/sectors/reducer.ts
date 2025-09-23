import { createSlice } from '@reduxjs/toolkit';

import { fetchSectors } from './actions';
import { SectorData } from 'types/sector.type';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IColorsSliceState {
  items: SectorData[];
  fetchingStatus: RequestStatus;
}

const initialState: IColorsSliceState = {
  items: [],
  fetchingStatus: 'idle',
};

export const sectorSlice = createSlice({
  name: 'sectorSlice',
  initialState,
  reducers: {
    addSector: (state, { payload }) => {
      if (payload) {
        state.items = [...state.items, payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.fetchingStatus = 'loading';
        state.items = [];
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.items = action.payload;
        state.fetchingStatus = 'succeeded';
      })
      .addCase(fetchSectors.rejected, (state, action) => {
        state.fetchingStatus = 'failed';
        state.items = [];
      });
  },
});

export const { addSector } = sectorSlice.actions;

export default sectorSlice.reducer;
