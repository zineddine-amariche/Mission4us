import { Box, useTheme } from "@mui/material";
import React from "react";
import imageUrl from "../../../../../assets/ri.png";

const LeftSide = () => {
  const theme = useTheme();

  return (
    <Box
      display={{
        xs: "none",
        sm: "none",
        md: "flex",
        lg: "flex",
      }}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.secondary.dark,

      }}
    >
      <Box component={"img"}
       width={{
        xs: "40%",
        sm: "50%",
        md: "60%",
        lg: "60%",
      }}
      
      src={imageUrl} />
    </Box>
  );
};

export default LeftSide;
