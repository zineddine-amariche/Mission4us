import { Box, useTheme } from "@mui/material";
import React from "react";
import { ReusableButton } from "../../../../../components/Button/Button.component";
import Space from "../../../../../components/outils/Space";
import { PrimaryText } from "../../../../../components/utils/typography";
const Form0 = ({ changeMode }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          // bgcolor: theme.palette.background.paper,
        }}
      >
        <ReusableButton
          bigText={"ACCES CLIENT"}
          smallText={"Inscrivez-vous en tant que client "}
          Primary
          onClick={() => changeMode(2)}
        />
        <ReusableButton
          bigText={"ACCES FOURNISSEUR"}
          smallText={"Inscrivez-vous en tant que fournisseur "}
          onClick={() => changeMode(3)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <PrimaryText
          fontWeight={"400"}
          fontSize={{
            xs: "16px",
            sm: "12px",
            md: "12px",
            lg: "14px",
          }}
          text={"Vous avez un compte ?"}
          color={theme.palette.secondary.dark}
          lineHeight={"20px"}
          mr={1}
        />

        <PrimaryText
          fontWeight={"400"}
          fontSize={"12px"}
          text={"S'identifier "}
          color={theme.palette.secondary.dark}
          lineHeight={"20px"}
          cursor
          textDecoration
          link
          to={"/login"}
        />
      </Box>
      <Space />
    </>
  );
};

export default Form0;
