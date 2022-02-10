import NextLink from 'next/link';

import { Tag, Link } from '@chakra-ui/react';

type BlogTagProps = {
  content: string;
};

const BlogTag = ({ content }: BlogTagProps) => (
  <NextLink href={`/tag/${content}`} passHref>
    <Link href={`/tag/${content}`} mr={1}>
      <Tag
        color="white"
        backgroundColor="gray.700"
        fontWeight="semibold"
        _hover={{ textDecoration: 'underline' }}
        mb={1}
      >
        #{content}
      </Tag>
    </Link>
  </NextLink>
);

export default BlogTag;
