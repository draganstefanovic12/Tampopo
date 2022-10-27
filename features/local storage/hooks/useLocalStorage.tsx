type Auth = {
  access_token: string;
  refresh_token: string;
};

const useLocalStorage = () => {
  const auth = JSON.parse(localStorage.getItem("list_auth")!) as Auth;

  return { auth };
};

export default useLocalStorage;
