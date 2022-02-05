import { HeaderProvider } from '~/contexts/HeaderContext';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <HeaderProvider>
    <Header />

    <main style={{ paddingTop: '3em', minHeight: '100vh' }}>{children}</main>

    <footer>
      <Footer />
    </footer>
  </HeaderProvider>
);

export default Layout;
