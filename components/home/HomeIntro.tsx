import {
  Flex,
  Container,
  Heading,
  Text,
  HStack,
  Button,
  ScaleFade,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

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
    <ScaleFade initialScale={0.9} in={isDisplayed}>
      <Flex
        h="80vh"
        w="100%"
        align="center"
        justify="center"
        background="white"
      >
        <Container textAlign="center">
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
      </Flex>
    </ScaleFade>
  );
};

export default HomeIntro;
