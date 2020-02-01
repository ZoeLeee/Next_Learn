import React from 'react';
import { initStore } from './../store/store';
import { Store } from 'redux';
import { IAppProps } from '../pages-test/_app';
import { IInitState } from '../reducers';
import { isServer } from './../utils/utils';

const _NEXT_REDUX_STORE_ = '_NEXT_REDUX_STORE_';

function getOrCreateStore(initState: IInitState = { userInfo: {} }): Store {
  if (isServer())
    return initStore(initState);

  if (!window[_NEXT_REDUX_STORE_])
    window[_NEXT_REDUX_STORE_] = initStore(initState);

  return window[_NEXT_REDUX_STORE_];
}


export default (Com) => {
  class WithRedux extends React.Component<IAppProps>{
    private _reduxStore: Store;
    static async getInitialProps(ctx: IAppProps) {
      let store: Store;
      if (isServer && ctx.ctx.req && ctx.ctx.req["session"]) {
        const { session } = ctx.ctx.req as any;
        store = getOrCreateStore({ userInfo: session.userInfo });
      }
      else
        store = getOrCreateStore();

      ctx.reduxStore = store;
      let appProps = {};
      if (Com.getInitialProps)
        appProps = await Com.getInitialProps(ctx);
      return {
        ...appProps,
        initState: store.getState()
      }
    }
    constructor(props) {
      super(props);
      this._reduxStore = getOrCreateStore(props.initState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;
      return <Com
        Component={Component}
        pageProps={pageProps}
        reduxStore={this._reduxStore}
        {...rest}
      />
    }
  }
  return WithRedux;
}