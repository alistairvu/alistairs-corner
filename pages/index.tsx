import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import HomeBanner from '../components/home/HomeBanner';
import HomeIntro from '../components/home/HomeIntro';
import request from '../lib/datocms';

const Home: NextPage<{ homePage: HomePage; site: Site }> = ({
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
          attributes
          content
          tag
        }
      }
      homePage {
        seo: _seoMetaTags {
          attributes
          content
          tag
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
              srcSet
              webpSrcSet
              sizes
              src
              width
              height
              aspectRatio
              bgColor
              base64
            }
          }
          textLight
          id
        }
        greeting
        subtitle
      }
    }
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { homePage, site }, revalidate: 12 };
};

export default Home;
