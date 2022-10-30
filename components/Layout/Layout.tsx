import { useRouter } from "next/router";
import Footer from "../Footer";
import Nav from "../Nav";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const { query } = useRouter();
  return (
    <>
      <Nav />
      <main className="bg-primary min-h-screen w-full lg:w-auto">{children}</main>
      {!query.id && <Footer />}
    </>
  );
};

export default Layout;
