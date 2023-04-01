import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  name: "",
  role: "",
  img: "",
  signIn: false,
};

export const userStore = createSlice({
  name: "userReducer",
  initialState: initialUser,
  reducers: {
    updateUser: (state, action) => {
      console.log(action);
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
        img: action.payload.img,
        signIn: true,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        name: "",
        role: "",
        img: "",
        signIn: false,
      };
    },
  },
});

// const initialSelected = {
//   id: "",
// };

// export const selectedView = createSlice({
//   name: "selectedReducer",
//   initialState: initialSelected,
//   reducers: {
//     selectedeUser: (state, action) => {
//       return {
//         ...state,
//         id: action.payload.id,
//       };
//     },
//     unSelected: (state) => {
//       return {
//         ...state,
//         name: "",
//         role: "",
//         signIn: false,
//       };
//     },
//   },
// });
