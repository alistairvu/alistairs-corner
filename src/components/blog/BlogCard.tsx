import NextLink from 'next/link';

import { LinkBox, Heading, LinkOverlay, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import readingTime from 'reading-time';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  content: string;
};

const BlogCard = ({
  title,
  description,
  slug,
  createdAt,
  content,
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

    <Text fontSize="lg">{description}</Text>

    <Text fontSize="xs" color="gray.700">
      published {format(new Date(createdAt), 'd MMMM Y')} ·{' '}
      {readingTime(content).text}
    </Text>
  </LinkBox>
);

export default BlogCard;
