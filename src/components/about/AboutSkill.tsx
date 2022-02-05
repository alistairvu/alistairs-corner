import { Box, Heading } from '@chakra-ui/react';

import CommonMarkdown from '~/components/common/CommonMarkdown';

type AboutSkillProps = {
  data: Skill;
};

const AboutEducation = ({ data }: AboutSkillProps) => (
  <Box py={4}>
    <Heading size="md" mb={1} fontWeight="600">
      {data.title}
    </Heading>
    <CommonMarkdown markdown={data.detail} />
  </Box>
);

export default AboutEducation;
