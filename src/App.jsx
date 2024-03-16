import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Clients from "./Pages/Clients/Clients";
import Agents from "./Pages/Agents/Agents";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/SideBar";
import Itineraries from "./Pages/Itineraries/Itineraries";
import Queries from "./Pages/Queries/Queries";
import Corporate from "./Pages/Corporate/Corporate";
import Dashboard from "./Pages/Home/Dashboard";
import Setting from "./Pages/Settings/Setting";
import Expense from "./Pages/Expense/Expense";
import ClientDetail from "./Pages/ClientDetails/ClientDetail";
import AgentDetails from "./Pages/AgentDetails/AgentDetails";
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

const App = () => {
  const Layout = () => {
    const [show, setShow] = useState(true);

    const getStatusFromSideBar = (click) => {
      setShow(click);
    };

    return (
      <div className="main h-screen w-full">
        <Navbar sendDataToApp={getStatusFromSideBar} />
        <div className="wrapper flex h-[92.5vh]">

          <div
            className={`sideBar-Wrapper md:block ${
              show ? "hidden" : ""
            } w-[4rem] md:static absolute z-10 h-full bg-[#12344d] text-white`}
          >
            <SideBar />
          </div>

          <div className="content-Wrapper w-full h-full overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/clients", element: <Clients /> },
        { path: "/clients/:clientId", element: <ClientDetail /> },
        { path: "/agents", element: <Agents /> },
        { path: "/agents/:agentId", element: <AgentDetails/> },
        { path: "/itineraries", element: <Itineraries /> },
        { path: "/queries", element: <Queries /> },
        { path: "/corporate", element: <Corporate /> },
        { path: "/settings", element: <Setting /> },
        { path: "/expenses", element: <Expense /> },
        { path: "/marketingDashboard", element: <MarketingDashboard/> },
        { path: "/marketingDashboard/createCampaigns", element: <CreateCampaign/> },
        { path: "/clientsGroup", element: <ClientsGroup/> },
        { path: "/emailTemplate", element: <EmailTemplate/> },
        { path: "/emailTemplate/createTemplate", element: <CreateEmailTemplate/> },
        { path: "/campagins", element: <Campagins/>  },
        { path: "/campagins/createCampaigns", element: <CreateCampaign/> },
        { path: "/landingPages", element: <LandingPages/> },
        { path: "/landingPages/create", element: <CreateLandingPage/> },
        { path: "/ledgerReport", element: <LedgerReport/>  },
        { path: "/MIS-report", element: <MIS_Report/>  },
        { path: "/taskReport", element:  <TaskReport/> },
        { path: "/toursReport", element: <ToursReport/>  },
        { path: "/collectionReport", element: <CollectionReport/>  },
        { path: "/notesReport", element: <NotesReport/>  },
        { path: "/attendanceReport", element:  <AttendanceReport/> },
        { path: "/profitLossReport", element:  <ProfitLossReport/> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
