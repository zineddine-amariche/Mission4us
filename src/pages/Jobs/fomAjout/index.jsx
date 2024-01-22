import "./styles.css";
import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import Head from "../../../components/Head";
import Body from '../../../components/Body';
import { Formik } from "formik";
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJob } from "../../../Redux/jobs/slice";
import { useState } from "react";
import { Snackbar } from '@material-ui/core';
const AddJob = () => {
  const theme = useTheme();
 
  const initialValues={
    name:'',
    // secteur:'',
    description:'',
    
  }

  const validationSchema=Yup.object().shape({
    name: Yup.string()
      .required('Le nom du job est obligatoire'),
    description: Yup.string()
    .min(10, 'Description doit contenir au min 10 caracteres')
      .max(150, 'Description doit contenir au max 150 caracteres')
      .required('la description est obligatoire'),
   
  })
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const status = useSelector((state) => state.jobs.status);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
      }}
    >
      <Head title="Page Ajout d'un Job" />
      <Body >
      {/* <Typography color={theme.palette.secondary[700]} variant={"h1"}>
          Ajouter un job {" "}
      </Typography> */}
      <Formik
       initialValues={initialValues}
       validationSchema={validationSchema}
       onSubmit={(values) => {
        dispatch(addJob(values))
        // setTimeout(() => {
        //   setSubmitting(false);
        // }, 4000);
        setOpenSnackbar(true);
        navigate(-1)
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
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} style={{height:"65vh"}}>
                <Space space={20} />
                
                <InputFeilds
                    label={"Intitule"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    id="name"
                    required={true}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name ? errors.name : ""}
                  />
                 
                  {/* <InputFeilds 
                  label={"Prénom"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prenom} 
                  id='prenom'
                  required={true}
                    error={errors.prenom && touched.prenom}
                    helperText={errors.prenom && touched.prenom ? errors.prenom : ""}
                  /> */}
                 
                
                
                  {/* <InputFeilds 
                  label={"Secteur"} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secteur}
                  id='secteur'
                  required={true}
                    error={errors.secteur && touched.secteur}
                    helperText={errors.secteur && touched.secteur ? errors.secteur : ""}
                  /> */}
                  
                
               
                
                  <InputFeilds
                    label={"Description"}
                    multiline={true}
                    rows={4}
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    required={true}
                    error={errors.description && touched.description}
                    helperText={errors.description && touched.description ? errors.description : ""}
                   
                  />
               
                
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
                  style={{backgroundColor:theme.palette.primary.light,color:theme.palette.background.default}}
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ marginRight: 2 }}
                >
                  Valider
                </Button>
              <Button
              variant="contained"
              endIcon={<CloseIcon />}
              size="medium"
              color="error"
              onClick={()=>navigate(-1)}
            >
              Annuler
            </Button>
                </div>

                {status === "succeeded" &&
          <Snackbar
            open={openSnackbar}
            message="Job  ajouté avec succès."
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
  )
}

export {AddJob}