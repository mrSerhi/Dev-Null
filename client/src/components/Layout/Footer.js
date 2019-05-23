import React from "react";

const styles = {
  position: "fixed",
  width: "100%",
  bottom: 0
};

const Footer = () => {
  return (
    <div style={styles}>
      <footer className="bg-dark text-white mt-5 p-3 text-right navbar-fixed-bottom">
        <div className="container">
          Copyright &copy; {new Date().getFullYear()} DevNull
        </div>
      </footer>
    </div>
  );
};

export default Footer;
