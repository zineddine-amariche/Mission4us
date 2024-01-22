import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
  
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
   

    const token = localStorage.getItem("bearer-token");
    const url='https://api.mission4us.com/api/jobs';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",   
      },
    });
   
    // console.log(response,'jobs response')
    return response.data;
    
  }
);

export const fetchJob = createAsyncThunk(
    'jobs/fetchJob',
    async (id) => {
     
  
      const token = localStorage.getItem("bearer-token");
      const url=`https://api.mission4us.com/api/jobs/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",   
        },
      });
     
      // console.log(response,'job response')
      return response.data;
      
    }
  );

export const addJob = createAsyncThunk(
    'jobs/addJob',
    async (values) => {
     
  
      const token = localStorage.getItem("bearer-token");
      const url='https://api.mission4us.com/api/jobs';
      const response = await axios.post(url,values, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      },);
     
      // console.log(response,'create job response')
      return response.data;
      
    }
  );

  export const updateJob = createAsyncThunk(
    'jobs/updateJob',
    async (id,values) => {
     
  // console.log(id,'idslice')
  // console.log(values,'valuesslice')
      const token = localStorage.getItem("bearer-token");
      const url=`https://api.mission4us.com/api/jobs/${id}`;
      const response = await axios.put(url,values, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      },);
     
      // console.log(response,'create job response')
      return response.data;
      
    }
  );

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id) => {
   

    const token = localStorage.getItem("bearer-token");
    const url=`https://api.mission4us.com/api/jobs/${id}`;
    
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",   
      },
    });
   
    // console.log(id,'delete job')
    return id;
    
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.push(action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const jobIndex = state.jobs.findIndex(job => job.id === action.payload.id);
        if (jobIndex !== -1) {
          state.jobs[jobIndex] = action.payload;
        }
      })
     .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
      });
  },
});

export default jobSlice.reducer;
