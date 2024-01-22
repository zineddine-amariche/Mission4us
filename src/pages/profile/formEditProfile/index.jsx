import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Body from "../../../components/Body";
import { Formik } from "formik";
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import RowBox from "../../../components/RowBox";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  const [deny, setDeny] = useState(false);
  function handleFormClose() {
    // Fermez le formulaire sans réinitialiser les valeurs
    setDeny(false);
  }

  const theme = useTheme();
  const initialValues = {
    nom: "John",
    login: "dev",
    email: "john@gmail.com",
    adresse: "Bejaia",
    prenom: "Dev",
    authorities: "Provider",
  };

  const validationSchema = Yup.object().shape({
    intitule: Yup.string().required("Intitulé est obligatoire"),
    nom: Yup.string().required("Nom est obligatoire"),
    prenom: Yup.string().required("Prenom est obligatoire"),
    login: Yup.string().required("Pseudo est obligatoire"),
    email: Yup.mixed().required("Email est obligatoire"),
    adresse: Yup.string().required("Adresse est obligatoire"),
    authorities: Yup.string(),
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.neutral.dark,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
         
          setTimeout(() => {
            console.log(values, "myvalues");
            setSubmitting(false);
          }, 1000);
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
              <RowBox>
                <InputFeilds
                  name="nom"
                  label={"Nom"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nom}
                  id="nom"
                  required={true}
                  error={errors.nom && touched.nom}
                  helperText={errors.nom && touched.nom ? errors.nom : ""}
                />

                <InputFeilds
                  name="email"
                  label={"Email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  id="email"
                  required={true}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
              </RowBox>

              <RowBox>
                <InputFeilds
                  name="prenom"
                  label={"Prenom"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prenom}
                  id="prenom"
                  required={true}
                  error={errors.prenom && touched.prenom}
                  helperText={
                    errors.prenom && touched.prenom ? errors.prenom : ""
                  }
                />

                <InputFeilds
                  name="login"
                  label={"Pseudo"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  id="login"
                  required={true}
                  error={errors.login && touched.login}
                  helperText={errors.login && touched.login ? errors.login : ""}
                />
              </RowBox>
              <RowBox>
                <InputFeilds
                  name="authorities"
                  label={"Role"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.authorities}
                  id="authorities"
                  disabled={true}
                  //   error={errors.adresse && touched.adresse}
                  //   helperText={errors.adresse && touched.adresse ? errors.adresse : ""}
                />

                {/* <InputFeilds
                  name="adresse"
                  label={"Adresse"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.adresse}
                  id="adresse"
                  required={true}
                  error={errors.adresse && touched.adresse}
                  helperText={errors.adresse && touched.adresse ? errors.adresse : ""}
                /> */}
              </RowBox>

              {/* <Space space={20} /> */}

              {/* <div style={{ float: "right" }}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                size="medium"
                style={{backgroundColor:theme.palette.primary.light,color:theme.palette.background.default}}
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
                type="reset"
                onClick={handleFormClose}
              >
                Annuler
              </Button>
            </div>
            <Space space={20} /> */}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditProfile;
