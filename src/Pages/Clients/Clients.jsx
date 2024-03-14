import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";

const data = [
  {
    id: "12EF34RC1",
    name: "John Doe",
    number: 123456789,
    email: "johndoe@gmail.com",
    city: "London",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC2",
    name: "Jane Smith",
    number: 987654321,
    email: "janesmith@example.com",
    city: "New York",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC3",
    name: "Michael Johnson",
    number: 456123789,
    email: "michaeljohnson@example.com",
    city: "Los Angeles",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC4",
    name: "Emily Brown",
    number: 789456123,
    email: "emilybrown@example.com",
    city: "Chicago",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC5",
    name: "David Lee",
    number: 321654987,
    email: "davidlee@example.com",
    city: "San Francisco",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC6",
    name: "Sarah Johnson",
    number: 654789321,
    email: "sarahjohnson@example.com",
    city: "Miami",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC7",
    name: "Matthew Davis",
    number: 987654123,
    email: "matthewdavis@example.com",
    city: "Seattle",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC8",
    name: "Olivia Wilson",
    number: 741852963,
    email: "oliviawilson@example.com",
    city: "Dallas",
    status: "Active",
    by: "TravBiz.com",
  },
  {
    id: "12EF34RC9",
    name: "William Taylor",
    number: 369852147,
    email: "williamtaylor@example.com",
    city: "Houston",
    status: "Active",
    by: "TravBiz.com",
  },
];

const Clients = () => {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [column, setColumn] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      cellClass: "flex items-center justify-start",
      sortable: false,
      filter: false,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Number", field: "number" },
    { headerName: "Email", field: "email" },
    { headerName: "City", field: "city" },
    { headerName: "Status", field: "status" },
    { headerName: "By", field: "by" },
    {
      field: "id",
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Link to={`/clients/${params.value}`}>
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
      field: "id",
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <EditNoteIcon
              className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
              style={{ fontSize: "25px" }}
            />
          </div>
        );
      },
    },
  ]);

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api;
    setRow(data);
  };

  const ExportData = () => {
    if (gridApi) {
      console.log(gridApi);
      gridApi.exportDataAsCsv();
    }
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    width: 191,
    tooltipField: "name",
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-12 px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Clients </div>
        <div className="flex items-center gap-3 h-full">
          <button
            onClick={() => {
              ExportData();
            }}
            className="px-2 bg-[#1d3f5a] text-white rounded-md flex items-center h-[60%]"
          >
            <IosShareIcon style={{ fontSize: "20" }} />
          </button>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-52"
            placeholder="Search by name, email, phone"
          />
          <button className="border border-slate-300 h-[80%] bg-[#1d3f5a] text-white text-sm rounded-md px-2 ">
            Add Client
          </button>
        </div>
      </div>

      <div className="h-full w-full">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
