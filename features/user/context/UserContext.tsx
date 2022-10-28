import { User } from "../types/types";
import { useQuery } from "react-query";
import { handleFetchCurrentUser, refreshAccessToken } from "../../../api/anilistApi";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextProps = {
  user: User | undefined;
  setAuth: Dispatch<SetStateAction<string | undefined>>;
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
  //fetches user info on page load if auth exists
  const { data: user } = useQuery(
    ["user"],
    () => {
      return handleFetchCurrentUser(auth!);
    },
    { enabled: !!auth, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    (async () => {
      const currentAuth = JSON.parse(localStorage.getItem("list_auth")!);

      if (currentAuth) {
        const refreshedToken = await refreshAccessToken(currentAuth.refresh_token);

        localStorage.setItem("list_auth", JSON.stringify(refreshedToken));
        refreshedToken && setAuth(refreshedToken.access_token);
      }
    })();
  }, []);

  return <UserContext.Provider value={{ user, setAuth }}>{children}</UserContext.Provider>;
};
