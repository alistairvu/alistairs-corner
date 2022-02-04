import NextLink from 'next/link';
import { Container, Heading, Text, HStack, Button } from '@chakra-ui/react';
import { Fade as Reveal } from 'react-awesome-reveal';

import HomeIntroContainer from './HomeIntroContainer';

type HomeIntroProps = {
  greeting: string;
  subtitle: string;
};

const HomeIntro = ({ greeting, subtitle }: HomeIntroProps) => (
  <HomeIntroContainer>
    <Reveal delay={200} duration={200}>
      <Container
        textAlign="center"
        color="gray.900"
        p={4}
        backgroundColor="white"
        shadow="lg"
        rounded="sm"
      >
        <Heading size="3xl" my={3}>
          {greeting}
        </Heading>
        <Text fontSize="xl" px={4}>
          {subtitle}
        </Text>

        <HStack spacing={4} justify="center" width="100%" my={4}>
          <NextLink href="/about" passHref>
            <Button
              variant="outline"
              size="lg"
              borderColor="gray.900"
              _hover={{
                backgroundColor: 'gray.300',
              }}
            >
              about me
            </Button>
          </NextLink>

          <NextLink href="/contact" passHref>
            <Button
              variant="filled"
              size="lg"
              backgroundColor="gray.900"
              color="white"
              _hover={{
                backgroundColor: 'gray.600',
              }}
            >
              contact me
            </Button>
          </NextLink>
        </HStack>
      </Container>
    </Reveal>
  </HomeIntroContainer>
);

export default HomeIntro;
