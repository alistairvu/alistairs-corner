import NextLink from 'next/link';

import { Flex, Spacer, Heading, Box, Link, Text } from '@chakra-ui/react';

import SITE_MAP from '../../constants/siteMap';

const WideHeader = () => (
  <Flex align="center" py={2} px={4} backgroundColor="white" shadow="md">
    <NextLink href="/" passHref>
      <Heading cursor="pointer">alistair&apos;s corner</Heading>
    </NextLink>
    <Spacer />

    <Flex align="center">
      {SITE_MAP.map((site) => (
        <Box mx={2} key={site.link}>
          <NextLink href={site.link} passHref>
            <Link href={site.link}>
              <Text
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                {site.title}
              </Text>
            </Link>
          </NextLink>
        </Box>
      ))}
    </Flex>
  </Flex>
);

export default WideHeader;
