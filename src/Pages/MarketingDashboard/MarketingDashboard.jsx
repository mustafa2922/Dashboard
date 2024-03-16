import React, { useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import customerIcon from "../../assets/images/customerIcon.png";
import marrigeIcon from "../../assets/images/marrigeIcon.png";
import tripIcon from "../../assets/images/tripIcon.png";
import birthdayIcon from "../../assets/images/birthdayIcon.png";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const data = [
  {
    id: "12EF34RC1",
    by: "TravBiz.com",
    date: "15-03-2024",
    time: "05:52 PM",
    subscriber: "3",
    views: "5",
    status: "sent",
    mailingGroup: "Hello Trip",
    template: "Amazing Dubai Tour",
    fname: "John",
    lname: "Doe",
  },
  {
    id: "34GH56TR2",
    by: "TravBiz.com",
    date: "17-03-2024",
    time: "10:30 AM",
    subscriber: "8",
    views: "12",
    status: "draft",
    mailingGroup: "Adventure Seekers",
    template: "Thrilling Amazon Jungle Expedition",
    fname: "Alice",
    lname: "Smith",
  },
  {
    id: "78IJ90KL3",
    by: "TravBiz.com",
    date: "18-03-2024",
    time: "02:15 PM",
    subscriber: "5",
    views: "8",
    status: "scheduled",
    mailingGroup: "Beach Lovers",
    template: "Relaxing Hawaii Getaway",
    fname: "Emily",
    lname: "Johnson",
  },
  {
    id: "23AB45CD4",
    by: "TravBiz.com",
    date: "19-03-2024",
    time: "08:00 AM",
    subscriber: "10",
    views: "20",
    status: "sent",
    mailingGroup: "Mountain Trekkers",
    template: "Exhilarating Everest Base Camp Trek",
    fname: "Michael",
    lname: "Williams",
  },
  {
    id: "67MN89OP5",
    by: "TravBiz.com",
    date: "20-03-2024",
    time: "03:45 PM",
    subscriber: "6",
    views: "15",
    status: "draft",
    mailingGroup: "Culture Explorers",
    template: "Historical Rome Tour",
    fname: "Sophia",
    lname: "Brown",
  },
  {
    id: "12CD34EF6",
    by: "TravBiz.com",
    date: "21-03-2024",
    time: "11:20 AM",
    subscriber: "7",
    views: "10",
    status: "scheduled",
    mailingGroup: "Food Enthusiasts",
    template: "Culinary Tour of Paris",
    fname: "Daniel",
    lname: "Anderson",
  },
  {
    id: "56GH78IJ7",
    by: "TravBiz.com",
    date: "22-03-2024",
    time: "07:00 AM",
    subscriber: "12",
    views: "25",
    status: "sent",
    mailingGroup: "Wildlife Admirers",
    template: "Safari in Serengeti National Park",
    fname: "Olivia",
    lname: "Martinez",
  },
  {
    id: "90KL12MN8",
    by: "TravBiz.com",
    date: "23-03-2024",
    time: "01:55 PM",
    subscriber: "9",
    views: "18",
    status: "draft",
    mailingGroup: "Nature Enthusiasts",
    template: "Eco-friendly Costa Rica Retreat",
    fname: "Ethan",
    lname: "Thompson",
  },
  {
    id: "34CD56EF9",
    by: "TravBiz.com",
    date: "24-03-2024",
    time: "09:45 AM",
    subscriber: "15",
    views: "30",
    status: "scheduled",
    mailingGroup: "Luxury Seekers",
    template: "Exclusive Maldives Resort Experience",
    fname: "Ava",
    lname: "Rodriguez",
  },
  {
    id: "78GH90IJ0",
    by: "TravBiz.com",
    date: "25-03-2024",
    time: "04:30 PM",
    subscriber: "11",
    views: "22",
    status: "sent",
    mailingGroup: "City Explorers",
    template: "Cultural Immersion in Tokyo",
    fname: "Liam",
    lname: "Garcia",
  },
];

function MarketingDashboard() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);

  const [campaign, setCampaign] = useState("");
  const [template, setTemplate] = useState("");
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Campaign",
      cellStyle: { cursor: "pointer" },
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setCampaign(
                `${params.data.fname} ${params.data.lname} [${params.data.id}]`
              );
              setGroup(params.data.mailingGroup);
              setTemplate(params.data.template);
              setEmail(
                `${params.data.by} - [${params.data.date}] - [${params.data.time}]`
              );
            }}
            className="flex flex-col"
          >
            <div className="hover:text-blue-900 text-blue-600">
              {" "}
              {params.data.fname} {params.data.lname}{" "}
            </div>
            <div className="text-slate-900 mt-[-20px]">{params.data.id}</div>
          </div>
        );
      },
    },
    {
      headerName: "Template",
      field: "template",
      width: 280,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setCampaign(
                `${params.data.fname} ${params.data.lname} [${params.data.id}]`
              );
              setGroup(params.data.mailingGroup);
              setTemplate(params.data.template);
              setEmail(
                `${params.data.by} - [${params.data.date}] - [${params.data.time}]`
              );
            }}
            className="flex items-center"
          >
            {params.value}
          </div>
        );
      },
      cellStyle: { cursor: "pointer" },
    },
    {
      headerName: "Mailing Group",
      field: "mailingGroup",
      width: 250,
    },
    {
      headerName: "Subscriber",
      field: "subscriber",
      width: 115,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Views",
      field: "views",
      width: 85,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Status",
      field: "status",
      width: 140,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center w-24 bg-[#655be6] text-white rounded-md h-[50%]`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "By",
      field: "by",
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col">
            <div>{params.value}</div>
            <div className="mt-[-20px]">{params.data.time}</div>
          </div>
        );
      },
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setRow(data);
  };

  const ExportData = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const quickFilter = () => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    width: 191,
    tooltipField: "name",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const currentMonth = monthNames[date.getMonth()];

  return (
    <div className="h-full p-4">
      <div className="font-bold text-lg sm:text-2xl h-10 w-full px-3">
        Marketing Dashboard
      </div>
      <div className="flex flex-wrap justify-around mt-4 px-3 w-full">
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Campaigns
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">100%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Leads
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">83%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            In {currentMonth} Email Sent
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#f1646c] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">8%</div>
              <div className="text-white mb-1">
                <SouthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Feedback Response
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">0</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">100%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 mt-4 h-10 flex justify-center md:justify-start items-center md:items-end ">
        <div className="font-normal text-2xl">Start Marketing</div>
        <div className="hidden md:block text-xs ml-1">
          {" "}
          Choose options below to start your day with generate new business
        </div>
      </div>
      <div className="flex justify-around flex-wrap  mt-4 w-full px-3">
        <Link to={"/marketingDashboard/createCampaigns"} className="bg-[#655be6] cursor-pointer flex flex-row md:flex-col mt-4  items-center md:justify-evenly border p-2 w-[100%] md:w-[24%] rounded-md">
          <div className="w-[10rem] md:w-full h-28 md:h-32 p-1">
            <img className="h-full w-full object-contain" src={customerIcon} />
          </div>
          <div className="text-white text-center font-bold"> Customers </div>
        </Link>

        <Link to={"/marketingDashboard/createCampaigns"} className="bg-[#46cd93] cursor-pointer flex flex-row md:flex-col mt-4  items-center md:justify-evenly border p-2 w-[100%] md:w-[24%] rounded-md">
          <div className="w-[10rem] md:w-full h-28 md:h-32 p-1">
            <img className="h-full w-full object-contain" src={tripIcon} />
          </div>
          <div className="text-white text-center font-bold">
            Plan a Trip For Customer
          </div>
        </Link>

        <Link to={"/marketingDashboard/createCampaigns"} className="bg-[#fdba45] cursor-pointer flex flex-row md:flex-col mt-4  items-center md:justify-evenly border p-2 w-[100%] md:w-[24%] rounded-md">
          <div className="w-[10rem] md:w-full h-28 md:h-32 p-1">
            <img className="h-full w-full object-contain" src={birthdayIcon} />
          </div>
          <div className="text-white text-center font-bold">
            Customer Birthdays For This Month
          </div>
        </Link>

        <Link to={"/marketingDashboard/createCampaigns"} className="bg-[#f9392f] cursor-pointer flex flex-row md:flex-col mt-4  items-center md:justify-evenly border p-2 w-[100%] md:w-[24%] rounded-md">
          <div className="w-[10rem] md:w-full h-28 md:h-32 p-1">
            <img className="h-full w-full object-contain" src={marrigeIcon} />
          </div>
          <div className="text-white text-center font-bold">
            Customer Marriage Anniversary For This Month
          </div>
        </Link>
      </div>
      <div className="flex justify-between items-center mt-4 h-16 sm:h-12 sm:flex-row flex-col px-3">
        <div className="font-bold text-2xl"> Recent Campaigns </div>

        <div className="flex justify-center items-center sm:mt-0 mt-3 gap-3 h-full">
          <button
            onClick={() => {
              ExportData();
            }}
            className="px-2 bg-[#1d3f5a] text-white rounded-md flex items-center h-full md:h-[80%]"
          >
            <IosShareIcon style={{ fontSize: "20" }} />
          </button>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-full md:h-[80%] px-2 rounded-md text-sm w-[50%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />

          <Link to={"/marketingDashboard/createCampaigns"}>
            <button className="border border-slate-300 h-10 bg-[#1d3f5a] text-white text-xs rounded-md px-2 ">
              <span className="sm:block hidden">Create Campaign</span>{" "}
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 h-full w-full">
        <div
          className="ag-theme-quartz"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            rowHeight={60}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[98%] sm:w-[60%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> Campaign Details </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex px-2 flex-col h-[90%]">
                <div className="mt-4 flex items-center border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">
                    Campaign:
                  </div>
                  <div className="text-sm ml-1">{campaign}</div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">
                    Mailing Group:
                  </div>
                  <div className="text-sm ml-1">{group}</div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">
                    Template Name:
                  </div>
                  <div className="text-sm ml-1">{template}</div>
                </div>

                <div className="mt-4 flex  items-center border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">By: </div>
                  <div className="text-sm ml-1">{email}</div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">
                    Mail From:
                  </div>
                  <div className="text-sm ml-1"></div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-fit">
                  <div className="font-bold text-sm text-slate-700">
                    Mail Subject:
                  </div>
                  <div className="text-sm ml-1"></div>
                </div>

                <div
                  onClick={handleClose}
                  className="self-end mt-6 w-[30%] rounded-md h-10"
                >
                  <button className="hover:bg-[#142b3e] w-full rounded-md h-full flex items-center justify-center text-white bg-[#1d3f5a]">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="h-5"></div> {/* for bottom height */}
    </div>
  );
}

export default MarketingDashboard;
