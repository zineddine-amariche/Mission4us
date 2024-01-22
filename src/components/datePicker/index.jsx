import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useTheme, FormHelperText, Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  inputStyles: {
    flexGrow: 1,
    color: "#FFF",
    "&.MuiInputBase-input MuiOutlinedInput-input": {
      color: theme.palette.primary.light,
      backgroundColor: "#FFF",
    },
    "& .Mui-focused": {
      color: theme.palette.primary.light,
      fontWeight: "bold",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: ".5px solid #ccc",
      },
      "&:hover fieldset": {
        border: `.5px solid ${theme.palette.primary.light}`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
    },
  },

  inputStylesDark: {
    flexGrow: 1,
    color: "#FFF",
    "& .MuiInputBase-input MuiOutlinedInput-input": {
      color: "#FFF",
      backgroundColor: "#FFF",
    },
    "& .Mui-focused": {
      color: "#FFF",
      fontWeight: "bold",
    },

    "&.MuiFormLabel-root": {
      color: "#FFF",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: ".5px solid #ccc",
        color: "#FFF",
      },
      "&:hover fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,

        color: "#FFF",
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,

        color: "#FFF",
      },
    },
  },
}));

export default function DatePickers({
  id,
  label,
  onChange,
  onBlur,
  value,
  error,
  margin,
  helperText,
  defaultValue,
  formatDate,
  setFieldValue,
  name
}) {
  const { mode } = useSelector((state) => state.global);
  const classes = useStyles(mode);
  const theme = useTheme();
  return (
    <Stack width={"100%"} height='90%'>
    <TextField
      id={id}
      label={label}
      type="date"
      variant="outlined"
      defaultValue={defaultValue}
      onChange={(val) => {
        // if (margin) {
        //   onChange(val);
        // } else {
        //   onChange(val.target.value);
        // }
           onChange(val.target.value);
      }}
      // onChange={(val)=>onChange(val)}
      // onChange={(val) => {
      //   setFieldValue("date", formatDate(val.target.value.toString()));
      // }}
      onBlur={onBlur}
      value={value}
      // className={mode == "dark" ? classes.inputStyles : classes.inputStylesDark}
      InputLabelProps={{
        shrink: true,
        style: { color: theme.palette.primary.light },
      }}
      InputProps={{
        style: { color: theme.palette.neutral.dark },
      }}
      fullWidth
      error={error}
      //  style={{ marginRight: margin ? "0px" : "20px",  }}
      helperText={helperText}
      name={name}

    />
    {!helperText? <Box height='8px'></Box> : null}
    </Stack>
  );
}
