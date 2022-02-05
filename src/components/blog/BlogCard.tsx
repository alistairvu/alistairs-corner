import NextLink from 'next/link';

import { LinkBox, Heading, LinkOverlay, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
};

const BlogCard = ({ title, description, slug, createdAt }: BlogCardProps) => (
  <LinkBox as="article" p={1} w="100%">
    <Heading size="lg">
      <NextLink href={`/blog/${slug}`} passHref>
        <LinkOverlay>{title}</LinkOverlay>
      </NextLink>
    </Heading>

    <Text fontSize="sm" color="gray.700" mt={2}>
      published {format(new Date(createdAt), 'd MMMM Y')}
    </Text>

    <Text fontSize="lg">{description}</Text>
  </LinkBox>
);

export default BlogCard;
