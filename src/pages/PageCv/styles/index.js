import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputStyles: {
    width: "100%",
    height: "83%",

    "&::placeholder": {
      color: "#237a57",
    },
    "& .Mui-focused": {
      color: "#237a57",
      fontWeight: "bold",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: ".5px solid #ccc",
        color: "#237a57",
      },
      "&:hover fieldset": {
        border: "2px solid #237a57",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid #237a57",
      },
    },
  },

  underline: {
    "&:before": {
      borderBottom: "none",
    },
    "&:after": {
      borderBottom: "none",
    },
  },

  containerSelect: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",

    },
  },
}));

export default useStyles;
