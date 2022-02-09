import { Heading, Text, Box, Divider } from '@chakra-ui/react';
import { format } from 'date-fns';
import readingTime from 'reading-time';

type BlogTitleProps = {
  title: string;
  description: string;
  createdAt: string;
  content: string;
};

const BlogTitle = ({
  title,
  description,
  createdAt,
  content,
}: BlogTitleProps) => (
  <Box py={4}>
    <Heading size="2xl">{title}</Heading>
    <Text fontSize="sm" color="gray.700" mt={1}>
      published {format(new Date(createdAt), 'd MMMM Y')} ·{' '}
      {readingTime(content).text}
    </Text>

    <Text fontSize="xl" py={4}>
      {description}
    </Text>

    <Divider borderWidth={1} borderColor="gray.400" />
  </Box>
);

export default BlogTitle;
