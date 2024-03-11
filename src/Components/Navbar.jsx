import React from "react";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between w-100 bg-white px-2">
      <div className="w-28">
        <img src={logo} alt="logo" />{" "}
      </div>
      <div>icons</div>
    </div>
  );
};

export default Navbar;
