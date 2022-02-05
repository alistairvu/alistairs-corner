import { createContext, Dispatch, useReducer, useMemo } from 'react';

interface HeaderState {
  isOpen: boolean;
}

type HeaderAction =
  | {
      type: 'TOGGLE';
    }
  | {
      type: 'SET_OPEN';
    }
  | {
      type: 'SET_CLOSED';
    };

interface HeaderContextInterface {
  state: HeaderState;
  dispatch: Dispatch<HeaderAction>;
}

const initialState: HeaderState = {
  isOpen: false,
};

const headerReducer = (state: HeaderState, action: HeaderAction) => {
  switch (action.type) {
    case 'TOGGLE': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case 'SET_OPEN': {
      return {
        ...state,
        isOpen: true,
      };
    }

    case 'SET_CLOSED': {
      return {
        ...state,
        isOpen: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const HeaderContext = createContext<HeaderContextInterface>({
  state: initialState,
  dispatch: (value: HeaderAction) => ({ type: value.type }),
});

export const HeaderProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(headerReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};
