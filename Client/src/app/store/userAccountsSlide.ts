import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAccounts } from "../../model/userAccounts";
import agent from "../api/agent";

interface UserAccountsState {
  accounts: UserAccounts | null;
  status: string;
}

const initialState: UserAccountsState = {
  accounts: null,
  status: "idle",
};

export const getAllAccountsAsync = createAsyncThunk<UserAccounts>(
  "userAccounts/getAllAccounts",
  async (_, thunkAPI) => {
    try {
      const accounts = await agent.UserAccounts.getAllAccounts();
      return accounts;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "userAccounts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL USER ACCOUNTS
    builder.addCase(getAllAccountsAsync.pending, (state) => {
      state.status = "pendingGetAllAccounts";
    });
    builder.addCase(getAllAccountsAsync.fulfilled, (state, action) => {
      state.accounts = action.payload;
      state.status = "idle";
    });
    builder.addCase(getAllAccountsAsync.rejected, (state, action) => {
      console.log("action:", action.payload);
      state.status = "idle";
    });
  },
});

export const {} = accountSlice.actions;
