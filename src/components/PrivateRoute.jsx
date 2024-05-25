//! КОЛИ РОЗЛОГІНЮЄМОСЬ

//? ВСЕ ОКРІМ ЛОГІНА І РЕЄСТРАЦІЯ - ПРИВАТНЕ
//* коли користувач увійшов у систему відобразити компонент у іншому випадку відобразити navigate для перенаправлення

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //   return isLoggedIn ? "сторінка" :"редірект";
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
