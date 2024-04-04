import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";
import { toast } from "react-toastify";


const Clients = () => {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [stat, setStat] = useState("");
  const [reload, setReload] = useState(false)
  const [click, setClick] = useState(true);
  const [id, setId] = useState("")

 const[fields, setField] = useState({
  title: "",
  first_name: "",
  last_name: "",
  email: "",
  mob: "",
  sec_email: "",
  sec_mob: "",
  city: "",
  address: "",
  date_of_birth: "22-02-2024",
  marriage_anniversary: "22-02-2024",
 })

 const handleChange = (event)=>{
  return setField({...fields, [event.target.name]: event.target.value});
 }

  const handleClose = () => {
    setClick(true);
    setOpen(false);
  };

  const handleSave = () => {
    if (
      fields.first_name === "" ||
      fields.title === "DEFAULT" ||
      fields.last_name === "" ||
      fields.city === "" ||
      fields.address === "" ||
      fields.email === "" ||
      fields.sec_email === "" ||
      fields.mob === "" ||
      fields.sec_mob === ""||
      fields.address === ""
    ) {
      toast.error("Please Fill All Fields Correctly");
    } else {
      if (stat == "Add") {
        axios
          .post("http://test.seoconsole.net/api/v1/client", fields)
          .then((response) => {
            if (response.data == "success") {
              setReload(!reload);
              toast.success("Agent Added Successfully");
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    console.log("succes")
    console.log(fields)
  };

  const handleDelete = () => {
    console.log(id)
    axios
      .delete(`http://test.seoconsole.net/api/v1/agent/${id}`)
      .then((response) => {
        toast.success("Agent Deleted Successfully");
        setReload(!reload);
        setOpen(false)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://test.seoconsole.net/api/v1/agent/${id}`, fields)
      .then((response) => {
        toast.success("Agent Updated Successfully");
        setReload(!reload);
        setClick(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const [value, setValue] = useState();

  const [column, setColumn] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      cellClass: "flex items-center justify-start",
      sortable: false,
      filter: false,
      flex: 0.25,
    },
    {
      headerName: "Name",
      valueGetter: (params) => {
        return `${params.data.title} ${params.data.first_name} ${params.data.last_name}`;
      },
    },
    { headerName: "Number", field: "sec_mob" },
    {
      headerName: "Email",
      field: "email",
    },
    { headerName: "City", field: "city" },
    {
      headerName: "Updated By",
      flex: 1.35,
      field: "by",
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              J
            </div>
            <div className="w-0">JaffarSaleem@gmail.com</div>
          </div>
        );
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.3,
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
      sortable: false,
      filter: false,
      flex: 0.3,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <EditNoteIcon
              onClick={() => {
                setOpen(true);
                setStat("Edit");
                setField({
                  title: params.data.title,
                  first_name: params.data.first_name,
                  last_name: params.data.last_name,
                  email: params.data.email,
                  mob: params.data.mob,
                  sec_email: params.data.sec_email,
                  sec_mob: params.data.sec_mob,
                  city: params.data.city,
                  address: params.data.address,
                });
                setId(params.data.id);
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
    setRow();
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

  useEffect(()=>{
    const getdata = ()=>{
      axios
      .get("http://test.seoconsole.net/api/v1/client")
      .then(
        (response)=>{
          setRow(response.data.reverse())
        }
      )
    }
    getdata();
  },[reload])

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Clients </div>
        <div className="flex justify-center  sm:w-[65%] md:w-[55%] lg:w-[43%]  w-[90%] items-center gap-3 h-full">
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
              quickFilter(e.target.value);
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[60%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <div className="w-[40%] h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Clients</span>
              <span className="sm:hidden block">
                <PersonAddAltIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[91.5%] w-full overflow-x-auto ">
        <div className="ag-theme-quartz h-full w-[1000px] lg:w-full">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            paginationPageSize={20}
            rowSelection="multiple"
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[70%] h-fit">
              <div className="flex justify-between items-center h-[10%] px-2">
                <div className="font-bold text-lg">{stat} Client</div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>

              <div className="flex mt-4 justify-between h-[90%]">
                <div className="w-[48%] ">
                  <select
                    value={fields.title}
                    name="title"
                    onChange={(e)=>{
                      handleChange(e);
                    }}
                    disabled={stat === "Edit" ? click : false}
                    className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>

                  <div className="flex items-center justify-between">
                    <div className="mt-4 w-[49%]">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        size="small"
                        label="First Name"
                        disabled={stat === "Edit" ? click : false}
                        variant="outlined"
                        name="first_name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={fields.first_name}
                      />
                    </div>

                    <div className="mt-4 w-[49%]">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        size="small"
                        label="Last Name"
                        variant="outlined"
                        disabled={stat === "Edit" ? click : false}
                        name="last_name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={fields.last_name}
                      />
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Email-1"
                      disabled={stat === "Edit" ? click : false}
                      variant="outlined"
                      name="email"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={fields.email}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      international
                      disabled={stat === "Edit" ? click : false}
                      placeholder="Number-1"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                      value={fields.mob}
                      onChange={(e) => {
                        setField({ ...fields, mob: e });
                      }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Email-2"
                      disabled={stat === "Edit" ? click : false}
                      variant="outlined"
                      name="sec_email"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={fields.sec_email}
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <div>
                    <PhoneInput
                      international
                      placeholder="Number-2"
                      disabled={stat === "Edit" ? click : false}
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                      value={fields.sec_mob}
                      onChange={(e) => {
                        setField({ ...fields, sec_mob: e });
                      }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled={stat === "Edit" ? click : false}
                      size="small"
                      label="City"
                      variant="outlined"
                      name="city"
                      onChange={(e) =>{
                        handleChange(e)
                      }}
                      value={fields.city}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled={stat === "Edit" ? click : false}
                      size="small"
                      label="Address"
                      variant="outlined"
                      name="address"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={fields.address}

                    />
                  </div>

                  <div className="mt-4 custom-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Date Of Birth"
                        disabled={stat === "Edit" ? click : false}
                        defaultValue={dayjs("2022-04-17")}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className=" mt-4 custom-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Marriage Anniversary"
                        disabled={stat === "Edit" ? click : false}
                        defaultValue={dayjs("2022-04-17")}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={stat === "Edit" ? handleDelete : handleClose}
                  className=" w-[49%] rounded-md h-10"
                >
                  <button
                    className={` bg-red-600 hover:bg-red-900 w-full rounded-md  text-white h-full flex items-center justify-center`}
                  >
                    {stat === "Edit" ? "Delete" : "Cancel"}
                  </button>
                </div>

                <div className=" w-[48%] rounded-md h-10  ">
                  <button
                    onClick={
                      stat === "Edit"
                        ? click
                          ? () => {
                              setClick(false);
                            }
                          : handleUpdate
                        : handleSave
                    }
                    className={`w-full rounded-md h-full flex ${
                      stat === "Edit"
                        ? click
                          ? "hover:bg-blue-900"
                          : "hover:bg-green-900"
                        : "hover:bg-green-900"
                    } items-center justify-center text-white ${
                      stat === "Edit"
                        ? click
                          ? "bg-blue-600"
                          : "bg-green-600"
                        : "bg-green-600"
                    }`}
                  >
                    {stat === "Edit" ? (click ? "Edit" : "Update") : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Clients;
