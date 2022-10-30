import { useUser } from "../../features/user/context/UserContext";
import { useAuth } from "../../features/auth/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import logout from "../../assets/images/logout.svg";
import Search from "../../features/search/components/Search";

const Nav = () => {
  const { user } = useUser();
  const { handleClearToken } = useAuth();

  const aniListLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectURI}&response_type=code`;

  return (
    <nav className="flex z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between child:text-black">
      <Link href="/">Home</Link>
      <div className="flex gap-3">
        <Search />
        {user ? (
          <div className="flex gap-2 align-middle">
            <span className="pointer-events-none">{user.name}</span>
            <Image
              onClick={handleClearToken}
              className="hover:cursor-pointer"
              src={logout}
              alt="logout"
            />
          </div>
        ) : (
          <a href={aniListLink}>Login with Anilist</a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
