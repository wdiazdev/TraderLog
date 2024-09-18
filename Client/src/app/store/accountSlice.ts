import agent from "../api/agent"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../model/account"
import { FieldValues } from "react-hook-form"
import { router } from "../router/Routes"
import { toast } from "react-toastify"

interface AccountState {
  user: User | null
  status: string
}

const initialState: AccountState = {
  user: null,
  status: "idle",
}

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const registerUserAsync = createAsyncThunk<void, FieldValues>(
  "account/registerUser",
  async (data, thunkAPI) => {
    try {
      await agent.Account.register(data)
      return
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const fetchCurrentUserAsync = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
    try {
      const user = await agent.Account.currentUser()
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false
    },
  },
)

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      localStorage.removeItem("user")
      router.navigate("/")
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    // SIGN IN
    builder.addCase(signInUserAsync.pending, (state) => {
      state.status = "pendingSignInUser"
    })
    builder.addCase(signInUserAsync.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = "idle"
    })
    builder.addCase(signInUserAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.status = "idle"
    })
    // CURRENT USER
    builder.addCase(fetchCurrentUserAsync.pending, (state) => {
      state.status = "pendingFetchCurrentUser"
    })
    builder.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = "idle"
    })
    builder.addCase(fetchCurrentUserAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.user = null
      state.status = "idle"
      localStorage.removeItem("user")
      toast.error("Your session has expired. Please log in again to continue.")
      router.navigate("/login")
    })
    // REGISTER
    builder.addCase(registerUserAsync.pending, (state) => {
      state.status = "pendingRegisterUser"
    })
    builder.addCase(registerUserAsync.fulfilled, (state) => {
      state.status = "idle"
    })
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      console.log("action:", action.payload)
      state.status = "idle"
    })
  },
})

export const { signOut, setUser } = accountSlice.actions
