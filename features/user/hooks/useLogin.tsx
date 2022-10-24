import { useUserStore } from "../../zustand/store";
import { handleFetchCurrentUser } from "../../../api/anilistApi";

const useLogin = () => {
  const { handleLoginUser } = useUserStore() as any;

  const handleLogin = async () => {
    const auth = JSON.parse(localStorage.getItem("list_auth")!);
    if (auth) {
      const usr = await handleFetchCurrentUser(auth.access_token);
      usr && handleLoginUser(usr.data.Viewer);
      console.log(usr);
    }
  };

  return { handleLogin };
};

export default useLogin;
