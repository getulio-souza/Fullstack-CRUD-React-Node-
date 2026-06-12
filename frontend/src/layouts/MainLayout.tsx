import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import type { User } from "../types/User";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";
import React, { useState } from "react";
import LoginUser from "../pages/LoginUser/LoginUser";

type Props = {
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
};

function MainLayout({ setEditUser }: Props) {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  return (
    <>
      <LoginUser />
      
      {isUserLoggedIn ? (<section className="main-container">
          <Header setEditUser={setEditUser} />
          <main>
            <Outlet />
          </main>
          <Footer />
        </section>) : null}
      
        
    </>
  );
}

export default MainLayout;
