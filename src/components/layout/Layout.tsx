import { HeaderProvider } from '~/contexts/HeaderContext';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <HeaderProvider>
    <Header />

    <main style={{ paddingTop: '3em', minHeight: '100vh' }}>{children}</main>

    <footer>
      <Footer />
    </footer>
  </HeaderProvider>
);

export default Layout;
