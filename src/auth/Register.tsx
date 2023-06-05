import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL, urlAccounts } from "../apiPaths";
import DisplayErrors from "../Utilities/DisplayErrors";

import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
import { getProfile, saveProfile } from "../Profile/HandleProfile";
import { profileDTO } from "../Profile/profiles.models";
import ProfileContext from "../Profile/ProfileContext";
import { registerInDb } from "../FirebaseDatabase/LoginInDB";
import { sendCredentials } from "./AuthFunctions";
// import { profileDTO } from "../Profile/profiles.models";
// import { getProfile, saveProfile } from "../Profile/HandleProfile";
// import ProfileContext from "../Profile/ProfileContext";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const {updateProfile} = useContext(ProfileContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentials) {
    console.log(credentials);
    try {
      setErrors([]);
      const response = await sendCredentials(credentials, "register")
      saveToken(response.token);
      update(getClaims());
      saveProfile(response.user.id, response.user.email)

      if(response){
        navigate("/");
        navigate(0);
      }
            // const profileResponse = await axios.post<profileDTO>(`${urlAccounts}/loginProfile/${credentials.email}`);
      // console.log(profileResponse)
      // saveProfile(profileResponse.data);
      // updateProfile(getProfile());

    } catch (error) {
      setErrors(['The name is already taken'])
    }
  }


  return (
    <>
      {/* <main className="wrapper">
        <section className="landing-page"> */}
          <h1>Register</h1>
          <DisplayErrors errors={errors} />
          <AuthForm
            model={{ email: "", password: "" }}
            onSubmit={async (values) => await register(values)}
            submitButtonName="Register"
          />
        {/* </section>
      </main> */}
    </>
  );
}
