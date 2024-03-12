import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Clients from "./Pages/Clients/Clients";
import Agents from "./Pages/Agents/Agents";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Itineraries from "./Pages/Itineraries/Itineraries";
import Queries from "./Pages/Queries/Queries";
import Corporate from "./Pages/Corporate/Corporate";
import Dashboard from "./Pages/Home/Dashboard";

const App = () => {
  const Layout = () => {
    return (
      <div className="main h-screen w-screen">
        <Navbar />
        <div className="wrapper flex h-full">

          <div className="sideBar-Wrapper w-[4rem] h-full bg-[#12344d] text-white">
            <SideBar />
          </div>

          <div className="content-Wrapper w-full bg-blue-300 text-white">
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
        { path: "/agents", element: <Agents /> },
        { path: "/itineraries", element: <Itineraries/> },
        { path: "/queries", element: <Queries/> },
        { path: "/corporate", element: <Corporate/> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
