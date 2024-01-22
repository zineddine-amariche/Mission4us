import React from "react";
import { Box } from "@mui/system";

const Space = ({ space }) => {
  return <Box sx={{ height: space ? space : 10 }}></Box>
};

export default Space;

