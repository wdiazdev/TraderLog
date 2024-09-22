import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./accountSlice";
import { tradeAccountSlice } from "./userAccountsSlide";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    tradeAccounts: tradeAccountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
