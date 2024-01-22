import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBare";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { NoPermission } from "../../Routes/page";

const Layout = () => {
  let data = {};
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isNonMobile) {
      setIsSidebarOpen(false);
    } else if (isNonMobile) {
      setIsSidebarOpen(true);
    }
  }, [isNonMobile]);

  const { isAuthenticated, token } = useSelector((state) => state.logout);
	const _user = localStorage.getItem("user")

  return (
    <Box display={"flex"} width="100%" height="100%">
      <Sidebar
        user={data}
        isNonMobile={isNonMobile}
        drawerWidth={isSidebarOpen ? "240px" : "70px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        type={"secondary"}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          {_user ? <Outlet /> : <NoPermission />}
        </Box>
      </Box>
    </Box>
  );
};

export  {Layout};
