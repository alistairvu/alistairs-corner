import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import HomeBanner from '../components/home/HomeBanner';
import request from '../lib/datocms';

const Home: NextPage<{ homePage: HomePage; site: Site }> = ({
  homePage,
  site,
}) => (
  <>
    <Head>{renderMetaTags(homePage.seo.concat(site.favicon))}</Head>

    <main>
      {homePage.bannerProjects.map((project, index) => (
        <HomeBanner isEven={index % 2 !== 0} {...project} key={project.id} />
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
          }
          textLight
        }
      }
    }
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { homePage, site }, revalidate: 20 };
};

export default Home;
