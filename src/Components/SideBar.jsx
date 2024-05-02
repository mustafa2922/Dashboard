import React from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="fixed w-[4%] flex flex-col items-center mt-3" >
      <Link to={"/"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <SpaceDashboardOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Dashboard
          </div>
        </div>
      </Link>

      <Link to={"/queries"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <ListAltOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Queries
          </div>
        </div>
      </Link>

      <Link to={"/itineraries"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <DepartureBoardOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Itineraries
          </div>
        </div>
      </Link>

      <Link to={"/clients"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <AccountCircleOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Clients
          </div>
        </div>
      </Link>

      <Link to={"/agents"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <SupportAgentOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Agents
          </div>
        </div>
      </Link>

      <Link to={"/corporate"}>
        <div className="group flex">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <ApartmentOutlinedIcon />
          </div>
          <div className="invisible rounded-lg group-hover:visible self-center flex items-center justify-center left-16 absolute h-7 w-fit text-sm p-2 bg-black text-white">
            Corporate
          </div>
        </div>
      </Link>

      <div className="group  w-[120%] flex group justify-center ">
        <div className="flex items-center ">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <AssessmentOutlinedIcon />
          </div>

          <div className="group-hover:visible invisible flex flex-col p-2 md:text-base bg-[#12344d] text-xs rounded-lg h-fit w-[12rem] md:w-[15rem] left-16  absolute">
            <Link to={'/profitLossReport'} >
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Profit/Loss Report</div>
              </div>
            </Link>

            <Link to={'/attendanceReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Attendance Report</div>
              </div>
            </Link>

            <Link to={'/notesReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Notes Report</div>
              </div>
            </Link>

            <Link to={'/collectionReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Collection Report</div>
              </div>
            </Link>

            <Link to={'/toursReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Tours Report</div>
              </div>
            </Link>

            <Link to={'/taskReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Task's / Followup's Report</div>
              </div>
            </Link>

            <Link to={'/MIS-report'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">MIS Report</div>
              </div>
            </Link>

            <Link to={'/ledgerReport'}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Ledger Report</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="group w-[120%] flex group justify-center ">
        <div className="flex items-center ">
          <div className="p-2 m-1 cursor-pointer  hover:bg-slate-600 rounded-md">
            <LayersOutlinedIcon />
          </div>

          <div className="group-hover:visible invisible flex flex-col p-2 md:text-base text-xs  bg-[#12344d] rounded-lg h-fit w-[11rem] md:w-[13rem] left-16  absolute">
            <Link to={"/marketingDashboard"}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Marketing Dashboard</div>
              </div>
            </Link>

            <Link to={"/clientsGroup"}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Clients Group</div>
              </div>
            </Link>

            <Link to={"/emailTemplate"}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Email Templates</div>
              </div>
            </Link>

            <Link to={"/campagins"}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Campaigns</div>
              </div>
            </Link>

            <Link to={"/landingPages"}>
              <div className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-slate-600">
                <AdjustOutlinedIcon style={{ fontSize: "20px" }} />
                <div className="ml-1">Landing Pages</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
