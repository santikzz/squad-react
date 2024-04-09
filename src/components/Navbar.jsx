// import React from "react";

// import "../styles/navbar.scss";

const Navbar = ({ children }) => {
  return <div className="shadow-md w-full z-30 sticky top-0 left-0 right-0 h-16 bg-black flex flex-row text-white justify-between items-center px-6 py-2 border-b-2 border-stone-800">{children}</div>;
};

export default Navbar;
