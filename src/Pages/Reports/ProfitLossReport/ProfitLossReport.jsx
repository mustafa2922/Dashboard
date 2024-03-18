import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import CustomModal from "../../../Components/CustomModal";

const data = [
  {
    id: "12EF34RC1",
    fname: "John",
    lname: "Doe",
    number: 123456789,
    email: "johndoe@gmail.com",
    city: "London",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    date: "10-02-2024",
  },
  {
    id: "12EF34RC2",
    fname: "Jane",
    lname: "Smith",
    number: 987654321,
    email: "janesmith@example.com",
    city: "New York",
    status: "Active",
    by: "TravBiz.com",
    rank: "Prof.",
    date: "15-02-2024",
  },
  {
    id: "12EF34RC3",
    fname: "Michael",
    lname: "Johnson",
    number: 456123789,
    email: "michaeljohnson@example.com",
    city: "Los Angeles",
    status: "Active",
    by: "TravBiz.com",
    rank: "Mrs.",
    date: "20-02-2024",
  },
  {
    id: "12EF34RC4",
    fname: "Emily",
    lname: "Brown",
    number: 789456123,
    email: "emilybrown@example.com",
    city: "Chicago",
    status: "Active",
    by: "TravBiz.com",
    rank: "Dr.",
    date: "25-02-2024",
  },
  {
    id: "12EF34RC5",
    fname: "David",
    lname: "Lee",
    number: 321654987,
    email: "davidlee@example.com",
    city: "San Francisco",
    status: "Active",
    by: "TravBiz.com",
    rank: "Mr.",
    date: "01-03-2024",
  },
  {
    id: "12EF34RC6",
    fname: "Sarah",
    lname: "Johnson",
    number: 654789321,
    email: "sarahjohnson@example.com",
    city: "Miami",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    date: "06-03-2024",
  },
  {
    id: "12EF34RC7",
    fname: "Matthew",
    lname: "Davis",
    number: 987654123,
    email: "matthewdavis@example.com",
    city: "Seattle",
    status: "Active",
    by: "TravBiz.com",
    rank: "Dr.",
    date: "11-03-2024",
  },
  {
    id: "12EF34RC8",
    fname: "Olivia",
    lname: "Wilson",
    number: 741852963,
    email: "oliviawilson@example.com",
    city: "Dallas",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    date: "16-03-2024",
  },
  {
    id: "12EF34RC9",
    fname: "William",
    lname: "Taylor",
    number: 369852147,
    email: "williamtaylor@example.com",
    city: "Houston",
    status: "Active",
    by: "TravBiz.com",
    rank: "Prof.",
    date: "21-03-2024",
  },
];

function ProfitLossReport() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [modalStat, setModalStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Query ID",
      cellRenderer: (params) => {
        return (
          <Link>
            <div className="cursor-pointer flex flex-col justify-center mt-2">
              <div className="text-sm text-black">{params.data.id}</div>
              <div className="text-xs text-slate-800">{params.data.date}</div>
            </div>
          </Link>
        );
      },
    },
    { headerName: "Number", field: "number" },
    {
      headerName: "Email",
      field: "email",
    },
    { headerName: "City", field: "city" },
    {
      headerName: "Status",
      field: "status",
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex items-center justify-center px-2 bg-green-700 text-white rounded-md h-[70%]">
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
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              {params.value[0]}
            </div>
            <div>{params.value}</div>
          </div>
        );
      },
    },
    {
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Link to={`/clients/${params.data.id}`}>
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
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <EditNoteIcon
              onClick={() => {
                setOpen(true);
                setModalStat("Edit");
              }}
              className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
              style={{ fontSize: "25px" }}
            />
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
    width: 191,
    tooltipField: "name",
  };
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Profit / Loss Report </div>
        <div className="flex justify-center w-[40%] items-center gap-3 h-full">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[50%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
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
            pagination={true}
            rowHeight={60}
          />

          <CustomModal
            page={"Client"}
            status={modalStat}
            openVal={open}
            setOpenVal={setOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfitLossReport;
