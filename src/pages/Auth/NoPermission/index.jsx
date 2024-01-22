import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";

import "./styles.css";



const NoPermission = () => {
  const theme = useTheme();
  return (
    <Box className="dashboard">
        <h2>Permission denied!</h2>
    </Box>
  );
};

export  {NoPermission};
