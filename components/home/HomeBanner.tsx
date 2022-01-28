import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Button,
  Fade,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import bannerStyles from '../../styles/banner.module.css';

type HomeBannerProps = {
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
  backgroundColor: {
    hex: string;
  };
  textLight?: boolean;
  isEven?: boolean;
  link?: string;
};

const HomeBanner = ({
  title,
  subtitle,
  image,
  backgroundColor,
  textLight,
  isEven,
  link,
}: HomeBannerProps) => {
  const [isHeadingDisplayed, setIsHeadingDisplayed] = useState(false);
  const [isBodyDisplayed, setIsBodyDisplayed] = useState(false);

  return (
    <Box h={{ base: '75vh', md: '50vh' }} backgroundColor={backgroundColor.hex}>
      <Container maxWidth="6xl" h="100%">
        <Flex
          direction={{
            base: 'column-reverse',
            md: isEven ? 'row-reverse' : 'row',
          }}
          justify="center"
          align="center"
          h="100%"
        >
          {/* Text element */}
          <Flex
            color={textLight ? 'gray.100' : 'gray.900'}
            w="100%"
            h="100%"
            justify="center"
            align="center"
            direction="column"
            textAlign="center"
          >
            <Fade in={isHeadingDisplayed}>
              <Heading fontSize="4xl">{title}</Heading>
              <Waypoint
                onEnter={() => setIsHeadingDisplayed(true)}
                onLeave={() => setIsHeadingDisplayed(false)}
              />
            </Fade>

            <Fade in={isBodyDisplayed}>
              <Text py={2} fontSize="xl" px={{ base: 6, md: 12 }}>
                {subtitle}
              </Text>

              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    borderColor={textLight ? 'gray.100' : 'gray.900'}
                    my={2}
                    _hover={{
                      color: backgroundColor.hex,
                      backgroundColor: textLight ? 'gray.100' : 'gray.900',
                    }}
                  >
                    explore
                  </Button>
                </a>
              )}

              <Waypoint
                onEnter={() => setIsBodyDisplayed(true)}
                onLeave={() => setIsBodyDisplayed(false)}
              />
            </Fade>
          </Flex>

          <Box
            w="100%"
            textAlign="center"
            shadow="lg"
            rounded="md"
            my={10}
            flexShrink="1"
          >
            <NextImage
              width="1800px"
              height="912px"
              layout="responsive"
              src={image.url}
              className={bannerStyles.image}
              alt={`${title}-${subtitle}`}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

HomeBanner.defaultProps = {
  textLight: false,
  isEven: false,
  link: undefined,
};

export default HomeBanner;
