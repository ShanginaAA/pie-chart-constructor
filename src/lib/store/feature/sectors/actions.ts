import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SectorData } from 'types/sector.type';

export const fetchSectors = createAsyncThunk<SectorData[]>(
  'sectors/fetchSectors',
  async (_, { rejectWithValue, getState }) => {
     const { data } = await axios.get<SectorData[]>(
      `https://68ccf6f9da4697a7f3042dc3.mockapi.io/api/v1/sectors`,
    );
    return data
  },
);