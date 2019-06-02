import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-3 text-right navbar-fixed-bottom">
      <div className="container">
        Copyright &copy; {new Date().getFullYear()} DevNull
      </div>
    </footer>
  );
};

export default Footer;
