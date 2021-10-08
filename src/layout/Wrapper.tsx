import React from "react";
import Footer from "../components/Footer/Footer";

const Wrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
