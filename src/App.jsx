import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Clients from "./Pages/Clients/Clients";
import Agents from "./Pages/Agents/Agents";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";

const App = () => {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="wrapper flex">
          <div className="sideBar-Wrapper w-[12%] bg-black text-white">
            <SideBar />
          </div>
          <div className="content-Wrapper w-[88%] bg-blue-300 text-white">
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
        { path: "/", element: <Home /> },
        { path: "/clients", element: <Clients /> },
        { path: "/agents", element: <Agents /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
