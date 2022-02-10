import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';

import { Heading, Container, VStack } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';

import BlogCard from '~/components/blog/BlogCard';
import request from '~/lib/datocms';
import { metaTagsFragment } from '~/lib/datocms_fragments';

type TaggedPostsProps = {
  posts: BlogPostShortInfo[];
  site: Site;
  title: string;
};

const TaggedPosts = ({ title, posts, site }: TaggedPostsProps) => (
  <>
    <Head>
      {renderMetaTags(site.favicon)}
      <title> tagged with #{title} | alistair&apos;s corner</title>
    </Head>

    <Container py={8}>
      <Heading pb={2} size="2xl">
        tagged with #{title}
      </Heading>

      {posts.length > 0 ? (
        <VStack spacing={4} align="start">
          {posts.map((blogPost) => (
            <BlogCard
              title={blogPost.title}
              description={blogPost.description}
              slug={blogPost.slug}
              createdAt={blogPost.createdAt}
              key={blogPost.id}
              content={JSON.stringify(blogPost.content)}
              tags={blogPost.tags}
            />
          ))}
        </VStack>
      ) : (
        <Heading p={4}>no posts tagged with #{title}.</Heading>
      )}
    </Container>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const { allBlogTags } = await request({
    query: `{
      allBlogTags {
        title
      }
    }`,
  });

  const paths = allBlogTags.map((tag: { title: string }) => ({
    params: {
      query: tag.title,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const getQuery = () => {
    if (!params || !params.query) {
      return '';
    }

    if (typeof params.query === 'string') {
      return params.query.toLowerCase();
    }

    return params.query[0].toLowerCase();
  };

  const query = getQuery();

  const { blogTag, site } = await request({
    query: `query BlogTag($tagTitle: String) {
      blogTag(filter: {title: {eq: $tagTitle}}) {
        id
      }
      site: _site {
        favicon: faviconMetaTags {
          ...metaTagsFragment
        }
      }
    }
    ${metaTagsFragment}
    `,
    variables: {
      tagTitle: query,
    },
  });

  if (!blogTag) {
    return {
      props: {
        posts: [],
        title: query,
        site,
      },
      revalidate: 12,
    };
  }

  const { allBlogPosts } = await request({
    query: `query PostsQuery($tagId: [ItemId]) {
      allBlogPosts(filter: {tags: {anyIn: $tagId}}) {
        slug
        title
        description
        id
        createdAt
        content {
          value
        }
        tags {
          id
          title
        }
      }
    }
    `,
    variables: {
      tagId: blogTag.id,
    },
  });

  return {
    props: {
      posts: allBlogPosts,
      title: query,
      site,
    },
    revalidate: 12,
  };
};

export default TaggedPosts;
