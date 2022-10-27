import { User } from "../types/types";
import { useQuery } from "react-query";
import { handleFetchCurrentUser } from "../../../api/anilistApi";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
  //using auth state like this because the app doesnt mount right away
  const [auth, setAuth] = useState<string>();
  //fetches user info on page load
  const { data: user } = useQuery(
    ["user"],
    () => {
      return handleFetchCurrentUser(auth!);
    },
    { enabled: !!auth, refetchInterval: 10000 }
  );

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("list_auth")!).access_token;
    setAuth(auth);
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
