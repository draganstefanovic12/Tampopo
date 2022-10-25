import { useUserStore } from "../../zustand/store";
import { handleFetchCurrentUser, refreshAccessToken } from "../../../api/anilistApi";

const useLogin = () => {
  const { handleLoginUser } = useUserStore() as any;

  const handleLogin = async () => {
    //checks if the user info exists in local storage
    const user = JSON.parse(localStorage.getItem("manilistUser")!);

    if (user) {
      handleLoginUser(user);
      handleRefreshUserData();
    }
  };

  const handleRefreshUserData = async () => {
    //refreshes user info
    const auth = JSON.parse(localStorage.getItem("list_auth")!);

    if (auth) {
      // const newToken = (await refreshAccessToken(auth.refresh_token)) as any;
      // localStorage.setItem("list_auth", JSON.stringify(newToken));
      const user = await handleFetchCurrentUser(auth.access_token);
      user && handleLoginUser(user);
    }
  };

  return { handleLogin };
};

export default useLogin;
