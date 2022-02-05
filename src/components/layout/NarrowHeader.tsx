import NextLink from 'next/link';

import {
  Flex,
  Spacer,
  Heading,
  Button,
  Collapse,
  SlideFade,
  Box,
  Link,
} from '@chakra-ui/react';
import { Squash as Hamburger } from 'hamburger-react';

import SITE_MAP from '~/constants/siteMap';
import useHeader from '~/hooks/useHeader';

const NarrowHeader = () => {
  const { state, dispatch } = useHeader();

  const { isOpen } = state;

  return (
    <Flex
      backgroundColor="white"
      direction="column"
      shadow="md"
      overflowY="hidden"
    >
      <Flex align="center" py={1} px={4}>
        <NextLink href="/" passHref>
          <Heading cursor="pointer" px={4} size="2xl">
            a
          </Heading>
        </NextLink>
        <Spacer />

        <Box
          backgroundColor="whiteAlpha.100"
          mx={4}
          cursor="pointer"
          rounded="lg"
        >
          <Hamburger
            label="menu"
            toggle={() => dispatch({ type: 'TOGGLE' })}
            size={28}
            toggled={isOpen}
            duration={0.3}
            rounded
          />
        </Box>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="column"
          flex="1"
          w="100%"
          h="60vh"
          justify="center"
          align="center"
          zIndex="800"
        >
          {SITE_MAP.map((site) => (
            <SlideFade key={site.link} in={isOpen}>
              <Link as={NextLink} href={site.link} passHref>
                <Button
                  as="a"
                  variant="ghost"
                  w="100%"
                  p={6}
                  fontSize="3xl"
                  mb={4}
                >
                  {site.title}
                </Button>
              </Link>
            </SlideFade>
          ))}
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default NarrowHeader;
