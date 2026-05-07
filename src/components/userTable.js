import { useState } from "react";
import Table from "./common/table";
import useUsers from "../hooks/use-users";
import UserTableHeader from "./userTableHeader";
import { ArrowUpDown, ArrowUpAZ, ArrowDownZA } from "lucide-react";

const UsersTable = () => {
  
  const { users, sortedUsers, sortBy, sortOrder, setSortBy, setSortOrder ,config} = useUsers();

  const getIcons = (label, sortBy, sortOrder) => {
    if (label !== sortBy) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    if (sortOrder === null) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    if (sortOrder === "asc") {
      return <ArrowUpAZ className="ml-2 h-4 w-4" />;
    }
    if (sortOrder === "desc") {
      return <ArrowDownZA className="ml-2 h-4 w-4" />;
    }
  };

  const handleSort = (label) => {
    console.log(label);
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };
  const updatedConfig = config.map((column) => {
    if (column.sortValue) {
      return {
        ...column,
        header: () => (
          <th
            className="px-3.5 py-2.5 text-[11px] font-semibold text-slate-500 text-left tracking-wider uppercase bg-slate-50 border-b border-slate-200"
            onClick={() => handleSort(column.label)}
          >
            <div className="flex items-center cursor-pointer">
              {column.label}
              {getIcons(column.label, sortBy, sortOrder)}
            </div>
          </th>
        ),
      };
    }
    return column;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <UserTableHeader />
      <div className="overflow-x-auto">
        <Table config={updatedConfig} sortedData={sortedUsers} />
      </div>
    </div>
  );
};

export default UsersTable;
