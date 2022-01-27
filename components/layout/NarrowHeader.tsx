import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  Button,
  Collapse,
  SlideFade,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SITE_MAP from '../../constants/siteMap';

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
    <Flex align="center" py={2} px={4}>
      <NextLink href="/" passHref>
        <Heading cursor="pointer" onClick={onClose}>
          alistair&apos;s corner
        </Heading>
      </NextLink>
      <Spacer />

      <IconButton
        icon={
          isOpen ? <CloseIcon h={4} w={4} /> : <HamburgerIcon h={6} w={6} />
        }
        aria-label="menu"
        variant="ghost"
        backgroundColor="whiteAlpha.100"
        onClick={() => {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }}
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
                p={5}
                fontSize="4xl"
                my={5}
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
