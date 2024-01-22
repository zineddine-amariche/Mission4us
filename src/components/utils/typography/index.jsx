import { Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const PrimaryText = ({
  fontSize,
  fontWeight,
  color,
  text,
  lineHeight,
  mr,
  cursor,
  maxWidth,
  backgroundColor,
  textDecoration,
  link,
  to,
}) => {
  const theme = useTheme();

  return (
    <Typography
      fontWeight={fontWeight}
      fontSize={fontSize}
      maxWidth={maxWidth}
      lineHeight={lineHeight ? lineHeight : "30px"}
      sx={{
        color: color ? color : theme.palette.primary.dark,
        mr: mr ? mr : 0,
        cursor: cursor ? "pointer" : "default",
        backgroundColor: backgroundColor,
        textDecoration: textDecoration ? "underline" : undefined,
      }}
    >
      {link ? (
        <Link
          style={{
            color:  theme.palette.primary.dark,
          }}
          to={to}
        >
          {text}
        </Link>
      ) : (
        text
      )}
    </Typography>
  );
};
