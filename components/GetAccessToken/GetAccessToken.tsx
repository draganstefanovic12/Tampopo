import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "../../api/anilistApi";

const GetAccessToken = () => {
  const { query } = useRouter();

  useEffect(() => {
    const accessToken = query.code && getAccessToken(query.code as string);
    accessToken && localStorage.setItem("manilist", JSON.stringify(accessToken));
  }, []);

  return <div></div>;
};

export default GetAccessToken;
