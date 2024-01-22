import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {

    isAuthenticated: false,
    token: null,
    refreshToken:null
}
 

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      // localStorage.removeItem("bearer-token");
      // localStorage.removeItem("refresh-token");
      // localStorage.removeItem("expires_in");
      // localStorage.removeItem("user");
      // localStorage.removeItem("persist:root");
    },
    loginSucces: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.bearertoken;
        state.refreshToken = action.payload.refreshtoken;
        
      },
  },
});

export const { logout ,loginSucces} = logoutSlice.actions;
export default logoutSlice.reducer;
