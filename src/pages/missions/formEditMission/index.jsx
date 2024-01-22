import React from "react";
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

// const options = [
//   { value: "client1", label: "Reda Bekka" },
//   { value: "client2", label: "Samia Kh" },
// ];
const options = [
  { value: "client1", name: "Aubin rm" },
  { value: "client2", name: "Samonta bk" },
];

const optionsJob = [
  { value: "job1", name: "Plombier" },
  { value: "job2", name: "Ingenieur en dev" },
];
const EditMission = ({ open, onClose }) => {
  const theme = useTheme();
  const initialValues = {
    intitule: "loremipsum",
    details: "loremipsum loremipsum loremipsum loremipsum loremipsum",
    client: "client1",
    tel: "0782205066",
    email: "aubin@gmail.com",
    adresse: "Bejaia",
    job: "job2",
    datedeb: "2023-05-24",
    datefin: "2023-06-24",
    prix: "500000",
  };

  const validationSchema = Yup.object().shape({
    intitule: Yup.string().required("Intitulé est obligatoire"),
    client: Yup.string().required("Client est obligatoire"),
    tel: Yup.string().required("Téléphone est obligatoire"),
    email: Yup.mixed().required("Email est obligatoire"),
    adresse: Yup.string().required("Adresse est obligatoire"),
    job: Yup.string().required("Job est obligatoire"),
    datedeb: Yup.date().required("Date début est obligatoire"),
    datefin: Yup.date(),
    prix: Yup.number("Prix"),
    langues: Yup.string(),
    details: Yup.string()
      .min(10, "Détails doit contenir au min 10 caracteres")
      .max(150, "Détails doit contenir au max 150 caracteres"),
  });
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
          Modifier la mission{" "}
        </Typography>
      </div>

      <Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values, "myvalues update mission");
          
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
                    name="intitule"
                    label={"Intitulé"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.intitule}
                    required={true}
                    error={errors.intitule && touched.intitule}
                    helperText={
                      errors.intitule && touched.intitule ? errors.intitule : ""
                    }
                  />
                </div>

                {/* <div style={{ flex: 1 }}>
              <CustomSelect
                id={"client"}
                name={"client"}
                onChange={handleChange}
                value={values.client}
              >
                <MenuItem value="" disabled>
                  Selectionner un client
                </MenuItem>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>

              <div style={{ color: "red", fontSize: 15 }}>
                {errors.client && touched.client && errors.client}
              </div>
            </div> */}
                <SelectMenue
                  name="client"
                  selectionTitle="  Selectionner un client *"
                  data={options}
                  handleOpen={(val) => {
                    setFieldValue("client", val);
                  }}
                  error={errors.client && touched.client && errors.client}
                  helperText={
                    errors.client && touched.client ? errors.client : ""
                  }
                  value={values.client}
                  onBlur={() => {
                    setFieldTouched("client", true);
                  }}
                  marginRight
                />
                <RowBox>
                  <InputFeilds
                    name="tel"
                    label={"N° téléphone "}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tel}
                    id="tel"
                    required={true}
                    error={errors.tel && touched.tel}
                    helperText={errors.tel && touched.tel ? errors.tel : ""}
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
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                  />
                </RowBox>
                <RowBox>
                  <InputFeilds
                    name="adresse"
                    label={"Adresse"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.adresse}
                    id="adresse"
                    required={true}
                    error={errors.adresse && touched.adresse}
                    helperText={
                      errors.adresse && touched.adresse ? errors.adresse : ""
                    }
                  />

                  <InputFeilds
                    name="prix"
                    label={"Fourchette de prix"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prix}
                    id="prix"
                    error={errors.adresse && touched.adresse}
                    helperText={
                      errors.adresse && touched.adresse ? errors.adresse : ""
                    }
                  />
                </RowBox>
                {/* 
            <CustomSelect
              id={"job"}
              name={"job"}
              onChange={handleChange}
              value={values.job}
            >
              <MenuItem value="" disabled>
                Selectionner un job
              </MenuItem>
              {optionsJob.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>

            <div style={{ color: "red", fontSize: 15 }}>
              {errors.job && touched.job && errors.job}
            </div> */}
                <SelectMenue
                  selectionTitle="  Selectionner un job *"
                  data={optionsJob}
                  handleOpen={(val) => {
                    setFieldValue("job", val);
                  }}
                  error={errors.job && touched.job && errors.job}
                  helperText={errors.job && touched.job ? errors.job : ""}
                  value={values.job}
                  onBlur={() => {
                    setFieldTouched("job", true);
                  }}
                  marginRight
                />

                <Space space={20} />

                <RowBox>
                  <DatePickers
                    name="datedeb"
                    id="datedeb"
                    label={"Date Debut *"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.datedeb}
                    error={errors.datedeb && touched.datedeb && errors.datedeb}
                    helperText={
                      errors.datedeb && touched.datedeb ? errors.datedeb : ""
                    }
                  />

                  <Space space={20} />
                  <DatePickers
                    id="datefin"
                    name="datefin"
                    label={"Date Fin"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.datefin}
                    error={errors.datefin && touched.datefin && errors.datefin}
                    helperText={
                      errors.datefin && touched.datefin ? errors.datefin : ""
                    }
                  />
                </RowBox>

                {/* <InputFeilds
              label={"Détails"}
              multiline={true}
              rows={3}
              id="details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
              error={errors.details && touched.details}
              helperText={errors.details && touched.details ? errors.details : ""}
              marginRight
            /> */}
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
                      setFieldTouched("details", false);
                    }}
                  />
                </div>

                <Space space={20} />

                <div style={{ float: "right" }}>
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
              </form>
            );
          }}
        </Formik>
      </Body>
    </Box>
  );
};

export default EditMission;
