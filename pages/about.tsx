import { GetStaticProps, NextPage } from 'next';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import { AboutEducation, AboutSkill } from '../components/about';
import request from '../lib/datocms';

const AboutPage: NextPage<{ aboutPage: AboutPage; site: Site }> = ({
  aboutPage,
  site,
}) => (
  <>
    <Head>
      {renderMetaTags(aboutPage.seo.concat(site.favicon))}
      <meta name="keywords" content={aboutPage.keywords} />
    </Head>

    <main>
      <Heading pb={2} size="2xl">
        {aboutPage.heading}
      </Heading>
      <Text fontSize="xl">{aboutPage.description}</Text>

      <Box my={2}>
        <Divider w="50%" borderColor="gray.400" />
      </Box>

      <Box as="section" py={1}>
        <Heading size="lg">Education</Heading>
        {aboutPage.education.map((item) => (
          <AboutEducation key={item.id} data={item} />
        ))}
      </Box>

      <Box my={2}>
        <Divider w="50%" borderColor="gray.400" />
      </Box>

      <Box as="section" py={1}>
        <Heading size="lg">Skills</Heading>
        {aboutPage.skills.map((item) => (
          <AboutSkill key={item.id} data={item} />
        ))}
      </Box>
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { aboutPage, site } = await request({
    query: `{
      aboutPage {
        education {
          id
          program
          title
          timespan
          description(markdown: false)
        }
        description(locale: en, markdown: false)
        heading
        skills {
          id
          title
          detail
        }
        keywords
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
      }
      site: _site {
        favicon: faviconMetaTags {
          attributes
          content
          tag
        }
      }
    }
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { aboutPage, site }, revalidate: 20 };
};

export default AboutPage;
