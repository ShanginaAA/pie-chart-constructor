import { RootState } from "lib/store/AppStore";

export const selectColors = (state: RootState) => state.colorsSlice.items;
export const colorsFetchStatus = (state: RootState) => state.colorsSlice.fetchingStatus;