import React, { useEffect } from "react";

import { Box, Button, useTheme } from "@mui/material";
import { PrimaryText } from "../../../../components/utils/typography";
import Space from "../../../../components/outils/Space";
import { useDispatch, useSelector } from "react-redux";
import { UseHooks } from "../../Hooks";
import { Formik } from "formik";
import {
  CloseModal,
  createEmploi,
  handleModeopenEmploi,
} from "../../../../Redux/createCv/slice";
import MultipleSelectCheckmarks from "../../../../components/outils/multipleSelect";
import { fetchJobs } from "../../../../Redux/jobs/slice";
import MultipleSelectCheckJobs from "../../../../components/outils/mutilpleSelctJobs";

const EmploiCo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { initialStatEmploi, validationSchemaEmploi } = UseHooks();
  const { jobs:data ,status,} = useSelector((state) => state.jobs);
  const { info} = useSelector((state) => state.detailsProvider);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const personName = info?.jobs?.map((d) => d.name);
  return (
    <Formik
      initialValues={initialStatEmploi}
      validationSchema={validationSchemaEmploi}
      onSubmit={(values, formikAction) => {
        const jobsArray = values.jobs.split(",").map((jobName, index) => {
          const job = data.find((j) => j.name.trim() === jobName.trim());
          const key = job ? job.id : index + 1;
          return {
            key,
            label: jobName.trim(),
          };
        });
        dispatch(handleModeopenEmploi(false));
        dispatch(createEmploi(jobsArray));

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
        const { jobs } = values;


        return (
          <>
            <>
              <PrimaryText
                fontWeight={"500"}
                fontSize={"25px"}
                text={"Ajouter votre emploi"}
                color={theme.palette.secondary.light}
                cursor
              />
              <Space space={"20px"} />


              <MultipleSelectCheckJobs
                value={jobs}
                label={"Ajouter"}
                // margin
                onChange={handleChange}
                error={errors.jobs && touched.jobs}
                helperText={errors.jobs && touched.jobs ? errors.jobs : ""}
                autoFocus={true}
                required={true}
                id={"outlined-controlled"}
                name={"jobs"}
                onBlur={() => {
                  setFieldTouched("jobs", true);
                }}
                setFieldValue={setFieldValue}
                 data={data}
                status={status}
                personNames={personName}
              />

              <Space space={"15px"} />
            </>

            <Box component={"div"} style={{ paddingTop: 20, float: "right" }}>
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={() => {
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
                Valider
              </Button>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default EmploiCo;
