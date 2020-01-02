import React from 'react';
import App from 'next/app'
import 'antd/dist/antd.less'
import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import WithRedux from '../libs/withRedux';
import { Store } from 'redux';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import '../style.less';
import PageLoading from '../components/PageLoading';
import {  Router } from 'next/router';

export interface IAppProps extends AppContextType {
  reduxStore: Store;
  pageProps: any;
  [key:string]:any;
}

class MyApp extends App<IAppProps, {router:Router}, { isLoading: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }
  static async getInitialProps(ctx) {
    let pageProps = {}
    if (ctx.Component.getInitialProps) {
      pageProps = await ctx.Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  componentDidMount(){
    Router.events.on("routeChangeStart",this.startLoading);
    Router.events.on("routeChangeComplete",this.endLoading);
    Router.events.on("routeChangeError",this.endLoading);
  }
  componentWillUnmount(){
    Router.events.off("routeChangeStart",this.startLoading);
    Router.events.off("routeChangeComplete",this.endLoading);
    Router.events.off("routeChangeError",this.endLoading);
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Layout>
          {
            this.state.isLoading && <PageLoading />
          }
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
  private startLoading=()=>{
    this.setState({
      isLoading:true
    });
  }
  private endLoading=()=>{
    this.setState({
      isLoading:false
    });
  }
}

export default WithRedux(MyApp);