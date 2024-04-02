import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
