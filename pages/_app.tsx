import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/source-sans-pro';
import '@fontsource/source-serif-pro/600.css';
import '@fontsource/source-serif-pro/700.css';
import Layout from '../components/layout/Layout';

const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {
        maxW: '4xl',
        centerContent: true,
      },
    },

    Heading: {
      baseStyle: {
        fontWeight: 700,
      },
    },
  },
  fonts: {
    heading: 'Source Serif Pro, serif',
    body: 'Source Sans Pro, sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
