import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../apiPaths";
// import { getProfile, saveProfile } from "../Profile/HandleProfile";
// import { profileDTO } from "../Profile/profiles.models";
import DisplayErrors from "../Utilities/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
// import ProfileContext from "../Profile/ProfileContext";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  // const {profileDTO,updateProfile} = useContext(ProfileContext);
  const navigate = useNavigate();

  const { claims } = useContext(AuthenticationContext);

  async function login(credentials: userCredentials) {
    console.log(credentials)
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/login`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      // const profileResponse = await axios.post<profileDTO>(`${urlAccounts}/loginProfile/${credentials.email}`);
      // console.log(profileResponse)
      // saveProfile(profileResponse.data);
      // updateProfile(getProfile());
      navigate("/");
      navigate(0);
    } catch (error) {
      setErrors(["Your login or password was wrong!"]);
    }
  }
  return (
    <>
      {/* <main className="wrapper">
        <section className="landing-page"> */}
          <h3 style={{ fontSize: "3em" }}>Login</h3>
          {/* <DisplayErrors errors={errors}/> */}
          <AuthForm
            model={{ email: "", password: "" }}
            onSubmit={async (values) => await login(values)}
            submitButtonName="Login"
          />
          <span style={{ color: "red" }}>{errors}</span>
        {/* </section>
      </main> */}
    </>
  );
}
