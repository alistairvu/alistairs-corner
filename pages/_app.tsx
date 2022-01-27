import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/source-sans-pro';
import '@fontsource/source-serif-pro/600.css';
import '@fontsource/source-serif-pro/700.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import * as ga from '../lib/ga.js';

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

    Button: {
      baseStyle: {
        fontFamily: 'Source Serif Pro, serif',
      },
    },
  },
  fonts: {
    heading: 'Source Serif Pro, serif',
    body: 'Source Sans Pro, sans-serif',
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
