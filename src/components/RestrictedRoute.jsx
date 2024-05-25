//! КОЛИ ЛОГІНИМОСЬ

//* Якщо користувач увійшов у систему (isLoggedIn = true) відобразити <Navigate> для перенаправлення
//* В іншому випадку відобразити компонент
//* редірект -- напрямок куди переходити

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //   return isLoggedIn ? "редірект" : "сторінка";
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
