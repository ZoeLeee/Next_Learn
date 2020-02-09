import React, { Component } from 'react'

interface Props {
  data: any[];
}

export class RepoList extends Component<Props, {}> {
  render() {
    return (
      <ul className="repo-list">
        {
          this.props.data.map((repo) => {
            return <li key={repo.id}>
              <div style={{ width: "70%" }}>
                <a style={{ fontSize: 20, color: "#40a9ff" }}>
                  {repo.full_name}
                </a>
                <div style={{ width: "70%",height:"50%",overflow:"hidden" }} title={repo.description}>
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
        <style jsx>{`
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
      </ul>
    )
  }
}
