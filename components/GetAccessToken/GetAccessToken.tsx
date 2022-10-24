import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "../../api/anilistApi";

const GetAccessToken = () => {
  const { query, asPath } = useRouter();

  const setNewUserToLocalStorage = async () => {
    //when authorization code gets sent back i fetch access_code and save it in localStorage
    const auth = getAccessToken(query.code as string);
    auth && localStorage.setItem("manilist", JSON.stringify(auth));
  };

  useEffect(() => {
    asPath.length > 1 && setNewUserToLocalStorage();
  }, []);

  const aniListLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectURI}&response_type=code`;

  return <a href={aniListLink}>Login with AniList</a>;
};

export default GetAccessToken;
