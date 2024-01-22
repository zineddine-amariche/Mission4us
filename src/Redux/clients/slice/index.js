import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  clients: [],
  status: 'idle',
  error: null,
  
};

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/clients';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // 'X-XSRF-TOKEN': getxsrfToken,
        
        
      },
    });
   
    // console.log(response,'clients response')
    return response.data;
    
  }
);

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
