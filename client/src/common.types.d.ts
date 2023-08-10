type currentScreen = 'home' | 'create' | 'delete' | 'update' | 'login';

type AuthPropType = 'login' | 'register';
type AuthenticationProps = {
  type: AuthPropType;
  setType: React.Dispatch<React.SetStateAction<AuthPropType>>;
};

type onlyChildrenProps = {
  children?: React.ReactNode | React.ReactElement | React.ReactElement[];
};

type navProps = {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};

//? Feature context types

type initialFeatureContextStateType = {
  showAlert: boolean;
  alertText: string;
  alertSuccess: boolean;
  isLoading: boolean;
};

type featureContextActionsType = {
  type: string;
  payload?: {
    type?: boolean;
    text?: string;
    isLoading?: boolean;
  };
};

//?auth context types

type initialAuthContextStateType = {
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
};

type authContextActionsType = {
  type: string;
  payload?: {
    name?: string;
    email?: string;
    token?: string;
  };
};

type NoteMetaData = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
};
