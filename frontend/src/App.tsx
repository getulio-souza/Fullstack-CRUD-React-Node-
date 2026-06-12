import { useEffect, useState } from "react";
import "./App.css";
import { UserForm } from "./pages/Users/userForm/UserForm";
import { UserList } from "./pages/Users/UserList/UserList";
import type { User } from "./types/User";
import Header from "./components/header/Header";

function App() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [editUser, setEditUser] = useState<User | null>(null);
  // const [removeUser, setRemoveUser] = useState<User | null>(null);
  

  //carregando os dados do localStorage na lista de usuarios
  // useEffect(() => {
  //   const parsedUsers = JSON.parse(localStorage.getItem("newUser") || "[]");
  //   setUsers(parsedUsers);
  // }, []);

  return (
    <>
    {/* <Header/> */}
      <section>
        {/* <UserForm setUsers={setUsers} editUser={editUser} /> */}
        {/* <UserList
          users={users}
          setEditUser={setEditUser}
          setRemoveUser={removeSelectedUser}
        /> */}
      </section>
    </>
  );
}

export default App;
