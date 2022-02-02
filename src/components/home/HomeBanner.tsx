import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react';
import { Fade as Reveal } from 'react-awesome-reveal';
import { Image as DatoImage } from 'react-datocms';
import Tilt from 'react-parallax-tilt';
import bannerStyles from '~/styles/banner.module.css';

type HomeBannerProps = {
  title: string;
  subtitle: string;
  image: {
    url: string;
    responsiveImage: ResponsiveImage;
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
}: HomeBannerProps) => (
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
          <Reveal direction="up" duration={500} triggerOnce>
            <Heading fontSize="4xl">{title}</Heading>

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
          </Reveal>
        </Flex>

        <Flex w="100%" justify="center" align="center" my={10} flexShrink="1">
          <Reveal delay={200} duration={500} triggerOnce>
            <Tilt gyroscope>
              <Box shadow="lg" rounded="md">
                <DatoImage
                  data={image.responsiveImage}
                  className={bannerStyles.image}
                />
              </Box>
            </Tilt>
          </Reveal>
        </Flex>
      </Flex>
    </Container>
  </Box>
);

HomeBanner.defaultProps = {
  textLight: false,
  isEven: false,
  link: undefined,
};

export default HomeBanner;
