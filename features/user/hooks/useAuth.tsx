import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState() as any;

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("list_auth")!);
    if (auth) {
      setAuth(auth.access_token);
    }
  }, []);

  return { auth };
};

export default useAuth;
