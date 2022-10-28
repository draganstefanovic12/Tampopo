import { useUser } from "../../features/user/context/UserContext";
import Link from "next/link";
import GetAccessToken from "../GetAccessToken";

const Nav = () => {
  const { user } = useUser();

  return (
    <nav className="flex z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between child:text-black">
      <Link href="/">Home</Link>
      <span>{user ? user.name : <GetAccessToken />}</span>
    </nav>
  );
};

export default Nav;
