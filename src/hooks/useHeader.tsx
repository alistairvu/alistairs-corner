import { useContext } from 'react';

import { HeaderContext } from '~/contexts/HeaderContext';

const useHeader = () => useContext(HeaderContext);

export default useHeader;
