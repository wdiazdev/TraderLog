import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TradeAccount } from "../../model/tradeAccounts";
import agent from "../api/agent";

interface TradeAccountsState {
  accounts: TradeAccount[] | null;
  status: string;
}

const initialState: TradeAccountsState = {
  accounts: null,
  status: "idle",
};

export const fetchTradeAccountsAsync = createAsyncThunk<TradeAccount[]>(
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

export const deleteTradeAccountAsync = createAsyncThunk<
  void,
  { accountId: number }
>("tradeAccounts/deleteTradeAccount", async ({ accountId }, thunkAPI) => {
  try {
    await agent.TradeAccounts.deleteAccount(accountId);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const tradeAccountSlice = createSlice({
  name: "tradeAccounts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL TRADE ACCOUNTS
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
    // DELETE TRADE ACCOUNT
    builder.addCase(deleteTradeAccountAsync.pending, (state, action) => {
      state.status = "pendingDeleteTradeAccount" + action.meta.arg.accountId;
    });
    builder.addCase(deleteTradeAccountAsync.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(deleteTradeAccountAsync.rejected, (state, action) => {
      console.log("action:", action.payload);
      state.status = "idle";
    });
  },
});

// export const {} = tradeAccountSlice.actions;
