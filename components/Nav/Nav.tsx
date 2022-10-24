import Link from "next/link";
import GetAccessToken from "../GetAccessToken";

const Nav = () => {
  return (
    <nav className="flex fixed top-0 z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between">
      <Link href="/">Home</Link>
      <GetAccessToken />
    </nav>
  );
};

export default Nav;
