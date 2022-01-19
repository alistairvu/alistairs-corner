import { Flex, Spacer, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const WideHeader = () => (
  <Flex align="center" py={2} px={4} shadow="md">
    <Link href="/" passHref>
      <Heading cursor="pointer">alistair&apos;s corner</Heading>
    </Link>
    <Spacer />

    <Flex align="center">
      <Link href="/">Home</Link>
    </Flex>
  </Flex>
);

export default WideHeader;
