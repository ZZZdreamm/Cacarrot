import { userCredentials } from "./auth.models";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import Button from "../Utilities/Button";
import { Link } from "react-router-dom";
import ImageField from "../Forms/ImageField";
import ImageContainer from "../Forms/ImageContainer";
import { useFormik } from "formik";
import { basicSchema } from "./Schemas";
// import { Form, Formik, FormikHelpers } from "formik";

export default function AuthForm(props: authFormProps, ifRegister: boolean) {
  const { render, imageURL, imageBase64, fileToData } = ImageField({
    displayName: "",
    imageURL: "",
    field: "",
  });
  //@ts-ignore
  const onSubmit = (values, actions) => {
      props.onSubmit(values)
  }
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:basicSchema,
    onSubmit
  });
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        style={{ textAlign: "left" }}
        className="my-input"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        type="email"
        placeholder="Enter your email"
      />
      {touched.email &&  errors.email && <div className="error">{errors.email}</div>}
      <label htmlFor="password">Password</label>
      <input
        style={{ textAlign: "left" }}
        className="my-input"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        type="password"
        placeholder="Enter your password"
      />
      {touched.password && errors.password && <div className="error">{errors.password}</div>}
      <button type="submit">Submit</button>
    </form>
    // <Formik
    //   initialValues={props.model}
    //   onSubmit={props.onSubmit}
    //   validationSchema={Yup.object({
    //     email: Yup.string()
    //       .required("This is required")
    //       .email("You have to insert a valid email"),
    //     password: Yup.string()
    //       .required("This is required")
    //       .uppercase("Must be at least 1 uppercase letter")
    //       .test("has-number", "Must have at least 1 number", (value:any) => {
    //         if (!value) return false;
    //         return /\d/.test(value);
    //       })
    //       .test("has-symbol", "Must have at least 1 symbol", (value:any) => {
    //         if (!value) return false;
    //         return /[!@#$%^&*]/.test(value);
    //       }),
    //   })}
    // >
    //   {(formikProps:any) => (
    //     <Form>
    //       <TextField field="email" displayName="Email" />
    //       <TextField field="password" displayName="Password" type="password" />

    //       <button
    //         className="log-button"
    //         disabled={formikProps.isSubmitting}
    //         type="submit"
    //       >
    //         {props.submitButtonName}
    //       </button>
    //       <Link
    //         style={{ position: "relative", left: "20px" }}
    //         className="log-button remove-anchor-effects"
    //         to="/"
    //       >
    //         Cancel
    //       </Link>
    //     </Form>
    //   )}
    // </Formik>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(
    values: userCredentials
    // actions: FormikHelpers<userCredentials>
  ): void;
  submitButtonName: string;
}
