import React from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";

function DataTableUsers() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    { name: "Role", selector: (row) => row.role, sortable: true },
  ];

  const data = [
    {
      id: 1,
      name: "Ricardo Elias",
      email: "ricardo@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Maria Silva",
      email: "maria@gmail.com",
      role: "User",
    },
    {
      id: 3,
      name: "João Santos",
      email: "joao@gmail.com",
      role: "User",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana@gmail.com",
      role: "User",
    },
    {
      id: 5,
      name: "Pedro Sousa",
      email: "pedro@gmail.com",
      role: "User",
    },
    {
      id: 6,
      name: "Sofia Costa",
      email: "sofia@gmail.com",
      role: "User",
    },
    {
      id: 7,
      name: "Miguel Pereira",
      email: "miguel@gmail.com",
      role: "User",
    },
    {
      id: 8,
      name: "Inês Rodrigues",
      email: "ines@gmail.com",
      role: "User",
    },
    {
      id: 9,
      name: "Tiago Fernandes",
      email: "tiago@gmail.com",
      role: "User",
    },
    {
      id: 10,
      name: "Catarina Lopes",
      email: "catarina@gmail.com",
      role: "User",
    },
    {
      id: 11,
      name: "Eduardo Martins",
      email: "eduardo@gmail.com",
      role: "User",
    },
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const result = data.filter((record) => {
      return record.name.toLowerCase().includes(value);
    });
    setRecords(result);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search by name"
        />
      </div>

      <div>
        <DataTable columns={columns} data={records} fixedHeader pagination />
      </div>
    </div>
  );
}

export default DataTableUsers;
