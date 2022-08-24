import { Box } from '@mui/material';
import React from 'react';
import Header from './components/Header';

const Main = () => {
  return (
    <Box sx={{display:"flex", backgroundColor:"white"}}>
      <Header />
    </Box>
  );
};

export default Main;