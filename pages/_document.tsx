/* eslint-disable @next/next/no-head-element */
/* eslint-disable react/no-invalid-html-attribute */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
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
