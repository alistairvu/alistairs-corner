import { Box, Container } from '@chakra-ui/react';
import NarrowHeader from './NarrowHeader';
import WideHeader from './WideHeader';

const Layout: React.FC = ({ children }) => (
  <>
    <nav style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <Box display={{ base: 'none', md: 'block' }}>
        <WideHeader />
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <NarrowHeader />
      </Box>
    </nav>

    <main style={{ paddingTop: 20, paddingBottom: 40, minHeight: '95vh' }}>
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
