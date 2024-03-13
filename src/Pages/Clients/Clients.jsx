import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from 'react';

const data = [
  {
    name: 'John Doe',
    number: 123456789,
    email: 'johndoe@gmail.com',
    city: 'London',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Jane Smith',
    number: 987654321,
    email: 'janesmith@example.com',
    city: 'New York',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Michael Johnson',
    number: 456123789,
    email: 'michaeljohnson@example.com',
    city: 'Los Angeles',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Emily Brown',
    number: 789456123,
    email: 'emilybrown@example.com',
    city: 'Chicago',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'David Lee',
    number: 321654987,
    email: 'davidlee@example.com',
    city: 'San Francisco',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Sarah Johnson',
    number: 654789321,
    email: 'sarahjohnson@example.com',
    city: 'Miami',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Matthew Davis',
    number: 987654123,
    email: 'matthewdavis@example.com',
    city: 'Seattle',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Olivia Wilson',
    number: 741852963,
    email: 'oliviawilson@example.com',
    city: 'Dallas',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'William Taylor',
    number: 369852147,
    email: 'williamtaylor@example.com',
    city: 'Houston',
    status: 'Active',
    by: 'TravBiz.com'
  },
  {
    name: 'Ava Martinez',
    number: 258369147,
    email: 'avamartinez@example.com',
    city: 'Boston',
    status: 'Active',
    by: 'TravBiz.com'
  }
];


const Clients = () => {
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];
  const [search, setSearch] = useState('');

  useEffect(() => {
    
  }, [])

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { checkboxSelection: true, },
    { field: 'Name', },
    { field: 'Mobile', },
    { field: 'Email', },
    { field: 'City', },
    { field: 'Status', },
    { field: 'By', },
    { field: '', },
    { field: '', },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
    };
  }, []);


  return (
    <div className='h-full' >

      <div className='flex justify-between items-center h-12 px-2 border-t border-slate-300 border-b bg-[#eff3f7]' >
        <div className='font-bold' > Clients </div>
        <div className='flex items-center gap-3 h-full' >
          <input value={search} onChange={(e) => setSearch(e.target.value)} className='border border-slate-300 h-[80%] px-2 rounded-md text-sm w-52' placeholder='Search by name, email, phone' />
          <button className='border border-slate-300 h-[80%] bg-[#1d3f5a] text-white text-sm rounded-md px-2 '> Add Client </button>
        </div>
      </div>

      <div className='h-full w-full' >
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection="multiple"
            defaultColDef={defaultColDef}
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[20, 50, 100]}
          />
        </div>
      </div>

    </div>
  );
};

export default Clients;
