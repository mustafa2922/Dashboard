import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function Transfer() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setClick(true);
    setOpen(false);
  };
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();

  const [stat, setStat] = useState("");
  const [click, setClick] = useState(true);
  const [id, setId] = useState();

  const [vehFields, setVehFields] = useState({
    veh_mark: "",
    passenger_capacity: "",
  });

  const handleChange = (event) => {
    return setVehFields({
      ...vehFields,
      [event.target.name]: event.target.value,
    });
  };

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      flex: 0.15,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return <div className="ml-[-5px]">{params.rowIndex + 1}</div>;
      },
    },
    {
      headerName: "Vehicle Mark",
      field: "veh_mark",
      flex: 1.5,
    },
    {
      headerName: "Passenger Capacity",
      field: "passenger_capacity",
      flex: 0.8,
    },
    {
      headerName: "Updated By",
      flex: 0.9,
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
      headerName: "Updated On",
      field: "created_at",
      valueGetter: (params) => {
        return `${dayjs(params.data.created_at).format("DD-MM-YYYY")}`;
      },
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
              setVehFields({
                passenger_capacity: params.data.passenger_capacity,
                veh_mark: params.data.veh_mark,
              });
              setId(params.data.id);
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <EditIcon
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

  const handleSave = () => {
    if (vehFields.passenger_capacity === "" || vehFields.veh_mark === "") {
      toast.error("Please Fill All the Fields Correctly");
    } else {
      if (stat == "Add") {
        axios
          .post("http://test.seoconsole.net/api/v1/vehicle", vehFields)
          .then((response) => {
            if (response.data == "success") {
              setReload(!reload);
              toast.success("Vehicle Added Successfully");
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://test.seoconsole.net/api/v1/vehicle/${id}`)
      .then((response) => {
        toast.success("Vehicle Deleted Successfully");
        setReload(!reload);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://test.seoconsole.net/api/v1/vehicle/${id}`, vehFields)
      .then((response) => {
        toast.success("Vehicle Updated Successfully");
        setReload(!reload);
        setClick(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://test.seoconsole.net/api/v1/vehicle")
        .then((response) => {
          setRow(response.data.reverse());
        });
    };

    getData();
  }, [reload]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Transfers </div>
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
                setVehFields({
                  veh_mark: "",
                  passenger_capacity: "",
                });
              }}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Vehicle</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[91.5%] w-full overflow-x-auto">
        <div className="ag-theme-quartz h-full lg:w-full  w-[1400px]">
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80%] md:w-[30%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Vehicle </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex flex-col justify-between mt-4 h-[90%]">
                <div className=" mt-4 w-full">
                  <TextField
                    id="outlined-basic"
                    disabled={stat === "Edit" ? click : false}
                    size="small"
                    label="Vehicle Mark"
                    variant="outlined"
                    name="veh_mark"
                    value={vehFields.veh_mark}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="mt-4 w-full">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="Passenger Capacity"
                    disabled={stat === "Edit" ? click : false}
                    value={vehFields.passenger_capacity}
                    name="passenger_capacity"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="number"
                  />
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
}

export default Transfer;
