
import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import InputFeilds from "../../../../components/outils/InputFeilds";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import React from 'react'
import { Formik, Form, Field } from "formik";
import { CloseModal, createCompetences } from "../../../../Redux/createCv/slice";

const Competences = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { competences } = useSelector((state) => state.cvs);
    const { initialStateCompetence, validationSchemaCompetence } = UseHooks();
  
    return (
      <Formik
        initialValues={initialStateCompetence}
        validationSchema={validationSchemaCompetence}
        onSubmit={(values, formikAction) => {
          dispatch(
            createCompetences([
              ...competences,
              { key: competences.length+Math.floor(Math.random() * (9 - 1 + 1) + 1) + 1 + 1, label: values },
            ])
          );
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          const { competence, description } = values;
  
          return (
            <>
              <>
                <PrimaryText
                  fontWeight={"500"}
                  fontSize={"25px"}
                  text={"Ajouter une Compétences"}
                  color={theme.palette.secondary.light}
                  cursor
                />
                <Space space={"20px"} />
  
                <InputFeilds
                  value={competence}
                  label={"Ajouter une compétence"}
                  // margin
                  onChange={handleChange}
                  error={errors.competence && touched.competence}
                  helperText={
                    errors.competence && touched.competence
                      ? errors.competence
                      : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"competence"}
                  onBlur={() => {
                    setFieldTouched("competence", true);
                  }}
                />
                <InputFeilds
                  value={description}
                  label={"Ajouter une description"}
                  // margin
                  onChange={handleChange}
                  error={errors.description && touched.description}
                  helperText={
                    errors.description && touched.description
                      ? errors.description
                      : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"description"}
                  onBlur={() => {
                    setFieldTouched("description", true);
                  }}
                  rows={4}
                  multiline={true}
                />
  
                <Space space={"15px"} />
              </>
  
              <Box component={"div"} style={{ paddingTop: 20, float: "right" }}>
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  onClick={() => {
                    // dispatch(handleModel(false));
                    dispatch(CloseModal(false));
                  }}
                  sx={{ marginRight: 2 }}
                >
                  annuler
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Ajouter
                </Button>
              </Box>
            </>
          );
        }}
      </Formik>
    );
  };

export default Competences