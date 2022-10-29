import { Auth } from "../types/types";
import { useRouter } from "next/router";
import { getAccessToken, refreshAccessToken } from "../../../api/anilistApi";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  auth: string | undefined;
  setAuth: Dispatch<SetStateAction<string | undefined>>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [auth, setAuth] = useState<string>();

  const handleAuthAccessToken = async () => {
    //when authorization code gets sent back i fetch access_code and save it in localStorage
    const token = await getAccessToken(router.query.code as string);

    if (token) {
      localStorage.setItem("list_auth", JSON.stringify(token));
      router.replace("/", "/");
      setAuth(token.access_token);
    }
  };

  const handleRefreshToken = async (currentAuth: Auth) => {
    const refreshedToken = await refreshAccessToken(currentAuth.refresh_token);

    localStorage.setItem("list_auth", JSON.stringify(refreshedToken));
    refreshedToken && setAuth(refreshedToken.access_token);
  };

  useEffect(() => {
    const currentAuth = JSON.parse(localStorage.getItem("list_auth")!);

    if (currentAuth) {
      //refreshes access token every 1 hour or on page load
      //since the token only lasts 1 hour
      handleRefreshToken(currentAuth);
      //i run the function once without the delay
      const runsEveryHour = setInterval(() => {
        handleRefreshToken(currentAuth);
      }, 1000 * 60 * 60);

      return () => {
        //returns clear interval so it doesnt cause rerenders
        clearInterval(runsEveryHour);
      };
    }

    //if theres no token in local storage and code query exists it means a user just logged in
    //so i get the code and clear the url to stop new fetches
    !currentAuth && router.query.code && handleAuthAccessToken();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
