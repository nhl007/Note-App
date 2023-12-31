type currentScreen = 'home' | 'create' | 'update' | 'login';

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

type screens = 'home' | 'create' | 'profile' | 'auth' | 'update';

type initialFeatureContextStateType = {
  showAlert: boolean;
  alertText: string;
  alertSuccess: boolean;
  isLoading: boolean;
  screen: screens;
};

type featureContextActionsType = {
  type: string;
  payload?: {
    type?: boolean;
    text?: string;
    isLoading?: boolean;
    screen?: screens;
  };
};

//?auth context types

type UserModel = {
  name: string;
  email: string;
  description?: string;
  image?: {
    assetId?: string;
    url?: string;
  };
};

type initialAuthContextStateType = {
  user: UserModel | null;
  token: string | null;
};

type authContextActionsType = {
  type: string;
  payload?: {
    user?: UserModel;
    token?: string;
  };
};

type NoteMetaData = {
  _id: string;
  title: string;
  content: string;
  privacy: string;
  images: noteImages[];
  userId: UserModel;
  createdAt: Date;
};

type noteImages = {
  assetId: string;
  url: string;
}[];

type notePrivacy = 'public' | 'private';
