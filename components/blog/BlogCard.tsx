import { LinkBox, Heading, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
};

const BlogCard = ({ title, description, slug }: BlogCardProps) => (
  <LinkBox as="article" p={2} w="100%">
    <Heading size="lg" my={1}>
      <NextLink href={`/blog/${slug}`} passHref>
        <LinkOverlay>{title}</LinkOverlay>
      </NextLink>
    </Heading>

    <Text fontSize="lg">{description}</Text>
  </LinkBox>
);

export default BlogCard;
