import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  info: [],
  xsrfToken:null,
  loading: false,
  error: null,
  
};

const getXSRFToken=()=> {
    return Cookies.get('XSRF-TOKEN');
  }

export const fetchAccountInfo = createAsyncThunk(
  'accountInfo',
  async () => {
   
    const url='http://api.mission4us.com/api/auth-info';
    const response = await axios.get(url);
    // console.log(response,'info account')
    return response.data;
    
  }
);

const infoAccountSlice = createSlice({
  name: 'infoAccount',
  initialState,
  reducers: {
    getxsrfToken:(state,action)=>{
        state.xsrfToken=getXSRFToken()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {getxsrfToken}=infoAccountSlice.actions
export default infoAccountSlice.reducer;
