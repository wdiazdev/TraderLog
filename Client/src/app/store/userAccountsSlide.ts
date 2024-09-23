import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TradeAccounts } from "../../model/tradeAccounts";
import agent from "../api/agent";

interface TradeAccountsState {
  accounts: TradeAccounts[] | null;
  status: string;
}

const initialState: TradeAccountsState = {
  accounts: null,
  status: "idle",
};

export const fetchTradeAccountsAsync = createAsyncThunk<TradeAccounts[]>(
  "tradeAccounts/fetchTradeAccounts",
  async (_, thunkAPI) => {
    try {
      const accounts = await agent.TradeAccounts.getAllAccounts();
      return accounts;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const tradeAccountSlice = createSlice({
  name: "tradeAccounts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL USER ACCOUNTS
    builder.addCase(fetchTradeAccountsAsync.pending, (state) => {
      state.status = "pendingFetchTradeAccounts";
    });
    builder.addCase(fetchTradeAccountsAsync.fulfilled, (state, action) => {
      state.accounts = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchTradeAccountsAsync.rejected, (state, action) => {
      console.log("action:", action.payload);
      state.status = "idle";
    });
  },
});

// export const {} = tradeAccountSlice.actions;
