import { ReadyImagesURL } from "../appUrls";
import { profileDTO } from "./profiles.models";



export function saveProfile(profileData:profileDTO){
    localStorage.setItem("id",profileData.id);
    localStorage.setItem("email",profileData.email);
    if(profileData.profileImage){
        localStorage.setItem("profileImage",profileData.profileImage);
    }else{
        localStorage.setItem("profileImage", `${ReadyImagesURL}/noProfile.jpg`)
    }
}
export function getProfile(): profileDTO{
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("email");
    const profileImage = localStorage.getItem("profileImage");
    const response : profileDTO = {id:id!,email:email!};
    if(profileImage){
        response.profileImage = profileImage;
    }
    return response;
}