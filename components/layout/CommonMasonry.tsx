import { ReactNode } from 'react';
import Masonry from 'react-masonry-css';
import masonryStyles from '../../styles/masonry.module.css';
import { useBreakpointValue } from '@chakra-ui/react';

type CommonMasonryProps = {
  children: ReactNode;
};

const CommonMasonry = ({ children }: CommonMasonryProps) => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Masonry
      breakpointCols={columns}
      className={masonryStyles.grid}
      columnClassName={masonryStyles.gridCol}
    >
      {children}
    </Masonry>
  );
};

export default CommonMasonry;
