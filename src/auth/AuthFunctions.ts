import axios from "axios";
import { serverURL } from "../apiPaths";

// export const sendCredentials =(credentials:userCredentials, functionName:string) => {
//     const request = new Request(`${serverURL}${functionName}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//       mode: "cors",
//       body: JSON.stringify({ credentials:credentials }),
//     });
//     return fetch(request)
//       .then((response) => response.json())
//       .then((data) => {
//         return data
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
// }

export const axiosBase = axios.create({
  baseURL: `${serverURL}cacarrot/`,
})