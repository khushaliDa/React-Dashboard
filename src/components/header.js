import { useState } from "react";
import { PlusCircle, Search, Plus } from "lucide-react";

const Header = ({ title, openAddModal, openSidebar }) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-400">April 2026 — All channels</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-[12px] font-bold text-white cursor-pointer shadow-[0_0_0_2px_#fff,0_0_0_3.5px_#818cf8]">
          AJ
        </div>
      </div>
    </div>
  );
};

export default Header;
