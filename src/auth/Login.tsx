import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../apiPaths";
// import { getProfile, saveProfile } from "../Profile/HandleProfile";
// import { profileDTO } from "../Profile/profiles.models";
import DisplayErrors from "../Utilities/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
import { profileDTO } from "../Profile/profiles.models";
import { getProfile, saveProfile } from "../Profile/HandleProfile";
import ProfileContext from "../Profile/ProfileContext";
import { loginInDB } from "../FirebaseDatabase/LoginInDB";
import { sendCredentials } from "./AuthFunctions";
// import ProfileContext from "../Profile/ProfileContext";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { claims, update } = useContext(AuthenticationContext);
  const { updateProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentials) {
    console.log(credentials);
    try {
      setErrors([]);
      const response = await sendCredentials(credentials, "login")
      saveToken(response.token);
      update(getClaims());
      saveProfile(response.user.id, response.user.email)
      if(response){
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["Your login or password was wrong!"]);
    }
  }
  return (
    <>
      <h3 style={{ fontSize: "3em" }}>Login</h3>
      {/* <DisplayErrors errors={errors} /> */}
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await login(values)}
        submitButtonName="Login"
      />
      <span style={{ color: "red" }}>{errors}</span>
    </>
  );
}
