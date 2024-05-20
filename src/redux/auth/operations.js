import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// react1001@mail.com
// react100@mail.com

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
// export const register =

/*
 * POST @ /users/login
 * body: { email, password }
 *
 * After successful login, add the token to the HTTP header
 */
// export const logIn =

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 *
 * After a successful logout, remove the token from the HTTP header
 */
// export const logOut =
