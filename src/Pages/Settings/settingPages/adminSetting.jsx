import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import FlagIcon from "@mui/icons-material/Flag";
import BedIcon from "@mui/icons-material/Bed";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HotelIcon from "@mui/icons-material/Hotel";
import StadiumIcon from "@mui/icons-material/Stadium";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import EmailIcon from "@mui/icons-material/Email";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardHeader from "../../../Components/DashboardHeader";
import { Routes, Route, Link } from "react-router-dom";
import "./adminSetting.css";
import Suppliers from "../AdminSettingPages/Suppliers";
import Destinations from "../AdminSettingPages/Destinations";
import RoomType from "../AdminSettingPages/RoomType";
import MealPlan from "../AdminSettingPages/MealPlan";
import Hotel from "../AdminSettingPages/Hotel/Hotel";
import Activity from "../AdminSettingPages/Activity/Activity";
import Transfer from "../AdminSettingPages/Transfer";
import DayItinerary from "../AdminSettingPages/DayItinerary";
import LeadSource from "../AdminSettingPages/LeadSource";
import PackageTheme from "../AdminSettingPages/PackageTheme";
import MailSetting from "../AdminSettingPages/MailSetting";
import WeatherSetting from "../AdminSettingPages/WeatherSetting";
import Currency from "../AdminSettingPages/Currency";

export default function AdminSetting() {
  return (
    <main>
      <DashboardHeader title="Admin Setting" />

      <h2 className="admin-heading2">System Masters</h2>
      <p className="heading-text">
        All settings related to system masters like your contracted hotels,
        transfers, activities.
      </p>

      <section className="button-grid">
        <Link to={"/suppliers"}>
          <SupervisedUserCircleIcon fontSize="large" />
          Suppliers
        </Link>

        <Link to={"/destinations"}>
          <FlagIcon fontSize="large" />
          Destinations
        </Link>

        <Link to={"/roomType"}>
          <BedIcon fontSize="large" />
          Room type
        </Link>

        <Link to={"/mealPlan"}>
          <StorefrontIcon fontSize="large" />
          Meal plan
        </Link>

        <Link to={"/hotel"}>
          <HotelIcon fontSize="large" />
          Hotel
        </Link>

        <Link to={"/activity"}>
          <StadiumIcon fontSize="large" />
          Activity
        </Link>

        <Link to={"/transfer"}>
          <DirectionsCarIcon fontSize="large" />
          Transfer
        </Link>

        <Link to={"/dayItinerary"}>
          <ContentPasteIcon fontSize="large" />
          Day itinerary
        </Link>

        <Link to={"/leadSource"}>
          <LeaderboardIcon fontSize="large" />
          Lead source
        </Link>

        <Link to={"/packageTheme"}>
          <BackupTableIcon fontSize="large" />
          Package theme
        </Link>

        <Link to={"/mailSetting"}>
          <EmailIcon fontSize="large" />
          Mail setting
        </Link>
        <Link to={"/weatherSetting"}>
          <ThunderstormIcon fontSize="large" />
          Weather setting
        </Link>

        <Link to={"/currency"}>
          <AttachMoneyIcon fontSize="large" />
          Currency
        </Link>
      </section>
    </main>
  );
}
