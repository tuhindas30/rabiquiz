import React from "react";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";

const Wrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
