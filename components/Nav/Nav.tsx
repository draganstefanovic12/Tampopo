import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex fixed top-0 z-50 bg-white w-full p-3 shadow-md hover:shadow-lg transition-shadow">
      <Link href="/">Home</Link>
    </nav>
  );
};

export default Nav;
