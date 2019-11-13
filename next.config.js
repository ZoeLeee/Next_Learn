const withLess = require('@zeit/next-less')
const config=require("./config").default;

if(typeof require !=='undefined'){
  // require.extensions('.less')=file=>{};
}

const GITHUB_OAUTH_URL="https://github.com/login/oauth/authorize";
const SCOPE="user";

const myConfig = withLess(
  {
    lessLoaderOptions: {
      cssModules: true,
      javascriptEnabled: true,
    },
    /**在2端渲染都可获取到的配置 */
    publicRuntimeConfig:{
      GITHUB_OAUTH_URL,
      OAUTH_URL:`${config.github.githubOauthUrl}
      ?client_id=${config.github.client_id}&scope=${SCOPE}`
    }
  }
);
module.exports = myConfig;