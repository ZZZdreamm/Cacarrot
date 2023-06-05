const websiteURL = `https://facebugapi.azurewebsites.net`
const localURL =  `https://localhost:7064`

let baseURL = websiteURL
if (process.env.NODE_ENV == `development`){
    baseURL = localURL
}else if (process.env.NODE_ENV == 'production'){
    baseURL = websiteURL
}
else{
    baseURL = websiteURL
}
export const urlAccounts = `${baseURL}/api/accounts`;
export const urlPosts = `${baseURL}/api/posts`;
export const urlComments = `${baseURL}/api/comments`;
export const urlFriends = `${baseURL}/api/friends`;
export const urlMessages = `${baseURL}/api/messages`;


// export const serverURL = 'https://cacarrot-server.herokuapp.com/'
export const serverURL = 'http://localhost:5000/'

