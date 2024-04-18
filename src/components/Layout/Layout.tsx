import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 6.6rem)", paddingTop: "6.6rem" }}>
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
