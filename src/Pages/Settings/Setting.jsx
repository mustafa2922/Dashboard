import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
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
import './setting.css'

const drawerWidth = 240;

function Setting(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <h1 style={{ textAlign: "center" }}>SETTING</h1>
      <List
        sx={{
          [`& .active, & .${listItemClasses.root}:hover`]: {
            backgroundColor: "#4557fe",
            color: "white",
            "& svg": { color: "white" },
          },
        }}
      >
        {[
          {
            text: "Team Management",
            icon: <PersonIcon />,
            path: "team_management",
          },
          {
            text: "Organisation Setting",
            icon: <ApartmentIcon />,
            path: "organisation_setting",
          },
          {
            text: "Default Setting",
            icon: <TuneIcon />,
            path: "default_setting",
          },
          {
            text: "Admin Setting",
            icon: <AdminPanelSettingsIcon />,
            path: "admin_setting",
          },
          {
            text: "Packages Inclusions",
            icon: <CheckIcon />,
            path: "packages_inclusions",
          },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(`${item.path}`)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: {
            sm: `${drawerWidth}px`,
            backgroundColor: "white",
            height: "0%",
          },


          margin:'10px'
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="/team_management" element={<TeamManagement />} />
          <Route
            path="/organisation_setting"
            element={<OrganisationSetting />}
          />
          <Route path="/default_setting" element={<DefaultSetting />} />
          <Route path="/admin_setting" element={<AdminSetting />} />
          <Route path="/packages_inclusions" element={<PackagesInclusions />} />
        </Routes>
      </Box>
    </Box>
  );
}

Setting.propTypes = {
  window: PropTypes.func,
};

export default Setting;
