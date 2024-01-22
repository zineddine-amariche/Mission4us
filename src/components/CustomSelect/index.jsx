import React from "react";
import { Select, MenuItem } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #237a57",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      paddingLeft:"20px",
    },
    overflow: "hidden",
    flexGrow: 1,
    margin: "10px",
    width:"100%"
  },
  menuItem: {
    // background: '#237a57',
    paddingLeft:"20px",
    '&:hover': {
      backgroundColor: '#237a57'
    },
    color: '#000'
  },
  InputProps: {
    color: '#ff0000',
    backgroundColor:"#23a"
  },

}));

const CustomSelect = ({ id,name,value,onChange ,children,placeholder}) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles();

  return (
    <Select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      displayEmpty
      variant="outlined"
      //   style={{ width: "100%" }}
      className={classes.select}
      MenuProps={{
        maxHeight: 200,
        paddingLeft: "20px",
      }}

      InputProps={{
        classes: {
          select: classes.InputProps,
          
        },
      }}
     
      
    >
        {children}
      {/* <MenuItem value="" disabled>
        Selectionner une langue
      </MenuItem>
      <MenuItem classes={{root: classes.menuItem}} value={10}>Français</MenuItem>
      <MenuItem classes={{root: classes.menuItem}} value={20}>English</MenuItem> */}
      {/* <MenuItem value={30}>Thirty</MenuItem> */}
    </Select>
  );
};
export default CustomSelect;
