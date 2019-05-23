import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-3 text-right">
      Copyright &copy; {new Date().getFullYear()} DevNull
    </footer>
  );
};

export default Footer;
