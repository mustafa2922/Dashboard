import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { FaWhatsapp } from "react-icons/fa";

function Queries() {
  const [search, setSearch] = useState("");
  const [gridApi, setGridApi] = useState(null);

  const quickFilter = (search) => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const [column, setColumn] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      sortable: false,
      filter: false,
      flex: 0.2,
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-evenly   h-[45%]">
              <p className="h-5 text-blue-600 text-base hover:text-blue-800 font-semibold cursor-pointer">
                102498
              </p>
              <div className="w-fit h-5 px-2 flex justify-center items-center  rounded-md bg-[#0cb5b5]">
                <span className="text-xs font-bold text-white">Active</span>
              </div>
            </div>
            <div className="flex flex-col h-[45%]">
              <div className=" h-6 text-slate-600 flex items-center">
                Requirement
              </div>
              <div className=" h-2 flex items-center font-bold text-sm  ">
                Hotel + Flight
              </div>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-evenly  h-[45%]">
              <p className="text-sm font-semibold h-5">
                {`Travocorp (Corporate)`}
              </p>
              <div className="flex text-slate-600 justify-start h-2 items-center">
                9805852240
              </div>
            </div>
            <div className="flex flex-col h-[45%]">
              <div className=" h-6 text-slate-600 text-xs flex items-center">
                sahil12@gmail.com
              </div>
              <div className=" h-2 flex items-center text-slate-700 text-xs  ">
                Agent
              </div>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-evenly  h-[45%]">
              <p className="text-sm font-semibold h-3">Destination</p>
              <div className="w-fit h-5 px-2 flex justify-center items-center  rounded-md bg-[#737373]">
                <span className="text-xs font-bold text-white">Dehli</span>
              </div>
            </div>
            <div className="flex flex-col h-[45%]">
              <div className=" h-6 text-slate-800 text-sm flex items-center">
                Travllers
              </div>
              <div className=" h-5 flex items-center text-slate-700 text-xs  ">
                <span className="font-bold text-black text-sm">{`1`}</span>
                &nbsp;Adult&nbsp;
                <span className="font-bold text-black text-sm">{`3`}</span>
                &nbsp;Child&nbsp;
                <span className="font-bold text-black text-sm">{`2`}</span>
                &nbsp;Infant&nbsp;
              </div>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-evenly  h-[45%]">
              <span className="h-2 flex items-center">
                <CardGiftcardOutlinedIcon
                  style={{ color: "gray", fontSize: 17 }}
                />
                <span className="text-xs text-slate-600">10-04-2024</span>
              </span>
              <span className="h-1 flex items-center">
                Till :
                <span className="text-xs text-slate-600">&nbsp;10-04-2024</span>
              </span>
            </div>
            <div className="flex flex-col h-[45%]">
              <div className=" h-6 text-slate-700 text-sm font-[500] flex items-center">
                Assinged To
              </div>
              <div className=" h-5 flex items-center text-slate-700 text-xs  ">
                <select className="border border-slate-400 w-[90%] rounded">
                  <option>Assingn To me</option>
                  <option></option>
                  <option></option>
                </select>
              </div>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-evenly  h-[45%]">
              <span className="h-2 flex items-center">
                <CalendarMonthOutlinedIcon
                  style={{ color: "gray", fontSize: 17 }}
                />
                <span className="text-xs text-slate-600">10-04-2024</span>
              </span>
              <span className="h-1 flex items-center">
                <TextSnippetOutlinedIcon
                  style={{ color: "#ffa500", fontSize: 17 }}
                />
                <span className="text-xs text-slate-600">&nbsp;No Notes</span>
              </span>
            </div>
            <div className="flex flex-col h-[45%]">
              <span className="h-5 flex items-center">
                <AccessTimeOutlinedIcon
                  style={{ color: "gray", fontSize: 17 }}
                />
                <span className="text-xs text-slate-600">Created</span>
              </span>
              <span className="h-4 flex items-center">
                <span className="text-xs text-slate-600">10-04-2024</span>
              </span>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
      flex: 0.7,
    },
    {
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col h-full w-full">
            <div className="flex w-full flex-col justify-center items-start  h-[45%]">
              <div className=" w-full h-8 flex items-center">

                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 rounded-full flex justify-center items-center">                  
                  <NorthEastIcon className="group-hover:text-white" style={{ fontSize: 17 }} />
                </div>

                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">
                  <FaWhatsapp className="group-hover:text-white"  style={{ fontSize: 17 }} />
                </div>
                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">

                  <EmailOutlinedIcon className="group-hover:text-white"  style={{ fontSize: 17 }} />
                </div>
                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">
                  
                  <EditOutlinedIcon className="group-hover:text-white"  style={{ fontSize: 17 }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col h-[45%]">
              <span className="h-5 flex items-center">
                <AccessTimeOutlinedIcon
                  style={{ color: "gray", fontSize: 17 }}
                />
                <span className="text-xs text-slate-600">Last Updated</span>
              </span>
              <span className="h-4 flex items-center">
                <span className="text-xs text-slate-600">
                  10-04-2024 - 07:42 PM
                </span>
              </span>
            </div>

            <div className="h-[10%]"></div>
          </div>
        );
      },
    },
  ]);

  const [row, setRow] = useState([{}, {}, {}]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    cellStyle: { margin: "0px !important" },
    tooltipField: "name",
  };

  return (
    <div className="h-full w-full">
      <style>{`
      .ag-header{
        display:none;
      }
      .ag-cell{
       padding:0;
       margin:0; 
      }

      .ag-cell:focus {
        border:1px solid transparent !important; 
      }

      .ag-row{}
      
      `}</style>
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#f5f7f9]">
        <div className="font-[700]"> Queries </div>
        <div className="flex justify-center  sm:w-[65%] md:w-[55%] lg:w-[43%]  w-[90%] items-center gap-3 h-full">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter(e.target.value);
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[60%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <div className="w-[40%] h-[80%]">
            <button
              onClick={() => {}}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white  text-[0.8rem] font-[700] rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Queries</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-fit py-1 px-2 flex items-center justify-evenly w-full flex-row flex-wrap">
        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-black rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white text-[0.65rem] font-[700] ">TOTAL</div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#655be6] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">NEW</div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#0cb5b5] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">ACTIVE</div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#0f1f3e] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">
            NO CONNECT
          </div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#e45555] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">HOT LEAD</div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#ff6700] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">
            FOLLOW UP
          </div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#cc00a9] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">
            PROPOSAL SENT
          </div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#46cd93] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">
            CONFIRMED
          </div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#6c757d] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">CANCELED</div>
        </div>

        <div className="flex flex-col items-center m-1 h-12 w-[7rem] cursor-pointer shadow-xl bg-[#f9392f] rounded-md justify-center">
          <div className="text-white text-xl ">2082</div>
          <div className="text-white  text-[0.65rem] font-[700] ">INVALID</div>
        </div>
      </div>

      <div className="h-[80%] w-full mt-[6px] px-5 overflow-x-auto ">
        <div className="ag-theme-quartz h-full xl:w-full  w-[1200px]">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            paginationPageSize={20}
            suppressColumnHeaders={true}
            rowSelection="multiple"
            className="Grid"
            rowHeight={120}
          />
        </div>
      </div>
    </div>
  );
}

export default Queries;
