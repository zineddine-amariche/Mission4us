import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../utils/typography";
import Icon from "@mui/icons-material/East";
export const ReusableButton = ({ bigText, smallText, onClick, Primary }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        paddingY: 2,
        my: 2,
        bgcolor: Primary
          ? theme.palette.secondary.dark
          : theme.palette.primary.light,
        width: {
          xs: "90%",
          sm: "80%",
          md: "90%",
          lg: "80%",
        },
        "&:hover": {
          bgcolor: Primary
            ? theme.palette.secondary.dark
            : theme.palette.primary.light,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <PrimaryText
            fontWeight={"600"}
            fontSize={{
              xs: "16px",
              sm: "13px",
              md: "14px",
              lg: "16px",
            }}
            text={bigText}
            color={
              !Primary
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
            lineHeight={"35px"}
          />
          <PrimaryText
            fontWeight={"400"}
            fontSize={{
              xs: "11px",
              sm: "12px",
              md: "13px",
              lg: "12px",
            }}
            text={smallText}
            color={
              !Primary
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
            lineHeight={"20px"}
          />
        </Box>
        <Icon
          style={{
            marginLeft: "8px",
            color: !Primary
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        />
      </Box>
    </Button>
  );
};

export const PrimaryButton = ({
  type,
  onClick,
  text,
  textColor,
  state,
  pathname,
  primary,
  bgcolor,
}) => {
  const theme = useTheme();
  const buttonStyle = {
    backgroundColor: primary
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
    borderRadius: 2,
    // set your desired color here
  };
  return (
    <Button
      onClick={onClick}
      type={type}
      style={buttonStyle}
      variant="contained"
      sx={{
        backgroundColor: theme.palette.primary.light,
        height: 40,
        paddingY: 2,
        my: 2,
        width: "100%",

        "&:hover": {
          bgcolor: theme.palette.primary.light,
        },
      }}
    >
      <PrimaryText
        fontWeight={"400"}
        fontSize={{
          xs: "16px",
          sm: "12px",
          md: "12px",
          lg: "14px",
        }}
        text={text}
        // color={theme.palette.secondary.dark}
        color={
          primary ? theme.palette.primary.light : theme.palette.primary.dark
        }
        lineHeight={"20px"}
        mr={1}
      />
    </Button>
  );
};
