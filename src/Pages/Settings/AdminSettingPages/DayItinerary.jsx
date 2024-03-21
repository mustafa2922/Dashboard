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
import Textarea from "@mui/joy/Textarea";
import LandScape from "../../../assets/images/lanscape.png";
import EditIcon from "@mui/icons-material/Edit";

const data = [
  {
    id: "12EF34RC1",
    by: "JaffarSaleem.com",
    date: "15-03-2024",
    name: "Khan Village Delhi",
    stars: 2,
    destination: "New York",
    status: "active",
  },
  {
    id: "98AB76YZ3",
    by: "JaffarSaleem.com",
    date: "16-03-2024",
    name: "Kashmir Mountains India",
    stars: 4,
    destination: "London",
    status: "inactive",
  },
  {
    id: "45CD67FG8",
    by: "JaffarSaleem.com",
    date: "17-03-2024",
    name: "China Resort Bombay",
    stars: 3,
    destination: "Paris",
    status: "active",
  },
  {
    id: "23GH89IJ5",
    by: "JaffarSaleem.com",
    date: "18-03-2024",
    name: "Japneese Hotel UP",
    stars: 5,
    destination: "Tokyo",
    status: "inactive",
  },
  {
    id: "67KL12MN0",
    by: "JaffarSaleem.com",
    date: "19-03-2024",
    name: "Family Villa Ahmad Abad",
    stars: 1,
    destination: "Dubai",
    status: "active",
  },
  {
    id: "34OP56QR7",
    by: "JaffarSaleem.com",
    date: "20-03-2024",
    name: "Mount Abu",
    stars: 4,
    destination: "Sydney",
    status: "inactive",
  },
  {
    id: "89ST23UV4",
    by: "JaffarSaleem.com",
    date: "21-03-2024",
    name: "Taj Mahal",
    stars: 3,
    destination: "Rome",
    status: "active",
  },
  {
    id: "12WX34YZ5",
    by: "JaffarSaleem.com",
    date: "22-03-2024",
    name: "Qutub Minar",
    stars: 2,
    destination: "Berlin",
    status: "inactive",
  },
  {
    id: "56CD78EF9",
    by: "JaffarSaleem.com",
    date: "23-03-2024",
    name: "Mountain Chalet",
    stars: 5,
    destination: "Moscow",
    status: "active",
  },
  {
    id: "78GH90IJ1",
    by: "JaffarSaleem.com",
    date: "24-03-2024",
    name: "Beach Bungalor",
    stars: 3,
    destination: "Singapore",
    status: "inactive",
  },
];

function DayItinerary() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };
  const [gridApi, setGridApi] = useState(null);
  const [Editopen, setEditOpen] = useState(false);

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Name",
      field: "name",
      flex:1.5,
      cellStyle: { display: "flex", alignItems: "center" },
      cellRenderer: (params) => {
        return (
          <div className="flex  items-center gap-3">
            <div className=" w-16 h-full">
              <div className="group relative">
                <div
                  onClick={() => {
                    setEditOpen(true);
                  }}
                  className="cursor-pointer hidden group-hover:flex bg-black h-5 rounded-full p-3 w-5 justify-center items-center absolute top-[25%] left-[25%]"
                >
                  <EditIcon style={{ color: "#fff", fontSize: 18 }} />
                </div>
                <img className="w-full h-full object-contain" src={LandScape} />
              </div>
            </div>
            <div> {params.value} </div>
          </div>
        );
      },
    },
    {
      headerName: "Detail",
      field: "destination",
      cellStyle: { display: "flex", alignItems: "center" },
    },

    {
      headerName: "Status",
      field: "status",
      flex: 0.6,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-10">
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
      cellStyle: { display: "flex", alignItems: "center" },
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
    flex: 1,
    tooltipField: "name",
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Day Itinerary </div>
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
              <span className="sm:block hidden">Add Itinerary</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-scroll">
        <div
          className="ag-theme-quartz h-full w-[1400px] lg:w-full"
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

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[60%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Day Itinerary </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between w-full mt-4 h-[90%]">
                <div className="flex flex-col w-[48%]">
                  <div className=" w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Destintion"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <Textarea
                      placeholder="Details"
                      minRows={2}
                      maxRows={2}
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderColor: "#d3d3d3",
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col w-[48%]">
                  <div className=" w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Title"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <select className="px-2 focus:outline-none mt-5 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>

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

          <Modal
            keepMounted
            open={Editopen}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[70%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Media Library </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DayItinerary;
