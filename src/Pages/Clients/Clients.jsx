import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import EditIcon from "@mui/icons-material/Edit";
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

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Clients = () => {
  const [able, setAble] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [stat, setStat] = useState("");
  const [reload, setReload] = useState(false);
  const [click, setClick] = useState(true);
  const [id, setId] = useState("");
  const [showDOBDate, setShowDOBDate] = useState(dayjs());
  const [showMADate, setShowMADate] = useState(dayjs());

  const [fields, setField] = useState({
    title: "DEFAULT",
    first_name: "",
    last_name: "",
    email: "",
    mob: "",
    sec_email: "",
    sec_mob: "",
    city: "",
    address: "",
    date_of_birth: showDOBDate,
    marriage_anniversary: showMADate,
  });

  const handleChange = (event) => {
    return setField({ ...fields, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setAble(true);
    if (
      fields.title === "DEFAULT" ||
      fields.first_name === "" ||
      fields.last_name === "" ||
      fields.email === "" ||
      fields.mob === "" ||
      fields.sec_email === "" ||
      fields.sec_mob === "" ||
      fields.city === "" ||
      fields.address === "" ||
      fields.address === "" ||
      fields.email === fields.sec_email
    ) {
      toast.error("Please Fill All Fields Correctly");
      setAble(false);
    } else {
      if (stat == "Add") {
        axios
          .post(`${BASE_URL}api/v1/client`, fields)
          .then((response) => {
            if (response.data == "success") {
              setReload(!reload);
              setAble(false);
              toast.success("Agent Added Successfully");
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setAble(false);
          });
      }
    }
  };

  const handleDelete = () => {
    const confirmationToastId = toast.warning(
      <div className="flex flex-col">
        <p>You want to delete this item?</p>
        <div className="flex items-center justify-start gap-2">
          <button
            className="w-8 h-6  text-xs bg-red-500 rounded-md text-white"
            onClick={() => {
              axios
                .delete(`${BASE_URL}api/v1/client/${id}`)
                .then((response) => {
                  toast.dismiss(confirmationToastId);
                  toast.success("Client Deleted Successfully");
                  setReload(!reload);
                  setOpen(false);
                })
                .catch((err) => {
                  console.log(err.response.data);
                });
            }}
          >
            Yes
          </button>
          <button
            className="w-8 h-6 text-xs bg-green-500 rounded-md text-white "
            onClick={() => {
              toast.dismiss(confirmationToastId);
            }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleUpdate = () => {
    setAble(true);
    axios
      .put(`${BASE_URL}api/v1/client/${id}`, fields)
      .then((response) => {
        toast.success("Client Updated Successfully");
        setReload(!reload);
        setAble(false);
        setClick(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setAble(false);
      });
  };

  const [column, setColumn] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      cellClass: "ml-[-9px] flex items-center justify-start",
      sortable: false,
      filter: false,
      flex: 0.3,
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
            <EditIcon
              onClick={() => {
                setOpen(true);
                setStat("Edit");
                setShowDOBDate(dayjs(params.data.date_of_birth));
                setShowMADate(dayjs(params.data.marriage_anniversary));
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
                  date_of_birth: dayjs(params.data.date_of_birth),
                  marriage_anniversary: dayjs(params.data.date_of_birth),
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

  const quickFilter = (search) => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    flex: 1,
    tooltipField: "name",
  };

  useEffect(() => {
    const getdata = () => {
      axios
        .get(`${BASE_URL}api/v1/client`)
        .then((response) => {
          setRow(response.data.reverse());
        });
    };
    getdata();
  }, [reload]);

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

                setField({
                  title: "DEFAULT",
                  first_name: "",
                  last_name: "",
                  email: "",
                  mob: "",
                  sec_email: "",
                  sec_mob: "",
                  city: "",
                  address: "",
                  date_of_birth: showDOBDate,
                  marriage_anniversary: showMADate,
                });
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[48%] h-fit">
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT">Title</option>
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
                      variant="outlined"
                      name="email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={fields.email}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      defaultCountry="IN"
                      placeholder="Number-1"
                      className={`border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10`}
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
                      variant="outlined"
                      name="sec_email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={fields.sec_email}
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <div>
                    <PhoneInput
                      defaultCountry="IN"
                      placeholder="Number-2"
                      className={`border border-[#b9b9b9]  rounded-sm p-2 hover:border-black h-10`}
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
                      size="small"
                      label="City"
                      variant="outlined"
                      name="city"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={fields.city}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
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
                        format="DD-MM-YYYY"
                        name="date_of_birth"
                        value={showDOBDate}
                        onAccept={(e) => {
                          const DOB = dayjs(e).format("YYYY-MM-DD");
                          setShowDOBDate(e);
                          setField({
                            ...fields,
                            date_of_birth: DOB,
                          });
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className=" mt-4 custom-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        format="DD-MM-YYYY"
                        label="Marriage Anniversary"
                        value={showMADate}
                        name="marriage_anniversary"
                        onAccept={(e) => {
                          const MA = dayjs(e).format("YYYY-MM-DD");
                          setShowMADate(e);
                          setField({
                            ...fields,
                            marriage_anniversary: MA,
                          });
                        }}
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
                    disabled={able}
                    onClick={stat === "Edit" ? handleUpdate : handleSave}
                    className={`w-full rounded-md h-full flex items-center
                         hover:bg-green-900 bg-green-600
                    justify-center text-white`}
                  >
                    {stat === "Edit" ? "Update" : "Save"}
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
