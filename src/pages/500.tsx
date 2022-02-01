import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { Heading, Text, Container } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';
import request from '~/lib/datocms';
import { metaTagsFragment } from '~/lib/datocms_fragments';
import { NextPageWithLayout } from '~/lib/next_types';
import Layout from '~/components/layout/Layout';

const Error: NextPageWithLayout<{ errorPage: ErrorPage; site: Site }> = ({
  errorPage,
  site,
}) => (
  <>
    <Head>{renderMetaTags(errorPage.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <Heading pb={2} size="2xl">
        {errorPage.heading}
      </Heading>
      <Text fontSize="xl">{errorPage.description}</Text>
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { errorPage, site } = await request({
    query: `{
      errorPage {
        heading
        description
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
      }
      site: _site {
        favicon: faviconMetaTags {
          ...metaTagsFragment
        }
      }
    }   
    ${metaTagsFragment} 
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { errorPage, site }, revalidate: 12 };
};

Error.getLayout = (page) => <Layout>{page}</Layout>;

export default Error;
