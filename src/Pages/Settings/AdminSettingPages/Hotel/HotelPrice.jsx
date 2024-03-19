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
import CustomModal from "../../../../Components/CustomModal.jsx";
import addCorporate from "../../../../assets/images/addCorporate.png";
import { useLocation } from "react-router-dom";

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
    gst: "ABCD1234EFGH5678",
    company: "Company A",
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
    gst: "WXYZ5678UVWX1234",
    company: "Company B",
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
    gst: "IJKL9012MNOP3456",
    company: "Company C",
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
    gst: "QRST5678ABCD9012",
    company: "Company D",
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
    gst: "EFGH1234IJKL5678",
    company: "Company E",
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
    gst: "MNOP9012QRST3456",
    company: "Company A",
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
    gst: "UVWX3456YZAB7890",
    company: "Company B",
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
    gst: "BCDE7890FGHI2345",
    company: "Company C",
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
    gst: "JKLM2345QRST6789",
    company: "Company D",
  },
];

function HotelPrice() {
  const {state} = useLocation();
  const { id, name } = state;

  console.log(id,name);

  const HotelName = window.location.pathname.split("/")[2];

  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [modalStat, setModalStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Company",
      field: "company",
    },
    {
      headerName: "GST",
      field: "gst",
    },
    {
      headerName: "Name",
      valueGetter: (params) => {
        return `${params.data.rank} ${params.data.fname} ${params.data.lname}`;
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
      width: 100,
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
            <Link to={`/agents/${params.data.id}`}>
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
    cellStyle: { borderRight: "1px solid #d9d9db" },
    width: "156%",
    tooltipField: "name",
  };

  console.log(HotelName);
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> {HotelName} - Price List </div>
        <div className="flex justify-center items-center gap-3 h-full">
          <button
            onClick={() => {
              ExportData();
            }}
            className="px-2 bg-[#1d3f5a] text-white rounded-md flex items-center h-[80%]"
          >
            <IosShareIcon style={{ fontSize: "20" }} />
          </button>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[50%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <button
            onClick={() => {
              setOpen(true);
              setModalStat("Add");
            }}
            className="border border-slate-300 h-[80%] bg-[#1d3f5a] text-white text-sm rounded-md px-2 "
          >
            <span className="sm:block hidden">Add Corporate</span>{" "}
            <span className="sm:hidden flex items-center justify-center">
              <img className="object-contain h-5 invert" src={addCorporate} />
            </span>
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
            pagination={true}
          />

          <CustomModal
            page={"Corporate"}
            status={modalStat}
            openVal={open}
            setOpenVal={setOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default HotelPrice;
