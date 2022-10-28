import { useUser } from "../../features/user/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "../../api/anilistApi";

const GetAccessToken = () => {
  const router = useRouter();
  const { auth, setAuth } = useUser();

  const handleAuthAccessToken = async () => {
    //when authorization code gets sent back i fetch access_code and save it in localStorage
    const auth = await getAccessToken(router.query.code as string);
    if (auth) {
      localStorage.setItem("list_auth", JSON.stringify(auth));
      router.replace("/", "/");
      setAuth(auth.access_token);
    }
  };

  useEffect(() => {
    !auth && router.query.code && handleAuthAccessToken();
  }, []);

  const aniListLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectURI}&response_type=code`;

  return (
    <a className="text-black" href={aniListLink}>
      Login with AniList
    </a>
  );
};

export default GetAccessToken;
