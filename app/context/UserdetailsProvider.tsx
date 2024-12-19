"use client"

import React, { createContext, useContext, useState } from "react";

const UserDetailsContext = createContext(null);

export const GetUserDetails = () => {
  return useContext(UserDetailsContext);
};

export interface userFromPool {
  username: string;
  userId: string,
  signInDetails: {
    loginId: string,
    authFlowType: string
  },
  isAdmin: boolean
}

export const UserDetailsProvider = (props) => {
  const [userSignupEmail, setUserSignupEmail] = useState<string>('');
  const [userFromPool, setUserFromPool] = useState<userFromPool | null>(null);

  return (
    <UserDetailsContext.Provider value={{ userSignupEmail, setUserSignupEmail, userFromPool, setUserFromPool }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};
