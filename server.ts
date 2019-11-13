import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import Redis from 'ioredis';
import { RedisStore } from './utils/RedisStore';
import session from 'koa-session';
import auth from './server/auth';

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa();
  server.keys = ['learn next'];
  let store = new RedisStore(new Redis());

  const CONFIG = {
    key: 'session_id', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    store
  };

  server.use(session(CONFIG, server));

  //出来github登陆
  auth(server);

  let router = new Router();
  router.get('/a/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id },
    })
    ctx.respond = false
  });
  router.get("/b/:id", async (ctx, next) => {
    let id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/b",
      query: { id }
    });
    ctx.respond = false;
  });


  router.get("/api/user", async (ctx, next) => {
    const user = ctx.session.userInfo;
    if (user) {
      ctx.status = 200;
      ctx.set('Content-Type', 'application/json');
      ctx.body = user;
    }
    else {
      ctx.status = 401;
      ctx.body = "未登录";
    }
  });


  server.use(router.routes());

  server.use(async (ctx, next) => {
    if(ctx.session)
    ctx.req["userInfo"]= ctx.session.userInfo;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
  })

  server.listen(3000, () => {
    console.log("listening on 3000");
  })
})