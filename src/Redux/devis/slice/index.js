import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  devis: [],
  status: 'idle',
  error: null,
  
};

export const fetchDevis = createAsyncThunk(
  'devis/fetchDevis',
  async () => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/quotes';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
   
    // console.log(response,'devis response')
    return response.data;
    
  }
);

export const addDevis = createAsyncThunk(
  'devis/addDevis',
  async (values) => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/quotes';
    const response = await axios.post(url,values ,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
   
    // console.log(response,'create devis response')
    return response.data;
    
  }
);

const deviSlice = createSlice({
  name: 'devis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevis.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDevis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devis = action.payload;
      })
      .addCase(fetchDevis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDevis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devis.push(action.payload);
      })

  },
});

export default deviSlice.reducer;
