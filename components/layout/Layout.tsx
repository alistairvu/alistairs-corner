import { Box, useDisclosure, Fade, useBreakpointValue } from '@chakra-ui/react';
import disableScroll from 'disable-scroll';
import { useEffect } from 'react';
import NarrowHeader from './NarrowHeader';
import WideHeader from './WideHeader';
import navStyles from '../../styles/header.module.css';

const Layout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSmall = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isOpen && isSmall) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [isOpen, isSmall]);

  return (
    <>
      <nav className={navStyles.nav}>
        <Box display={isSmall ? 'none' : 'block'}>
          <WideHeader />
        </Box>
        <Box display={isSmall ? 'block' : 'none'}>
          <NarrowHeader isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
              onClick={onClose}
            />
          </Fade>
        </Box>
      </nav>

      <main style={{ paddingTop: '3em', minHeight: '95vh' }}>{children}</main>
    </>
  );
};

export default Layout;
