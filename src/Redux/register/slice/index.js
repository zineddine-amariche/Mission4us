import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../service";

const initialState = {
  user: [],
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "signup/signupUser",
  async (object, thunkAPI) => {
    const { obj, onErrorAction, onSuccesAction } = object;
    try {
      let res = await registerService.api(obj);
      if (res.status == 201) {
        onSuccesAction();
        return res.data;
      } else {
        onErrorAction();
      }
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      onErrorAction();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // register
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
