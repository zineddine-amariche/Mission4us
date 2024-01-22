import React, { useEffect, useState } from "react";
import { Badge, Box, Button, InputBase, Stack, useTheme } from "@mui/material";
import Head from "../../components/Head";
import Body from "../../components/Body";
import toast from "react-hot-toast";
import { UseHooks } from "./Hooks";
import InputFeilds from "../../components/outils/InputFeilds";
import Space from "../../components/outils/Space";
import RowBox from "../../components/RowBox";
import SelectMenue from "../../components/outils/SelectMenue";
import {
  listSexe,
  listSituation,
} from "../../data/listLanguages";
import ChipsArray from "../../components/Add-card";
import {
  createEmploi,
  createExperiences,
  createLoisirs,
  handleModelopenExp,
  handleModelopenLois,
  handleModeopenEmploi,
} from "../../Redux/createCv/slice";
import { Person2Outlined } from "@mui/icons-material";
import { PrimaryText } from "../../components/utils/typography";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Experiences from "./Components/Experiences";
import Loisirs from "./Components/Loisirs";
import { CreateCvApi } from "../../Redux/createCv/api/createCvSlice";

import DatePickers from "../../components/datePicker";
import EmploiCo from "./Components/Emploi";
import { getDetailsProviders } from "../../Redux/getDetailsProviders";
import { updateEmploiArr, updateExperienceArr } from "./Helpers";
import MultipleSelectCheckmarks from "../../components/outils/multipleSelect";

