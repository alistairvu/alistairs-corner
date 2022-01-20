import { Heading, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import ProjectCard from '../components/project/ProjectCard';
import request from '../lib/datocms';

type ProjectsPageProps = {
  projects: Array<Project>;
  keywords: string;
};

const Projects: NextPage<ProjectsPageProps> = ({ projects, keywords }) => {
  return (
    <>
      <Head>
        <title>projects | alistair&apos;s corner</title>
        <meta name="description" content="Projects built by Alistair" />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading pb={2}>projects</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={2}>
          {projects.map((project) => (
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
      }
    }
    `,
  });

  const { projects, keywords } = projectPage;
  return { props: { projects, keywords }, revalidate: 20 };
};

export default Projects;
