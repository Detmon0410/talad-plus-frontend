import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  name: "",
  role: "",
  signIn: false,
};

export const userStore = createSlice({
  name: "userReducer",
  initialState: initialUser,
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
        signIn: true,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        name: "",
        role: "",
        signIn: false,
      };
    },
  },
});
