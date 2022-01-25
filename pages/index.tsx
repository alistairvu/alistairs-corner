import { Heading } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import request from '../lib/datocms';

const Home: NextPage<{ homePage: HomePage; site: Site }> = ({
  homePage,
  site,
}) => {
  return (
    <>
      <Head>{renderMetaTags(homePage.seo.concat(site.favicon))}</Head>

      <main>
        <Heading>{homePage.heading}</Heading>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { homePage, site } = await request({
    query: `{
      homePage {
        heading
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
      }
      site: _site {
        favicon: faviconMetaTags {
          tag
          content
          attributes
        }
      }
    }
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { homePage, site }, revalidate: 20 };
};

export default Home;
