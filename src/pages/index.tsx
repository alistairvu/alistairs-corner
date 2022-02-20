import type { GetStaticProps } from 'next';

import Head from 'next/head';

import { renderMetaTags } from 'react-datocms';

import HomeBanner from '~/components/home/HomeBanner';
import HomeIntro from '~/components/home/HomeIntro';
import request from '~/libs/datocms';
import {
  responsiveImageFragment,
  metaTagsFragment,
} from '~/libs/datocmsFragments';
import { NextPageWithLayout } from '~/libs/nextTypes';

const Home: NextPageWithLayout<{ homePage: HomePage; site: Site }> = ({
  homePage,
  site,
}) => (
  <>
    <Head>{renderMetaTags(homePage.seo.concat(site.favicon))}</Head>

    <main>
      <HomeIntro greeting={homePage.greeting} subtitle={homePage.subtitle} />
      {homePage.bannerProjects.map((project, index) => (
        <HomeBanner key={project.id} isEven={index % 2 !== 0} {...project} />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { homePage, site } = await request({
    query: `{
      site: _site {
        favicon: faviconMetaTags {
          ...metaTagsFragment
        }
      }
      homePage {
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
        bannerProjects {
          backgroundColor {
            hex
          }
          title
          subtitle
          link
          image {
            url(imgixParams: {auto: format, q: 90, w: 1350, h: 676})
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1920, h: 1080}) {
              ...responsiveImageFragment
            }
          }
          textLight
          id
        }
        greeting
        subtitle
      }
    }
    ${metaTagsFragment}
    ${responsiveImageFragment}
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { homePage, site } };
};

export default Home;
