import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { Outlet } from "react-router-dom";
import TopNav from "../componets/layouts/TopNav";
import { SideNav } from "../componets/layouts/SideBar";
import Employees from "../pages/Employees";
import { Box } from "@mui/material";
import Login from "../pages/Login";
import Register from "../pages/Register";
const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 73;
const Layouts = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopNav />
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${TOP_NAV_HEIGHT}px`,
          ml: `${SIDE_NAV_WIDTH}px`,
          width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AdminRoutes;
