import React from 'react';

export default (Com) => {
  function TestHoc({ Component, pageProps, ...rest }) {

    if (pageProps)
      pageProps.test = "123";

    return <Com Component={Component} pageProps={pageProps} {...rest} />
  }
  TestHoc.getInitialProps = Com.getInitialProps;
  return TestHoc;
}