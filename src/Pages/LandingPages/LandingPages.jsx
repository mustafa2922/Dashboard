import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const data = [
  {
    id: "12EF34RC1",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Ramzan Full Month Umrah Package",
    bannerSubheading: "Eid in Madinna",
    bannerHeading: "Spend This Ramzan in Holy Kaaba",
    templateName: "Amazing Dubai Tour",
    date: "25-03-2024",
    time: "04:30 PM",
  },
  {
    id: "34GH56TR2",
    status: "Inactive",
    by: "TravBiz.com",
    mainHeading: "Summer Special Europe Tour",
    bannerSubheading: "Explore the beauty of Europe",
    bannerHeading: "Discover the Charm of European Cities",
    templateName: "Thrilling Amazon Jungle Expedition",
    date: "26-03-2024",
    time: "10:00 AM",
  },
  {
    id: "78IJ90KL3",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Winter Wonderland Iceland Trip",
    bannerSubheading: "Experience the magic of Iceland",
    bannerHeading: "Witness the Northern Lights in Iceland",
    templateName: "Relaxing Hawaii Getaway",
    date: "27-03-2024",
    time: "02:00 PM",
  },
  {
    id: "23AB45CD4",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Adventure Trekking in the Himalayas",
    bannerSubheading: "Conquer the highest peaks",
    bannerHeading: "Experience the thrill of the Himalayas",
    templateName: "Exhilarating Everest Base Camp Trek",
    date: "28-03-2024",
    time: "08:00 AM",
  },
  {
    id: "67MN89OP5",
    status: "Inactive",
    by: "TravBiz.com",
    mainHeading: "Historical Egypt Tour",
    bannerSubheading: "Journey through ancient wonders",
    bannerHeading: "Explore the mysteries of ancient Egypt",
    templateName: "Historical Rome Tour",
    date: "29-03-2024",
    time: "03:45 PM",
  },
  {
    id: "12CD34EF6",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Culinary Delights of Thailand",
    bannerSubheading: "Taste the flavors of Thailand",
    bannerHeading: "Discover the culinary secrets of Thailand",
    templateName: "Culinary Tour of Paris",
    date: "30-03-2024",
    time: "11:20 AM",
  },
  {
    id: "56GH78IJ7",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Wildlife Safari in Kenya",
    bannerSubheading: "Encounter the Big Five",
    bannerHeading: "Safari adventure in the heart of Africa",
    templateName: "Safari in Serengeti National Park",
    date: "31-03-2024",
    time: "07:00 AM",
  },
  {
    id: "90KL12MN8",
    status: "Inactive",
    by: "TravBiz.com",
    mainHeading: "Mystical Machu Picchu Expedition",
    bannerSubheading: "Discover the Lost City of the Incas",
    bannerHeading: "Embark on a journey through the Andes",
    templateName: "Eco-friendly Costa Rica Retreat",
    date: "01-04-2024",
    time: "01:55 PM",
  },
  {
    id: "34CD56EF9",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Luxury Cruise in the Mediterranean",
    bannerSubheading: "Sail through azure waters",
    bannerHeading: "Indulge in opulence aboard a luxury yacht",
    templateName: "Exclusive Maldives Resort Experience",
    date: "02-04-2024",
    time: "09:45 AM",
  },
  {
    id: "78GH90IJ0",
    status: "Active",
    by: "TravBiz.com",
    mainHeading: "Cultural Immersion in Japan",
    bannerSubheading: "Experience the traditions of Japan",
    bannerHeading: "Explore the rich cultural heritage of Japan",
    templateName: "Cultural Immersion in Tokyo",
    date: "03-04-2024",
    time: "04:30 PM",
  },
];

function LandingPages() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [modalStat, setModalStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "ID",
      field: "id",
      flex:0.8,
    },
    {
      headerName: "Template Name",
      field: "templateName",
      flex:1.2
    },
    {
      headerName: "Banner Heading",
      field: "bannerHeading",
    },
    {
      headerName: "Banner Sub-Heading",
      field: "bannerSubheading",
    },
    {
      headerName: "Main Heading",
      field: "mainHeading",
    },
    {
      headerName: "Status",
      field: "status",
      sortable: false,
      filter: false,
      flex:0.8,
      cellStyle: { display: "flex", alignItems: "center" },
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-11">
            <div
              className={`flex items-center justify-center w-14 ${
                params.value.toLocaleLowerCase() ===
                "Active".toLocaleLowerCase()
                  ? "bg-green-700"
                  : "bg-[#f9392f]"
              }  text-white rounded-md h-[70%]`}
            >
              {params.value[0].toUpperCase()}
              {params.value.substring(1)}
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
    {
      sortable: false,
      filter: false,
      flex: 0.3,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Link to={""}>
              <NorthEastIcon
                className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
                style={{ fontSize: "25px" }}
              />
            </Link>
          </div>
        );
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.3,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Link to={"/landingPages/create"}>
              <EditNoteIcon
                className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
                style={{ fontSize: "25px" }}
              />
            </Link>
          </div>
        );
      },
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setRow(data);
  };

  const quickFilter = () => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    flex: 1,
    tooltipField: "name",
  };
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Landing Pages </div>
        <div className="flex justify-center items-center gap-3 h-full">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[60%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <Link to={"/landingPages/create"}>
            <button className="border border-slate-300 h-9 bg-[#1d3f5a] text-white text-xs rounded-md px-2 ">
              <span className="sm:block hidden">Create Page</span>{" "}
              <span className="sm:hidden block">
                <PersonAddAltIcon />
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto">
        <div
          className="ag-theme-quartz lg:w-full h-full w-[1400px]"
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            rowHeight={60}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPages;
