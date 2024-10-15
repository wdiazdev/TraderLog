import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TradeAccount } from "../../model/tradeAccounts"
import agent from "../api/agent"

interface TradeAccountsState {
  accounts: TradeAccount[] | null
  status: string
}

const initialState: TradeAccountsState = {
  accounts: null,
  status: "idle",
}

export const fetchTradeAccountsAsync = createAsyncThunk<TradeAccount[]>(
  "tradeAccounts/fetchTradeAccounts",
  async (_, thunkAPI) => {
    try {
      const accounts = await agent.TradeAccounts.getAllAccounts()
      return accounts
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const createTradeAccountAsync = createAsyncThunk<
  TradeAccount[],
  { nickname?: string; createdDate?: string; initialBalance?: number }
>("tradeAccounts/createTradeAccount", async (values, thunkAPI) => {
  try {
    const newAccount = await agent.TradeAccounts.createAccount(values)
    return newAccount
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const updateTradeAccountAsync = createAsyncThunk<
  TradeAccount[],
  { id: number; nickname: string }
>("tradeAccounts/updateTradeAccount", async (values, thunkAPI) => {
  try {
    const updatedAccount = await agent.TradeAccounts.updateAccount(values)
    return updatedAccount
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteTradeAccountAsync = createAsyncThunk<void, { accountId: number }>(
  "tradeAccounts/deleteTradeAccount",
  async ({ accountId }, thunkAPI) => {
    try {
      await agent.TradeAccounts.deleteAccount(accountId)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const tradeAccountSlice = createSlice({
  name: "tradeAccounts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL TRADE ACCOUNTS
    builder.addCase(fetchTradeAccountsAsync.pending, (state) => {
      state.status = "pendingFetchTradeAccounts"
    })
    builder.addCase(fetchTradeAccountsAsync.fulfilled, (state, action) => {
      state.accounts = action.payload
      state.status = "idle"
    })
    builder.addCase(fetchTradeAccountsAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.status = "idle"
    })
    //CREATE TRADE ACCOUNT
    builder.addCase(createTradeAccountAsync.pending, (state) => {
      state.status = "pendingCreateTradeAccount"
    })
    builder.addCase(createTradeAccountAsync.fulfilled, (state, action) => {
      state.accounts = action.payload
      state.status = "idle"
    })
    builder.addCase(createTradeAccountAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.status = "idle"
    })
    //UPDATE TRADE ACCOUNT
    builder.addCase(updateTradeAccountAsync.pending, (state) => {
      state.status = "pendingUpdateTradeAccount"
    })
    builder.addCase(updateTradeAccountAsync.fulfilled, (state, action) => {
      state.accounts = action.payload
      state.status = "idle"
    })
    builder.addCase(updateTradeAccountAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.status = "idle"
    })
  },
})

// export const {} = tradeAccountSlice.actions;
