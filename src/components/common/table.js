import { Fragment, useState, useMemo } from "react";
import { Search } from "lucide-react";
import UserTableHeader from "../userTableHeader";
import useUsers from "../../hooks/use-users";

const Table = ({ config, sortedData, roleStyle }) => {
  const { searchUsers,sortedUsers } = useUsers();
  const renderedHeaders = config.map((column) => {
    console.log(column);
    
    if (column.header) {     
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th
        key={column.label}
        className="px-3.5 py-2.5 text-[11px] font-semibold text-slate-500 text-left tracking-wider uppercase bg-slate-50 border-b border-slate-200"
      >
        {column.label}
      </th>
    );
  });

  const renderedRows =
    sortedUsers.length === 0 ? (
      <tr>
        <td
          colSpan={config.length}
          className="px-3.5 py-8 text-center text-[13px] text-slate-400"
        >
          No users found
        </td>
      </tr>
    ) : (
      sortedUsers.map((row) => {
        return (
          <tr
            key={row.id}
            className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
          >
            {config.map((column) => (
              <td
                key={column.label}
                className="px-3.5 py-3 text-[13px] text-slate-800 align-middle"
              >
                {column.render(row)}
              </td>
            ))}
          </tr>
        );
      })
    );
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export default Table;
