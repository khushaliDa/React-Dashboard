import { useEffect, useState } from "react";
import useUsers from "./hooks/use-users";
import Modal from "./components/common/modal";
import Sidebar from "./components/sidebar";
import UserStatisticCards from "./components/userStatisticCards";
import Header from "./components/header";
import UsersTable from "./components/userTable";

function App() {
  const { fetchAllUsers, createUser, users } = useUsers();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openAddModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleAdd = (userData) => {
    createUser(userData);
    closeModal();
  };

  return (
    <div className="min-h-screen">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-slate-900/40 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            title={
              activeNav === "dashboard"
                ? "Overview"
                : activeNav === "users"
                  ? "Users"
                  : "Settings"
            }
            openAddModal={openAddModal}
            openSidebar={openSidebar}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {activeNav === "users" && (
              <>
                <UserStatisticCards />
                <UsersTable />
              </>
            )}
            {activeNav === "settings" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-[520px]">
                <div className="text-[15px] font-bold text-slate-900 mb-0.5">
                  Settings
                </div>
                <div className="text-[12px] text-slate-400 mb-6">
                  Manage your workspace preferences
                </div>
                {["Dark mode"].map((s, i) => (
                  <div
                    key={s}
                    className={`flex justify-between items-center py-3.5 ${
                      i < 3 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <span className="text-[13px] text-gray-700 font-medium">
                      {s}
                    </span>
                    <div
                      className={`relative w-9 h-5 rounded-full cursor-pointer ${
                        i % 2 === 0
                          ? "bg-gradient-to-r from-indigo-500 to-indigo-400"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                          i % 2 === 0 ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      {showModal && <Modal onClose={closeModal} onSubmit={handleAdd}></Modal>}
    </div>
  );
}

export default App;
