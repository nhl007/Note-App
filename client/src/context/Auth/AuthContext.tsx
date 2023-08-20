import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import { baseUrl } from '../../assets/constants';
import axios, { AxiosRequestConfig } from 'axios';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_SUCCESS,
} from '../actions';
import { useFeatureContext } from '../Feature/FeatureContext';
import { removeLocalStorage, setLocalStorage } from '../../utils/localStorage';

type AuthContextType = {
  state: initialAuthContextStateType;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  update: (data: userInfoType) => Promise<void>;
};

type userInfoType = {
  name: string;
  email: string;
  description?: string;
  image?: {
    assetId: string;
    url: string;
  };
};

const token = localStorage.getItem('token');
const user: userInfoType = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null;

const initialState: initialAuthContextStateType = {
  token: token ? token : null,
  user: user ? user : null,
};

const initialContextValue: AuthContextType = {
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  update: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialContextValue);

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
};

const AuthProvider = ({ children }: onlyChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { displayAlert } = useFeatureContext();

  const register = async (name: string, email: string, password: string) => {
    await axios
      .post(
        `${baseUrl}/auth/register`,
        {
          name: name,
          email: email,
          password: password,
        },
        axiosConfig
      )
      .then((res) => {
        const { token, user } = res.data;
        setLocalStorage(token, user);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            token: token as string,
            user: user as UserModel,
          },
        });

        displayAlert(`Successfully Register A ${name.toUpperCase()} !`, true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
        console.log(err);
      });
  };

  const login = async (email: string, password: string) => {
    await axios
      .post(
        `${baseUrl}/auth/login`,
        {
          email: email,
          password: password,
        },
        axiosConfig
      )
      .then((res) => {
        const { token, user } = res.data;

        setLocalStorage(token, user);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: token as string,
            user: user as UserModel,
          },
        });

        displayAlert('Successfully logged In !', true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };
  const logout = async () => {
    await axios
      .get(`${baseUrl}/auth/logout`, axiosConfig)
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        removeLocalStorage();
        displayAlert('Logout Successful !', true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  const update = async (data: userInfoType) => {
    await axios
      .post(`${baseUrl}/auth/update`, data, axiosConfig)
      .then((res) => {
        setLocalStorage(state.token!, res.data.user);
        dispatch({
          type: UPDATE_SUCCESS,
          payload: res.data.user,
        });

        displayAlert('Profile Updated Successfully !', true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        register,
        login,
        logout,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
