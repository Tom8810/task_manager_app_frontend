"use client";

import { DepthTwoUser } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type UserContextType = {
  user: DepthTwoUser; // userの型はnullかUserByNameQuery["userByName"]
  setUser: React.Dispatch<React.SetStateAction<DepthTwoUser>>; // setUserの型
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const UserProvider = (props: Props) => {
  const { children } = props;
  const [user, setUser] = useState<DepthTwoUser>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
