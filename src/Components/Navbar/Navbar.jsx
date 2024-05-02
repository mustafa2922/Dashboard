import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({sendDataToApp}) => {

  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    sendDataToApp(click);
  }


  return (
    <div className="flex sticky top-0 z-50 flex-row justify-between items-center w-full bg-[#eff3f7] px-2 h-[3rem]">
      
      <div className="flex md:justify-start justify-center   items-center lg:w-[50%] w-[4rem] md:w-[60%] h-full ">

        <div className="md:flex hidden w-[8rem] h-full ">
          <img src={logo} className="h-full w-full object-contain" alt="logo" />
        </div>

        <div onClick={()=>{handleClick()}} className="md:hidden flex" >
          {click ? <CloseIcon/> : <MenuIcon/> }
        </div>

        <div className="md:flex hidden ml-8 border border-slate-300 active:border-slate-800 focus:border-slate-800 hover:border-slate-800 rounded-md">
          <select className="px-2 focus:outline-none w-[8rem] rounded-l-md">
            <option value="All">All</option>
            <option value="Queries">Queries</option>
            <option value="Itineraries">Itineraries</option>
            <option value="Clients">Clients</option>
            <option value="Agents">Agents</option>
            <option value="Corporate">Corporate</option>
          </select>
          <div>
            <div className="relative">
              <input
                placeholder="Search "
                className=" border-l-slate-300 border-l text-sm h-7 rounded-r-md pl-2 pr-8  focus:outline-none "
              />
              <SearchIcon className="text-slate-600 absolute right-0.5 top-1" />
            </div>
          </div>
        </div>

      </div>

      <div className="md:w-[50%] w-[100%] h-full  flex items-center justify-end gap-3 sm:gap-5 mr-3">

        <button className="bg-[#078d80] flex justify-center items-center gap-1 p-1 sm:p-2 rounded-md text-white font-bold  text-xs lg:text-sm">
          <DesktopWindowsOutlinedIcon style={{ fontSize: 18 }} /> <span className="sm:block hidden" >Market Place</span>
        </button>

        <div className="relative group flex z-10 justify-center cursor-pointer">
          <NotificationsActiveOutlinedIcon />
          <div className="group-hover:visible invisible w-fit p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute">
            Notifications
          </div>
        </div>

        <Link to={"/settings"}>
          <div className="relative group z-10  flex justify-center cursor-pointer">
            <SettingsOutlinedIcon />
            <div className="group-hover:visible invisible w-fit p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute">
              Settings
            </div>
          </div>
        </Link>

        <Link to={"/expenses"}>
          <div className="relative group flex z-10  justify-center cursor-pointer">
            <ReceiptLongOutlinedIcon />
            <div className="group-hover:visible flex justify-center items-center invisible w-[8rem] p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute">
              Company Expense
            </div>
          </div>
        </Link>

        <div className="cursor-pointer">
          <AccountCircleOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
