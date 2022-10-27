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
  const [auth, setAuth] = useState<string>();
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

  useEffect(() => {
    user && localStorage.setItem("manilistUser", JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
