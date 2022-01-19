import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/hepta-slab/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/variable.css';
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
        fontWeight: 600,
        fontFamily: 'Hepta Slab',
      },
    },
  },
  fonts: {
    heading: 'Hepta Slab, serif',
    body: 'InterVariable, Inter, sans-serif',
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
