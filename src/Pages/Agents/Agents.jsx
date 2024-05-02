import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
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
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Agents() {
  const [able, setAble] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [stat, setStat] = useState("");

  const [id, setId] = useState("");

  const [reload, setReload] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [fields, setFields] = useState({
    company: "",
    gst: "",
    title: "DEFAULT",
    first_name: "",
    last_name: "",
    email: "",
    mob: "",
    sec_email: "",
    sec_mob: "",
    city: "",
    address: "",
  });

  const handleChange = (event) => {
    return setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setAble(true);
    if (
      fields.first_name === "" ||
      fields.title === "DEFAULT" ||
      fields.last_name === "" ||
      fields.company === "" ||
      fields.city === "" ||
      fields.address === "" ||
      fields.email === "" ||
      fields.sec_email === "" ||
      fields.mob === "" ||
      fields.gst === "" ||
      fields.sec_mob === ""
    ) {
      toast.error("Please Fill All Fields Correctly");
      setAble(false);
    } else {
      if (stat == "Add") {
        axios
          .post(`${BASE_URL}api/v1/agent`, fields)
          .then((response) => {
            if (response.data == "success") {
              setAble(false);
              setReload(!reload);
              toast.success("Agent Added Successfully");
              setOpen(false);
            }
          })
          .catch((error) => {
            setAble(false);
            console.log(error);
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
                .delete(`${BASE_URL}api/v1/agent/${id}`)
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
      .put(`${BASE_URL}api/v1/agent/${id}`, fields)
      .then((response) => {
        toast.success("Agent Updated Successfully");
        setAble(false);
        setReload(!reload);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setAble(false);
      });
  };

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      flex: 0.2,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return <div className="ml-[-8px]">{params.rowIndex + 1}</div>;
      },
    },
    {
      headerName: "GST",
      field: "gst",
      flex: 0.4,
    },
    {
      headerName: "Name",
      valueGetter: (params) => {
        return `${params.data.title} ${params.data.first_name} ${params.data.last_name}`;
      },
    },
    { headerName: "Number", field: "mob" },
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
            <Link to={`/agents/${params.data.id}`}>
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
                setFields({
                  company: params.data.company,
                  gst: params.data.gst,
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

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${BASE_URL}api/v1/agent`)
        .then((response) => {
          setRow(response.data.reverse());
        });
    };

    getData();
  }, [reload]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Agents </div>
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
                setFields({
                  company: "",
                  gst: "",
                  title: "DEFAULT",
                  first_name: "",
                  last_name: "",
                  email: "",
                  mob: "",
                  sec_email: "",
                  sec_mob: "",
                  city: "",
                  address: "",
                });
              }}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Agents</span>
              <span className="sm:hidden block">
                <PersonAddAltIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[91.5%] w-full overflow-x-auto">
        <div className="ag-theme-quartz h-full  w-[1300px] lg:w-full">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            paginationPageSize={20}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[50%] h-fit">
              <div className="flex justify-between items-center h-[10%] px-2">
                <div className="font-bold text-lg">{stat} Agents </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>

              <div className="flex mt-4 justify-between h-[90%]">
                <div className="w-[48%] ">
                  <select
                    value={fields.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="title"
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
                        value={fields.first_name}
                        name="first_name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        label="First Name"
                        variant="outlined"
                      />
                    </div>

                    <div className="mt-4 w-[49%]">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        value={fields.last_name}
                        name="last_name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        size="small"
                        label="Last Name"
                        variant="outlined"
                      />
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={fields.email}
                      name="email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      size="small"
                      label="Email-1"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      defaultCountry="IN"
                      value={fields.mob}
                      onChange={(e) => {
                        setFields({ ...fields, mob: e });
                      }}
                      placeholder="Number-1"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={fields.sec_email}
                      name="sec_email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      size="small"
                      label="Email-2"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <div>
                    <PhoneInput
                      defaultCountry="IN"
                      value={fields.sec_mob}
                      onChange={(e) => {
                        setFields({ ...fields, sec_mob: e });
                      }}
                      placeholder="Number-2"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={fields.city}
                      name="city"
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                      value={fields.address}
                      name="address"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Address"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      value={fields.company}
                      name="company"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Company"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={fields.gst}
                      name="gst"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      size="small"
                      label="GST"
                      variant="outlined"
                      type="number"
                    />
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
}

export default Agents;
