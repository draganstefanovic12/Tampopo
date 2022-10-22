import Nav from "../Nav/Nav";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <main className="bg-primary min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
