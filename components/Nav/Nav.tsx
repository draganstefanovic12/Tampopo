import Link from "next/link";
import { useUserStore } from "../../features/zustand/store";
import GetAccessToken from "../GetAccessToken";

const Nav = () => {
  const { user } = useUserStore();

  return (
    <nav className="flex fixed top-0 z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between child:text-black">
      <Link href="/">Home</Link>
      <span>{user ? user.name : <GetAccessToken />}</span>
    </nav>
  );
};

export default Nav;
