import type { GetStaticProps } from 'next';

import Head from 'next/head';

import { Heading, Text, Container } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';

import request from '~/libs/datocms';
import { metaTagsFragment } from '~/libs/datocmsFragments';
import { NextPageWithLayout } from '~/libs/nextTypes';

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

  return { props: { errorPage, site } };
};

export default Error;
