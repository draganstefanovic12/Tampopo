import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../../features/zustand/store";
import { getAccessToken, handleFetchCurrentUser } from "../../api/anilistApi";

const GetAccessToken = () => {
  const { query, asPath } = useRouter();

  const setNewUserToLocalStorage = async () => {
    // const accessToken = getAccessToken(query.code as string);
    // accessToken && localStorage.setItem("manilist", JSON.stringify(accessToken));
  };

  useEffect(() => {
    //sets the auth info to local storage if
    asPath.length > 1 && setNewUserToLocalStorage();
    // handleFetchCurrentUser(token.access_token);
  }, []);

  const aniListLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectURI}&response_type=code`;

  return <a href={aniListLink}>Login with AniList</a>;
};

export default GetAccessToken;
