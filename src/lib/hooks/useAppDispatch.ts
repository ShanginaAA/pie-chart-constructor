import { useDispatch } from "react-redux";
import { AppDispatch } from "lib/store/AppStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();