import { withRouter, Router } from 'next/router';
import { req } from '../libs/Request';
import { IAppProps } from '../pages-test/_app';
import { List, Badge, Row, Col, Pagination } from 'antd';
import { RepoList } from './../components/RepoList';

const SearchPage = ({ data }: { router: Router, data: any[] }) => {
  const languages = data.map(d => d.language);
  const langMap: Map<string, number> = new Map();
  languages.reduce((m: Map<string, number>, val) => {
    if (m.has(val)) {
      m.set(val, m.get(val) + 1);
    }
    else {
      m.set(val, 1);
    }
    return m;
  }, langMap);
  return <div>
    <Row gutter={20}>
      <Col span={6}>
        <List
          dataSource={[...langMap.keys()]}
          renderItem={item => (
            <List.Item>
              {item} <Badge count={langMap.get(item)} />
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <RepoList data={data} />
      </Col>
    </Row>
    <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
        .pagination {
          padding: 20px;
          text-align: center;
        }
      `}</style>
  </div>
}

SearchPage.getInitialProps = async ({ ctx, router }: IAppProps) => {
  if (!ctx.query.q)
    return {
      data: []
    }
  let data = await req({
    url: `search/repositories?q=${ctx.query.q}&page=1&per_page=20&order=desc`,
  }, ctx.req);
  if (data.status === 200) {
    return { data: data.data }
  }
  else
    return { data: [] }
}

export default withRouter(SearchPage)