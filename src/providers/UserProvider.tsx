import React, { useState } from 'react';
import { UserResponse as userInfoType  } from '../types';

type ContextType = {
  userInfo: userInfoType;
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: (val: boolean) => void;
  setUserInfo: (info: userInfoType) => void;
  setLoading: (val: boolean) => void;
};

export const UserContext = React.createContext<ContextType>({
  userInfo: {
    id: 0,
    name: '',
    email: '',
  },
  loading: true,
  loggedIn: false,
  setLoggedIn: () => {},
  setUserInfo: () => {},
  setLoading: () => {},
});

interface UserProvierProps {};

const UserProvider:  React.FC<UserProvierProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    id: 0,
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        loggedIn,
        loading,
        setUserInfo: (info: userInfoType) => {
          setUserInfo(info);
        },
        setLoggedIn: (val: boolean) => {
          setLoggedIn(val);
        },
        setLoading: (val: boolean) => {
          setLoading(val);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
};

export default UserProvider;