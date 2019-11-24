import Koa from 'koa';
import config from '../config';
import axios, { AxiosResponse } from 'axios';

const { client_id, client_secret, TokenURL } = config.github;

export default function (server: Koa) {
  server.use(async (ctx, next) => {
    if (ctx.path === "/auth") {
      const code = ctx.query.code;
      if (!code) {
        ctx.body = "code not exit";
        return;
      }
      try{
        const result: AxiosResponse = await axios({
          method: 'POST',
          url: TokenURL,
          data: {
            code,
            client_id, 
            client_secret,
            grant_type:"authorization_code",
            redirect_uri:"http://localhost:3000/auth"
          }
        });
        if (result.status === 200&&(result.data&&!result.data.error)) {
          ctx.session.githubAuth = result.data;
          const {access_token,token_type}=result.data;
          const userRes=await axios({
            url:`https://gitee.com/api/v5/user?access_token=${access_token}`,
          });
          if(userRes.status===200){
            ctx.session.userInfo=userRes.data;
          }
          ctx.redirect((ctx.session&&ctx.session.beforeUrl)||'/');
        }
        else {
          ctx.body = `请求失败:${result.data}`;
        }
      }
      catch(err){
        console.log(err);
      }

    }
    else if(ctx.path==="/loginOut"){
      ctx.session=null;
      ctx.body="login out";
    }
    else
      await next();
  });
  server.use(async (ctx, next) => {
    if(ctx.path==="/prepare-auth"&&ctx.method==="GET"){
      const {url}=ctx.query;
      ctx.session.beforeUrl=url;
      ctx.redirect(config.github.githubOauthUrl);
    }
    else
      await next();
  })
}
