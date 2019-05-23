import React from "react";

const styles = {
  position: "absolute",
  width: "100%",
  bottom: 0
};

const Footer = () => {
  return (
    <footer
      style={styles}
      className="bg-dark text-white mt-5 p-3 text-right navbar-fixed-bottom"
    >
      <div className="container">
        Copyright &copy; {new Date().getFullYear()} DevNull
      </div>
    </footer>
  );
};

export default Footer;
