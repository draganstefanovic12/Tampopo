import Nav from "../Nav";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <main className="bg-primary min-h-screen w-max md:w-auto">{children}</main>
    </>
  );
};

export default Layout;
