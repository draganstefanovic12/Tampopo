import { useUserStore } from "../../zustand/store";
import { handleFetchCurrentUser } from "../../../api/anilistApi";

const useLogin = () => {
  const { handleLoginUser } = useUserStore() as any;

  const handleLogin = async () => {
    //checks if the user info exists in local storage
    const user = JSON.parse(localStorage.getItem("manilistUser")!);

    if (user) {
      handleLoginUser(user);
    }
  };

  const handleRefreshUserData = async () => {
    //refreshes user info
    const auth = JSON.parse(localStorage.getItem("list_auth")!);

    if (auth) {
      const usr = await handleFetchCurrentUser(auth.access_token);
      // usr && handleLoginUser(usr.data.Viewer);
    }
  };

  return { handleLogin };
};

export default useLogin;
