import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "lib/store/AppStore";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;