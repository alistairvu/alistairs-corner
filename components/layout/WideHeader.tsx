import { Flex, Spacer, Heading, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import SITE_MAP from '../../constants/siteMap';

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
      {SITE_MAP.map((site) => (
        <Box mx={2} key={site.link}>
          <Link as={NextLink} href={site.link} fontWeight="bold">
            {site.title}
          </Link>
        </Box>
      ))}
    </Flex>
  </Flex>
);

export default WideHeader;
