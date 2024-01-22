import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  providers: [],
  status: 'idle',
  error: null,
  
};

export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async () => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/providers';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
   
    // console.log(response,'providers response')
    return response.data;
    
  }
);

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default providerSlice.reducer;
