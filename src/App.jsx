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

          <div className="content-Wrapper w-full h-full overflow-scroll">
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
        { path: "/itineraries", element: <Itineraries /> },
        { path: "/queries", element: <Queries /> },
        { path: "/corporate", element: <Corporate /> },
        { path: "/settings", element: <Setting /> },
        { path: "/expenses", element: <Expense /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
