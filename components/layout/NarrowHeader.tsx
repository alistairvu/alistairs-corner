import {
  Flex,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
  Button,
  Box,
  Collapse,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SITE_MAP from '../../constants/siteMap';

const NarrowHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="container" backgroundColor="white" shadow="md">
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

      <Collapse in={isOpen}>
        <Flex direction="column" w="100%" justify="center" align="center">
          {SITE_MAP.map((site) => (
            <NextLink href={site.link} key={site.link} passHref>
              <Button
                variant="ghost"
                w="60%"
                fontSize="xl"
                my={2}
                onClick={onClose}
              >
                {site.title}
              </Button>
            </NextLink>
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
};

export default NarrowHeader;
