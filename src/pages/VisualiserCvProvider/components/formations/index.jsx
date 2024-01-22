import { Box, Stack, Divider, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const Formation = () => {
  const theme = useTheme();

  const {fomations} = useSelector((state) => state.cvs);
  return (
    <>
{   fomations.length?   <Stack
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
          text={"Formations"}
          color={theme.palette.primary.light}
        />
      </Stack>:null}
      <Space space={15} />
      <Stack
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        direction={{
          xs: "column",
          sm: "column",
          lg: "row",
          md: "column",
        }}
      >
        {fomations.map((i, index) => {

          // let item = data[index]
          // return <RenderItem item={item} i={i} key={index} />
          return <RenderItem item={i} key={index} />;
        })}
      </Stack>
    </>
  );
};

export default Formation;

const RenderItem = ({item}) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: "100%",

        bgcolor: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.light}`,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 20%",
      }}
      
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.dark,
          width: "100%",
          textAlign: "center",
          p: 1,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <PrimaryText
          fontWeight={"500"}
          fontSize={"25px"}
          text={`${item.label.debut}/${item.label.fin}`}
          color={theme.palette.primary.light}
        />
      </Stack>

      <PrimaryText
        fontWeight={"600"}
        fontSize={"18px"}
        text={item.label.title}
        color={theme.palette.primary.contrastText}
      />
      <Space />
      <PrimaryText
        fontWeight={"600"}
        fontSize={"18px"}
        text={item.label.nomFormation}
        color={theme.palette.primary.contrastText}
      />
      <Space />

      {/* <Divider variant="middle" color={theme.palette.primary.light} />
<Space/> */}
      <Stack
        style={{
          height: 2,
          width: "50%",
          backgroundColor: theme.palette.primary.light,
        }}
      />
      <Space />
      <PrimaryText
        fontWeight={"600"}
        fontSize={"18px"}
        text={item.label.lieux}
        color={theme.palette.primary.contrastText}
      />
      <Space />
    </Stack>
  );
};
