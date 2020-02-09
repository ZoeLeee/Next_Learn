import Koa from 'koa';
import Axios from 'axios';
const GITHUB_API_URL = "https://gitee.com/api/v5";
export default (server: Koa) => {
  server.use(async (ctx, next) => {
    const path = ctx.path;
    if (path.startsWith("/github/")) {
      const githubAuth = ctx.session.githubAuth;
      const githubPath = `${GITHUB_API_URL}${ctx.url.replace("/github/", "/")}`;
      const token = githubAuth?.access_token;
      let body = ctx.request.body || {}
      try {
        const result = await Axios({
          url: githubPath,
          data: {
            access_token: token?.access_token || "",
            ...body
          }
        });
        if (result.status === 200) {
          ctx.body = result.data;
          for (let k in result.headers) {
            ctx.set(k, result.headers[k])
          }
        }
        else {
          ctx.status = result.status;
          ctx.body = result.data;
          ctx.headers = result.headers;
        }
        ctx.set("Content-Type", "application/json");
      }
      catch (err) {
        ctx.body = err;
        console.log(err);
      }
    }
    else
      await next();
  })
}