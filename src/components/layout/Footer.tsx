import NextLink from 'next/link';

import { Box, Flex, Heading, Link, Divider, Text } from '@chakra-ui/react';

import SITE_MAP from '~/constants/siteMap';

const Footer = () => (
  <Flex
    width="100%"
    background="gray.200"
    height="100%"
    my={0}
    p={6}
    borderTopWidth={1}
    borderColor="gray.500"
    direction={{ base: 'column', md: 'row' }}
  >
    <Flex
      justify="center"
      direction="column"
      flexGrow={1}
      py={{ base: 4, md: 0 }}
    >
      <Heading>a</Heading>
      <Link isExternal href="https://github.com/alistairvu/alistairs-corner">
        <Text>GitHub</Text>
      </Link>

      <Divider
        display={{ base: 'block', md: 'none' }}
        borderColor="gray.600"
        my={2}
      />
    </Flex>

    <Box textAlign={{ base: 'left', md: 'right' }} flexGrow={1}>
      {SITE_MAP.map(({ title, link }) => (
        <Heading
          color="gray.900"
          pb={1}
          size="lg"
          _hover={{ color: 'gray.500' }}
          cursor="pointer"
          key={link}
        >
          <Link as={NextLink} href={link} passHref>
            {title}
          </Link>
        </Heading>
      ))}
    </Box>
  </Flex>
);

export default Footer;
