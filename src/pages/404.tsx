import type { GetStaticProps } from 'next';

import Head from 'next/head';

import { Heading, Text, Container } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';

import request from '~/libs/datocms';
import { metaTagsFragment } from '~/libs/datocmsFragments';
import { NextPageWithLayout } from '~/libs/nextTypes';

const NotFound: NextPageWithLayout<{
  notFoundPage: NotFoundPage;
  site: Site;
}> = ({ notFoundPage, site }) => (
  <>
    <Head>{renderMetaTags(notFoundPage.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <Heading pb={2} size="2xl">
        {notFoundPage.heading}
      </Heading>
      <Text fontSize="xl">{notFoundPage.description}</Text>
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { notFoundPage, site } = await request({
    query: `{
      notFoundPage {
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

  return { props: { notFoundPage, site } };
};

export default NotFound;
