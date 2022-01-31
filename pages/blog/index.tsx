import {
  Heading,
  Text,
  Container,
  VStack,
  StackDivider,
  Divider,
} from '@chakra-ui/react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import BlogCard from '../../components/blog/BlogCard';
import request from '../../lib/datocms';
import { metaTagsFragment } from '../../lib/datocms_fragments';

type BlogPostShortInfo = {
  title: string;
  description: string;
  id: string;
  slug: string;
  createdAt: string;
};

type BlogPageProps = {
  site: Site;
  blogPage: {
    seo: SEOAttribute[];
    heading: string;
    description: string;
  };
  blogPosts: BlogPostShortInfo[];
};

const BlogPage: NextPage<BlogPageProps> = ({
  site,
  blogPage,
  blogPosts,
}: BlogPageProps) => (
  <>
    <Head>{renderMetaTags(blogPage.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <Heading pb={2} size="2xl">
        {blogPage.heading}
      </Heading>
      <Text fontSize="xl" py={2}>
        {blogPage.description}
      </Text>

      <Divider borderColor="gray.400" mb={4} />

      <VStack
        spacing={4}
        divider={<StackDivider borderColor="gray.400" />}
        align="start"
      >
        {blogPosts.map((blogPost) => (
          <BlogCard
            title={blogPost.title}
            description={blogPost.description}
            slug={blogPost.slug}
            createdAt={blogPost.createdAt}
            key={blogPost.id}
          />
        ))}
      </VStack>
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const data = await request({
    query: `{
      blogPosts: allBlogPosts(orderBy: _createdAt_DESC, filter: {isPublished: {eq: true}}) {
        slug
        title
        description
        id
        createdAt
      }
      blogPage {
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
        heading
        description
      }
      site: _site {
        favicon: faviconMetaTags {
          ...metaTagsFragment
        }
      }
    }
    ${metaTagsFragment}`,
  });

  return { props: { ...data }, revalidate: 12 };
};

export default BlogPage;
