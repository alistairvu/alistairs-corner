import { Box, Container } from '@chakra-ui/react';
import NarrowHeader from './NarrowHeader';
import WideHeader from './WideHeader';
import navStyles from '../../styles/header.module.css';

const Layout: React.FC = ({ children }) => (
  <>
    <nav className={navStyles.nav}>
      <Box display={{ base: 'none', md: 'block' }}>
        <WideHeader />
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <NarrowHeader />
      </Box>
    </nav>

    <main style={{ paddingTop: '5em', paddingBottom: 40, minHeight: '95vh' }}>
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
