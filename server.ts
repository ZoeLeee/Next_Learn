import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa();
  let router=new Router();
  router.get("/a/:id",async (ctx,next)=>{
    let id=ctx.params.id;
    await handle(ctx.req,ctx.res,{
      pathname:"/a",
      query:{id}
    });
    ctx.respond=false;
  });
  router.get("/b/:id",async (ctx,next)=>{
    let id=ctx.params.id;
    await handle(ctx.req,ctx.res,{
      pathname:"/b",
      query:{id}
    });
    ctx.respond=false;
  });
  
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());
  server.listen(3000, () => {
    console.log("listening on 3000");
  })
})