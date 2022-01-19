import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/hepta-slab';
import '@fontsource/plus-jakarta-sans';
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
        fontFamily: 'Hepta Slab',
      },
    },
  },
  fonts: {
    heading: 'Hepta Slab',
    body: 'Plus Jakarta Sans',
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
