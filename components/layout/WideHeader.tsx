import { Flex, Spacer, Heading, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

const WideHeader = () => (
  <Flex
    align="center"
    py={2}
    px={4}
    shadow="md"
    backgroundColor="whiteAlpha.900"
  >
    <NextLink href="/" passHref>
      <Heading cursor="pointer">alistair&apos;s corner</Heading>
    </NextLink>
    <Spacer />

    <Flex align="center">
      <Box mx={2}>
        <NextLink href="/">Home</NextLink>
      </Box>
      <Box mx={2}>
        <NextLink href="/projects">Projects</NextLink>
      </Box>
    </Flex>
  </Flex>
);

export default WideHeader;
