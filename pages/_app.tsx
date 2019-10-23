import App, { Container } from 'next/app'
import 'antd/dist/antd.less'
import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import WithRouter from '../libs/withRedux';
import { Store } from 'redux';
import { AppContextType } from 'next/dist/next-server/lib/utils';


export interface IAppProps extends AppContextType{
  reduxStore:Store;
  pageProps:any;
}

 class MyApp extends App<IAppProps> {
  static async getInitialProps(ctx) {
    let pageProps = {}
    if (ctx.Component.getInitialProps) {
      pageProps = await ctx.Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps,reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default  WithRouter(MyApp)