import { Heading, SimpleGrid, Container } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import ProjectCard from '../components/project/ProjectCard';
import request from '../lib/datocms';

const Showcase: NextPage<{ projectPage: ProjectPage; site: Site }> = ({
  projectPage,
  site,
}) => (
  <>
    <Head>
      {renderMetaTags(projectPage.seo.concat(site.favicon))}
      <meta name="keywords" content={projectPage.keywords} />
    </Head>

    <Container py={8}>
      <Heading pb={2} size="2xl">
        showcase
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={2}>
        {projectPage.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { projectPage, site } = await request({
    query: `{
      projectPage {
        projects {
          id
          title
          image {
            id
            alt
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
              alt
              title
            }
          }
          description
          link
          githubLink
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

  return { props: { projectPage, site }, revalidate: 12 };
};

export default Showcase;