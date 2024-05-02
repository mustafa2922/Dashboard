import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Clients from "./Pages/Clients/Clients";
import Agents from "./Pages/Agents/Agents";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/SideBar";
import Itineraries from "./Pages/Itineraries/Itineraries";
import Queries from "./Pages/Queries/Queries";
import QueriesDetail from "./Pages/Queries/QueriesDetail";
import Corporate from "./Pages/Corporate/Corporate";
import Dashboard from "./Pages/Home/Dashboard";
import Expense from "./Pages/Expense/Expense";
import ClientDetail from "./Pages/Clients/ClientDetail";
import AgentDetails from "./Pages/Agents/AgentDetails";
import EmailTemplate from "./Pages/EmailTemplate/EmailTemplate";
import MarketingDashboard from "./Pages/MarketingDashboard/MarketingDashboard";
import ClientsGroup from "./Pages/ClientsGroup/ClientsGroup";
import Campagins from "./Pages/Campagins/Campagins";
import LandingPages from "./Pages/LandingPages/LandingPages";
import CreateCampaign from "./Pages/createCampaign/CreateCampaign";
import CreateEmailTemplate from "./Pages/CreateEmailTemplate/CreateEmailTemplate";
import CreateLandingPage from "./Pages/CreateLandingPage/CreateLandingPage";
import LedgerReport from "./Pages/Reports/LedgerReport/LedgerReport";
import MIS_Report from "./Pages/Reports/MIS-Report/MIS_Report";
import TaskReport from "./Pages/Reports/TaskReport/TaskReport";
import ToursReport from "./Pages/Reports/ToursReport/ToursReport";
import CollectionReport from "./Pages/Reports/CollectionReport/CollectionReport";
import NotesReport from "./Pages/Reports/NotesReport/NotesReport";
import AttendanceReport from "./Pages/Reports/AttendanceReport/AttendanceReport";
import ProfitLossReport from "./Pages/Reports/ProfitLossReport/ProfitLossReport";
import Setting from "./Pages/Settings/Setting";
import Suppliers from "./Pages/Settings/AdminSettingPages/Suppliers";
import Destinations from "./Pages/Settings/AdminSettingPages/Destinations";
import RoomType from "./Pages/Settings/AdminSettingPages/RoomType";
import MealPlan from "./Pages/Settings/AdminSettingPages/MealPlan";
import Hotel from "./Pages/Settings/AdminSettingPages/Hotel/Hotel";
import Transfer from "./Pages/Settings/AdminSettingPages/Transfer";
import DayItinerary from "./Pages/Settings/AdminSettingPages/DayItinerary";
import LeadSource from "./Pages/Settings/AdminSettingPages/LeadSource";
import PackageTheme from "./Pages/Settings/AdminSettingPages/PackageTheme";
import MailSetting from "./Pages/Settings/AdminSettingPages/MailSetting";
import WeatherSetting from "./Pages/Settings/AdminSettingPages/WeatherSetting";
import Currency from "./Pages/Settings/AdminSettingPages/Currency";
import Driver from "./Pages/Settings/AdminSettingPages/Driver/Driver";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CorporateDetail from "./Pages/Corporate/CorporateDetail";
import Login from "./Pages/Login/Login";

const App = () => {
  const Layout = () => {
    const [show, setShow] = useState(true);

    const getStatusFromSideBar = (click) => {
      setShow(click);
    };

    return (
      <div className="main h-screen w-full flex flex-col ">
        <Navbar sendDataToApp={getStatusFromSideBar} />
        <div className="wrapper flex flex-1 !overflow-y-hidden ">
          <div
            className={`sideBar-Wrapper md:block ${
              show ? "hidden" : ""
            } w-[3.7rem] md:static absolute z-20  bg-[#12344d] text-white`}
          >
            <SideBar />
          </div>

          <div className="content-Wrapper flex-1 w-full overflow-y-auto  ">
            <Outlet />
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/clients", element: <Clients /> },
        { path: "/clients/:clientId", element: <ClientDetail /> },
        { path: "/agents", element: <Agents /> },
        { path: "/agents/:agentId", element: <AgentDetails /> },
        { path: "/itineraries", element: <Itineraries /> },
        { path: "/queries", element: <Queries /> },
        { path: "/queries/:queryId/*", element: <QueriesDetail/> },
        { path: "/corporate", element: <Corporate /> },
        { path: "/corporate/:corporateId", element: <CorporateDetail /> },
        { path: "/settings/*", element: <Setting /> },
        { path: "/expenses", element: <Expense /> },
        { path: "/marketingDashboard", element: <MarketingDashboard /> },
        {
          path: "/marketingDashboard/createCampaigns",
          element: <CreateCampaign />,
        },
        { path: "/clientsGroup", element: <ClientsGroup /> },
        { path: "/emailTemplate", element: <EmailTemplate /> },
        {
          path: "/emailTemplate/createTemplate",
          element: <CreateEmailTemplate />,
        },
        { path: "/campagins", element: <Campagins /> },
        { path: "/campagins/createCampaigns", element: <CreateCampaign /> },
        { path: "/landingPages", element: <LandingPages /> },
        { path: "/landingPages/create", element: <CreateLandingPage /> },
        { path: "/ledgerReport", element: <LedgerReport /> },
        { path: "/MIS-report", element: <MIS_Report /> },
        { path: "/taskReport", element: <TaskReport /> },
        { path: "/toursReport", element: <ToursReport /> },
        { path: "/collectionReport", element: <CollectionReport /> },
        { path: "/notesReport", element: <NotesReport /> },
        { path: "/attendanceReport", element: <AttendanceReport /> },
        { path: "/profitLossReport", element: <ProfitLossReport /> },
        { path: "/suppliers", element: <Suppliers /> },
        { path: "/destinations", element: <Destinations /> },
        { path: "/roomType", element: <RoomType /> },
        { path: "/mealPlan", element: <MealPlan /> },
        { path: "/accommodation", element: <Hotel /> },
        { path: "/driver", element: <Driver /> },
        { path: "/transfer", element: <Transfer /> },
        { path: "/dayItinerary", element: <DayItinerary /> },
        { path: "/leadSource", element: <LeadSource /> },
        { path: "/packageTheme", element: <PackageTheme /> },
        { path: "/mailSetting", element: <MailSetting /> },
        { path: "/weatherSetting", element: <WeatherSetting /> },
        { path: "/currency", element: <Currency /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export { App };
