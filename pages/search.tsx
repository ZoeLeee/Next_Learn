import { withRouter, Router } from 'next/router';
import { req } from '../libs/Request';
import { List, Badge, Row, Col, Pagination } from 'antd';
import { RepoList } from './../components/RepoList';
import Link from 'next/link';
import { IAppProps } from './_App';
import { useCallback } from 'react';

const langMap: Map<string, number> = new Map();
let queryKey = "";

const SearchPage = ({ data, router, total_count, total_page }: IAppProps) => {
  const languages = data.map(d => d.language);
  const query = router.query;
  if (langMap.size === 0)
    languages.reduce((m: Map<string, number>, val) => {
      if (m.has(val)) {
        m.set(val, m.get(val) + 1);
      }
      else {
        if (val)
          m.set(val, 1);
      }
      return m;
    }, langMap);

  const changePage = useCallback(
    (page, pageSize) => {
      let str = `/search?q=${router.query.q}&page=${page}&per_page=${pageSize}&order=desc`;
      if (router.query.language) {
        str += `&language=${router.query.language}`;
      }
      window.scroll({top:0});
      router.push(str);
    },
    [],
  )

  return <div>
    <Row gutter={20}>
      <Col span={6}>
        <List
          dataSource={[...langMap.keys()]}
          renderItem={item => (
            <List.Item>
              <Link href={`/search?q=${query.q}&language=${item}page=${query.page}&per_page=${query.per_page}&order=desc`}>
                <div>
                  {item} <Badge count={langMap.get(item)} />
                </div>
              </Link>
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <h3>共搜索到{total_count}个仓库</h3>
        <RepoList data={data} />
        <Pagination
          defaultCurrent={Number(router.query.page)}
          pageSize={20} total={total_count}
          onChange={changePage}
        />
      </Col>
    </Row>
    <style jsx>{`
     
      `}</style>
  </div>
}

SearchPage.getInitialProps = async (props: IAppProps) => {
  const { ctx } = props;
  if (!ctx.query.q)
    return {
      data: []
    }
  if (queryKey !== ctx.query.q) {
    queryKey = ctx.query.q as string;
    langMap.clear();
  }

  let qStr = `search/repositories?q=${ctx.query.q}&page=${ctx.query.page}&per_page=${ctx.query.per_page}&order=desc`;
  if (ctx.query.language) {
    qStr += `&language=${ctx.query.language}`;
  }

  let data = await req({
    url: qStr,
  }, ctx.req);
  if (data.status === 200) {
    return { data: data.data, total_count: parseInt(data["headers"]["total_count"]), page_count: parseInt(data["headers"]["total_page"]) }
  }
  else
    return { data: [], total_count: 0, page_count: 1 }
}

export default withRouter(SearchPage)