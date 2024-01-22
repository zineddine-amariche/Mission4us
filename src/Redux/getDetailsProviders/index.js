import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DetailsProvidersService from "./service";

export const getDetailsProviders = createAsyncThunk(
  "DetailsProvider/post",
  async (object, thunkAPI) => {
    const token = localStorage.getItem("bearer-token");
    const { obj, onErrorAction, onSuccesAction } = object;
    try {
      let res = await DetailsProvidersService.api(obj, token);
      if (res.status == 200) {
        onSuccesAction("get Details Providers successfully");
        return res.data;
      } else {
        onErrorAction();
      }
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      onErrorAction(message || "get Details Providers failed");

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const DetailsProvidersSlice = createSlice({
  name: "DetailsProviders",
  initialState: {
    info: null,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetCreateCv: (state) => {
      state.isLoading = false;
      state.info = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDetailsProviders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailsProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(getDetailsProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.info = null;
      });
  },
});

export const { resetCreateCv } = DetailsProvidersSlice.actions;
export default DetailsProvidersSlice.reducer;
