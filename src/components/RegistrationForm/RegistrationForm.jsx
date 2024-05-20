import { Formik, Form, Field } from "formik";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  return (
    <Formik
      initialValues={{
        name: "", // таке саме значення пишемо і в name
        email: "", // таке саме значення пишемо і в name
        password: "", // таке саме значення пишемо і в name
      }}
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
