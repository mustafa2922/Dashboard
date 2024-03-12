import React from "react";
import logo from "../assets/images/logo.png";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-screen bg-white px-1 h-[3rem]">
      <div className="md:visible invisible flex items-center w-[50%] h-full ">

        <div className="w-[22%] h-full ">
          <img src={logo} className="h-full w-full object-contain" alt="logo" />
        </div>
        <div className="flex ml-8 border border-slate-300 focus:border-slate-800 hover:border-slate-800 rounded-md" >

          <select className="px-2 focus:outline-none w-[8rem] rounded-md" name="cars" id="cars">
            <option value="volvo">All</option>
            <option value="volvo">Queries</option>
            <option value="volvo">Itineraries</option>
            <option value="volvo">Clients</option>
            <option value="volvo">Agents</option>
            <option value="volvo">Corporate</option>
          </select>
          <div>
            <input placeholder="Search " className=" border-l-slate-300 border-l px-2 w-[12rem] focus:outline-none " />
            <SearchIcon className="text-slate-600" />
          </div>

        </div>
      </div>


      <div className="w-[50%] flex items-center justify-end gap-6 mr-3" >
        <button className="bg-[#078d80] flex justify-center items-center gap-1 p-2 rounded-md text-white font-bold text-sm"> <DesktopWindowsOutlinedIcon style={{ fontSize: 18 }} /> Market Place </button>

        <div className="relative group flex justify-center cursor-pointer">
          <NotificationsActiveOutlinedIcon />
          <div className="group-hover:visible invisible w-fit p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute" >Notifications</div>
        </div>

        <div className="relative group flex justify-center cursor-pointer">
          <SettingsOutlinedIcon />
          <div className="group-hover:visible invisible w-fit p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute" >Settings</div>
        </div>

        <div className="relative group flex  justify-center cursor-pointer">
          <ReceiptLongOutlinedIcon />
          <div className="group-hover:visible flex justify-center items-center invisible w-[8rem] p-1 h-fit rounded-md top-9 text-sm  bg-black text-white absolute" >Company Expense</div>
        </div>

        <div ><AccountCircleOutlinedIcon /> </div>

      </div>

    </div>
  );
};

export default Navbar;
