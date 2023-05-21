// import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import Button from "../Utilities/Button";
import { Link } from "react-router-dom";
import ImageField from "../Forms/ImageField";
import ImageContainer from "../Forms/ImageContainer";
// import { Formik } from "formik/dist/Formik";
// import { Form } from "formik/dist/Form";
// import { FormikHelpers } from "formik/dist/types";
// import { Form, Formik, FormikHelpers } from "formik";


export default function AuthForm(props: authFormProps, ifRegister: boolean) {
  const { render, imageURL, imageBase64, fileToData } = ImageField({
    displayName: "",
    imageURL: "",
    field: "",
  });
  return (
    <></>
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
    values: userCredentials,
    // actions: FormikHelpers<userCredentials>
  ): void;
  submitButtonName: string;
}
