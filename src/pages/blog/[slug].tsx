import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Heading,
  Container,
  Text,
  Box,
  Divider,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { renderMetaTags } from 'react-datocms';
import { format } from 'date-fns';
import CommonStructuredText from '~/components/common/CommonStructuredText';
import request from '~/lib/datocms';
import {
  responsiveImageFragment,
  metaTagsFragment,
} from '~/lib/datocms_fragments';

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
        <Text fontSize="sm" color="gray.700" mt={2}>
          published {format(new Date(blogPost.createdAt), 'd MMMM Y')}
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
      allBlogPosts(filter: {isPublished: {eq: true}}) {
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
    blogPost(filter: {slug: {eq: $slug}, isPublished: {eq: true}}) {
      createdAt
      title
      description(markdown: false)
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      content {
        value
        blocks {
          id
          __typename
          ... on BlogImageRecord {
            caption
            image {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1920, h: 1080}) {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
    }
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
  }  
  ${responsiveImageFragment}
  ${metaTagsFragment}
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

  if (blogPost === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogPost,
      site,
    },
    revalidate: 12,
  };
};

export default BlogPostPage;
