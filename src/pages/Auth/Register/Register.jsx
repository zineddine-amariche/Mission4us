import { Box } from "@mui/material";
import React from "react";
import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";
import { style } from "./styles";

const Register = () => {
  return (
    <Box sx={style}>
      <LeftSide />
      <RightSide />
    </Box>
  );
};

export  {Register};
