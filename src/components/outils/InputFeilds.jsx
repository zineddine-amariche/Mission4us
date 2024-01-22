import React from "react";
import { UseHooks } from "../../pages/PageCv/Hooks";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Box, Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";

// import {TextField} from '@material-ui';
const InputFeilds = (props) => {
  const {
    error,
    id,
    value,
    onChange,
    autoComplete,
    label,
    type,
    multiline,
    rows,
    onBlur,
    select,
    margin,
    required,
    helperText,
    name,
    handleBlur,
    marginRight,
    defaultValue,
    shrink,
    showPassword,
    HandlehidePass,
    password,
    primary,
    disabled
  } = props;
  const { OnSubmit, initialState, validationSchema } = UseHooks();
  const { mode } = useSelector((state) => state.global);

  const classes = useStyles(mode);
  const theme = useTheme();
  return (

    <Stack width={"100%"} height='90%' >


    <TextField
      name={name}
      error={error}
      value={value}
      helperText={helperText}
      className={
        mode == "dark"
          ? primary
            ? classes.inputStylesPrimary
            : classes.inputStyles
          : classes.inputStylesDark
      }
      type={password && showPassword ? "text" : password ? "password" : "text"}
      variant="outlined"
      margin="normal"
      id={id}
      label={label}
      autoComplete={autoComplete}
      onChange={(val) => {
        if (margin) {
          onChange(val.target.value);
        } else {
          onChange(val);
        }
      }}
      multiline={multiline}
      minRows={rows}
      onBlur={onBlur}
      fullWidth
      select={select}
      // style={{ marginRight: margin ? "0px" : "20px" }}
      InputLabelProps={{
        style: {
          color: primary ? "#FFF" : theme.palette.primary.light,
        },
        shrink: shrink,
      }}
      required={required}
      disabled={disabled}
      InputProps={
        password
          ? {
              style: {
                color: primary
                  ? theme.palette.primary.dark
                  : theme.palette.neutral.dark,
                whiteSpace: "pre-wrap",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={HandlehidePass}>
                    {showPassword ? (
                      <VisibilityIcon
                        style={{
                          color: primary ? "#FFF" : theme.palette.primary.light,
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                      style={{
                        color: primary ? "#FFF" : theme.palette.primary.light,
                      }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
{    !helperText? <Box height='8px'></Box> : null}
    </Stack>

  );
};

export default InputFeilds;

const useStyles = makeStyles((theme) => ({
  inputStyles: {
    flexGrow: 1,
    "&.MuiInputBase-input MuiOutlinedInput-input": {
      color: theme.palette.primary.light,
    },
    "& .Mui-focused": {
      color: theme.palette.primary.light,
      fontWeight: "bold",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `.5px solid ${theme.palette.primary.light}`,
      },
      "&:hover fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
    },
  },

  inputStylesPrimary: {
    flexGrow: 1,
    color: "#FFF",

    "&.MuiInputBase-input MuiOutlinedInput-input": {
      color: "#FFF",
    },
    "& .Mui-focused": {
      color: "#FFF",
      fontWeight: "bold",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `.5px solid #fff`,
      },
      "&:hover fieldset": {
        border: `.5px solid #fff`,
      },
      "&.Mui-focused fieldset": {
        border: `.5px solid #fff`,
      },
    },
  },

  inputStylesDark: {
    flexGrow: 1,

    "& .MuiInputBase-input MuiOutlinedInput-input": {
      backgroundColor: "#FFF",
    },
    "& .Mui-focused": {
      fontWeight: "bold",
    },

    "&.MuiFormLabel-root": {},

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: ".5px solid #ccc",
      },
      "&:hover fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
    },
  },
}));
