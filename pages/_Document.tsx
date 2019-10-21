import Document, { Head, Main, NextScript, DocumentContext } from 'next/document'
import styled, { ServerStyleSheet } from 'styled-components'
import { ReactElement } from 'react';


interface IDocument{
  styleTags:ReactElement;
}

export default class MyDocument extends Document<IDocument> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    try{
       ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
      const styleTags = sheet.getStyleElement()
      const initialProps = await Document.getInitialProps(ctx);
      return {...initialProps, styleTags:<>{initialProps.styles}{styleTags}</> }
    }
    finally{
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
        {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}