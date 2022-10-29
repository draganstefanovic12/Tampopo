import { User } from "../types/types";
import { useAuth } from "../../auth/context/AuthContext";
import { useQuery } from "react-query";
import { handleFetchCurrentUser } from "../../../api/anilistApi";
import { createContext, ReactNode, useContext } from "react";

type UserContextProps = {
  user: User | undefined;
};

type ContextChildren = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextProps);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: ContextChildren) => {
  //using state for auth tokens because the app needs to mount first to access local storage
  const { auth } = useAuth();
  //fetching user info only if auth state exists
  const { data: user } = useQuery(
    ["user"],
    () => {
      return handleFetchCurrentUser(auth!);
    },
    { enabled: !!auth, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
