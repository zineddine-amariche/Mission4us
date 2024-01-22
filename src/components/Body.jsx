import React from "react";
import { Box, useTheme } from "@mui/material";

const Body = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
       p: "35px",
        width: "100%",
        bgcolor: theme.palette.neutral.main,
      }}
    >
      {children}
    </Box>
  );
};

export default Body;
