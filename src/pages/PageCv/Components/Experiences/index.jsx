import React from 'react'

import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import InputFeilds from "../../../../components/outils/InputFeilds";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import { Formik, Form, Field } from "formik";
import { CloseModal, createExperiences } from '../../../../Redux/createCv/slice';
import DatePickers from '../../../../components/datePicker';

const Experiences = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { experience } = useSelector((state) => state.cvs);
    const { validationSchemaExperince, initialStateExperience } = UseHooks();
  
    return (
      <Formik
        initialValues={initialStateExperience}
        validationSchema={validationSchemaExperince}
        onSubmit={(values, formikAction) => {
          dispatch(
            createExperiences([
              ...experience,
              { key: experience.length+Math.floor(Math.random() * (9 - 1 + 1) + 1) + 1, label: values },
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
          const {
            nomExperience,
            nomEntreprise,
            description,
            lieux,
            experienceDate,
            dateDebut,
          } = values;
  
          return (
            <>
              <>
                <PrimaryText
                  fontWeight={"500"}
                  fontSize={"25px"}
                  text={"Experiences Professionnelle *"}
                  color={theme.palette.secondary.light}
                  cursor
                />
                <Space space={"20px"} />
  
                <InputFeilds
                  value={nomExperience}
                  label={"Ajouter un titre d'expérience"}
                  // margin
                  onChange={handleChange}
                  error={errors.nomExperience && touched.nomExperience}
                  helperText={
                    errors.nomExperience && touched.nomExperience
                      ? errors.nomExperience
                      : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"nomExperience"}
                  onBlur={() => {
                    setFieldTouched("nomExperience", true);
                  }}
                />
                <InputFeilds
                  value={nomEntreprise}
                  label={"Ajouter le nom de l'entreprise"}
                  // margin
                  onChange={handleChange}
                  error={errors.nomEntreprise && touched.nomEntreprise}
                  helperText={
                    errors.nomEntreprise && touched.nomEntreprise
                      ? errors.nomEntreprise
                      : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"nomEntreprise"}
                  onBlur={() => {
                    setFieldTouched("nomEntreprise", true);
                  }}
                />
                <InputFeilds
                  value={lieux}
                  label={"Ajouter un lieux"}
                  // margin
                  onChange={handleChange}
                  error={errors.lieux && touched.lieux}
                  helperText={errors.lieux && touched.lieux ? errors.lieux : ""}
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"lieux"}
                  onBlur={() => {
                    setFieldTouched("lieux", true);
                  }}
                />
                <Space  space={20}/>
  
                <DatePickers
                  label={"Ajouter une date de debut"}
                  value={dateDebut}
                  // margin
                  // onChange={handleChange}
                  onChange={(date) => {
                    // setFieldValue("date",formatDate(date.toString()));
                    setFieldValue("dateDebut",date.toString());
                  }}
                  error={errors.dateDebut && touched.dateDebut}
                  helperText={
                    errors.dateDebut && touched.dateDebut ? errors.dateDebut : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"dateDebut"}
                  onBlur={() => {
                    setFieldTouched("dateDebut", true);
                  }}
                  type="date"
                  shrink={true}
                />
                <Space  space={20}/>
  
                <DatePickers
                  value={experienceDate}
                  label={"Ajouter date de fin "}
                  // margin
                  // onChange={handleChange}
                  onChange={(date) => {
                    // setFieldValue("date",formatDate(date.toString()));
                    setFieldValue("experienceDate",date.toString());
                  }}
                  error={errors.experienceDate && touched.experienceDate}
                  helperText={
                    errors.experienceDate && touched.experienceDate
                      ? errors.experienceDate
                      : ""
                  }
                  autoFocus={true}
                  required={true}
                  id={"outlined-controlled"}
                  name={"experienceDate"}
                  onBlur={() => {
                    setFieldTouched("experienceDate", true);
                  }}
                  type="date"
                  shrink={true}
                />
                <InputFeilds
                  value={description}
                  label={"Ajouter une description "}
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
                  rows={3}
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

export default Experiences