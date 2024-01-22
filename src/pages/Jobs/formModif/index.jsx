import "./styles.css";
import React, { useEffect } from 'react'
import { Box, TextField, Typography, useTheme } from "@mui/material";
import Head from "../../../components/Head";
import Body from '../../../components/Body';
import { Formik } from "formik";
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import * as Yup from 'yup'
import { useParams} from "react-router-dom";
import { fetchJob, updateJob } from "../../../Redux/jobs/slice";
import { useDispatch, useSelector } from "react-redux";

const UpdateJob = () => {
  const theme = useTheme();
 const {id}=useParams()

 const jobs = useSelector((state) => state.jobs?.jobs);
 const job=jobs.find((j) => j.id === parseInt(id))
// const job = useSelector((state) => state.jobs.find((j) => j.id === parseInt(id)));
 
  const initialValues={
    id:job?.id,
    name:job?.name,
    
  }
  const validationSchema=Yup.object().shape({
    name: Yup.string()
      .required('Le nom du job est obligatoire'),
   
  })
const dispatch=useDispatch()
//   useEffect(() => {
//     dispatch(fetchJob(id))
//  }, [])
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
      }}
    >
      <Head title="Page Modification d'un Job" />
      <Body>
      {/* <Typography color={theme.palette.secondary[700]} variant={"h1"}>
          Modifier un job {" "}
      </Typography> */}
      <Formik
       initialValues={initialValues}
       validationSchema={validationSchema}
       onSubmit={(values) => {
        
        // setTimeout(() => {
        //   console.log(values,'myvalues')
        //   setSubmitting(false);
        // }, 4000);
        dispatch(updateJob(id,{values}));
       
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
         <form onSubmit={handleSubmit}>
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
                  <InputFeilds
                    label={"id"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                    id="id"
                    required={true}
                    error={errors.id && touched.id}
                    helperText={errors.id && touched.id ? errors.id : ""}
                    disabled={true}
                  />
               
                 
                
                <Space space={20} />
                <div style={{ float: "right" }}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  size="medium"
                  style={{backgroundColor:theme.palette.primary.light,color:theme.palette.background.default}}
                  type="submit"
                  onClick={handleSubmit}
                 
                >
                  Valider
                </Button>
                </div>
                <Space space={20} />
                 </form>
           )}
       </Formik>
      </Body>
    </Box>
  )
}

export  {UpdateJob}