const PageCv = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { OnSubmit, initialState, validationSchema } = UseHooks();

  const [File, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const shapeStyles = {
    bgcolor: theme.palette.background.default,
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    ml: 1,
  };

  const {
    openExp,
    openLois,
    loisirs,
    experience,
    competences,
    EmploiArr,
    openEmploi,
  } = useSelector((state) => state.cvs);

  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
      <Person2Outlined
        sx={{ fontSize: 60, color: theme.palette.primary.dark }}
      />
    </Box>
  );
  const { isLoading, info } = useSelector((state) => state.detailsProvider);

  const [submitButtonState, setSubmitButtonState] = useState(null);
  const handleSubmitButtonState = (isSubmit) => {
    setSubmitButtonState(isSubmit);
  };
  const notify = () => toast.success("fetched succesfully");
  const onError = () => {};
  const onSuccesAction = () => {
    notify();
  };

  const onErrorAction = (message) => {
    toast.error(`échec ${message}`);
  };

  const create = (jobsArray) => {
    dispatch(createEmploi(jobsArray));
  };

  const createNewExperience = (experienceArray) => {
    dispatch(createExperiences(experienceArray));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const theme = useTheme();

    return `${day}/${month}/${year}`;
  };

  let skillAndHobbies = info?.skillAndHobbies;
  let experiences = info?.experiences;
  let newData = info?.jobs;

  let datalanguages = info?.languages;
  let driverLicences = info?.driverLicences;

  useEffect(() => {
    let object = {
      onSuccesAction,
      onErrorAction,
    };
    dispatch(getDetailsProviders(object));
  }, []);

  useEffect(() => {
    if (newData) {
      let obj = {
        newData,
        create,
      };
      updateEmploiArr(obj);
    }
  }, [newData]);

  useEffect(() => {
    if (newData) {
      let obj = {
        newData: experiences,
        createNewExperience,
      };
      updateExperienceArr(obj);
    }
  }, [experiences]);

  const defaultLaguagesName = datalanguages?.map((languages) => languages.name);
  const defaultLaguagesName3 = datalanguages?.map((languages) => languages);
  const defaultdriverLicences = driverLicences?.map((Licence) => Licence.name);
  const driverLicence = driverLicences?.map((Licence) => Licence);


  return isLoading ? (
    <div>loading</div>
  ) : (
    <Box>
      <Head title="Page Cv" />
      <Body>
        <PrimaryText
          fontWeight={"600"}
          fontSize={"35px"}
          text={"Créez votre cv"}
          color={theme.palette.secondary.light}
          cursor
        />

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values) => {


            let exp = experience.map((i) => {
              return i.label;
            });
            let expe = competences.map((i) => {
              return i.label;
            });

            let jobs = EmploiArr.map((i) => {
              return { id: i.key,label:i?.label, name: i?.label };
            });

            let skillAndHobbies = expe.map((i) => {
              return {
                name: i.competence.toUpperCase(),
                type: "SKILL",
                description: i.description,
                rating: 9,
              };
            });

            let experiences = exp.map((i) => {
              return {
                name: i.nomExperience.toUpperCase(),
                type: "PROFESSIONNAL_EXPERIENCE",
                startDate: i.dateDebut,
                endDate: i.experienceDate,
                location: i.lieux,
                establishment: i.nomEntreprise,
                description: i.description,
              };
            });


            let obj = {
              firstName: values.nom,
              lastName: values.prenom,
              dateOfBirth: values.date,
              street: values.adresse,
              city: "Ginochester",
              country: "Iran",
              socialReason: "Intranet Cotton HTTP",
              phoneNumber: values.phone,
              email: values.email,
              languages: [
                {
                  id: 5,
                },
              ],
              jobs,
              driverLicences: [
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
              skillAndHobbies,
              experiences,
            };



            let objec =  {

              firstName: values.nom,
              lastName: values.prenom,
              dateOfBirth: values.date,
              street: values.adresse,
              city: "Ginochester",
              country: "Iran",
              socialReason: "Intranet Cotton HTTP",
              phoneNumber: values.phone,
              email: values.email,
              languages: defaultLaguagesName3,
              driverLicences:driverLicence,
              skillAndHobbies,
              experiences
            }
            

            if (submitButtonState == "Valider") {
              let object = {
                obj,
                onSuccesAction,
                onError,
                onErrorAction,
              };
              dispatch(CreateCvApi(object));
            } else {
              OnSubmit(objec);
            }
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
            setSubmitting,
          }) => {
            const {
              nom,
              prenom,
              sexe,
              situation,
              phone,
              email,
              date,
              adresse,
              apropos,
              langue,
              permis,
              presentation,
              jobs,
            } = values;
            return (
              <>
                <Space space={"20px"} />
                <Stack width={"100%"} spacing={3} display="flex">
                  {imageUrl ? (
                    <Box
                      component={"img"}
                      src={imageUrl}
                      width="220px"
                      height="150px"
                      sx={{
                        borderRadius: "10px",
                        border: `2px solid ${theme.palette.secondary.light}`,
                        mb: 1,
                      }}
                    />
                  ) : (
                    <Badge overlap="circular">{circle}</Badge>
                  )}
                  <InputBase
                    id="standard-basic"
                    placeholder={"placeholder"}
                    value={File}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      const imageUrl = URL.createObjectURL(file);
                      setImageUrl(imageUrl);
                      setFieldValue("profile", imageUrl);
                    }}
                    sx={{
                      pl: "10px",
                      height: 40,
                      color: "#000",
                      width: "20%",
                    }}
                    type="file"
                  />

                  <RowBox>
                    <InputFeilds
                      label={"nom"}
                      error={errors.nom && touched.nom}
                      helperText={errors.nom && touched.nom ? errors.nom : ""}
                      value={nom}
                      onChange={handleChange}
                      autoFocus={true}
                      required={true}
                      id={"outlined-controlled"}
                      name={"nom"}
                      onBlur={() => {
                        setFieldTouched("nom", true);
                      }}
                    />
                    <InputFeilds
                      label={"prénom"}
                      error={errors.prenom && touched.prenom}
                      helperText={
                        errors.prenom && touched.prenom ? errors.prenom : ""
                      }
                      value={prenom}
                      onChange={handleChange}
                      autoFocus={true}
                      required={true}
                      id={"outlined-controlled"}
                      name={"prenom"}
                      onBlur={() => {
                        setFieldTouched("prenom", true);
                      }}
                    />
                  </RowBox>
                </Stack>

                <RowBox>
                  <SelectMenue
                    selectionTitle="Selectionner votre sexe"
                    data={listSexe}
                    handleOpen={(val) => {
                      setFieldValue("sexe", val);
                    }}
                    error={errors.sexe && touched.sexe}
                    helperText={errors.sexe && touched.sexe ? errors.sexe : ""}
                    value={sexe}
                    onBlur={() => {
                      setFieldTouched("sexe", true);
                    }}
                    marginRight
                  />
                  <SelectMenue
                    selectionTitle="Selectionner votre situation"
                    data={listSituation}
                    handleOpen={(val) => {
                      setFieldValue("situation", val);
                    }}
                    error={errors.situation && touched.situation}
                    helperText={
                      errors.situation && touched.situation
                        ? errors.situation
                        : ""
                    }
                    value={situation}
                    onBlur={() => {
                      setFieldTouched("situation", true);
                    }}
                    marginRight
                  />
                </RowBox>

                <RowBox sx={{ alignItems: "center" }}>
                  <InputFeilds
                    label={"Téléphone"}
                    error={errors.phone && touched.phone}
                    helperText={
                      errors.phone && touched.phone ? errors.phone : ""
                    }
                    value={phone}
                    onChange={handleChange}
                    autoFocus={true}
                    id={"outlined-controlled"}
                    name={"phone"}
                    onBlur={() => {
                      setFieldTouched("phone", true);
                    }}
                  />
                  <InputFeilds
                    label={"E-mail"}
                    error={errors.email && touched.email}
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    value={email}
                    onChange={handleChange}
                    autoFocus={true}
                    autoComplete="email"
                    id={"outlined-controlled"}
                    name={"email"}
                    onBlur={() => {
                      setFieldTouched("email", true);
                    }}
                  />
                </RowBox>

                <RowBox>
                  <DatePickers
                    label={"Date de naissance"}
                    error={errors.date && touched.date}
                    helperText={errors.date && touched.date ? errors.date : ""}
                    value={date}
                    // onChange={handleChange}
                    onChange={(date) => {
                      // setFieldValue("date",formatDate(date.toString()));
                      setFieldValue("date", date.toString());
                    }}
                    autoFocus={true}
                    id={"outlined-controlled"}
                    name={"date"}
                    onBlur={() => {
                      setFieldTouched("date", true);
                    }}
                    type=""
                    shrink={true}
                    formatDate={formatDate}
                    setFieldValue={setFieldValue}
                  />

                  <InputFeilds
                    label={"Adresse"}
                    error={errors.adresse && touched.adresse}
                    helperText={
                      errors.adresse && touched.adresse ? errors.adresse : ""
                    }
                    value={adresse}
                    onChange={handleChange}
                    autoFocus={true}
                    id={"outlined-controlled"}
                    name={"adresse"}
                    onBlur={() => {
                      setFieldTouched("adresse", true);
                    }}
                  />
                </RowBox>

                <RowBox>
                  <InputFeilds
                    label={"Bio"}
                    multiline={true}
                    rows={2}
                    id="standard-multiline-static"
                    error={errors.apropos && touched.apropos}
                    helperText={
                      errors.apropos && touched.apropos ? errors.apropos : ""
                    }
                    value={apropos}
                    onChange={handleChange}
                    autoFocus={true}
                    name={"apropos"}
                    onBlur={() => {
                      setFieldTouched("apropos", true);
                    }}
                  />
                </RowBox>

                <RowBox>
                  <InputFeilds
                    label={"Presentation"}
                    multiline={true}
                    rows={4}
                    id="standard-multiline-static"
                    error={errors.presentation && touched.presentation}
                    helperText={
                      errors.presentation && touched.presentation
                        ? errors.presentation
                        : ""
                    }
                    value={presentation}
                    onChange={handleChange}
                    autoFocus={true}
                    name={"presentation"}
                    onBlur={() => {
                      setFieldTouched("presentation", presentation);
                    }}
                  />
                </RowBox>

                <RowBox>
                  {/* <SelectMenue
                    selectionTitle="Selectionner une langue "
                    data={listLangue}
                    handleOpen={(val) => {
                      setFieldValue("langue", val);
                    }}
                    error={errors.langue && touched.langue}
                    helperText={
                      errors.langue && touched.langue ? errors.langue : ""
                    }
                    value={langue}
                    onBlur={() => {
                      setFieldTouched("langue", true);
                    }}
                    marginRight
                    langue
                  /> */}

                  <MultipleSelectCheckmarks
                    value={langue}
                    label={"Séléctionner une langue"}
                    // margin
                    onChange={handleChange}
                    error={errors.langue && touched.langue}
                    helperText={
                      errors.langue && touched.langue ? errors.langue : ""
                    }
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"langue"}
                    onBlur={() => {
                      setFieldTouched("langue", true);
                    }}
                    setFieldValue={setFieldValue}
                    data={datalanguages}
                    personNames={defaultLaguagesName}
                  />

                  <MultipleSelectCheckmarks
                    value={permis}
                    label={"Séléctionner une catégorie "}
                    // margin
                    onChange={handleChange}
                    error={errors.permis && touched.permis}
                    helperText={
                      errors.permis && touched.permis ? errors.permis : ""
                    }
                    autoFocus={true}
                    required={true}
                    id={"outlined-controlled"}
                    name={"permis"}
                    onBlur={() => {
                      setFieldTouched("permis", true);
                    }}
                    setFieldValue={setFieldValue}
                    data={driverLicences}
                    personNames={defaultdriverLicences}
                  />
                  {/* <SelectMenue
                    selectionTitle="Selectionner une catégorie "
                    data={listPermis}
                    handleOpen={(val) => {
                      setFieldValue("permis", val);
                    }}
                    error={errors.permis && touched.permis}
                    helperText={
                      errors.permis && touched.permis ? errors.permis : ""
                    }
                    value={permis}
                    onBlur={() => {
                      setFieldTouched("permis", true);
                    }}
                    marginRight
                  /> */}
                </RowBox>

                <Space space={30} />

                <Stack
                  flexDirection="row"
                  direction={{
                    xs: "column",
                    sm: "column",
                    lg: "row",
                    md: "column",
                  }}
                >
                  <ChipsArray
                    title={"Experiences Professionnelle "}
                    sousTitre={"Aucune expérience professionnelle"}
                    addToCv={createExperiences}
                    error={errors.experience && touched.experience}
                    helperText={
                      errors.experience && touched.experience
                        ? errors.experience
                        : ""
                    }
                    onBlur={() => {
                      setFieldTouched("experience", true);
                    }}
                    setFieldValue={setFieldValue}
                    name={"experience"}
                    ModelComponent={Experiences}
                    handleClose={() => {
                      dispatch(handleModelopenExp(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModelopenExp(true));
                    }}
                    open={openExp}
                    chipData={experience}
                    handleDelete={(chipToDelete) => () => {
                      const newItems = experience.filter(
                        (item) => item.key !== chipToDelete.key
                      );
                      dispatch(createExperiences(newItems));
                    }}
                  />
                  <Space />
                  <ChipsArray
                    title={"loisirs "}
                    sousTitre={"Aucun loisirs"}
                    addToCv={createLoisirs}
                    setFieldValue={setFieldValue}
                    name={"loisirs"}
                    ModelComponent={Loisirs}
                    handleClose={() => {
                      dispatch(handleModelopenLois(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModelopenLois(true));
                    }}
                    open={openLois}
                    chipData={loisirs}
                    handleDelete={(chipToDelete) => () => {
                      // const updatedFruits = experience.filter(
                      //   (fruit, i) => i !== chipToDelete.key - 1
                      // );
                      const newItems = loisirs.filter(
                        (item) => item.key !== chipToDelete.key
                      );

                      dispatch(createLoisirs(newItems));
                    }}
                  />
                  {/* <ChipsArray
                    title={"Formations "}
                    sousTitre={"Aucune Formation"}
                    addToCv={createFomations}
                    // titleModel={"Ajouter une Formation"}
                    error={errors.formation && touched.formation}
                    helperText={
                      errors.formation && touched.formation
                        ? errors.formation
                        : ""
                    }
                    onBlur={() => {
                      setFieldTouched("formation", true);
                    }}
                    setFieldValue={setFieldValue}
                    name={"formation"}
                    ModelComponent={Formations}
                    handleClose={() => {
                      dispatch(handleModelopenForm(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModelopenForm(true));
                    }}
                    open={openForm}
                    chipData={fomations}
                    handleDelete={(chipToDelete) => () => {
                      const updatedFruits = fomations.filter(
                        (fruit, i) => i !== chipToDelete.key - 1
                      );
                      const newItems = fomations.filter(
                        (item) => item.key !== chipToDelete.key
                      );

                      dispatch(createFomations(newItems));
                    }}
                  /> */}
                </Stack>

                <Space space={10} />

                <Stack
                  flexDirection="row"
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                  }}
                >
                  {/* <ChipsArray
                    title={"Compétences"}
                    sousTitre={"Aucune Compétences"}
                    addToCv={createCompetences}
                    error={errors.competence && touched.competence}
                    helperText={
                      errors.competence && touched.competence
                        ? errors.competence
                        : ""
                    }
                    onBlur={() => {
                      setFieldTouched("competence", true);
                    }}
                    setFieldValue={setFieldValue}
                    name={"competence"}
                    ModelComponent={Competences}
                    handleClose={() => {
                      dispatch(handleModelopenComp(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModelopenComp(true));
                    }}
                    open={openComp}
                    chipData={competences}
                    handleDelete={(chipToDelete) => () => {
                      // const updatedFruits = experience.filter(
                      //   (fruit, i) => i !== chipToDelete.key - 1
                      // );
                      const newItems = competences.filter(
                        (item) => item.key !== chipToDelete.key,
                      );

                      dispatch(createCompetences(newItems));
                    }}
                  /> */}
                  <Space />
                </Stack>

                <Space space={10} />

                <Stack
                  flexDirection="row"
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                  }}
                >
                  {/* <ChipsArray
                    title={"Réseaux sociaux *"}
                    sousTitre={"Réseaux sociaux non disponible"}
                    addToCv={createRsociaux}
                    error={errors.reseaux && touched.reseaux}
                    helperText={
                      errors.reseaux && touched.reseaux ? errors.reseaux : ""
                    }
                    onBlur={() => {
                      setFieldTouched("reseaux", true);
                    }}
                    setFieldValue={setFieldValue}
                    name={"reseaux"}
                    ModelComponent={ReseauxSc}
                    handleClose={() => {
                      dispatch(handleModeopenResx(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModeopenResx(true));
                    }}
                    open={openResx}
                    chipData={Rsociaux}
                    handleDelete={(chipToDelete) => () => {
                      // const updatedFruits = loisirs.filter(
                      //   (fruit, i) => i !== chipToDelete.key - 1
                      // );

                      const newItems = createRsociaux.filter(
                        (item) => item.key !== chipToDelete.key
                      );

                      dispatch(createRsociaux(newItems));
                    }}
                  /> */}

                  <ChipsArray
                    title={"Emploi "}
                    sousTitre={"La liste d'emplois est vide."}
                    error={errors.jobs && touched.jobs}
                    helperText={errors.jobs && touched.jobs ? errors.jobs : ""}
                    onBlur={() => {
                      setFieldTouched("jobs", true);
                    }}
                    setFieldValue={setFieldValue}
                    name={"jobs"}
                    ModelComponent={EmploiCo}
                    handleClose={() => {
                      dispatch(handleModeopenEmploi(false));
                    }}
                    handleOpen={() => {
                      dispatch(handleModeopenEmploi(true));
                    }}
                    open={openEmploi}
                    chipData={EmploiArr}
                    handleDelete={(chipToDelete) => () => {
                      const newItems = EmploiArr?.filter(
                        (item) => item.key !== chipToDelete.key
                      );

                      dispatch(createEmploi(newItems));
                      // const newItems = EmploiArr?.filter((item) => item.key !== chipToDelete.key).map((item) => {
                      //   return {
                      //     ...item,
                      //     // label: item.label // If you want to keep the same label, you can omit this line
                      //   };
                      // });

                      // dispatch(createEmploi(newItems));
                    }}
                  />
                </Stack>

                <Space space={30} />

                <Stack
                  justifyContent="flex-end"
                  maxWidth="100%"
                  flexDirection="row"
                  p={3}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      p: 1,
                      mr: 2,
                      bgcolor: theme.palette.secondary.dark,
                      color: theme.palette.secondary.main,
                      "&:hover ": {
                        bgcolor: theme.palette.secondary.dark,
                        color: theme.palette.secondary.main,
                      },
                    }}
                    onClick={() => {
                      handleSubmitButtonState("skip");
                      handleSubmit();
                    }}
                  >
                    Visualiser
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      p: 1,
                      mr: 2,
                      bgcolor: theme.palette.secondary.main,
                      color: theme.palette.secondary.dark,
                      "&:hover ": {
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.secondary.dark,
                      },
                    }}
                    onClick={() => {
                      handleSubmitButtonState("Valider");
                      handleSubmit();
                    }}
                  >
                    Valider
                  </Button>
                </Stack>
              </>
            );
          }}
        </Formik>
      </Body>
    </Box>
  );
};

export { PageCv };
