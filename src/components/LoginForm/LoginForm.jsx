import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    actions.resetForm();
    dispatch(logIn(values))
      .unwrap()
      .then((resp) => {
        console.log(resp);
        toast.success("Successfully logged in");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Incorrect email or password");
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
}

//*  dispatch(logIn(values)); // дані юзера шукаються і порівняються з тими що є на бек
//*  dispatch(logIn(values)).unwrap();  --- розпаковка діспатча( вона нам повертає проміс який ми можемо обробити (проміс який нам повертає операція logIn (відповідь від бека))
