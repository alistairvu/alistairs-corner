import { ReactNode } from 'react';

import Masonry from 'react-masonry-css';

import masonryStyles from '~/styles/masonry.module.css';

type CommonMasonryProps = {
  children: ReactNode;
};

const CommonMasonry = ({ children }: CommonMasonryProps) => (
  <Masonry
    breakpointCols={{ default: 3, 744: 2, 576: 1 }}
    className={masonryStyles.grid}
    columnClassName={masonryStyles.gridCol}
  >
    {children}
  </Masonry>
);

export default CommonMasonry;
