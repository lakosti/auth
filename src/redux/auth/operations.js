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

//* GET /users/me
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      //* thunkAPI.getState -- отримуємо посилання на весь стан у редаксі і звідти у auth беремо token який появився там при монтуванні (логіна)
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;

      //*будь який запит на бекенд буде тепер відправлятися із нашим збереженим токеном і якщо він валідний то будуть підгружитися дані за користувача при перезавантаженні
      setAuthHeader(savedToken);

      const response = await axios.get("/users/me");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;

      //*якщо є бережений токен - то запускай операції (оскільки коли ми розлогінились токін уже не валідний, і нам не потрібно при перезавантаженні грузити цього юзера, бо він вийшов)
      return savedToken !== null;
    },
  }
);

//*для виходу користувача необхідний токен який ми добуваємо після успішного запиту
//* цей токен додається до всіх наступних запитів (logout, etc...) але тільки тоді коли у нас успішна реєстрація або логін
//*для того щоб зберегти користувача при перезавантеженні чи робимо refresh запит за збереженим токеном

//*{condition ()=>{}} -- об'єкт налаштувань -- за якої умови запускаєтсья запит (якщо вона повертає true - запит іде, якщо false - запита немає)
