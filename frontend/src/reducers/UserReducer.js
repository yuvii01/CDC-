import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie"
const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    token:null
  },
  reducers: {
    login(currentState, { payload }) {
      currentState.data = payload.user;
      currentState.token = payload.token;
      // Cookies.set("token",payload.token );
      localStorage.setItem("user", JSON.stringify(currentState));
      // console.log(currentState.token)
    },
    logout(currentState) {
      currentState.data = null;
      localStorage.removeItem("user");
    },
    lsLogin(currentState) {
      const lsuser = localStorage.getItem("user");
      if (lsuser) {
        const user = JSON.parse(lsuser);
        currentState.data = user.data;
      }
    },
  },
});
export const {login,logout,lsLogin} = UserSlice.actions;
export default UserSlice.reducer;