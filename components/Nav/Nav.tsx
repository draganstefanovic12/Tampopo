import { useUser } from "../../features/user/context/UserContext";
import Link from "next/link";

const Nav = () => {
  const { user } = useUser();

  const aniListLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectURI}&response_type=code`;
  return (
    <nav className="flex z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between child:text-black">
      <Link href="/">Home</Link>
      <span>{user ? user.name : <a href={aniListLink}>Login with Anilist</a>}</span>
    </nav>
  );
};

export default Nav;
