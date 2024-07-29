import { Typography, Box } from '@mui/material';
import React from 'react';

function Dashboard() {
  return (
    <>
     <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
     
      <Typography variant="body1">
        Welcome to Admin Panel
      </Typography>
    </Box>
    </>

  );
}

export default Dashboard;
