import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const AdminLayout = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const isAdmin = user?.id === 'user_31UysTxCeN1E3DbHNMDj7aeUQqL';


  useEffect(() => {
    if (isLoaded && !isAdmin) {
      toast.error("403 Forbidden");
      navigate("/");
    }
  }, [isLoaded, isAdmin, navigate]);

  if (!isLoaded) {
    return <div className="p-6 flex-1 pt-4 pt-10 md:px-10 h-full">Loading...</div>;
  }

  return isAdmin ? (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminLayout;
