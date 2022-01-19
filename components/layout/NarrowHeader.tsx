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
  Input,
  DrawerHeader,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';

const NarrowHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex align="center" py={2} px={4} shadow="md">
      <Link href="/" passHref>
        <Heading cursor="pointer">alistair&apos;s corner</Heading>
      </Link>
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
            <Link href="/" passHref>
              <Button variant="ghost" w="100%" fontSize="xl" my={2}>
                Home
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NarrowHeader;
