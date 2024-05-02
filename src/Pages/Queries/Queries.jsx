import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import _ from "lodash";

const BASE_URL = import.meta.env.VITE_BASE_URL;
let destinations = [];
let clients = [];
let corporate = [];
let agents = [];

function Queries() {
  const [search, setSearch] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [able, setAble] = useState(false);

  const quickFilter = (search) => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const [proposalModal, setProposalModal] = useState(false);
  const [queryModal, setQueryModal] = useState(false);

  const handleClose = (MODE) => {
    if (MODE === "PROPOSAL") {
      return setProposalModal(!proposalModal);
    } else if (MODE === "QUERY") {
      return setQueryModal(!queryModal);
    }
  };

  const data = [
    {
      id: "102498",
    },
    {
      id: "102499",
    },
    {
      id: "102500",
    },
    {
      id: "102501",
    },
    {
      id: "102502",
    },
  ];

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
                {params.data.id}
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
                  <option value={""}>Assingn To me</option>
                  <option value={""}></option>
                  <option value={""}></option>
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
                <Link to={`/queries/${params.data.id}`}>
                  <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 rounded-full flex justify-center items-center">
                    <NorthEastIcon
                      className="group-hover:text-white"
                      style={{ fontSize: 17 }}
                    />
                  </div>
                </Link>

                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">
                  <FaWhatsapp
                    className="group-hover:text-white"
                    style={{ fontSize: 17 }}
                  />
                </div>
                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">
                  <EmailOutlinedIcon
                    className="group-hover:text-white"
                    style={{ fontSize: 17 }}
                  />
                </div>
                <div className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center">
                  <EditOutlinedIcon
                    className="group-hover:text-white"
                    style={{ fontSize: 17 }}
                  />
                </div>
                <div
                  onClick={() => {
                    setProposalModal(true);
                  }}
                  className="group cursor-pointer hover:bg-black border border-black h-6 w-6 ml-1 rounded-full flex justify-center items-center"
                >
                  <CardGiftcardIcon
                    className="group-hover:text-white"
                    style={{ fontSize: 17 }}
                  />
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

  const [row, setRow] = useState(data);

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    cellStyle: { margin: "0px !important" },
    tooltipField: "name",
  };

  const [errors, setErrors] = useState({ name: null, helperTxt: null });

  useEffect(() => {
    const getDestinations = () => {
      axios.get(`${BASE_URL}api/v1/destination`).then((response) => {
        destinations = response.data;
      });
    };
    const getClients = () => {
      axios.get(`${BASE_URL}api/v1/client`).then((response) => {
        clients = response.data;
      });
    };
    const getAgents = () => {
      axios.get(`${BASE_URL}api/v1/agent`).then((response) => {
        agents = response.data;
      });
    };
    const getCorporate = () => {
      axios.get(`${BASE_URL}api/v1/corporate`).then((response) => {
        corporate = response.data;
      });
    };

    getDestinations();
    getClients();
    getAgents();
    getCorporate();
  }, []);

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
              onClick={() => {
                setQueryModal(true);
              }}
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

      <Modal
        keepMounted
        onClose={() => {
          handleClose("PROPOSAL");
        }}
        open={proposalModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[70%] h-fit"></div>
      </Modal>

      <Modal
        keepMounted
        open={queryModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[50%] h-fit">
          <div className="flex justify-between text-3xl items-center h-[10%] px-2">
            <div className="font-bold text-lg"> Create Query </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleClose("QUERY");
              }}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="flex justify-between w-full mt-2 h-[90%]">
            <div className="w-[49%]">
              <div>
                <select
                  className={`px-2 focus:outline-none w-full border h-10  focus:border  ${
                    errors.name === "meal_plan_id"
                      ? "border-red-600"
                      : "hover:border-black border-[#d8d8d8]"
                  }  rounded-md`}
                  defaultValue={"DEFAULT"}
                >
                  <option value={"DEFAULT"} disabled={true}>
                    Type
                  </option>
                  <option value="CLIENT">Client</option>
                  <option value="AGENT">Agent</option>
                  <option value="CORPORATE">Corporate</option>
                </select>
                <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                  {errors.name === "meal_plan_id" && errors.helperTxt}
                </p>
              </div>
              <div className="mt-4">
                <div className="w-full flex justify-between items-center">
                  <div className="w-[25%]">
                    <select
                      className={`px-2 focus:outline-none w-full border h-10  focus:border  ${
                        errors.name === "meal_plan_id"
                          ? "border-red-600"
                          : "hover:border-black border-[#d8d8d8]"
                      }  rounded-md`}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled={true}>
                        Title
                      </option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                    </select>
                  </div>
                  <div className="w-[72%]">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      error={errors.name === "single"}
                      label={"Clients Name"}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
                <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                  {errors.name === "meal_plan_id" && errors.helperTxt}
                </p>
              </div>
              <div className="mt-4">
                <TextField
                  id="outlined-basic"
                  size="small"
                  error={errors.name === "single"}
                  label={"Clients Name"}
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
                {
                  <ul className="h-36 w-full  overflow-y-auto mt-1 border border-slate-400 rounded-sm" >
                    <li className="bg-slate-200 p-1 font-[400] text-sm" >Select Phone/Mobile</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-t border-slate-700 mt-1" >ob</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-black " >ob</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-black " >ob</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-black " >ob</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-black " >ob</li>
                    <li className="p-1 hover:bg-black hover:text-white text-black bg-white border-b border-black " >ob</li>
                
                  </ul>
                }
              </div>
            </div>
            <div className="w-[49%]"></div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div
              onClick={() => {
                handleClose("QUERY");
              }}
              className=" w-[48%] rounded-md h-10"
            >
              <button
                disabled={able}
                className="hover:bg-[#c22626] w-full rounded-md  text-white bg-[#e51d27] h-full flex items-center justify-center"
              >
                Cancel
              </button>
            </div>

            <div onClick={() => {}} className=" w-[48%] rounded-md h-10  ">
              <button
                disabled={able}
                className="w-full rounded-md h-full flex hover:bg-[#1a8d42] items-center justify-center text-white bg-[#04AA6D]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Queries;
