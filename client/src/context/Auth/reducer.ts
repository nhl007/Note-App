import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../actions';

const reducer = (
  state: initialAuthContextStateType,
  action: authContextActionsType
): initialAuthContextStateType => {
  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      token: action.payload?.token as string,
      user: {
        name: action.payload?.name as string,
        email: action.payload?.email as string,
      },
    };
  }
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      token: action.payload?.token as string,
      user: {
        name: action.payload?.name as string,
        email: action.payload?.email as string,
      },
    };
  }
  if (action.type === LOGOUT_SUCCESS) {
    return {
      ...state,
      token: null,
      user: null,
    };
  }
  throw new Error(`no such action :${action.type}`);
};

export default reducer;