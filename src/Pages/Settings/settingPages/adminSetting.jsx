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
import CommuteIcon from '@mui/icons-material/Commute';
import { Link } from "react-router-dom";
import "./adminSetting.css";

export default function AdminSetting() {
  return (
    <main className="w-full h-full" >

      <h2 className="admin-heading2">System Masters</h2>
      <p className="heading-text">
        All settings related to system masters like your contracted hotels,
        transfers, activities.
      </p>

      <section className="button-grid flex flex-wrap">

        <Link className="w-[48%] md:w-[30%]" to={"/suppliers"}>
          <SupervisedUserCircleIcon fontSize="large" />
          Suppliers
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/destinations"}>
          <FlagIcon fontSize="large" />
          Destinations
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/roomType"}>
          <BedIcon fontSize="large" />
          Room Category
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/mealPlan"}>
          <StorefrontIcon fontSize="large" />
          Meal plan
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/accommodation"}>
          <HotelIcon fontSize="large" />
          Accomodation
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/driver"}>
          <CommuteIcon fontSize="large" />
          Driver
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/transfer"}>
          <DirectionsCarIcon fontSize="large" />
          Vehicle
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/dayItinerary"}>
          <ContentPasteIcon fontSize="large" />
          Day itinerary
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/leadSource"}>
          <LeaderboardIcon fontSize="large" />
          Lead source
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/packageTheme"}>
          <BackupTableIcon fontSize="large" />
          Package theme
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/mailSetting"}>
          <EmailIcon fontSize="large" />
          Mail setting
        </Link>
        <Link className="w-[48%] md:w-[30%]" to={"/weatherSetting"}>
          <ThunderstormIcon fontSize="large" />
          Weather setting
        </Link>

        <Link className="w-[48%] md:w-[30%]" to={"/currency"}>
          <AttachMoneyIcon fontSize="large" />
          Currency
        </Link>
      </section>
    </main>
  );
}
