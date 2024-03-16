import React from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from '@mui/icons-material/South';

function MarketingDashboard() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const currentMonth = monthNames[date.getMonth()];

  return (
    <div className="h-full p-4">
      <div className="font-bold text-lg sm:text-2xl h-10 w-full px-3">
        Marketing Dashboard
      </div>

      <div className="flex flex-wrap justify-around mt-4 px-2 w-full">
        
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Campaigns
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">100%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Leads
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">83%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            In {currentMonth} Email Sent
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">3</div>
            <div className="w-14 px-1 bg-[#f1646c] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">8%</div>
              <div className="text-white mb-1">
                <SouthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col w-[100%] mt-2 md:w-[24%] border border-slate-200 rounded-md shadow-sm ">
          <div className="text-sm font-bold text-slate-500">
            {currentMonth}'s Feedback Response
          </div>

          <div className="flex mt-2 items-end justify-between">
            <div className="text-3xl text-black">0</div>
            <div className="w-14 px-1 bg-[#1ecab8] rounded-lg flex flex-row items-center justify-center">
              <div className="text-xs text-white font-bold">100%</div>
              <div className="text-white mb-1">
                <NorthIcon style={{ fontSize: 15 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingDashboard;
