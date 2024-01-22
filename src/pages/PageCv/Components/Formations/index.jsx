import React from 'react'


import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import InputFeilds from "../../../../components/outils/InputFeilds";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import { Formik, Form, Field } from "formik";
import { CloseModal, createFomations } from '../../../../Redux/createCv/slice';
import DatePickers from '../../../../components/datePicker';


const Formations = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { fomations } = useSelector((state) => state.cvs);
    const { initialStateFormation, validationSchemaFormation } = UseHooks();
    return (
      <>
        <Formik
          initialValues={initialStateFormation}
          validationSchema={validationSchemaFormation}
          onSubmit={(values, formikAction) => {
            dispatch(
              createFomations([
                ...fomations,
                { key: fomations.length+Math.floor(Math.random() * (9 - 1 + 1) + 1) + 1 + 1, label: values },
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
            const { lieux, title, fin, debut, nomFormation } = values;
  
            return (
              <>
                <>
                  <PrimaryText
                    fontWeight={"500"}
                    fontSize={"25px"}
                    text={"Formations *"}
                    color={theme.palette.secondary.light}
                    cursor
                  />
                  <Space space={"20px"} />
  
                  <InputFeilds
                    value={title}
                    label={"Ajouter un titre"}
                    // margin
                    onChange={handleChange}
                    error={errors.title && touched.title}
                    helperText={errors.title && touched.title ? errors.title : ""}
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"title"}
                    onBlur={() => {
                      setFieldTouched("title", true);
                    }}
                  />
                  <InputFeilds
                    label={"Ajouter Établissement d'enseignement"}
                    value={nomFormation}
                    // margin
                    onChange={handleChange}
                    error={errors.nomFormation && touched.nomFormation}
                    helperText={
                      errors.nomFormation && touched.nomFormation
                        ? errors.nomFormation
                        : ""
                    }
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"nomFormation"}
                    onBlur={() => {
                      setFieldTouched("nomFormation", true);
                    }}
                  />
                  <InputFeilds
                    label={"Ajouter un lieux"}
                    value={lieux}
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
  <Space space={20}/>

                  <DatePickers
                    label={"Ajouter une date debut"}
                    value={debut}
                    // margin
                    // onChange={handleChange}
                    onChange={(date) => {
                      // setFieldValue("date",formatDate(date.toString()));
                      setFieldValue("debut",date.toString());
                    }}
                    error={errors.debut && touched.debut}
                    helperText={errors.debut && touched.debut ? errors.debut : ""}
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"debut"}
                    onBlur={() => {
                      setFieldTouched("debut", true);
                    }}
                    type="date"
                    shrink={true}
                  />
  <Space space={20}/>
                  <DatePickers
                    label={"Ajouter une date fin"}
                    value={fin}
                    // margin
                    // onChange={handleChange}
                    onChange={(date) => {
                      // setFieldValue("date",formatDate(date.toString()));
                      setFieldValue("fin",date.toString());
                    }}
                    error={errors.fin && touched.fin}
                    helperText={errors.fin && touched.fin ? errors.fin : ""}
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"fin"}
                    onBlur={() => {
                      setFieldTouched("fin", true);
                    }}
                    type="date"
                    shrink={true}
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
      </>
    );
  };
  

export default Formations