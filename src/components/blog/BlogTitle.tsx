import { Heading, Text, Box, Divider } from '@chakra-ui/react';
import { format } from 'date-fns';
import readingTime from 'reading-time';

import CommonMarkdown from '../common/CommonMarkdown';

import BlogTag from './BlogTag';

type BlogTitleProps = {
  title: string;
  description: string;
  createdAt: string;
  content: string;
  tags: BlogTag[];
};

const BlogTitle = ({
  title,
  description,
  createdAt,
  content,
  tags,
}: BlogTitleProps) => (
  <Box py={4}>
    <Heading size="2xl">{title}</Heading>
    <Text fontSize="sm" color="gray.700" mt={1}>
      published {format(new Date(createdAt), 'd MMMM Y')} ·{' '}
      {readingTime(content).text}
    </Text>

    <Box fontSize="xl" py={2}>
      <CommonMarkdown markdown={description} />
    </Box>

    <Box py={1}>
      {tags.map(({ id, title: tagTitle }) => (
        <BlogTag key={id} content={tagTitle} />
      ))}
    </Box>

    <Divider borderWidth={1} borderColor="gray.400" />
  </Box>
);

export default BlogTitle;
