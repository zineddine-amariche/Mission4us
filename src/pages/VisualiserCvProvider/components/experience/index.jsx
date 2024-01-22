import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../../../assets/profile.jpeg";
import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const Experience = () => {
  const theme = useTheme();

  const { experience } = useSelector((state) => state.cvs);
  // console.log("Experience", experience);
  
  // const nav =useNavigate()
  
    // useEffect(() => {
    //   if(experience.length == 0){
    //    nav('/PageCv')
    //   }
    //  }, [experience])
  return (
    <>
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
          text={"Experience Professionnelle"}
          color={theme.palette.primary.light}
          sx={{
            borderRadius: "10px",
            border: `2px solid ${theme.palette.primary.light}`,
            mb: 1,
          }}
        />
      </Stack>
      <Space space={15} />

      {experience.map((i, index) => {
        return <RenderItem item={i} key={index} />;
      })}
    </>
  );
};

export default Experience;

const RenderItem = ({ item }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: "100%",
        p: 4,
        bgcolor: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.light}`,
        borderRadius: 3,
        mt: 2,
      }}
    >
      <Box component={"div"}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          direction={{
            xs: "column",
            sm: "column",
            lg: "row",
            md: "column",
          }}
        >
          <PrimaryText
            fontWeight={"500"}
            fontSize={"25px"}
            text={item.label.nomExperience}
            color={theme.palette.primary.light}
          />

          <Stack
            direction={{
              xs: "column",
              sm: "column",
              lg: "row",
              md: "column",
            }}
          >
            <PrimaryText
              fontWeight={"500"}
              fontSize={"15px"}
              text={`${item.label.nomEntreprise}/${item.label.lieux}`}
              color={theme.palette.primary.light}
              // mr={"10px"}
            />
           
          </Stack>
          {/* <PrimaryText
            fontWeight={"600"}
            fontSize={"15px"}
            text={`Période: ${item.label.experienceDate}/${item.label.dateDebut}`}
            color={theme.palette.primary.light}
          /> */}
        </Stack>
        <Space />
        <Space space={15} />
        <PrimaryText
          fontWeight={"500"}
          fontSize={"15px"}
          text={item.label.description
          }
          color={theme.palette.primary.contrastText}
          lineHeight="20px"
        />
        <Space space={15} />
        <Stack
          sx={{ float: "right" }}
         
        >
          <PrimaryText
            fontWeight={"500"}
            fontSize={"15px"}
            text={`Période: ${item.label.experienceDate}/${item.label.dateDebut}`}
            color={theme.palette.primary.light}
            mr={"10px"}
          />
        
        </Stack>
      </Box>
    </Stack>
  );
};

