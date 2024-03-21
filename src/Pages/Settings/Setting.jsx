// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem, { listItemClasses } from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import TeamManagement from "./settingPages/teamManag";
// import OrganisationSetting from "./settingPages/organisationSetting";
// import DefaultSetting from "./settingPages/defaultSetting";
// import AdminSetting from "./settingPages/adminSetting";
// import PackagesInclusions from "./settingPages/packagesInclusions";
// import PersonIcon from "@mui/icons-material/Person";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import TuneIcon from "@mui/icons-material/Tune";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import CheckIcon from "@mui/icons-material/Check";
// import './setting.css'

// const drawerWidth = 218;

// function Setting(props) {
//   const navigate = useNavigate();
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <h1 className="font-bold px-5 mt-2 text-black">SETTING</h1>
//       <List
//         sx={{
//           [`& .active, & .${listItemClasses.root}:hover`]: {
//             backgroundColor: "#4557fe",
//             color: "white",
//             "& svg": { color: "white" },
//           },
//         }}
//       >
//         {[
//           {
//             text: "Team Management",
//             icon: <PersonIcon />,
//             path: "team_management",
//           },
//           {
//             text: "Organisation Setting",
//             icon: <ApartmentIcon />,
//             path: "organisation_setting",
//           },
//           {
//             text: "Default Setting",
//             icon: <TuneIcon />,
//             path: "default_setting",
//           },
//           {
//             text: "Admin Setting",
//             icon: <AdminPanelSettingsIcon />,
//             path: "admin_setting",
//           },
//           {
//             text: "Packages Inclusions",
//             icon: <CheckIcon />,
//             path: "packages_inclusions",
//           },
//         ].map((item, index) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton onClick={() => navigate(`${item.path}`)}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="absolute"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: {
//             sm: `${drawerWidth}px`,
//             backgroundColor: "white",
//             height: "0%",
//           },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon style={{ color: "black" }} />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Routes>
//           <Route path="/team_management" element={<TeamManagement />} />
//           <Route
//             path="/organisation_setting"
//             element={<OrganisationSetting />}
//           />
//           <Route path="/default_setting" element={<DefaultSetting />} />
//           <Route path="/admin_setting" element={<AdminSetting />} />
//           <Route path="/packages_inclusions" element={<PackagesInclusions />} />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// Setting.propTypes = {
//   window: PropTypes.func,
// };

// export default Setting;

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
        </div>{" "}
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

        <div className="custom-contaner p-8 lg:ml-[20%] w-full lg:w-[80%] h-full overflow-y-scroll ">
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
