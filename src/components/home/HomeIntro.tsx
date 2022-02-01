import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Container,
  Heading,
  Text,
  HStack,
  Button,
  SlideFade,
} from '@chakra-ui/react';
import HomeIntroContainer from './HomeIntroContainer';

type HomeIntroProps = {
  greeting: string;
  subtitle: string;
};

const HomeIntro = ({ greeting, subtitle }: HomeIntroProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDisplayed(true);
    }, 100);
  }, []);

  return (
    <HomeIntroContainer>
      <SlideFade in={isDisplayed}>
        <Container
          textAlign="center"
          color="gray.900"
          p={4}
          backgroundColor="white"
          shadow="md"
          borderWidth={0.5}
          borderRadius="sm"
          borderColor="gray.50"
        >
          <Heading size="4xl" my={4}>
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
      </SlideFade>
    </HomeIntroContainer>
  );
};

export default HomeIntro;
