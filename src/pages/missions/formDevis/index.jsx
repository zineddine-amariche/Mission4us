import React, { useState } from "react";
import { Box, Checkbox, Typography, useTheme } from "@mui/material";
import Head from "../../../components/Head";
import Body from "../../../components/Body";
import { Formik, Field } from "formik";
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import RowBox from "../../../components/RowBox";
import CustomSelect from "../../../components/CustomSelect";
import DatePickers from "../../../components/datePicker";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RadionButton from "../../../components/radioButton";
import { RadioGroup, FormControlLabel, Radio,FormControl,FormLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addDevis } from "../../../Redux/devis/slice";
import { Snackbar } from '@material-ui/core';

const DevisMission = ({ open, onClose,missionId }) => {
const theme = useTheme();
const account = useSelector((state) => state.account?.user);
const status = useSelector((state) => state.devis.status);

const initialValues = {
// datedeb: "2023-05-24",
// datefin: "2023-06-24",
missionId,
amount: "",
// confirmdate: false,
};

const validationSchema = Yup.object().shape({
  amount: Yup.number("Prix").required("Le prix est obligatoire"),
  // confirmdate: Yup.boolean()
  // .oneOf([true], "Vous devez confirmer la date de début"),
  // datedeb: Yup.date().required("Date début est obligatoire"),
  // datefin: Yup.date().required("Date de fin est obligatoire"),
});
const dispatch=useDispatch()
const [openSnackbar, setOpenSnackbar] = useState(false);

return (
<Box
  sx={{
    width: "100%",
    height: "100%",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "20px 0 20px 20px",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.light,
    }}
  >
  <Tooltip title="Fermer">
    <Box onClick={onClose}><CloseIcon/></Box>
  </Tooltip> 
    <Typography variant={"h4"} style={{ paddingLeft: 15 }}>
      Devis mission
  </Typography>
  </div>

  <Body sx={{height:"89vh"}}>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        
        dispatch(addDevis(values))
        setOpenSnackbar(true);
     }
    }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,

        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} style={{height:"78vh"}}>
          <div style={{ marginRight: 20 }}>
            <InputFeilds
              label={"Fourchette du prix"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amount}
              id="amount"
              required={true}
              error={errors.amount && touched.amount}
              helperText={errors.amount && touched.amount ? errors.amount : ""}
              
              
            />
          </div>

          {/* <Space space={20} /> */}

          {/* <RowBox>
            <DatePickers
              id="datedeb"
              label={"Date Debut *"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.datedeb}
              error={errors.datedeb && touched.datedeb && errors.datedeb}
              helperText={
                errors.datedeb && touched.datedeb ? errors.datedeb : ""
              }
            />

            <Space space={20} />
            <DatePickers
              id="datefin"
              label={"Date Fin"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.datefin}
              error={errors.datefin && touched.datefin && errors.datefin}
              helperText={
                errors.datefin && touched.datefin ? errors.datefin : ""
              }
            />
          </RowBox> */}

          
      {/* <FormControlLabel required 
      control={<Checkbox
      id="confirmdate"
      value={values.confirmdate}
          checked={values.confirmdate}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          style={{ color: theme.palette.primary.light }}
          
        />
      }
      label="Je Confirme la date de debut"
      value={values.confirmdate} 
      style={{ color: theme.palette.primary.contrastText }} /> 

      {touched.confirmdate && errors.confirmdate ? (
        <div style={{ color: "red", fontSize: 13 }}>
          {errors.confirmdate}
        </div>
      ) : 
      null} */}

        <Space space={20} />

          <div style={{ 
            position: "absolute",
            bottom: 23,
            right: 67,
           }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              size="medium"
              style={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.background.default,
              }}
              type="submit"
              disabled={isSubmitting}
              sx={{ marginRight: 2 }}
            >
              Valider
            </Button>
            <Button
              variant="contained"
              endIcon={<CloseIcon />}
              size="medium"
              color="error"
              onClick={onClose}
            >
              Annuler
            </Button>
          </div>

          {status === "succeeded" &&
          <Snackbar
            open={openSnackbar}
            message="Devis  ajouté avec succès."
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            ContentProps={{ style: { backgroundColor: 'green' } }}
          />
            }
        </form>
        
      )}
    </Formik>
    
  </Body>
</Box>
);
};

export default DevisMission;
