import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getxsrfToken } from '../../infoAccount/slice';
import { useSelector, useDispatch } from "react-redux";

const initialState = {
    missions: [],
  status: 'idle',
  error: null,
  
};

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
   

    const token = localStorage.getItem("bearer-token");

    const url='https://api.mission4us.com/api/missions';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // 'X-XSRF-TOKEN': getxsrfToken,
        
        
      },
    });
   
    // console.log(response,'missions response')
    return response.data;
    
  }
);

export const deleteMission = createAsyncThunk(
  'missions/deleteMission',
  async (id) => {
   

    const token = localStorage.getItem("bearer-token");
    const url=`https://api.mission4us.com/api/missions/${id}`;
   
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",   
      },
    });
   
    // console.log(id,'delete mission')
    return id;
    
  }
);

export const addMission = createAsyncThunk(
  'devis/addMission',
  async (values) => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/missions';
    const response = await axios.post(url,values ,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
   
    // console.log(response,'create mission response')
    return response.data;
    
  }
);

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteMission.fulfilled, (state, action) => {
        state.missions = state.missions.filter(mission => mission.id !== action.payload);
      })
      .addCase(addMission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions.push(action.payload);
      })
      ;
  },
});

export default missionSlice.reducer;
