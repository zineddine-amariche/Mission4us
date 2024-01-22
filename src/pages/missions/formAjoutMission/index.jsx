import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Body from "../../../components/Body";
import { Formik } from "formik";
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import RowBox from "../../../components/RowBox";
import CustomSelect from "../../../components/CustomSelect";
import DatePickers from "../../../components/datePicker";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { MenuItem } from "@material-ui/core";
import SelectMenue from "../../../components/outils/SelectMenue";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { addMission } from "../../../Redux/mission/slice";
import { fetchJobs } from "../../../Redux/jobs/slice";
import { Snackbar } from '@material-ui/core';

// const options = [
//   { value: "client1", label: "Reda Bekka" },
//   { value: "client2", label: "Samia Kh" },
// ];
const options = [
  { value: "algeria", name: "Algeria" },
  { value: "france", name: "France" },
  { value: "germany", name: "Germany" },
  { value: "china", name: "China" },
  { value: "united states of america", name: "United States of America" },
];

const optionsJob = [
  { value: "job1", name: "Plombier" },
  { value: "job2", name: "Ingenieur en dev" },
];
const AddMission = ({ open, onClose }) => {
  const theme = useTheme();
  const initialValues = {
    name: "",
    details: "",
    country: "",
    city: "",
    street: "",
    maximumPrice:"",
    minimumPrice: "",
    type:"DRIVING",
    languages: [],
    jobId:'',
  };

  const jobs = useSelector((state) => state.jobs.jobs);
  const jobOptions = jobs.map((job) => ({
    value: job.id,
    name: job.name,
  }));

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Intitulé est obligatoire"),
    type:Yup.string().required(" Type est oligatoire"),
    jobId: Yup.string().required('Job Id est requis'),
    country: Yup.string(),
    city: Yup.string(),
    street: Yup.string(),
    minimumPrice: Yup.number("minimum price"),
    maximumPrice: Yup.number("maximum price"),
    details: Yup.string()
      .min(10, "Détails doit contenir au min 10 caracteres")
      .max(150, "Détails doit contenir au max 150 caracteres"),
  });

  
  const [selectedJob, setSelectedJob] = useState(null);
  const [selected, setSelected] = useState("");
  
const dispatch=useDispatch()

useEffect(() => {
  dispatch(fetchJobs());
}, [dispatch]);
const status = useSelector((state) => state.missions.status);

const [openSnackbar, setOpenSnackbar] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      flexGrow: 1,
      marginRight: "20px",
      color: theme.palette.secondary.light,
      // background:"#237a5709",
      // border: `.2px solid ${
      //   errors ? theme.palette.error.main : theme.palette.secondary.light
      // }`,
      border:'.2px solid',
      borderColor:theme.palette.secondary.light,
      padding:10
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
     
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      height:50
    }),
  };

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
          {" "}
          Ajouter mission{" "}
        </Typography>
      </div>

      <Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            
            dispatch(addMission(values))
            setOpenSnackbar(true);
          
          }}
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
            setFieldTouched,
            /* and other goodies */
          }) => {
            
            return (
              <form onSubmit={handleSubmit}>
                <div style={{ marginRight: 20 }}>
                  <InputFeilds
                     id={"name"}
                     label={"Intitulé"}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.name}
                     required={true}
                     error={errors.name && touched.name}
                     helperText={
                       errors.name && touched.name ? errors.name : ""
                     }
                  />
                </div>
                
              <SelectMenue
                selectionTitle="Selectionner un pays"
                data={options}
                handleOpen={(val) => {
                  setFieldValue("country", val);
                }}
                error={errors.country && touched.country && errors.country}
                helperText={
                  errors.country && touched.country ? errors.country : ""
                }
                value={values.country}
                onBlur={() => {
                  setFieldTouched("country", true);
                }}
                marginRight
              />

                <RowBox>
                <InputFeilds
                  label={"Ville"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  id="city"
                  required={false}
                  error={errors.city && touched.city}
                  helperText={errors.city && touched.city ? errors.city : ""}
                />

                <InputFeilds
                  label={"Rue"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.street}
                  id="street"
                  required={false}
                  error={errors.street && touched.street}
                  helperText={errors.street && touched.street ? errors.street : ""}
                />
              </RowBox>

              <RowBox>
                <InputFeilds
                  label={"Prix minimal"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.minimumPrice}
                  id="minimumPrice"
                  error={errors.minimumPrice && touched.minimumPrice}
                  helperText={
                    errors.minimumPrice && touched.minimumPrice ? errors.minimumPrice : ""
                  }
                />

                <InputFeilds
                  label={"Prix maximal"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.maximumPrice}
                  id="maximumPrice"
                  required={false}
                  error={errors.maximumPrice && touched.maximumPrice}
                  helperText={
                    errors.maximumPrice && touched.maximumPrice ? errors.maximumPrice : ""
                  }
                />
              </RowBox>

              
              <div style={{ marginRight: 20 }}>
              <InputFeilds
                  label={"Type"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                  id="type"
                  error={errors.type && touched.type}
                  helperText={
                    errors.type && touched.type ? errors.type : ""
                  }
                  required={true}
                  disabled={true}
                />
                </div>
                {/*<div>
                <Select
              placeholder={"Selectionner un job *"}
              options={jobOptions}
                onChange={(option) => {
                  setFieldValue('jobId', option.value);
                }}
  
              
              styles={customStyles}
              
            />
            {touched.jobId && errors.jobId && (
              <div style={{borderColor:theme.palette.error.main}}>{errors.jobId}</div>
            )}
          </div> */}

       
                
              <SelectMenue
                selectionTitle="Selectionner un job *"
                data={jobOptions}
                handleOpen={(option) => {
                  setFieldValue("jobId", option);
                }}
                error={errors.jobId && touched.jobId && errors.jobId}
                helperText={errors.jobId && touched.jobId ? errors.jobId : ""}
                value={values.jobId}
                onBlur={() => {
                  setFieldTouched("jobId", true);
                }}
                // onChange={(option) => {
                //   setFieldValue('jobId', option.value);
                // }}
                style={{color:"black",fontSize:10}}
                marginRight
              />

              
              <div style={{ marginRight: 20 }}>
                <InputFeilds
                  label={"Détails"}
                  multiline={true}
                  rows={4}
                  id="details"
                  error={errors.details && touched.details}
                  helperText={
                    errors.details && touched.details ? errors.details : ""
                  }
                  value={values.details}
                  onChange={handleChange}
                  autoFocus={true}
                  name={"details"}
                  onBlur={() => {
                    setFieldTouched("details", true);
                  }}
                />
              </div>
           
            
          

                
                <Space space={20} />

                <div style={{ 
                  float:"right"
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
                <Space space={20} />

                {status === "succeeded" &&
                <Snackbar
                  open={openSnackbar}
                  message="Mission  ajouté avec succès."
                  autoHideDuration={3000}
                  onClose={() => setOpenSnackbar(false)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  ContentProps={{ style: { backgroundColor: 'green' } }}
                />
                  }
              </form>
            );
          }}
        </Formik>
      </Body>
    </Box>
  );
};

export default AddMission;
