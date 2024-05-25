import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refresh, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false, //* контролює чи оновлюються дані користувача чи ні (контролює рендер додатку (мигає інтерфейс)) коли рефреш тру тільки тоді рендеримо інфо про користувача
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        //* повністью перезаписуємо об'єкт user який ми отримуємо від бекенда у розділі payload і токен
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true; //* людина залогінена
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        //*коли розлогінений скидаємо дані (повертаємо все в інішиал стейт)
        state.user = {
          name: null,
          email: null,
        };
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true; //* щось по типу прелодінга
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload; //* записуємо у юзера об'єкт нового юзера
        state.isLoggedIn = true;
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;

//*по факту операція реєстрації та логування дуже схожі, різниця в тому що в першому ми ств нового юзера а в другій ми цього юзера шукаємо на беці та повертаємо інформацію про нього

//!щоб видалити профіль користувача - на кнопку вішаємо пост запит, додаємо токен і видаляємо з бази даних і скидаємо стейт до початкового

//!редіректи -- логіка перенаправлення користувача (наприклад - після логіну кудись перекидає)
