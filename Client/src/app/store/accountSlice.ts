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
      const userDto = await agent.Account.login(data)
      const { user } = userDto
      localStorage.setItem("user", JSON.stringify(user))
      return user
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
      const userDto = await agent.Account.currentUser()
      const { user } = userDto
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
    builder.addCase(fetchCurrentUserAsync.pending, (state) => {
      state.status = "pendingFetchCurrentUser"
    })
    builder.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
      state.user = null
      localStorage.removeItem("user")
      toast.error("Your session has expired. Please log in again to continue.")
      router.navigate("/login")
    })
  },
})

export const { signOut, setUser } = accountSlice.actions
