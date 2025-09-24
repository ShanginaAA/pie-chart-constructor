import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SectorData } from 'types/sector.type';
import { RootState } from 'lib/store/AppStore';

export const fetchSectors = createAsyncThunk<SectorData[]>(
  'sectors/fetchSectors',
  async (_, { rejectWithValue, getState }) => {
    const { data } = await axios.get<SectorData[]>(
      `https://68ccf6f9da4697a7f3042dc3.mockapi.io/api/v1/sectors`,
    );
    return data;
  },
);

export const createSector = createAsyncThunk<SectorData, any, { state: RootState }>(
  'sectors/createSector',
  async (payload, { rejectWithValue, getState }) => {
    return await axios
      .post<SectorData>(`https://68ccf6f9da4697a7f3042dc3.mockapi.io/api/v1/sectors`, payload)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

export const editSector = createAsyncThunk<SectorData, any, { state: RootState }>(
  'sectors/editSector',
  async (payload, { rejectWithValue, getState }) => {
    return await axios
      .put<SectorData>(
        `https://68ccf6f9da4697a7f3042dc3.mockapi.io/api/v1/sectors/${payload.sectorId}`,
        payload.data,
      )
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

export const deleteSector = createAsyncThunk<any, string, { state: RootState }>(
  'sectors/deleteSector',
  async (id, { rejectWithValue, getState }) => {
    return await axios
      .delete(`https://68ccf6f9da4697a7f3042dc3.mockapi.io/api/v1/sectors/${id}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);
