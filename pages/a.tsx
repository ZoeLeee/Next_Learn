import { Button } from "antd";
import { withRouter } from 'next/router';
export default withRouter(({ router }) =>
  <Button>A{router.query.id}</Button>
)
