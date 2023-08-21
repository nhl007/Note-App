import { createContext, useContext, useReducer } from 'react';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SET_IS_LOADING,
  SCREEN_SETTING,
} from '../actions';
import reducer from './reducer';

type FeatureContextType = {
  state: initialFeatureContextStateType;
  displayAlert: (alertText: string, Success: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setScreen: (screen: screens) => void;
};

const initialState: initialFeatureContextStateType = {
  showAlert: false,
  alertText: '',
  alertSuccess: false,
  isLoading: false,
  screen: 'home',
};

const initialContextValue: FeatureContextType = {
  state: initialState,
  displayAlert: () => {},
  setIsLoading: () => {},
  setScreen: () => {},
};

const FeatureContext = createContext<FeatureContextType>(initialContextValue);

const FeatureProvider = ({ children }: onlyChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  /**
   *
   * @param alertText The message to display
   * @param Success alert type => if true, green | red alert
   */

  const displayAlert = (alertText: string, Success = true) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: {
        type: Success,
        text: alertText,
      },
    });
    clearAlert();
  };

  /**
   *
   * @param isLoading true | false
   */

  const setIsLoading = (isLoading: boolean) => {
    dispatch({ type: SET_IS_LOADING, payload: { isLoading: isLoading } });
  };

  const setScreen = (screen: screens) => {
    dispatch({
      type: SCREEN_SETTING,
      payload: {
        screen: screen,
      },
    });
  };

  return (
    <FeatureContext.Provider
      value={{
        state,
        setIsLoading,
        displayAlert,
        setScreen,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureContext = () => {
  return useContext(FeatureContext);
};

export default FeatureProvider;
