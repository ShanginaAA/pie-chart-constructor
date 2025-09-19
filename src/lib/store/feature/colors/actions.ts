import { createAsyncThunk } from '@reduxjs/toolkit';
import { COLORS } from 'data/colors';
import { ColorData } from 'types/picker.type';

export const fetchColors = createAsyncThunk<ColorData[]>(
  'colors/fetchColors',
  async (_, { rejectWithValue, getState }) => {
    return await COLORS
  },
);