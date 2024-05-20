import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
  },
  extraReducers: (builder) =>
    builder.addCase(register.fulfilled, (state, action) => {
      //* повністью перезаписуємо об'єкт user який ми отримуємо від бекенда у розділі payload і токен
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true; //* людина залогінена
    }),
});

export default authSlice.reducer;
