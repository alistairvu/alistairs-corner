import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Box, Fade, useBreakpointValue } from '@chakra-ui/react';
import disableScroll from 'disable-scroll';

import useHeader from '~/hooks/useHeader';

import NarrowHeader from './NarrowHeader';
import WideHeader from './WideHeader';

const Header = () => {
  const { state, dispatch } = useHeader();
  const router = useRouter();

  const { isOpen } = state;
  const isSmall = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isOpen && isSmall) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [isOpen, isSmall]);

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch({ type: 'SET_CLOSED' });
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [dispatch, router.events]);

  return (
    <Box
      as="nav"
      width="100%"
      minHeight="3em"
      position="fixed"
      top="0"
      zIndex="900"
      id="top-nav"
    >
      <Box display={{ base: 'none', md: 'block' }}>
        <WideHeader />
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <NarrowHeader />
        <Fade in={isOpen}>
          <Box
            position="absolute"
            t={0}
            l={0}
            h="100vh"
            w="100vw"
            backgroundColor="blackAlpha.500"
            zIndex="100"
            display={isOpen ? 'block' : 'none'}
            onClick={() => dispatch({ type: 'TOGGLE' })}
            id="header-overlay"
          />
        </Fade>
      </Box>
    </Box>
  );
};

export default Header;
