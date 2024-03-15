import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "react-phone-number-input/style.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import createGroup from '../../assets/images/createGroup.png'

const data = [
  {
    id: "12EF34RC1",
    group_name: "Marketing Team",
    status: "Inactive",
    by: "TravBiz.com",
    subscribers: "25",
    date: "12-04-2023",
    description:
      "The Marketing Team handles all aspects of marketing and promotion for the company.",
  },
  {
    id: "12EF34RC2",
    group_name: "Research & Development",
    status: "Active",
    by: "TravBiz.com",
    subscribers: "52",
    date: "12-04-2023",
    description:
      "The Research & Development team is responsible for innovation and product development.",
  },
  {
    id: "12EF34RC3",
    group_name: "Project Management",
    status: "Inactive",
    by: "TravBiz.com",
    subscribers: "38",
    date: "12-04-2023",
    description:
      "The Project Management team ensures the successful execution of company projects.",
  },
  {
    id: "12EF34RC4",
    group_name: "Design Department",
    status: "Active",
    by: "TravBiz.com",
    subscribers: "19",
    date: "12-04-2023",
    description:
      "The Design Department creates visually appealing and user-friendly designs.",
  },
  {
    id: "12EF34RC5",
    group_name: "Sales Team",
    status: "Inactive",
    by: "TravBiz.com",
    subscribers: "64",
    date: "12-04-2023",
    description:
      "The Sales Team is responsible for driving revenue and meeting sales targets.",
  },
  {
    id: "12EF34RC6",
    group_name: "Communications Department",
    status: "Active",
    by: "TravBiz.com",
    subscribers: "81",
    date: "12-04-2023",
    description:
      "The Communications Department manages internal and external communication strategies.",
  },
  {
    id: "12EF34RC7",
    group_name: "Strategic Planning Division",
    status: "Inactive",
    by: "TravBiz.com",
    subscribers: "42",
    date: "12-04-2023",
    description:
      "The Strategic Planning Division develops long-term business strategies for growth and success.",
  },
  {
    id: "12EF34RC8",
    group_name: "Education & Training",
    status: "Active",
    by: "TravBiz.com",
    subscribers: "77",
    date: "12-04-2023",
    description:
      "The Education & Training team provides learning opportunities to employees and clients.",
  },
  {
    id: "12EF34RC9",
    group_name: "Analytics Department",
    status: "Inactive",
    by: "TravBiz.com",
    subscribers: "35",
    date: "12-04-2023",
    description:
      "The Analytics Department analyzes data to provide insights for decision making.",
  },
];

function ClientsGroup() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [modalStat, setModalStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Name",
      field: "group_name",
    },
    {
      headerName: "Description",
      field: "description",
      width: 350,
    },
    {
      headerName: "Subscribers",
      field: "subscribers",
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div>
              <PersonRoundedIcon /> {params.value}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      sortable: false,
      filter: false,
      width: 150,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center w-14 ${
                params.value === "Active" ? "bg-green-700" : "bg-[#f9392f]"
              }  text-white rounded-md h-[70%]`}
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
      width: 170,
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
    width: 191,
    tooltipField: "name",
  };
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Clients Group </div>
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
            <span className="sm:block hidden">Add Group</span>{" "}
            <span className="sm:hidden flex items-center justify-center">
              <img className="object-contain h-5 invert" src={createGroup} />
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

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-6 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[60%] h-fit">
              <div className="flex justify-between items-center h-[10%] px-2">
                <div className="font-bold text-lg">
                  {" "}
                  {modalStat} Client Group
                </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>

              <div className="flex flex-col h-[90%]">
                <div className="mt-8 w-full">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label="Group Name"
                    variant="outlined"
                  />
                </div>

                <div className="mt-8 w-full">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label="Description"
                    variant="outlined"
                  />
                </div>

                <select className="mt-8  px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div className="mt-8 flex justify-between w-full">
                  <div
                    onClick={handleClose}
                    className=" w-[45%] rounded-md h-10"
                  >
                    <button className="hover:bg-[#eeeeee] w-full rounded-md border border-[#b9b9b9] h-full flex items-center justify-center">
                      Cancel
                    </button>
                  </div>

                  <div className=" w-[45%] rounded-md h-10  ">
                    <button className="hover:bg-[#142b3e] w-full rounded-md h-full flex items-center justify-center text-white bg-[#1d3f5a]">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ClientsGroup;
