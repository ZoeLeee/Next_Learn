
import Axios, { Method }  from 'axios';
const isServer = typeof window === 'undefined';
const GITHUB_API_URL = "https://gitee.com/api/v5/";

export async function req({ method="GET" , url, data={} }, req, res) {
  if (isServer) {
    const session = req.session;
    const githubAuth =(session&&session.githubAuth) || {};
    return await Axios({
      url:`${GITHUB_API_URL}${url}`,
      data:{...data,access_token:githubAuth.access_token||""},
      method:method as Method,
    });
  }
  else{
    return await Axios({
      method:method as Method,
      url:`/github/${url}`,
      data
    })
  }
}