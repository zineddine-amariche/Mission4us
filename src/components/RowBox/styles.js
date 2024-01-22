import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  conatiner: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexGrow: 1,
    alignItems:"center",
    justifyContent:"center",
    marginBottom: 0,
    gap:20,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap:0,

    },
  },
}));

export default useStyles;
