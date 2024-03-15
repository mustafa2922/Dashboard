import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

const data = [
  {
    id: "12EF34RC1",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "25",
    views: "10",
    template: "Promotional Newsletter",
    group: "Marketing",
    name: "John's Campaign",
  },
  {
    id: "12EF34RC2",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "15",
    views: "5",
    template: "Product Launch Announcement",
    group: "Product Management",
    name: "Jane's Campaign",
  },
  {
    id: "12EF34RC3",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "30",
    views: "20",
    template: "Customer Satisfaction Survey",
    group: "Customer Service",
    name: "Michael's Campaign",
  },
  {
    id: "12EF34RC4",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "20",
    views: "12",
    template: "Training Workshop Invitation",
    group: "Human Resources",
    name: "Emily's Campaign",
  },
  {
    id: "12EF34RC5",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "18",
    views: "8",
    template: "New Feature Announcement",
    group: "Development",
    name: "David's Campaign",
  },
  {
    id: "12EF34RC6",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "22",
    views: "15",
    template: "Event Invitation",
    group: "Events",
    name: "Sarah's Campaign",
  },
  {
    id: "12EF34RC7",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "28",
    views: "18",
    template: "Holiday Greetings",
    group: "Celebrations",
    name: "Matthew's Campaign",
  },
  {
    id: "12EF34RC8",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "32",
    views: "25",
    template: "Customer Appreciation Email",
    group: "Customer Relations",
    name: "Olivia's Campaign",
  },
  {
    id: "12EF34RC9",
    by: "TravBiz.com",
    date: "2024-03-15",
    sent: "24",
    views: "14",
    template: "Product Feedback Request",
    group: "Product Management",
    name: "William's Campaign",
  },
];

function Campagins() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);

  const [campaign, setCampaign] = useState("");
  const [template, setTemplate] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Name",
      field: "name",
    },
    { headerName: "Template", field: "template", width: 250 },
    { headerName: "Clients Group", field: "group", width: 250 },
    { headerName: "Sent", field: "sent", width: 100 },
    { headerName: "View", field: "views", width: 100 },
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
      width: 160,
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
              setCampaign(params.data.name);
              setTemplate(params.data.template);
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <NorthEastIcon
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
        <div className="font-bold"> Campagins </div>
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
          <Link className="h-[80%]" to={"/campagins/createCampaigns"}>
            <button className="border border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 ">
              <span className="sm:block hidden">Create Campaign</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </Link>
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[60%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> Campaign Details </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex px-2 flex-col h-[90%]">
                <div className="mt-4 flex items-center border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Campaign:
                  </div>
                  <div className="text-sm ml-1">{campaign}</div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Mailing Group:
                  </div>
                  <div className="text-sm ml-1"></div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Template Name:
                  </div>
                  <div className="text-sm ml-1">{template}</div>
                </div>

                <div className="mt-4 flex  items-center border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">By: </div>
                  <div className="text-sm ml-1"></div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Mail From:
                  </div>
                  <div className="text-sm ml-1"></div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-6">
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
    </div>
  );
}

export default Campagins;
