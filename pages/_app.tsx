import App, { Container } from 'next/app'
import 'antd/dist/antd.less'
import Layout from '../components/Layout'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AllReduces } from '../reducers/TestReducers';
import { Provider } from 'react-redux';

let store = createStore(AllReduces, applyMiddleware(thunk))

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
      console.log('pageProps: ', pageProps);
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}