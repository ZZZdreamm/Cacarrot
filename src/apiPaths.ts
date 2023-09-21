// export let serverURL = "https://cacarrot-server.herokuapp.com/";
export let serverURL = "http://localhost:5000/";

export const localServerURL = "http://localhost:5000/";

if (process.env.NODE_ENV == `development`) {
  serverURL = localServerURL;
}
