const GITEE_OAUTH_URL="https://gitee.com/oauth/authorize";
const SCOPE="user";
const Client_Id="acbe75829e6989f6ed3cf79bce6eaaad19c170a02ea9a24c0b3c088f20118576";

export default {
  github: {
    TokenURL:"https://gitee.com/oauth/token",
    client_id: Client_Id,
    client_secret: "88e5510a01369e159567dda4979463753d26c515e808f0a613f336bde48ecf2e",
    githubOauthUrl:`${GITEE_OAUTH_URL}?client_id=${Client_Id}&redirect_uri=http://localhost:3000/auth&response_type=code`,
    giteeApi:"https://gitee.com/api/v5/"
  }
}
