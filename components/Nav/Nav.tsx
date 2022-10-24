import Link from "next/link";

const Nav = () => {
  const redirect_uri = "http://localhost:3000";
  const client_id = "9875";

  return (
    <nav className="flex fixed top-0 z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow justify-between">
      <Link href="/">Home</Link>
      <a
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`}
      >
        Login with AniList
      </a>
    </nav>
  );
};

export default Nav;
