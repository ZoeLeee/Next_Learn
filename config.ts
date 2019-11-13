const GITHUB_OAUTH_URL="https://github.com/login/oauth/authorize";
const SCOPE="user";
const Client_Id="7df126b410d4978bd7d4";

export default {
  github: {
    TokenURL:"https://github.com/login/oauth/access_token",
    client_id: Client_Id,
    client_secret: "eb7babd3652932e11145a6f8fd7298a472917256",
    githubOauthUrl:`${GITHUB_OAUTH_URL}?client_id=${Client_Id}&scope=${SCOPE}`
  }
}