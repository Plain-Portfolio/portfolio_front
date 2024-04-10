import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main style={{ height: "100%" }}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
