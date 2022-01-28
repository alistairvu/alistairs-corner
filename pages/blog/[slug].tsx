import {
  Heading,
  Container,
  Text,
  Box,
  Divider,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import NextLink from 'next/link';
import CommonStructuredText from '../../components/common/CommonStructuredText';
import request from '../../lib/datocms';

type BlogPostPageProps = {
  blogPost: BlogPost;
  site: Site;
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  blogPost,
  site,
}: BlogPostPageProps) => (
  <>
    <Head>{renderMetaTags(blogPost.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <NextLink href="/blog" passHref>
        <Button
          variant="outline"
          px={2}
          size="md"
          borderColor="gray.900"
          _hover={{
            backgroundColor: 'gray.300',
          }}
          leftIcon={<ArrowBackIcon w={4} h={4} m={0} p={0} />}
        >
          all posts
        </Button>
      </NextLink>

      <Box align="center" py={4}>
        <Heading pb={2} size="2xl">
          {blogPost.title}
        </Heading>
        <Text fontSize="2xl" py={2}>
          {blogPost.description}
        </Text>
        <Divider borderWidth={1} my={2} borderColor="gray.500" width="60%" />
      </Box>

      <CommonStructuredText content={blogPost.content} />
    </Container>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const { allBlogPosts } = await request({
    query: `
    {
      allBlogPosts {
        slug
      }
    }
    `,
  });

  const paths = allBlogPosts.map((post: { slug: string }) => ({
    params: {
      slug: post.slug,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const POST_QUERY = `query BlogQuery($slug: String) {
    blogPost(filter: {slug: {eq: $slug}}) {
      _createdAt
      title
      description(markdown: false)
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
      content {
        value
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
  `;

  const getSlug = () => {
    if (!params || !params.slug) {
      return '';
    }

    if (typeof params.slug === 'string') {
      return params.slug;
    }

    return params.slug[0];
  };

  const { blogPost, site } = await request({
    query: POST_QUERY,
    variables: { slug: getSlug() },
  });

  return {
    props: {
      blogPost,
      site,
    },
    revalidate: 12,
  };
};

export default BlogPostPage;
