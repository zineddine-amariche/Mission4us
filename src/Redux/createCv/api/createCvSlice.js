import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CreateCvService from "./service";

export const CreateCvApi = createAsyncThunk(
  "CreateCvApi/post",
  async (object, thunkAPI) => {
    const token = localStorage.getItem("bearer-token");
// 
    const {obj,onErrorAction,onSuccesAction}=object
    try {
     let res= await CreateCvService.api(obj,token);
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
      onErrorAction(message || "get Details Client failed");

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const CreateCvSlice = createSlice({
  name: "CreateCvApi",
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

      .addCase(CreateCvApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateCvApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(CreateCvApi.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.info = null;
      });
  },
});

export const { resetCreateCv } = CreateCvSlice.actions;
export default CreateCvSlice.reducer;
