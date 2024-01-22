import React from 'react'

import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import InputFeilds from "../../../../components/outils/InputFeilds";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import { Formik, Form, Field } from "formik";
import { CloseModal, createLoisirs } from '../../../../Redux/createCv/slice';


const Loisirs = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { loisirs } = useSelector((state) => state.cvs);
    const { initialStateHobbies, validationSchemaHobbies } = UseHooks();
  
    return (
      <Formik
        initialValues={initialStateHobbies}
        validationSchema={validationSchemaHobbies}
        onSubmit={(values, formikAction) => {
          dispatch(
            createLoisirs([
              ...loisirs,
              { key: loisirs.length+Math.floor(Math.random() * (9 - 1 + 1) + 1) + 1 + 1, label: values },
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
          const { hobbies } = values;
  
          return (
            <>
              <>
                <PrimaryText
                  fontWeight={"500"}
                  fontSize={"25px"}
                  text={"Ajouter un loisirs"}
                  color={theme.palette.secondary.light}
                  cursor
                />
                <Space space={"20px"} />
  
                <InputFeilds
                  value={hobbies}
                  label={"Ajouter "}
                  // margin
                  onChange={handleChange}
                  error={errors.hobbies && touched.hobbies}
                  helperText={
                    errors.hobbies && touched.hobbies ? errors.hobbies : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"hobbies"}
                  onBlur={() => {
                    setFieldTouched("hobbies", true);
                  }}
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

export default Loisirs
