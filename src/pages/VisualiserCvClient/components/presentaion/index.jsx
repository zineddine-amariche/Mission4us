import { Box, Stack, Tooltip, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const Presentation = ({ state }) => {
  const theme = useTheme();

  const [Age, setAge] = useState(null);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    let data = calculateAge(state?.dateOfBirth);
    setAge(data);
  }, [state?.dateOfBirth]);

  return (
    <Stack
      sx={{
        width: "100%",
        p: 4,
        bgcolor: theme.palette.background.default,
        borderRadius: 3,
      }}
      direction={{
        xs: "column",
        sm: "column",
        lg: "row",
        md: "column",
      }}
    >
      <Stack
        component={"div"}
        sx={{
          justifyContent: "center",

          display: "flex",
          alignItems: "center",
          mr: {
            xs: 0,
            sm: 0,
            lg: 8,
            md: 0,
          },
          mb: {
            xs: 4,
            sm: 6,
            lg: 0,
            md: 4,
          },
        }}
      >
        <Box
          component={"img"}
          src={state?.profile}
          width="220px"
          height="150px"
          sx={{
            borderRadius: "10px",
            border: `2px solid ${theme.palette.primary.light}`,
            mb: 1,
          }}
        />

        <PrimaryText
          fontWeight={"500"}
          fontSize={"25px"}
          text={`${state?.firstName} ${state?.lastName}`}
          color={theme.palette.primary.light}
        />

        {/* <PrimaryText
          fontWeight={"500"}
          fontSize={"13px"}
          text={state.apropos}
          color={theme.palette.primary.contrastText}
          lineHeight="2"
        /> */}
      </Stack>
      <Box component={"div"}>
        <PrimaryText
          fontWeight={"500"}
          fontSize={"25px"}
          text={"Presentation"}
          color={theme.palette.primary.light}
        />
        <Space />
        {/* <PrimaryText
          fontWeight={"500"}
          fontSize={"15px"}
          text={state.presentation}
          color={theme.palette.primary.contrastText}
          lineHeight="20px"
        /> */}
        <Space space={15}></Space>

        <Stack
          spacing={10}
          direction={{
            xs: "column",
            sm: "column",
            lg: "row",
            md: "column",
          }}
        >
          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Age"}
              color={theme.palette.primary.light}
            />
            <Space />
            <PrimaryText
              fontWeight={"500"}
              fontSize={"15px"}
              text={`${Age} ans`}
              color={theme.palette.primary.contrastText}
              lineHeight="20px"
            />
          </Box>

          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Langue"}
              color={theme.palette.primary.light}
            />
            <Space />

            {state?.languages?.length == 0 ? (
              <PrimaryText
                fontWeight={"500"}
                fontSize={"15px"}
                text={"English"}
                color={theme.palette.primary.contrastText}
                lineHeight="20px"
              />
            ) : (
              <PrimaryText
                fontWeight={"500"}
                fontSize={"15px"}
                text={state?.languages.map((i, indx) => {
                  let up = indx !== state?.languages?.length - 1 ? " | " : "";
                  return (
                    <Stack display={"flex"} key={indx}>
                      <Box>{`${i.name}  ${up}`}</Box>
                    </Stack>
                  );
                })}
                color={theme.palette.primary.contrastText}
                lineHeight="20px"
              />
            )}
          </Box>

          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Portable"}
              color={theme.palette.primary.light}
            />
            <Space />
            <PrimaryText
              fontWeight={"500"}
              fontSize={state?.phoneNumber ? "15px" : "13px"}
              text={
                state?.phoneNumber
                  ? state?.phoneNumber
                  : "--Information not available--"
              }
              color={theme.palette.primary.contrastText}
              lineHeight="20px"
            />
          </Box>
        </Stack>
        <Space space={15} />
        <Stack
          spacing={10}
          direction={{
            xs: "column",
            sm: "column",
            lg: "row",
            md: "column",
          }}
        >
          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Adresse"}
              color={theme.palette.primary.light}
            />
            <Space />
            <PrimaryText
              fontWeight={"500"}
              fontSize={"15px"}
              text={
                " " + state?.country + ", " + state?.city + ", " + state?.street
              }
              color={theme.palette.primary.contrastText}
              lineHeight="20px"
            />
          </Box>

          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Permis"}
              color={theme.palette.primary.light}
            />
            <Space />
            <PrimaryText
              fontWeight={"500"}
              fontSize={state?.driverLicences.length ? "15px" : "13px"}
              text={
                state?.driverLicences.length
                  ? state?.driverLicences.map((i, indx) => {
                      let up =
                        indx !== state?.driverLicences?.length - 1 ? " | " : "";
                      return (
                        <Tooltip title={i.description}>
                          <Box
                            sx={{
                              backgroundColor: "#2213",
                              display: "flex",
                              justifyContent: "center",
                              borderRadius: 20,
                              margin: "10px 0",
                            }}
                          >{`${i.name}`}</Box>
                        </Tooltip>
                      );
                    })
                  : "--Information not available--"
              }
              color={theme.palette.primary.contrastText}
              lineHeight="20px"
            />
          </Box>

          <Box component={"div"}>
            <PrimaryText
              fontWeight={"500"}
              fontSize={"25px"}
              text={"Email"}
              color={theme.palette.primary.light}
            />
            <Space />
            <PrimaryText
              fontWeight={"500"}
              fontSize={"15px"}
              text={state?.email}
              color={theme.palette.primary.contrastText}
              lineHeight="20px"
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Presentation;
