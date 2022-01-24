import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import SITE_MAP from '../../constants/siteMap';

const NarrowHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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

      <IconButton
        icon={<HamburgerIcon h={6} w={6} />}
        aria-label="menu"
        variant="ghost"
        backgroundColor="whiteAlpha.100"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
            {SITE_MAP.map((site) => (
              <NextLink href={site.link} key={site.link} passHref>
                <Button
                  variant="ghost"
                  w="100%"
                  fontSize="xl"
                  my={2}
                  onClick={onClose}
                >
                  {site.title}
                </Button>
              </NextLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NarrowHeader;
