import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DetailsClientService from "./service";

export const getDetailsClient = createAsyncThunk(
  "DetailsClient/post",
  async (object, thunkAPI) => {
    const token = localStorage.getItem("bearer-token");
    const {obj,onErrorAction,onSuccesAction}=object
    try {
     let res= await DetailsClientService.api(obj,token);
     if(res.status ==200){
       onSuccesAction()
        return res.data
     }else{
      onErrorAction()
     }

    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      onErrorAction(message || "failed geting details Cv client");


      return thunkAPI.rejectWithValue(message);
    }
  }
);

const DetailsClientSlice = createSlice({
  name: "DetailsClient",
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

      .addCase(getDetailsClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailsClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(getDetailsClient.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.info = null;
      });
  },
});

export const { resetCreateCv } = DetailsClientSlice.actions;
export default DetailsClientSlice.reducer;
