import { Fragment, useState, useMemo } from "react";
import { Search } from "lucide-react";
import useUsers from "../hooks/use-users";

const UserTableHeader = () => {
  const { users, search, setSearch, searchUsers } = useUsers();
  return (
    <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
      <div className="text-[14px] font-bold text-slate-900">
        Team members{" "}
        <span className="text-[12px] font-medium text-slate-400 ml-1.5">
          {searchUsers.length}
        </span>
      </div>
      <div className="relative">
        <Search
          size={14}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-[12px] bg-slate-50 text-slate-900 outline-none w-48 focus:border-indigo-400 transition-colors"
        />
      </div>
    </div>
  );
};

export default UserTableHeader;
