import React, { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Fragment>
            <title>INTERN-RENCAR</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          </Fragment>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}