import { Flex } from '@chakra-ui/react';

type HomeIntroContainerProps = {
  children: React.ReactNode;
};

// Generated with https://heropatterns.com/

const HomeIntroContainer = ({ children }: HomeIntroContainerProps) => (
  <Flex
    h="80vh"
    w="100%"
    align="center"
    justify="center"
    background="white"
    px={4}
    backgroundImage={` url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E2E8F0' fill-opacity='1' %3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`}
  >
    {children}
  </Flex>
);

export default HomeIntroContainer;
