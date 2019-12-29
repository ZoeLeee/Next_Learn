import React, { useEffect } from 'react'
import getConfig from 'next/config';
import { connect } from 'react-redux';
import { IInitState } from './../reducers/index';
import { Tabs, Button } from 'antd';
import { withRouter } from 'next/router';
import { IAppProps } from './_App';
import { req } from '../libs/Request';
import { List, Avatar } from 'antd';

const { publicRuntimeConfig } = getConfig();
const { TabPane } = Tabs;

const Index = ({ userInfo, router, repos, starRepos }: IAppProps) => {

  if (!userInfo?.id) {
    return <div className="center">
      您还未登陆 <Button type="primary" href={`/prepare-auth?url=${router.asPath}`}>去登陆</Button>
      <style jsx>{`
        .center {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 100%;
          height: 20px;
          text-align: center;
        }
  `}</style>
    </div>
  }

  const key = (router.query.key as string) || "1";
  return (
    <div className="root">
      <div style={{ textAlign: "center" }}>
        <img src={userInfo.avatar_url} alt="" />
        <p>{userInfo.name}</p>
        <p></p>
      </div>
      <Tabs style={{flex:1}} defaultActiveKey={key} onChange={() => { }}>
        <TabPane tab="你的仓库" key="1">
          <ul className="repo-list">
            {
              repos && repos.map((repo) => {
                return <li key={repo.id}>
                  <div style={{ width: "70%" }}>
                    <a style={{ fontSize: 20, color: "#40a9ff" }}>
                      {repo.full_name}
                    </a>
                    <div style={{ width: "70%" }}>
                      {

                      }
                    </div>

                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>{repo.language}</div>
                  <div style={{ flex: 1, textAlign: "right" }}>{repo.stargazers_count}</div>
                </li>
              })
            }
          </ul>
        </TabPane>
        <TabPane tab="你关注的仓库" key="2">
          <ul className="repo-list">
            {
              starRepos && starRepos.map((repo) => {
                return <li key={repo.id}>
                  <div style={{ width: "70%" }}>
                    <a style={{ fontSize: 20, color: "#40a9ff" }}>
                      {repo.full_name}
                    </a>
                    <div style={{ width: "70%" }}>
                      {
                        repo.description
                      }
                    </div>

                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>{repo.language}</div>
                  <div style={{ flex: 1, textAlign: "right" }}>{repo.stargazers_count}</div>
                </li>
              })
            }
          </ul>
        </TabPane>
      </Tabs>
      <style jsx>{`
        .root{
          display:flex;
        }
        .repo-list{
          list-style: none;
        }
        .repo-list>li{
          display:flex;
          border-bottom: 1px solid #DCE3E8;
          height:100px;
          padding:10px 0;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async (props: IAppProps) => {
  let repos;
  let starRepos;

  let data = await req({
    url: `user/repos?sort=full_name&direction=asc`,
  }, props.ctx.req);
  if (data.status === 200) {
    repos = data.data;
  }

  data = await req({
    url: `user/starred?sort=created`,
  }, props.ctx.req);
  if (data.status === 200) {
    starRepos = data.data;
  }



  return { repos, starRepos }
}

export default connect(function mapStatetoProps(state: IInitState) {
  return {
    userInfo: state.userInfo
  }
})(withRouter(Index));


/**
 *
 * {id: 1648650, login: "zoelee", name: "ZoeLeeFZ", avatar_url: "https://avatar.gitee.com/uploads/50/1648650_zoelee.png?1543325716", url: "https://gitee.com/api/v5/users/zoelee", …}
avatar_url: "https://avatar.gitee.com/uploads/50/1648650_zoelee.png?1543325716"
bio: ""
blog: ""
created_at: "2017-11-23T08:58:23+08:00"
email: null
events_url: "https://gitee.com/api/v5/users/zoelee/events{/privacy}"
followers: 3
followers_url: "https://gitee.com/api/v5/users/zoelee/followers"
following: 2
following_url: "https://gitee.com/api/v5/users/zoelee/following_url{/other_user}"
gists_url: "https://gitee.com/api/v5/users/zoelee/gists{/gist_id}"
html_url: "https://gitee.com/zoelee"
id: 1648650
login: "zoelee"
name: "ZoeLeeFZ"
organizations_url: "https://gitee.com/api/v5/users/zoelee/orgs"
public_gists: 0
public_repos: 14
received_events_url: "https://gitee.com/api/v5/users/zoelee/received_events"
repos_url: "https://gitee.com/api/v5/users/zoelee/repos"
site_admin: false
stared: 1
starred_url: "https://gitee.com/api/v5/users/zoelee/starred{/owner}{/repo}"
subscriptions_url: "https://gitee.com/api/v5/users/zoelee/subscriptions"
type: "User"
updated_at: "2019-12-01T22:25:49+08:00"
url: "https://gitee.com/api/v5/users/zoelee"
watched: 19
weibo:
 *
 */