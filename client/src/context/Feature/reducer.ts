import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SET_IS_LOADING,
  SCREEN_SETTING,
} from '../actions.ts';

const reducer = (
  state: initialFeatureContextStateType,
  action: featureContextActionsType
): initialFeatureContextStateType => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertSuccess: action.payload?.type ? true : false,
      alertText: action.payload?.text ?? '',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
    };
  }

  if (action.type === SET_IS_LOADING) {
    return {
      ...state,
      isLoading: action.payload?.isLoading as boolean,
    };
  }
  if (action.type === SCREEN_SETTING) {
    return {
      ...state,
      screen: action.payload?.screen as screens,
    };
  }
  throw new Error(`no such action :${action.type}`);
};

export default reducer;
