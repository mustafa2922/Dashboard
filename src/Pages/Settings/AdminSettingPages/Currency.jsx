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

const data = [
  {
    id: "12EF34RC1",
    date: "15-03-2024",
    status: "active",
    name: "dollar",
    currencyRate: 0.014, // Equivalent in INR
  },
  {
    id: "98AB76YZ3",
    date: "16-03-2024",
    status: "inactive",
    name: "pkr",
    currencyRate: 2.24, // Equivalent in INR
  },
  {
    id: "45CD67FG8",
    date: "17-03-2024",
    status: "active",
    name: "euro",
    currencyRate: 0.012, // Equivalent in INR
  },
  {
    id: "23GH89IJ5",
    date: "18-03-2024",
    status: "inactive",
    name: "yen",
    currencyRate: 1.54, // Equivalent in INR
  },
  {
    id: "67KL12MN0",
    date: "19-03-2024",
    status: "active",
    name: "pound",
    currencyRate: 0.011, // Equivalent in INR
  },
  {
    id: "34OP56QR7",
    date: "20-03-2024",
    status: "inactive",
    name: "aud",
    currencyRate: 0.021, // Equivalent in INR
  },
  {
    id: "89ST23UV4",
    date: "21-03-2024",
    status: "active",
    name: "cad",
    currencyRate: 0.019, // Equivalent in INR
  },
  {
    id: "12WX34YZ5",
    date: "22-03-2024",
    status: "inactive",
    name: "sgd",
    currencyRate: 0.02, // Equivalent in INR
  },
  {
    id: "56CD78EF9",
    date: "23-03-2024",
    status: "active",
    name: "chf",
    currencyRate: 0.015, // Equivalent in INR
  },
  {
    id: "78GH90IJ1",
    date: "24-03-2024",
    status: "inactive",
    name: "nzd",
    currencyRate: 0.023, // Equivalent in INR
  },
];

function Currency() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Name",
      field: "name",
      width: 300,
    },
    {
      headerName: "Currency Rate (To INR)",
      field:'currencyRate',
      width: 600,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center w-14 ${
                params.value === "Active".toLocaleLowerCase()
                  ? "bg-green-700"
                  : "bg-[#f9392f]"
              }  text-white rounded-md h-[70%]`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Update",
      field: "date",
      width: 150,
    },
    {
      width: 50,
      sortable: false,
      filter: false,
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
        <div className="font-bold"> Currency </div>
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
          <div className="h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Currency</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
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

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80%] md:w-[40%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Currency </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex flex-col justify-between mt-4 h-[90%]">
                <div className=" mt-4 w-full">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </div>

                <div className=" mt-4 w-full">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="Rate"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </div>

                <select className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <div className="mt-6 w-full rounded-md h-10  ">
                  <button className="hover:bg-[#142b3e] w-full rounded-md h-full flex items-center justify-center text-white bg-[#1d3f5a]">
                    Save
                  </button>
                </div>

                <div
                  onClick={handleClose}
                  className="mt-4 w-full rounded-md h-10"
                >
                  <button className="hover:bg-[#eeeeee] w-full rounded-md border border-[#b9b9b9] h-full flex items-center justify-center">
                    Cancel
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

export default Currency;
