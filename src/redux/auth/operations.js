import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// michael@gmail.com
// erfpelfwelf@gmail.com

//! token - унікальний ключ доступу до бекенду (ств при логіні)
//? createAsyncThunk -- повертає проміс

axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

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

    setAuthHeader(response.data.token);

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
export const logIn = createAsyncThunk("auth/login", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", userInfo);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 *
 * After a successful logout, remove the token from the HTTP header
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    //? оскільки ми нічого не повертаємо то не потрібно і ств змінну
    await axios.post("/users/logout");
    //? коли розлогінились то видаляємо токен
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//*для виходу користувача необхідний токен який ми добуваємо після успішного запиту
//* цей токен додається до всіх наступних запитів (logout, etc...) але тільки тоді коли у нас успішна реєстрація або логін
