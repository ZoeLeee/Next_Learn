import { withRouter, Router } from 'next/router';
import { req } from '../libs/Request';
import { IAppProps } from '../pages-test/_app';

const SearchPage = ({ router }: { router: Router }) => {
  return <div>
    Search {router.query.q}
  </div>
}

SearchPage.getInitialProps = async ({ ctx, router }: IAppProps) => {
  let data = await req({
    url: `search/repositories?q=${router.query.q}&page=1&per_page=20&order=desc`,
  }, ctx.req);
  return {router}
}

export default withRouter(SearchPage)