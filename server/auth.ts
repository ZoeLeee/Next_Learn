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
      const result: AxiosResponse = await axios({
        method: 'post',
        url: TokenURL,
        data: {
          client_id, client_secret, code
        },
        headers: {
          Accept: "application/json"
        }
      });
      if (result.status === 200&&(result.data&&!result.data.error)) {
        ctx.session.githubAuth = result.data;
        const {access_token,token_type}=result.data;
        const userRes=await axios({
          url:"https://api.github.com/user",
          headers:{
            'Authorization':`${token_type} ${access_token}`
          }
        });
        if(userRes.status===200){
          console.log(userRes.data);
          ctx.session.userInfo=userRes.data;
        }
        ctx.redirect('/');
      }
      else {
        ctx.body = `请求失败:${result.data}`;
      }

    }
    else
      await next();
  })
}
