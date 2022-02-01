import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Heading, Container } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';
import CommonMasonry from '~/components/common/CommonMasonry';
import ProjectCard from '~/components/project/ProjectCard';
import request from '~/lib/datocms';
import {
  metaTagsFragment,
  responsiveImageFragment,
} from '../lib/datocms_fragments';

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
      <CommonMasonry>
        {projectPage.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CommonMasonry>
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
              ...responsiveImageFragment
            }
          }
          description
          links
        }
        keywords
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
    ${responsiveImageFragment}
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  return { props: { projectPage, site }, revalidate: 12 };
};

export default Showcase;
