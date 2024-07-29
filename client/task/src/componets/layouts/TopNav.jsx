import React from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {jwtDecode} from 'jwt-decode';

function TopNav() {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  console.log(decodedToken,'decodedToken');
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#101828",
        color: "common.white",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          minHeight: 64, 
          px: 3,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img src={logo} width={40} height={40} alt="logo" />
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
        <h1 className='cursor-pointer' onClick={handleLogout}>Logout</h1>

          <h1 className='cursor-pointer' onClick={handleLogout}>Logout</h1>
          <Avatar
            src="/assets/avatars/avatar-chen-simmons.jpg"
            variant="rounded"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default TopNav;
