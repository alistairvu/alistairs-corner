import { useEffect, useState } from 'react';

import { Box, Fade, useBreakpointValue } from '@chakra-ui/react';
import disableScroll from 'disable-scroll';

import navStyles from '~/styles/header.module.css';

import Footer from './Footer';
import NarrowHeader from './NarrowHeader';
import WideHeader from './WideHeader';

const Layout: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        <Box display={{ base: 'none', md: 'block' }}>
          <WideHeader />
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <NarrowHeader isOpen={isOpen} setIsOpen={setIsOpen} />
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
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </Fade>
        </Box>
      </nav>

      <main style={{ paddingTop: '3em', minHeight: '100vh' }}>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
