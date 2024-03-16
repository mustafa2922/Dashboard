import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

const data = [
  {
    id: "12EF34RC1",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "John's Campaign",
    mail_subject: "Exciting Updates Inside: John's Campaign",
  },
  {
    id: "12EF34RC2",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Jane's Campaign",
    mail_subject: "Introducing Our Latest Product: Jane's Campaign",
  },
  {
    id: "12EF34RC3",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Michael's Campaign",
    mail_subject: "Your Feedback Matters: Michael's Campaign",
  },
  {
    id: "12EF34RC4",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Emily's Campaign",
    mail_subject: "Join Us for an Exclusive Workshop: Emily's Campaign",
  },
  {
    id: "12EF34RC5",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "David's Campaign",
    mail_subject: "Discover What's New: David's Campaign",
  },
  {
    id: "12EF34RC6",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Sarah's Campaign",
    mail_subject: "You're Invited to Our Special Event: Sarah's Campaign",
  },
  {
    id: "12EF34RC7",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Matthew's Campaign",
    mail_subject: "Warmest Holiday Wishes: Matthew's Campaign",
  },
  {
    id: "12EF34RC8",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "Olivia's Campaign",
    mail_subject: "Thank You for Being a Valued Customer: Olivia's Campaign",
  },
  {
    id: "12EF34RC9",
    by: "TravBiz.com",
    date: "15-03-2024",
    name: "William's Campaign",
    mail_subject: "We Want to Hear from You: William's Campaign",
  },
];

function EmailTemplate() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);

  const [name, setName] = useState("");

  const [column, setColumn] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      cellClass: "flex items-center justify-start",
      sortable: false,
      filter: false,
    },
    {
      headerName: "ID",
      field: "id",
    },
    {
      headerName: "Name",
      field: "name",
      width: 250,
    },
    {
      headerName: "Mail Subject",
      field: "mail_subject",
      width: 350,
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
              setName(params.data.name)
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
    {
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <Link to={'/emailTemplate/createTemplate'} >
            <div className="flex items-center justify-center w-full h-full">
              <EditNoteIcon
                className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
                style={{ fontSize: "25px" }}
              />
            </div>
          </Link>
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
        <div className="font-bold"> Email Templates </div>
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
          <Link className="h-[80%]" to={"/emailTemplate/createTemplate"}>
            <button className="border border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 ">
              <span className="sm:block hidden">Add Templates</span>
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
            rowSelection="multiple"
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
                <div className="font-bold text-lg"> View Template </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex px-2 flex-col h-[90%]">
                <div className="mt-4 flex items-center border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Name:
                  </div>
                  <div className="text-sm ml-1">{name}</div>
                </div>

                <div className="mt-4 flex items-center  border-b border-[#dddddd] h-6">
                  <div className="font-bold text-sm text-slate-700">
                    Email Subject:
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

export default EmailTemplate;
