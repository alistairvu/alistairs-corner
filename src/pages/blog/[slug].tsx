import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';
import NextLink from 'next/link';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Container, Button, Link } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';

import BlogTitle from '~/components/blog/BlogTitle';
import CommonStructuredText from '~/components/common/CommonStructuredText';
import request from '~/libs/datocms';
import {
  responsiveImageFragment,
  metaTagsFragment,
} from '~/libs/datocmsFragments';
import { NextPageWithLayout } from '~/libs/nextTypes';

type BlogPostPageProps = {
  blogPost: BlogPost;
  site: Site;
};

const BlogPostPage: NextPageWithLayout<BlogPostPageProps> = ({
  blogPost,
  site,
}: BlogPostPageProps) => (
  <>
    <Head>{renderMetaTags(blogPost.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <NextLink href="/blog" passHref>
        <Link href="/blog" _hover={{ textDecoration: 'none' }}>
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
        </Link>
      </NextLink>

      <BlogTitle
        title={blogPost.title}
        description={blogPost.description}
        createdAt={blogPost.createdAt}
        content={JSON.stringify(blogPost.content)}
        tags={blogPost.tags}
      />

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
      tags {
        id
        title
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
