import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/auth/operations";
import { selectRefreshing } from "../redux/auth/selectors";
import RestrictedRoute from "../components/RestrictedRoute";
import PrivateRoute from "../components/PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));

export default function App() {
  //*найпершим монтується app тому саме тут ми кидаємо запит на оновлення користувача (збереження у storage)

  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user please wait...</b>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegisterPage />} redirectTo="/tasks" />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/tasks" />}
          />
          <Route
            path="/tasks"
            element={<PrivateRoute component={<TasksPage />} redirectTo="/" />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
