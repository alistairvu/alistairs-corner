import { Heading, Text, Box, Divider } from '@chakra-ui/react';
import { format } from 'date-fns';

type BlogTitleProps = {
  title: string;
  description: string;
  createdAt: string;
};

const BlogTitle = ({ title, description, createdAt }: BlogTitleProps) => (
  <Box py={4}>
    <Heading size="2xl">{title}</Heading>
    <Text fontSize="sm" color="gray.700" mt={1}>
      published {format(new Date(createdAt), 'd MMMM Y')}
    </Text>

    <Text fontSize="xl" py={4}>
      {description}
    </Text>

    <Divider borderWidth={1} borderColor="gray.400" />
  </Box>
);

export default BlogTitle;
