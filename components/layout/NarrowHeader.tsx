import {
  Flex,
  Spacer,
  Heading,
  Button,
  Collapse,
  SlideFade,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import SITE_MAP from '../../constants/siteMap';
import NarrowHeaderHamburger from './NarrowHeaderHamburger';

type NarrowHeaderProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const NarrowHeader = ({ isOpen, onOpen, onClose }: NarrowHeaderProps) => (
  <Flex
    backgroundColor="white"
    direction="column"
    shadow="md"
    overflowY="hidden"
  >
    <Flex align="center" py={1} px={4}>
      <NextLink href="/" passHref>
        <Heading cursor="pointer" onClick={onClose} px={4} size="2xl">
          a
        </Heading>
      </NextLink>
      <Spacer />

      <NarrowHeaderHamburger
        mx={4}
        aria-label="menu"
        backgroundColor="whiteAlpha.100"
        toggle={() => {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }}
        size={28}
        toggled={isOpen}
        duration={0.3}
        cursor="pointer"
      />
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
            <NextLink href={site.link} key={site.link} passHref>
              <Button
                variant="ghost"
                w="100%"
                p={6}
                fontSize="3xl"
                mb={4}
                onClick={onClose}
              >
                {site.title}
              </Button>
            </NextLink>
          </SlideFade>
        ))}
      </Flex>
    </Collapse>
  </Flex>
);

export default NarrowHeader;
