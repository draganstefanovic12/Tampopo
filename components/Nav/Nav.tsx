import Link from "next/link";
import { useUserStore } from "../../features/zustand/store";
import GetAccessToken from "../GetAccessToken";

const Nav = () => {
  const { user } = useUserStore();

  return (
    <nav className="flex fixed top-0 z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between">
      <Link href="/">Home</Link>
      {user ? user.name : <GetAccessToken />}
    </nav>
  );
};

export default Nav;
