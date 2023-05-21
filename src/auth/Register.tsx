import axios from "axios";import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../apiPaths";
import DisplayErrors from "../Utilities/DisplayErrors";

import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
// import { profileDTO } from "../Profile/profiles.models";
// import { getProfile, saveProfile } from "../Profile/HandleProfile";
// import ProfileContext from "../Profile/ProfileContext";

export default function Register(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    // const {updateProfile} = useContext(ProfileContext);
    const navigate = useNavigate();

    async function register(credentials:userCredentials){
        try{
            setErrors([]);
            const response = await axios
            .post<authenticationResponse>(`${urlAccounts}/create`,credentials);
            saveToken(response.data);
            // const profileResponse = await axios.post<profileDTO>(`${urlAccounts}/loginProfile/${credentials.email}`);
            // console.log(profileResponse)
            // saveProfile(profileResponse.data);
            // updateProfile(getProfile());
            update(getClaims());
            navigate('/');
            navigate(0)
        }
        catch(error){

        }
    }
    return(
        <>
            <h3>Register</h3>
            <DisplayErrors errors={errors}/>
            <AuthForm
            model={{email:'', password:''}}
            onSubmit={async values => await register(values)}
            submitButtonName="Register"/>
        </>
    )
}