import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TeamManagement from "./settingPages/teamManag";
import OrganisationSetting from "./settingPages/organisationSetting";
import DefaultSetting from "./settingPages/defaultSetting";
import AdminSetting from "./settingPages/adminSetting";
import PackagesInclusions from "./settingPages/packagesInclusions";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TuneIcon from "@mui/icons-material/Tune";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SegmentIcon from "@mui/icons-material/Segment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./setting.css";


function Setting() {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [pageName, setPageName] = React.useState("Team Management");

  const path = window.location.pathname;

  React.useEffect(() => {
    if (path == "/settings") {
      setPageName("Team Management");
    };
  });


  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex w-full fixed z-10 h-14">
        <div className="border bg-[#f9fbfc] hidden lg:flex w-14 lg:w-[20%] custom-heading text-xl items-center px-4 font-bold text-black h-14">
          Setting
        </div>
        <div
          onClick={() => {
            setShow(!show);
          }}
          className="lg:hidden border flex items-center custom-Menu bg-[#f9fbfc] w-14 lg:w-[20%] px-4 font-bold text-black h-14"
        >
          {show ? <CloseIcon /> : <SegmentIcon />}
        </div>
        <div className="bg-[#f5f7f9] text-black font-bold flex items-center flex-1 px-4 custom-TopBar h-14 border">
          {" "}
          {pageName}{" "}
        </div>
      </div>

      <div className="flex w-full flex-row mt-14">
        <div
          className={`${
            show ? "block" : "hidden"
          }  lg:block  bg-[#f9fbfc] ph-4 w-14 fixed z-10 lg:w-[20%] border-r-2 h-full`}
        >
          <div
            onClick={() => {
              navigate("/settings/team_management");
              setPageName("Team Management");
            }}
            className="hover:bg-[#ededed] cursor-pointer flex  px-4  h-12 items-center gap-2"
          >
            <div>
              <PersonIcon />
            </div>
            <div className="hidden lg:block text-[0.8rem]">Team Management</div>
          </div>

          <div
            onClick={() => {
              navigate("/settings/organisation_setting");
              setPageName("Organisation Setting");
            }}
            className="hover:bg-[#ededed] cursor-pointer flex  px-4  h-12 items-center gap-2"
          >
            <div>
              <ApartmentIcon />
            </div>
            <div className=" hidden lg:block text-[0.8rem]">
              Organizations Setting
            </div>
          </div>

          <div
            onClick={() => {
              navigate("/settings/default_setting");
              setPageName("Default Setting");
            }}
            className="hover:bg-[#ededed] cursor-pointer flex  px-4  h-12 items-center gap-2"
          >
            <div>
              <TuneIcon />
            </div>
            <div className=" hidden lg:block text-[0.8rem]">
              Default Settings
            </div>
          </div>

          <div
            onClick={() => {
              navigate("/settings/admin_setting");
              setPageName("Admin Setting");
            }}
            className="hover:bg-[#ededed] cursor-pointer flex  px-4  h-12 items-center gap-2"
          >
            <div>
              <AdminPanelSettingsIcon />
            </div>
            <div className=" hidden lg:block text-[0.8rem]">Admin Settings</div>
          </div>

          <div
            onClick={() => {
              navigate("/settings/packages_inclusions");
              setPageName("Packages Inclusions");
            }}
            className="hover:bg-[#ededed] cursor-pointer flex  px-4  h-12 items-center gap-2"
          >
            <div>
              <CheckIcon />
            </div>
            <div className=" hidden lg:block text-[0.8rem]">
              Package Inclusions
            </div>
          </div>
        </div>

        <div className=" pl-3 pb-0 lg:ml-[20%] w-full lg:w-[80%] h-fit overflow-y-auto ">
          <Routes>
            <Route path="/" element={<TeamManagement />} />
            <Route path="/team_management" element={<TeamManagement />} />
            <Route
              path="/organisation_setting"
              element={<OrganisationSetting />}
            />
            <Route path="/default_setting" element={<DefaultSetting />} />
            <Route path="/admin_setting" element={<AdminSetting />} />
            <Route
              path="/packages_inclusions"
              element={<PackagesInclusions />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Setting;
