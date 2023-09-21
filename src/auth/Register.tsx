import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../Utilities/DisplayErrors";
import { userCredentials, userDTO } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
import { saveProfile } from "../Profile/HandleProfile";
import { axiosBase } from "./AuthFunctions";
import axios from "axios";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      console.log(credentials);
      const userCredentials = {
        Email: credentials.email,
        Password: credentials.password,
      };

      // const response = await sendCredentials(credentials, "register");
      const response = (
        await axiosBase.post<{ token: string; user: userDTO }>(
          `register`,
          userCredentials
        )
      ).data;
      console.log(response);
      saveToken(response.token);
      update(getClaims());
      saveProfile(response.user.id, response.user.email);

      if (response) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["The name is already taken"]);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
        submitButtonName="Register"
      />
    </>
  );
}
