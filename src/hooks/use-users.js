import { useContext } from "react";
import { UsersContext } from "../context/users";

function useUsers() { 
    return useContext(UsersContext);
}

export default useUsers;