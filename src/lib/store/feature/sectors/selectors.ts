import { RootState } from "lib/store/AppStore";

export const selectSectors = (state: RootState) => state.sectorSlice.items;
export const sectorsFetchStatus = (state: RootState) => state.sectorSlice.fetchingStatus;