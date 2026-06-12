import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserList } from "../pages/Users/UserList/UserList";
import { UserForm } from "../pages/Users/userForm/UserForm";
import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { removeSelectedUser } from "../services/usersService";
import LoginUser from "../pages/LoginUser/LoginUser";
import SubscribeUser from "../pages/SubscribeUser/SubscribeUser";

function AppRouter() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  // const [removeUser, setRemoveUser] = useState<User | null>(null);

  useEffect(() => {
      const parsedUsers = JSON.parse(localStorage.getItem("newUser") || "[]");
      setUsers(parsedUsers);
    }, []);

  //função intermediaria para pegar o retorno de removeSelectedUser = updatedList
  function handleRemoveUser(user: User) {
    const updatedList = removeSelectedUser(user, users);
    setUsers(updatedList);
  }

  const router = createBrowserRouter([

        {
          path: "register",
          element: (
            <SubscribeUser/>
          )
        },

        {
          path: "",
          element: (
            <LoginUser/>
          )
        },


        {
          path: "list",
          element: (
            <UserList
              setEditUser={setEditUser}
              setRemoveUser={handleRemoveUser}
              users={users}
            />
          ),
        },
        
        {
          path: "form",
          element: (
            <UserForm
              setUsers={setUsers}
              editUser={editUser} 
            />
          ),
        },

    {
      path: "*",
      element: <h3>route not found!</h3>,
    },
  ]);

  return <RouterProvider router={router} />
  
}

export default AppRouter;
