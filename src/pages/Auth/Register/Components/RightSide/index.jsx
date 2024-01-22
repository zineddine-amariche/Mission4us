import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { PrimaryText } from "../../../../../components/utils/typography";
import MultiForm from "../Forms/MultiForm";
import CancelIcon from '@mui/icons-material/Cancel';

const RightSide = () => {
  const theme = useTheme();

  const [mode, setMode] = useState(1);

  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "60%",
          lg: "26%",
        },

        bgcolor: theme.palette.background.main,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
      p={4}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: mode == 1 ? "center" : "space-between",
        }}
      >
        <PrimaryText
          fontWeight={"600"}
          fontSize={"22px"}
          text={"MISSION4US"}
          color={theme.palette.secondary.dark}
          lineHeight={"30px"}
          mr={1}
        />
        {mode !== 1 ? <Box onClick={() => setMode(1)}><CancelIcon/></Box> : null}
      </Box>

      <MultiForm mode={mode} changeMode={changeMode} />

      {/* <Box>
        Qui sommes-nous Conditions Générales d'Utilisation Politique de
        confidentialité Politique en matière de cookies Contactez nous Blog
      </Box> */}
    </Box>
  );
};

export default RightSide;
