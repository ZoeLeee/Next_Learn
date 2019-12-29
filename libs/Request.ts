
import Axios, { Method, AxiosPromise } from 'axios';
const isServer = typeof window === 'undefined';
const GITHUB_API_URL = "https://gitee.com/api/v5/";

interface IReqProps{
  method?:Method;
  url:string;
  data?:{[key:string]:any}
}

export async function req(props:IReqProps, req):Promise<{status:number,data:any}> {
  let method=props.method||"GET";
  let data=props.data ||{};
  let url=props.url;
  try {
    if (isServer) {
      const session = req.session;
      const githubAuth = (session && session.githubAuth) || {};
      if(method==="GET"){
        url+=`&access_token=${githubAuth.access_token || ""}`
      }
      else{
        Object.assign(data,{access_token: githubAuth.access_token || ""})
      }
      return await Axios({
        url: `${GITHUB_API_URL}${url}`,
        data,
        method: method as Method,
      });
    }
    else {
      return await Axios({
        method: method as Method,
        url: `/github/${url}`,
        data
      })
    }
  } catch (err) {
    return err.response as AxiosPromise<any>;
  }
}