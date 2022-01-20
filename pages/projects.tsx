import { Heading, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import ProjectCard from '../components/project/ProjectCard';
import request from '../lib/datocms';
import { renderMetaTags } from 'react-datocms';

const Projects: NextPage<{ projectPage: ProjectPage }> = ({ projectPage }) => {
  return (
    <>
      <Head>
        {renderMetaTags(projectPage.seo)}
        <meta name="keywords" content={projectPage.keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading pb={2}>projects</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={2}>
          {projectPage.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { projectPage } = await request({
    query: `{
      projectPage {
        projects {
          id
          title
          image {
            id
            url(imgixParams: {auto: format, q: 80, w: 1350, h: 676})
            alt
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
    }
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { projectPage }, revalidate: 20 };
};

export default Projects;
