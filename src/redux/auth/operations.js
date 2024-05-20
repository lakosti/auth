import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// react1001@mail.com
// react100@mail.com

//! token - унікальний ключ доступу до бекенду (ств при логіні)

axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common["Authorization"] = "";
// };

/*
 * POST @ /users/signup
 * body: { name, email, password }
 *
 * After successful registration, add the token to the HTTP header
 */
export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await axios.post("/users/signup", newUser);
    //? newUser - це об'єкт який збирає formik при реєстрації
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * POST @ /users/login
 * body: { email, password }
 *
 * After successful login, add the token to the HTTP header
 */
export const logIn = createAsyncThunk("auth/login", async () => {});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 *
 * After a successful logout, remove the token from the HTTP header
 */
export const logOut = createAsyncThunk("auth/logout", async () => {});
