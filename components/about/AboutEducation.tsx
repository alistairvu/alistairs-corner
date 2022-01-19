import { Box, Heading, Text } from '@chakra-ui/react';
import CommonMarkdown from '../common/CommonMarkdown';

type AboutEducationProps = {
  data: Education;
};

const AboutEducation = ({ data }: AboutEducationProps) => (
  <Box py={4}>
    <Heading size="md">{data.title}</Heading>
    <Text fontSize="lg">{data.program}</Text>
    <Text as="i" color="gray.500">
      {data.timespan}
    </Text>

    <CommonMarkdown markdown={data.description} />
  </Box>
);

export default AboutEducation;
