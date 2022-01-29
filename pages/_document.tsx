/* eslint-disable @next/next/no-head-element */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Head />
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
