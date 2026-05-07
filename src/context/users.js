import { createContext } from "react";
import { useState, useCallback } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState(null); //name

  const ROLE_STYLES = {
    Admin: "bg-violet-100 text-violet-800",
    Editor: "bg-blue-100 text-blue-800",
    Viewer: "bg-slate-100 text-slate-600",
  };

  const config = [
    {
      label: "Name",
      render: (user) => {
        return (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="font-medium">{user.name}</span>
          </div>
        );
      },
      sortValue: (user) => user.name,
    },
    {
      label: "Email",
      render: (user) => user.email,
    },
    {
      label: "Role",
      render: (user) => {
        return (
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              ROLE_STYLES[user.role] ?? "bg-slate-100 text-slate-500"
            }`}
          >
            {user.role}
          </span>
        );
      },
    },
    {
      label: "Status",
      render: (user) => {
        return (
          user.status && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block ${
                  user.status === "Active" ? "bg-green-500" : "bg-slate-400"
                }`}
              />
              {user.status}
            </span>
          )
        );
      },
    },
  ];

  //create user
  const createUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      console.log("Created user:", data);
      setUsers([...users, { ...data, status: "Active" }]);
    } catch (error) {
      console.error(error);
    }
  };

  //read users
  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //update user
  // const editUser = async (id, newName) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/users/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name: newName }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update user");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     const updatedUsers = users.map((user) => {
  //       if (user.id === id) {
  //         return { ...user, ...data };
  //       }
  //       return user;
  //     });
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //delete users
  // const deleteUser = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/users/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete user");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   const updatedUsers = users.filter((user) => user.id !== id);
  //   setUsers(updatedUsers);
  // };

  const searchUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  let sortedUsers = [...users].sort((a, b) => {
    if (sortBy && sortOrder) {
      const column = config.find((c) => c.label === sortBy);
      const valueA = column.sortValue(a);
      const valueB = column.sortValue(b);
      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    }
  });

  const valueToShare = {
    users,
    createUser,
    fetchAllUsers,
    // deleteUser,
    // editUser,
    search,
    setSearch,
    searchUsers,
    config,
    sortedUsers,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  };
  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  );
};
