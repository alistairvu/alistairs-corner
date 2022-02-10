import NextLink from 'next/link';

import { LinkBox, Heading, LinkOverlay, Text, Box } from '@chakra-ui/react';
import { format } from 'date-fns';
import readingTime from 'reading-time';

import CommonMarkdown from '../common/CommonMarkdown';

import BlogTag from './BlogTag';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  content: string;
  tags: BlogTag[];
};

const BlogCard = ({
  title,
  description,
  slug,
  createdAt,
  content,
  tags,
}: BlogCardProps) => (
  <LinkBox
    as="article"
    p={4}
    w="100%"
    rounded="lg"
    _hover={{ background: 'gray.100' }}
  >
    <Heading size="xl">
      <NextLink href={`/blog/${slug}`} passHref>
        <LinkOverlay>{title}</LinkOverlay>
      </NextLink>
    </Heading>

    <Box fontSize="lg">
      <CommonMarkdown markdown={description} />
    </Box>

    <Text fontSize="xs" color="gray.700">
      published {format(new Date(createdAt), 'd MMMM Y')} ·{' '}
      {readingTime(content).text}
    </Text>

    <Box py={1}>
      {tags.map(({ id, title: tagTitle }) => (
        <BlogTag key={id} content={tagTitle} />
      ))}
    </Box>
  </LinkBox>
);

export default BlogCard;
