import { Box, Stack, Divider, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const Competence = () => {
  const theme = useTheme();

  const { competences, Experience, Fomations, Loisirs, Rsociaux } = useSelector(
    (state) => state.cvs
  );

  const data = [
    {
      nom: "Competence1",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perspiciatis quasi nesciunt facilis",
    },
    {
      nom: "Competence2",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa Ïperspiciatis quasi nesciunt facilis",
    },

    {
      nom: "Competence3",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perspiciatis quasi nesciunt facilis",
    },
    {
      nom: "Competence4",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perspiciatis quasi nesciunt facilis",
    },
  ];
  return (
    competences.length?  <>
      <Stack
        component={"div"}
        sx={{
          width: "100%",
          p: 4,
          bgcolor: theme.palette.background.default,
          borderRadius: 3,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PrimaryText
          fontWeight={"600"}
          fontSize={"35px"}
          text={"Compétences"}
          color={theme.palette.primary.light}
        />
      </Stack>
      <Space space={15} />
      <Stack
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          p: 3,
          bgcolor: theme.palette.background.default,
          borderRadius: 6,
        }}
        direction={{
          xs: "column",
          sm: "column",
          lg: "row",
          md: "column",
        }}
      >
        {competences.map((i, index) => {

          let item = data[index]
          return (
            <Box key={index}>

              <RenderItem item={item} index={index} i={i}/>
            </Box>
          );
        })}
      </Stack>
    </>
    :null
  );
};

export default Competence;


const RenderItem = ({item,index,i})=>{
  const theme = useTheme();

  return (
    <Stack
    sx={{
      display: "flex",
      flex: "1 1 40%",
    }}
    key={index}
  >
    <PrimaryText
      fontWeight={"500"}
      fontSize={"25px"}
      text={i.label.competence}
      color={theme.palette.primary.light}
    />

    <Space space={15} />

    <PrimaryText
      fontWeight={"500"}
      fontSize={"15px"}
      text={i.label.description}
      color={theme.palette.primary.contrastText}
    />

    <Space />

    {/* <Divider variant="middle" color={theme.palette.primary.light} />
<Space/> */}
  </Stack>
  )
}