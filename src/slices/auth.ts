import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "@/services/auth-service";

export const login = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response: AuthState = await authService.login(
        user.email,
        user.password
      );

      if (response.jwt) {
        return thunkAPI.fulfillWithValue({ ...response });
      }
      return thunkAPI.rejectWithValue(false);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(false);
    }
  }
);

const initialState = {} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut(_state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (_state: AuthState, action: PayloadAction<AuthState>) => {
        const user = action.payload;
        return user;
      }
    );
    builder.addCase(
      login.rejected,
      (_state: AuthState, _action: PayloadAction<any>) => {
        return initialState;
      }
    );
  },
});

const { reducer } = authSlice;

export const { logOut } = authSlice.actions;

export default reducer;
