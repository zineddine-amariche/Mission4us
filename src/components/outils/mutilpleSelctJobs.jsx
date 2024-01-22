import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, useTheme } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchJobs } from "../../Redux/jobs/slice";
import { createEmploi } from "../../Redux/createCv/slice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #237a57",
    },

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      paddingLeft: "20px",
      width: "100%",
    },
  },
  menuItem: {
    "&:hover": {
      background: "#237a5709",
    },
    color: "#000",
  },

  icon: {
    fill: theme.palette.info.contrastText,
  },
  iconDark: {
    fill: "#237a57",
  },
}));
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function MultipleSelectCheckJobs({
  label,
  data,
  handleOpen,
  selectionTitle,
  error,
  helperText,
  value,
  onBlur,
  marginRight,
  disabled,
  multiple,
  renderValue,
  setFieldValue
}) {
  const [personName, setPersonName] = React.useState([]);
  const theme = useTheme();
  const { mode } = useSelector((state) => state.global);
  const { jobs ,status} = useSelector((state) => state.jobs);
  const { EmploiArr } = useSelector((state) => state.cvs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);



const handleChange = (event) => {
  const { value } = event.target;
  setPersonName(value);
  setFieldValue("jobs", value.join(", "));
};


// const handleChange = (event) => {
//   const { value } = event.target;
//   const selectedJobs = value.map((jobName) => {
//     const job = jobs.find((j) => j.name === jobName);
//     return { id: job.id, label: jobName };
//   });
//   setPersonName(selectedJobs);
//   setFieldValue("jobs", selectedJobs.map((job) => job.label).join(", "));
// };



// console.log('jobs', jobs)

  const classes = useStyles();
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
        {jobs?.length == 0 || status == 'loading' ? (
          <div>chargement ...</div>
        ) : (
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            style={{
              flexGrow: 1,
              marginRight: marginRight ? "20px" : "0px",
              color: theme.palette.secondary.light,
              border: `.2px solid ${
                error ? theme.palette.error.main : theme.palette.secondary.light
              }`,
            }}
            // className={classes.select}
            inputProps={{
              classes: {
                icon: mode == "light" ? classes.icon : classes.iconDark,
              },
            }}
          >
            {jobs?.map((i) => (
              <MenuItem key={i.name} value={i.name}>
                <Checkbox checked={personName.indexOf(i.name) > -1} />
                <ListItemText primary={i.name} />
              </MenuItem>
            ))}
          </Select>
        )}
        <FormHelperText sx={{ color: theme.palette.error.main, pl: 3 }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
}