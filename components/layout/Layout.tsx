import { Container } from '@chakra-ui/react';
import WideHeader from './WideHeader';

const Layout: React.FC = ({ children }) => (
  <>
    <nav style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <WideHeader />
    </nav>

    <main style={{ paddingTop: 20, paddingBottom: 40, minHeight: '95vh' }}>
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
