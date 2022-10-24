import { useUserStore } from "../../zustand/store";
import { handleFetchCurrentUser } from "../../../api/anilistApi";

const useLogin = () => {
  const { handleLoginUser } = useUserStore() as any;

  const loginUser = async () => {
    const auth = JSON.parse(localStorage.getItem("manilist")!);
    if (auth) {
      const usr = await handleFetchCurrentUser(auth.access_token);
      handleLoginUser(usr.data);
    }
  };
  loginUser();

  return { loginUser };
};

export default useLogin;
