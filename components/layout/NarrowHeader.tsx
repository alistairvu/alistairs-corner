import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
  Button,
  Collapse,
  SlideFade,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SITE_MAP from '../../constants/siteMap';

const NarrowHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
          h="100vh"
          justify="center"
          align="center"
        >
          {SITE_MAP.map((site) => (
            <SlideFade key={site.link} in={isOpen}>
              <NextLink href={site.link} key={site.link} passHref>
                <Button
                  variant="ghost"
                  w="100%"
                  p={10}
                  fontSize="4xl"
                  my={10}
                  onClick={onClose}
                  whileHover={{
                    scale: 1.1,
                    transformation: {
                      duration: 1,
                    },
                  }}
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
};

export default NarrowHeader;
