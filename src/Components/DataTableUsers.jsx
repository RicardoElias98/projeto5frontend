import React from "react";
import DataTable from "react-data-table-component";

function DataTableUsers() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    { name: "Role", selector: (row) => row.role },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "ricardo@gmail.com",
      role: "Admin",
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DataTableUsers;
