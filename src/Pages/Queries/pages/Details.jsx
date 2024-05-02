import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState } from "react";
import PushPinSharpIcon from "@mui/icons-material/PushPinSharp";

function Details() {
  const [row, setRow] = useState();
  const [column, setColumn] = useState([
    {
      headerName: "",
    },
    {
      headerName: "Title",
      flex:2,
    },
    {
      headerName:"Price",
    },
    {
      headerName:"Created"
    },
    {}
  ]);

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    flex: 1,
    tooltipField: "name",
  };

  return (
    <div className="py-2 px-3 w-full h-full">
      <div className="w-full flex flex-col ">
        <div className="py-1 w-full rounded-lg bg-[#f7f7f7]">
          <span className="font-[500] text-sm pl-2">Client Information</span>
        </div>
        <div className="flex gap-2 w-full pt-2">
          <div className="w-[30%] flex flex-col ">
            <div className="text-xs">Client Name</div>
            <div className="text-sm mt-1 font-[500]">
              Mr. Ratan Kumar Srivastava Srivastava
            </div>
          </div>
          <div className="w-[24%] flex flex-col ">
            <div className="text-xs">Mobile</div>
            <div className="text-sm mt-1 font-[500]">+919521508406</div>
          </div>
          <div className="w-[24%] flex flex-col ">
            <div className="text-xs">Email</div>
            <div className="text-sm mt-1 font-[500]">ratan@travbizz.com</div>
          </div>
          <div className="w-[20%] flex flex-col "></div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="py-1 w-full rounded-lg bg-[#f7f7f7]">
          <span className="font-[500] text-sm pl-2">Query Information</span>
        </div>
        <div className="flex w-full pt-2 gap-2">
          <div className="w-[30%] flex flex-col ">
            <div className="w-full">
              <div className="text-xs">Destination</div>
              <div className="text-sm mt-1 font-[500]">Dubai</div>
            </div>
            <div className="w-full mt-5">
              <div className="text-xs">Lead Source</div>
              <div className="text-sm mt-1 font-[500]">Instagram</div>
            </div>
            <div className="w-full mt-5">
              <div className="text-xs">Query Description</div>
              <div className="text-sm mt-1 font-[500]">nothing</div>
            </div>
          </div>
          <div className="w-[24%]">
            <div className="w-full">
              <div className="text-xs">From Date</div>
              <div className="text-sm mt-1 font-[500]">01-06-2024</div>
            </div>
            <div className="w-full mt-5">
              <div className="text-xs">Services</div>
              <div className="text-sm mt-1 font-[500]">Full package</div>
            </div>
          </div>
          <div className="w-[24%]">
            <div className="w-full">
              <div className="text-xs">To Date</div>
              <div className="text-sm mt-1 font-[500]">04-06-2024</div>
            </div>
            <div className="w-full mt-5">
              <div className="text-xs">Pax</div>
              <div className="text-sm mt-1 font-[500]">
                Adult:{`1`}-Child:{`0`}-Infant:{`0`}
              </div>
            </div>
          </div>
          <div className="w-[20%]">
            <div className="w-full">
              <div className="text-xs">Travel Month</div>
              <div className="text-sm mt-1 font-[500]">June</div>
            </div>
            <div className="w-full mt-5">
              <div className="text-xs">Assign To</div>
              <div className="text-sm mt-1 font-[500]">
                TravBizz IT Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="py-2 w-full px-2 rounded-lg items-center  flex justify-between bg-[#f7f7f7]">
          <span className="font-[500] text-sm pl-2">Notes</span>
          <button className="text-xs py-1 focus:outline-none active:outline-none hover:bg-blue-900 bg-[#005ee2] rounded-md text-white font-[500] px-2 ">
            +Add Notes
          </button>
        </div>
        {/* This Is Notes Div */}
        <div className="border w-full shadow-md rounded-lg mt-3 p-3">
          <div>
            <textarea
              style={{ resize: "none", padding: 8, fontSize: 13 }}
              className="w-full focus:outline-none active:outline-none border "
            />
          </div>
          <div className="border-2 border-[#ffecc4] bg-[#ffffe1] flex gap-2 py-1 px-2 mt-2">
            <div>
              {" "}
              <PushPinSharpIcon
                style={{ color: "#ff8d00", fontSize: 24 }}
              />{" "}
            </div>
            <div className="flex flex-col">
              <div> abcd </div>
              <div>
                {" "}
                <span className="italic text-xs">
                  {" "}
                  30/04/2024 - 11:11 PM by TravBizz IT Solutions{" "}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="py-2 w-full rounded-lg bg-[#f7f7f7]">
          <span className="font-[500] text-sm pl-2">Package Suggestion</span>
        </div>
        {/* Grid Div */}
        <div className="border w-full overflow-auto rounded-lg mt-3 h-52  ">
          <div className="ag-theme-quartz h-full" >
            <AgGridReact
              onGridReady={onGridReady}
              columnDefs={column}
              className="border bg-red-200"
              rowData={row}
              defaultColDef={defaultColDef}
              enableBrowserTooltips={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
