import { Formik, Form, Field } from "formik";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    // console.log(values); // об'єкт з даними з форми вводу (email/password/name) =  newUser (auth/operations)
    //? ЗАПУСКАЄМО ОПЕРАЦІЇ ДОДАВАННЯ ЛОГІНУ (DISPATCH)
    dispatch(register(values)); // дані юзера відправляються на бек
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: "", // таке саме значення пишемо і в name
        email: "", // таке саме значення пишемо і в name
        password: "", // таке саме значення пишемо і в name
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
