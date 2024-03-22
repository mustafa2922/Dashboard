import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const data = [
  {
    id: "12EF34RC1",
    by: "JaffarSaleem.com",
    date: "15-03-2024",
    company: "Snowmen Tours",
    fname: "Jhon",
    lname: "Doe",
    rank: "Mr",
    email: "jhon@example.com",
    mobile: "123456789",
    location: "London",
  },
  {
    id: "98AB76YZ3",
    by: "JaffarSaleem.com",
    date: "16-03-2024",
    company: "Adventure Seekers",
    fname: "Emma",
    lname: "Smith",
    rank: "Ms",
    email: "emma@example.com",
    mobile: "987654321",
    location: "New York",
  },
  {
    id: "45CD67FG8",
    by: "JaffarSaleem.com",
    date: "17-03-2024",
    company: "Global Explorers",
    fname: "Michael",
    lname: "Johnson",
    rank: "Mr",
    email: "michael@example.com",
    mobile: "555123789",
    location: "Sydney",
  },
  {
    id: "23GH89IJ5",
    by: "JaffarSaleem.com",
    date: "18-03-2024",
    company: "Wanderlust Adventures",
    fname: "Sophia",
    lname: "Williams",
    rank: "Ms",
    email: "sophia@example.com",
    mobile: "444777333",
    location: "Paris",
  },
  {
    id: "67KL12MN0",
    by: "JaffarSaleem.com",
    date: "19-03-2024",
    company: "Excursion Experts",
    fname: "William",
    lname: "Brown",
    rank: "Mr",
    email: "william@example.com",
    mobile: "999888777",
    location: "Tokyo",
  },
  {
    id: "34OP56QR7",
    by: "JaffarSaleem.com",
    date: "20-03-2024",
    company: "Voyage Ventures",
    fname: "Olivia",
    lname: "Martinez",
    rank: "Ms",
    email: "olivia@example.com",
    mobile: "333222111",
    location: "Rome",
  },
  {
    id: "89ST23UV4",
    by: "JaffarSaleem.com",
    date: "21-03-2024",
    company: "Journey Journeys",
    fname: "James",
    lname: "Garcia",
    rank: "Mr",
    email: "james@example.com",
    mobile: "777666555",
    location: "Dubai",
  },
  {
    id: "12WX34YZ5",
    by: "JaffarSaleem.com",
    date: "22-03-2024",
    company: "Discovery Destinations",
    fname: "Ava",
    lname: "Lopez",
    rank: "Ms",
    email: "ava@example.com",
    mobile: "222444666",
    location: "Berlin",
  },
  {
    id: "56CD78EF9",
    by: "JaffarSaleem.com",
    date: "23-03-2024",
    company: "Odyssey Outings",
    fname: "Noah",
    lname: "Hernandez",
    rank: "Mr",
    email: "noah@example.com",
    mobile: "888999000",
    location: "Cairo",
  },
  {
    id: "78GH90IJ1",
    by: "JaffarSaleem.com",
    date: "24-03-2024",
    company: "Roaming Routes",
    fname: "Isabella",
    lname: "Young",
    rank: "Ms",
    email: "isabella@example.com",
    mobile: "111222333",
    location: "Moscow",
  },
];

function Suppliers() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Company",
      field: "company",
    },
    {
      headerName: "Name",
      valueGetter: (params) => {
        return `${params.data.rank} ${params.data.fname} ${params.data.lname}`;
      },
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Mobile",
      field: "mobile",
    },
    {
      headerName: "Location",
      field: "location",
    },
    {
      headerName: "By",
      field: "by",
      flex: 1.2,
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
      headerName: "Date",
      field: "date",
    },
    {
      sortable: false,
      filter: false,
      flex: 0.3,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setStat("Edit");
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <EditNoteIcon
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
    tooltipField: "name",
    flex: 1,
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Suppliers </div>
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
          <div className="h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Supplier</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto">
        <div
          className="ag-theme-quartz w-[1500px] h-full lg:w-full"
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[65%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Supplier </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between mt-4 h-[90%]">
                <div className="w-[48%] ">
                  <select className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>

                  <div className=" mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="First Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Last Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Email"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <div className="">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Number"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="City"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Company"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Address"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div onClick={handleClose} className=" w-[48%] rounded-md h-10">
                  <button className="hover:bg-[#c22626] w-full rounded-md  text-white bg-[#e51d27] h-full flex items-center justify-center">
                    Cancel
                  </button>
                </div>

                <div className=" w-[48%] rounded-md h-10  ">
                  <button className="w-full rounded-md h-full flex hover:bg-[#1a8d42] items-center justify-center text-white bg-[#04AA6D]">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
