import React from "react";

import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import InputFeilds from "../../../../components/outils/InputFeilds";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import { Formik } from "formik";
import { CloseModal, createRsociaux } from "../../../../Redux/createCv/slice";

const ReseauxSc = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { Rsociaux } = useSelector((state) => state.cvs);
  const { initialStateResSx, validationSchemaResSx } = UseHooks();

  return (
    <Formik
      initialValues={initialStateResSx}
      validationSchema={validationSchemaResSx}
      onSubmit={(values, formikAction) => {
        dispatch(
          createRsociaux([
            ...Rsociaux,
            { key: Rsociaux.length+Math.floor(Math.random() * (9 - 1 + 1) + 1) + 1 + 1, label: values },
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
        const { reseaux } = values;

        return (
          <>
            <>
              <PrimaryText
                fontWeight={"500"}
                fontSize={"25px"}
                text={"Ajouter un réseaux sociaux"}
                color={theme.palette.secondary.light}
                cursor
              />
              <Space space={"20px"} />

              <InputFeilds
                value={reseaux}
                label={"Ajouter"}
                // margin
                onChange={handleChange}
                error={errors.reseaux && touched.reseaux}
                helperText={
                  errors.reseaux && touched.reseaux ? errors.reseaux : ""
                }
                autoFocus={true}
                required={true}
                id={"outlined-controlled"}
                name={"reseaux"}
                onBlur={() => {
                  setFieldTouched("reseaux", true);
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

export default ReseauxSc;
