import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
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
import CheckIcon from "@mui/icons-material/Check";
import "./setting.css";

function Setting() {
  return (
    <div className="flex h-full w-full">
      {/* SIDEBAR */}
      <div className="bg-[#f9fbfc] ph-4 border-r-2 border-t-2 h-full w-[20%]">
        <div className="text-xl mt-4 px-4 font-bold text-black h-10">
          Settings
        </div>

        <div className="hover:bg-[#ededed] cursor-pointer flex  px-4 border h-12 items-center gap-2">
          <div>
            <PersonIcon />
          </div>
          <div>Team Management</div>
        </div>

        <div className="hover:bg-[#ededed] cursor-pointer flex  px-4 border h-12 items-center gap-2">
          <div>
            <ApartmentIcon />
          </div>
          <div>Organizations Setting</div>
        </div>

        <div className="hover:bg-[#ededed] cursor-pointer flex  px-4 border h-12 items-center gap-2">
          <div>
            <TuneIcon />
          </div>
          <div>Default Settings</div>
        </div>

        <div className="hover:bg-[#ededed] cursor-pointer flex  px-4 border h-12 items-center gap-2">
          <div>
            <AdminPanelSettingsIcon />
          </div>
          <div>Admin Settings</div>
        </div>

        <div className="hover:bg-[#ededed] cursor-pointer flex  px-4 border h-12 items-center gap-2">
          <div>
            <CheckIcon />
          </div>
          <div>Package Inclusions</div>
        </div>
      </div>
      {/* TOPBAR + CONTAINER */}
      <div className="w-[80%] h-full">
        {/* TOPBAR */}
        <div className="bg-[#f5f7f9] w-full h-14 border"></div>
        {/* CONTAINER */}
        <div></div>
      </div>
    </div>
  );
}

export default Setting;

<Routes>
  <Route path="/team_management" element={<TeamManagement />} />
  <Route path="/organisation_setting" element={<OrganisationSetting />} />
  <Route path="/default_setting" element={<DefaultSetting />} />
  <Route path="/admin_setting" element={<AdminSetting />} />
  <Route path="/packages_inclusions" element={<PackagesInclusions />} />
</Routes>;
